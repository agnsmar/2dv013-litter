import request from 'supertest'
const baseURL = 'http://localhost/api/usersread'

describe('GET /api/users', () => {
  let response: any
  beforeAll(async () => {
    response = await request(baseURL).get('/users')
  })

  it('Should return a 200', async () => {
    expect(response.statusCode).toBe(200)
  })

  it('Should return an array', async () => {
    expect(Array.isArray(response.body)).toBe(true)
  })
})