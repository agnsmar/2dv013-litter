import { ApolloServer } from '@apollo/server'
import resolvers from '../resolvers/resolvers'
import fs from 'fs/promises'
import gql from 'graphql-tag'
import { RegisterDocument } from '../generated/graphql'

it('returns hello with the provided name', async () => {
  const gqlSchema = await fs.readFile('./src/graphql/schema.graphql', { encoding: 'utf-8' })
  const typeDefs = gql(gqlSchema)
  const testServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  const response: any = await testServer.executeOperation({
    query: RegisterDocument,
    variables: { username: 'Bob', password: 'bobspassword', email: 'bob@gmail.com' }
  })

  expect(response.body.singleResult.data.register.success).toBe(true)
})
