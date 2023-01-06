import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { gql } from 'graphql-tag'
import { startStandaloneServer } from '@apollo/server/standalone'

const main = async () => {
  const typeDefs = gql`
    type Query {
      feed: [FeedUser]
    }

    type FeedUser {
      id: String
      username: String
    }
  `

  const resolvers = {
    Query: {
      feed() {
        return [
          { id: '1', username: '@ava' },
          { id: '2', username: '@ava' },
          { id: '3', username: '@ava' },
          { id: '4', username: '@ava' }
        ]
      }
    }
  }

  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }])
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT!) }
  })
  console.log(`🚀  Server ready at ${url}`)
}

main()
