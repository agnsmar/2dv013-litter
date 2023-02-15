import request from 'supertest'
const baseURL = 'http://localhost/api/litsread'

describe('GET /api/lits/1234567', () => {
  let response: any
  beforeAll(async () => {
    response = await request(baseURL).get('/lits/1234567')
  })

  it('Should return a 200', async () => {
    expect(response.statusCode).toBe(200)
  })

  it('Should return an array', async () => {
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('Should return a collection with a specific lit', async () => {
    expect(response.body[0].id).toBe(1234567)
    expect(response.body[0].user_id).toBe(1234567)
    expect(response.body[0].content).toBe('test content')
  })
})
