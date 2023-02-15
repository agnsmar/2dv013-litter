import { createApolloServer } from '..'
import { TServer } from '../types/types'
import request from 'supertest'
import { AuthTokenHelper } from '../util/authTokenHelper'

const ath = new AuthTokenHelper()
const TESTUSER1_ID = '1234567'
const TESTUSER2_ID = '1234568'

describe('follow tests', () => {
  let server: TServer | undefined

  beforeAll(async () => {
    server = await createApolloServer()
    await new Promise<void>((resolve) => server?.listen({ port: 0 }, resolve))
  })
  afterAll(() => {
    server?.close()
  })
  it('should follow a user', async () => {
    const queryData = {
      query: `mutation Follow($followeeId: String!) { 
        follow(followeeId: $followeeId) { 
          success 
          error { 
            message 
          } 
        } 
      }`,
      variables: {
        followeeId: TESTUSER2_ID
      }
    }

    const accessToken = ath.generateAccessToken({ userid: TESTUSER1_ID })
    const response = await request(server)
      .post('/graphql')
      .send(queryData)
      .set('x-access-token', 'Bearer ' + accessToken)

    expect(response.body.data.follow.success).toBe(true)
  })
  it('should unfollow a user', async () => {
    const queryData = {
      query: `mutation Unfollow($followeeId: String!) { 
        unfollow(followeeId: $followeeId) { 
          success 
          error { 
            message 
          } 
        } 
      }`,
      variables: {
        followeeId: TESTUSER2_ID
      }
    }

    const accessToken = ath.generateAccessToken({ userid: TESTUSER1_ID })
    const response = await request(server)
      .post('/graphql')
      .send(queryData)
      .set('x-access-token', 'Bearer ' + accessToken)

    expect(response.body.data.unfollow.success).toBe(true)
  })
})
