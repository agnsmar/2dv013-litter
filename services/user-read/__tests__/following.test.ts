import request from 'supertest'
const baseURL = 'http://localhost/api/usersread'

describe('GET Unauthorized /api/followings', () => {
  let response: any
  beforeAll(async () => {
    response = await request(baseURL).get('/followings')
  })

  it('Should return a 401', async () => {
    expect(response.statusCode).toBe(401)
  })
})
