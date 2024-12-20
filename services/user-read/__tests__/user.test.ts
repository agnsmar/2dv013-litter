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

describe('GET /api/users/1234567', () => {
  let response: any
  beforeAll(async () => {
    response = await request(baseURL).get('/users/1234567')
  })

  it('Should return a 200', async () => {
    expect(response.statusCode).toBe(200)
  })

  it('Should return a specific user', async () => {
    expect(response.body.user.id).toBe(1234567)
    expect(response.body.user.email).toBe('dinkleberg2452@example.com')
    expect(response.body.user.username).toBe('dinkleberg2452')
  })
})