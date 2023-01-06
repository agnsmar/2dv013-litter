import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { startStandaloneServer } from '@apollo/server/standalone'
import resolvers from './resolvers/resolvers'
import fs from 'fs/promises'
import gql from 'graphql-tag'
import { Context } from './context'

const main = async () => {
  const gqlSchema = await fs.readFile('./src/graphql/schema.graphql', { encoding: 'utf-8' })
  const typeDefs = gql(gqlSchema)

  const server = new ApolloServer<Context>({
    schema: buildSubgraphSchema({ typeDefs, resolvers })
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT!) },
    context: async ({ req, res }) => ({
      token: req.headers.authorization?.split(' ')[1]
    })
  })
  console.log(`🚀  Server ready at ${url}`)
}

main()
