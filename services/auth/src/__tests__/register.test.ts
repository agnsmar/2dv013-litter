import request from 'supertest'
import { createApolloServer } from '..'
import { MutationRegisterArgs } from '../generated/graphql'
import { TQuery, TServer } from '../types/types'
import { TestUser } from '../util/testUser'

const testUser = new TestUser()

describe('register an account', () => {
  let server: TServer | undefined

  beforeAll(async () => {
    server = await createApolloServer()
    await new Promise<void>((resolve) => server?.listen({ port: 0 }, resolve))
  })
  afterAll(async () => {
    server?.close()
  })
  it('should register a user', async () => {
    const queryData: TQuery<MutationRegisterArgs> = {
      query: `mutation register($email: String!, $password: String!, $username: String!) { 
        register(email: $email, password: $password, username: $username) { 
          success 
          error { 
            message 
          } 
        } 
      }`,
      variables: {
        email: testUser.email,
        password: testUser.password,
        username: testUser.username
      }
    }

    const response = await request(server).post('/graphql').send(queryData)
    expect(response.body.data.register.success).toBe(true)
  })
})
