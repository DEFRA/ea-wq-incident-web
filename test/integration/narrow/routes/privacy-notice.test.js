describe('Privacy notice test', () => {
  let createServer
  let server

  beforeAll(async () => {
    createServer = require('../../../../app/server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /privacy-notice route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/privacy-notice'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })
})
