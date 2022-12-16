import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import dotenv from 'dotenv'

const main = async () => {
  dotenv.config()

  const typeDefs = `#graphql
    type Book {
      title: String
      author: String
    }
    type Query {
      books: [Book]
    }
  `

  const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin'
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster'
    }
  ]

  const resolvers = {
    Query: {
      books: () => books
    }
  }

  const server = new ApolloServer({ typeDefs, resolvers })

  const { url } = await startStandaloneServer(server, { listen: { port: parseInt(process.env.PORT!) } })

  console.log(`🚀  Server ready at ${url}`)
}

main()
