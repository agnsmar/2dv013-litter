import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import resolvers from './resolvers/resolvers'
import fs from 'fs/promises'
import gql from 'graphql-tag'
import { IContext } from './context'
import express from 'express'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import amqlib from 'amqplib'
import { AuthTokenHelper } from './util/authTokenHelper'

const main = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const gqlSchema = await fs.readFile('./src/graphql/schema.graphql', { encoding: 'utf-8' })
  const typeDefs = gql(gqlSchema)
  const ath = new AuthTokenHelper()

  const server = new ApolloServer<IContext>({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  let conn: amqlib.Connection

  try {
    conn = await amqlib.connect(process.env.RABBITMQ_CONNECTION_STRING!)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  app.use(
    '/graphql',
    cors({ credentials: true }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const accessToken = req.headers['x-access-token'] as string | undefined
        const token = ath.verifyAccessToken(accessToken?.split(' ')[1])

        return {
          req,
          res,
          conn,
          token
        }
      }
    })
  )

  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT }, resolve))
  console.log(`🚀  Server ready at http://localhost:${process.env.PORT}`)
}

main()
