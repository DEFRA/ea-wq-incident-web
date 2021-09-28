describe('Home test', () => {
  let createServer
  let server
  let sessionHandler
  let mockFlash = null

  function createMocks () {
    jest.mock('../../../../app/services/session-handler')
    sessionHandler = require('../../../../app/services/session-handler')
    sessionHandler.flash.mockImplementation(() => mockFlash)
  }

  beforeAll(async () => {
    createServer = require('../../../../app/server')
  })

  beforeEach(async () => {
    createMocks()
    server = await createServer()
    await server.initialize()
  })

  test('GET /confirmation without valid session data redirects to /', async () => {
    mockFlash = null
    const options = {
      method: 'GET',
      url: '/confirmation'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe('/')
  })

  test('GET /confirmation with valid session data return 200', async () => {
    const options = {
      method: 'GET',
      url: '/confirmation'
    }

    mockFlash = [true]

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })
})
