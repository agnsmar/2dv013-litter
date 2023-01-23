import request from 'supertest'
const baseURL = 'http://localhost/api/usersread'

describe('GET /api/users', () => {
  it('Should return a 200', async () => {
    const response = await request(baseURL).get('/users')
    expect(response.statusCode).toBe(200)
  })

  it('Should return an array', async () => {
    const response = await request(baseURL).get('/users')
    expect(Array.isArray(response.body)).toBe(true)
  })
})