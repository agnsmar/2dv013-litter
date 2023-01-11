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

const main = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const gqlSchema = await fs.readFile('./src/graphql/schema.graphql', { encoding: 'utf-8' })
  const typeDefs = gql(gqlSchema)

  const server = new ApolloServer<IContext>({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()

  app.use(
    '/graphql',
    cors({ credentials: true }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res })
    })
  )

  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT }, resolve))
  console.log(`🚀  Server ready at http://localhost:${process.env.PORT}`)
}

main()
