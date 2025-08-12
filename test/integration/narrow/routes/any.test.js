describe('Home test', () => {
  let createServer
  let server

  beforeAll(async () => {
    createServer = require('../../../../app/server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET / route returns 301', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(301)
  })

  test('GET /made-up-route route returns 301', async () => {
    const options = {
      method: 'GET',
      url: '/made-up-route'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(301)
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })
})
