import { ApolloServer, GraphQLResponse } from '@apollo/server'
import resolvers from '../resolvers/resolvers'
import fs from 'fs/promises'
import gql from 'graphql-tag'
import {
  LoginDocument,
  MutationLoginArgs,
  MutationRegisterArgs,
  RegisterDocument,
  SuccessErrorResponse
} from '../generated/graphql'
import dotenv from 'dotenv'
import crypto from 'crypto'
dotenv.config()

type TGqlRegisterReponse = {
  register: SuccessErrorResponse
}

type TGqlLoginResponse = {
  login: SuccessErrorResponse
}

class TestUser {
  #email
  #username
  #password

  constructor() {
    this.#email = crypto.randomUUID() + '@gmail.com'
    this.#username = crypto.randomUUID()
    this.#password = 'd1e8a5ca8652fbcb01ef428feacbce41'
  }

  get email() {
    return this.#email
  }

  get username() {
    return this.#username
  }

  get password() {
    return this.#password
  }
}

const testUser = new TestUser()

describe('register & login', () => {
  describe('registering a user', () => {
    it('should be able to register a user with unique username and email', async () => {
      const gqlSchema = await fs.readFile('./src/graphql/schema.graphql', { encoding: 'utf-8' })
      const typeDefs = gql(gqlSchema)
      const testServer = new ApolloServer({
        typeDefs,
        resolvers
      })

      const response = await testServer.executeOperation<TGqlRegisterReponse, MutationRegisterArgs>(
        {
          query: RegisterDocument,
          variables: {
            username: testUser.username,
            password: testUser.password,
            email: testUser.email
          }
        }
      )

      if (response.body.kind === 'single') {
        expect(response.body.singleResult.data?.register.success).toBe(true)
      } else {
        fail('Response is not a single result')
      }
    }),
      it('should NOT be able to register a user without a unique username', async () => {
        const gqlSchema = await fs.readFile('./src/graphql/schema.graphql', { encoding: 'utf-8' })
        const typeDefs = gql(gqlSchema)
        const testServer = new ApolloServer({
          typeDefs,
          resolvers
        })

        const newTestUser = new TestUser()

        const response = await testServer.executeOperation<
          TGqlRegisterReponse,
          MutationRegisterArgs
        >({
          query: RegisterDocument,
          variables: {
            username: testUser.username,
            password: testUser.password,
            email: newTestUser.email
          }
        })
        
        if (response.body.kind === 'single') {
          expect(response.body.singleResult.data?.register.success).toBe(false)
        } else {
          fail('Response is not a single result')
        }
      }),
      it('should NOT be able to register a user without a unique email', async () => {
        const gqlSchema = await fs.readFile('./src/graphql/schema.graphql', { encoding: 'utf-8' })
        const typeDefs = gql(gqlSchema)
        const testServer = new ApolloServer({
          typeDefs,
          resolvers
        })

        const newTestUser = new TestUser()

        const response = await testServer.executeOperation<
          TGqlRegisterReponse,
          MutationRegisterArgs
        >({
          query: RegisterDocument,
          variables: {
            username: newTestUser.username,
            password: testUser.password,
            email: testUser.email
          }
        })
        if (response.body.kind === 'single') {
          expect(response.body.singleResult.data?.register.success).toBe(false)
        } else {
          fail('Response is not a single result')
        }
      })
  })

  describe('login a user', () => {
    it('should be able to login a user with correct credentials', async () => {
      const gqlSchema = await fs.readFile('./src/graphql/schema.graphql', { encoding: 'utf-8' })
      const typeDefs = gql(gqlSchema)
      const testServer = new ApolloServer({
        typeDefs,
        resolvers
      })

      const response = await testServer.executeOperation<TGqlLoginResponse, MutationLoginArgs>({
        query: LoginDocument,
        variables: {
          password: testUser.password,
          email: testUser.email
        }
      })

      if (response.body.kind === 'single') {
        expect(response.body.singleResult.data?.login.success).toBe(true)
      } else {
        fail('Response is not a single result')
      }
    }),
      it('should NOT be able to login a user with incorrect credentials', async () => {
        const gqlSchema = await fs.readFile('./src/graphql/schema.graphql', { encoding: 'utf-8' })
        const typeDefs = gql(gqlSchema)
        const testServer = new ApolloServer({
          typeDefs,
          resolvers
        })

        const response = await testServer.executeOperation<TGqlLoginResponse, MutationLoginArgs>({
          query: LoginDocument,
          variables: {
            password: 'wrongpassword',
            email: testUser.email
          }
        })

        if (response.body.kind === 'single') {
          expect(response.body.singleResult.data?.login.success).toBe(true)
        } else {
          fail('Response is not a single result')
        }
      })
  })
})
