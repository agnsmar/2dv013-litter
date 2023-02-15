import request from 'supertest'
import crypto from 'crypto'
const baseURL = 'http://localhost/api/userswrite'

describe('POST /api/users/register', () => {
  let response: any
  beforeAll(async () => {
    response = await request(baseURL)
      .post('/users/register')
      .send({
        email: crypto.randomUUID() + '@gmail.com',
        username: crypto.randomUUID(),
        password: 'password123'
      })
  })

  it('Should return a 201', async () => {
    expect(response.statusCode).toBe(201)
  })
})
