describe('Experience test', () => {
  let createServer
  let server
  let sessionHandler
  let mockSession = {}

  function createMocks () {
    jest.mock('../../../../../app/services/session-handler')
    sessionHandler = require('../../../../../app/services/session-handler')
    sessionHandler.get.mockImplementation(() => mockSession)
  }

  beforeAll(async () => {
    createServer = require('../../../../../app/server')
  })

  beforeEach(async () => {
    createMocks()
    server = await createServer()
    await server.initialize()
  })

  test('GET /details-of-the-smell route returns 200', async () => {
    mockSession = {
      smellDescription: 'test description',
      dateOfSmell: '2017-08-25T00:00:00.000Z',
      timeOfSmell: '14:35'
    }
    const options = {
      method: 'GET',
      url: '/details-of-the-smell'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })
})
