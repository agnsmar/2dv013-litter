import request from 'supertest'
import { createApolloServer } from '..'
import { AuthTokenHelper } from '../util/authTokenHelper'

type TServer = Awaited<ReturnType<typeof createApolloServer>>
const ath = new AuthTokenHelper()

describe('feed', () => {
  let server: TServer | undefined

  it('should return a feed', async () => {
    const queryData = {
      query: `query { 
        feed { 
          username
        } 
      }`
    }

    const accessToken = ath.generateAccessToken({ userid: '1' })
    const response = await request(server)
      .post('/graphql')
      .send(queryData)
      .set('x-access-token', `Bearer ${accessToken}`)

    expect(response.body.data.feed).toBeDefined()
  })
})
