import { ApolloServer } from '@apollo/server'
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const main = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const gateway = new ApolloGateway({
    buildService({ name, url }) {
      return new RemoteGraphQLDataSource({
        url,
        didReceiveResponse({ context, request, response }) {
          if (!context.res) {
            return response
          }

          const logoutHeader = response.http?.headers.get('x-logout')
          if (logoutHeader) {
            context.res.clearCookie('aid')
            context.res.clearCookie('rid')

            return response
          }

          const accessToken = response.http?.headers.get('x-access-token')
          if (accessToken) {
            context.res.cookie('aid', accessToken, {
              secure: false,
              sameSite: 'none',
              maxAge: 1000 * 60 * 60 * 24
            })
          }

          const refreshToken = response.http?.headers.get('x-refresh-token')
          if (refreshToken) {
            context.res.cookie('rid', refreshToken, {
              secure: false,
              sameSite: 'none',
              maxAge: 1000 * 60 * 60 * 24 * 7
            })
          }

          return response
        },
        willSendRequest({ context, request }) {
          if (context.req && context.req.cookies) {
            const accessToken = context.req.cookies.aid
            if (accessToken) {
              request.http?.headers.set('x-access-token', accessToken)
            }

            const refreshToken = context.req.cookies.rid
            if (refreshToken) {
              request.http?.headers.set('x-refresh-token', refreshToken)
            }
          }
        }
      })
    },
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'profile', url: process.env.PROFILE_SERVICE },
        { name: 'auth', url: process.env.AUTH_SERVICE },
        { name: 'feed', url: process.env.FEED_SERVICE }
      ]
    })
  })

  const server = new ApolloServer({
    gateway,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()

  app.use(
    '/graphql',
    cors({ origin: process.env.ORIGIN, credentials: true }),
    bodyParser.json(),
    cookieParser(),
    expressMiddleware(server, { context: async ({ req, res }) => ({ req, res }) })
  )

  httpServer.listen(process.env.PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${process.env.PORT}`)
  })
}

main()
