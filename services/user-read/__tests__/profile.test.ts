import request from 'supertest'
const baseURL = 'http://localhost/api/usersread'

describe('GET /api/profiles', () => {
  let response: any
  beforeAll(async () => {
    response = await request(baseURL).get('/profiles')
  })

  it('Should return a 200', async () => {
    expect(response.statusCode).toBe(200)
  })

  it('Should return an array', async () => {
    expect(Array.isArray(response.body)).toBe(true)
  })
})

describe('GET /api/profiles/1234567', () => {
  let response: any
  beforeAll(async () => {
    response = await request(baseURL).get('/profiles/1234567')
  })

  it('Should return a 200', async () => {
    expect(response.statusCode).toBe(200)
  })

  it('Should return a specific user', async () => {
    expect(response.body.profile.user_id).toBe(1234567)
    expect(response.body.user.content).toBe('test content')
    expect(response.body.user.avatar).toBe('https://i.imgur.com/VAIIdrg.png')
  })
})