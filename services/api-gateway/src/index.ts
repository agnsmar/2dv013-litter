import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

const main = async () => {
  const prisma = new PrismaClient()
  dotenv.config()

  const typeDefs = `#graphql
    type Mutation {
      createUser: Boolean
    }
    type User {
      email: String
      id: Int
      name: String
    }
    type Query {
      users: [User]
    }
  `

  const resolvers = {
    Mutation: {
      createUser: async () => {
        await prisma.user.create({
          data: {
            email: 'test@test.test',
            name: 'Bob'
          }
        })
        return true
      }
    },
    Query: {
      users: async () => {
        return await prisma.user.findMany({})
      }
    }
  }

  const server = new ApolloServer({ typeDefs, resolvers })

  const { url } = await startStandaloneServer(server, { listen: { port: parseInt(process.env.PORT!) } })

  console.log(`🚀  Server ready at ${url}`)
}

main()
