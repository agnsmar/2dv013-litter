import { createApolloServer } from '..'
import request from 'supertest'

type TServer = Awaited<ReturnType<typeof createApolloServer>>
const TESTUSER_ID = '1234567'

describe('profile tests', () => {
  let server: TServer | undefined

  beforeAll(async () => {
    server = await createApolloServer()
    await new Promise<void>((resolve) => server?.listen({ port: 0 }, resolve))
  })
  afterAll(() => {
    server?.close()
  })
  it('should return a profile', async () => {
    const queryData = {
      query: `query Profile($userid: String!) { 
        profile(userid: $userid) {
          profile {
            username
            content
            avatar
            lits {
              content
              createdAt
              updatedAt
            }
          }
          error {
            message
          }
        } 
      }`,
      variables: {
        userid: TESTUSER_ID
      }
    }

    const response = await request(server).post('/graphql').send(queryData)

    expect(response.body.data.profile.profile).toBeDefined()
  })
})
