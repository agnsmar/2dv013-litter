import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { gql } from 'graphql-tag'
import { startStandaloneServer } from '@apollo/server/standalone'

const main = async () => {
  const typeDefs = gql`
    type Query {
      me: [User]
    }

    type User {
      id: String
      username: String
    }
  `

  const resolvers = {
    Query: {
      me() {
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

  const { url } = await startStandaloneServer(server, { listen: 4000 })
  console.log(`🚀  Server ready at ${url}`)
}

main()
