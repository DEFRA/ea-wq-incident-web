describe('Address test', () => {
  let createServer
  let server

  beforeAll(async () => {
    createServer = require('../../../../../app/server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /about-you route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/about-you'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBeDefined()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })
})
