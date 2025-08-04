describe('Experience test', () => {
  let createServer
  let server
  let sessionHandler
  let mockSession = {}
  let notify

  function createMocks () {
    jest.mock('../../../../../app/services/session-handler')
    sessionHandler = require('../../../../../app/services/session-handler')
    sessionHandler.get.mockImplementation(() => mockSession)
    jest.mock('../../../../../app/services/notify')
    notify = require('../../../../../app/services/notify')
    notify.sendEmail.mockImplementation(jest.fn().mockResolvedValue({ result: true }))
  }

  beforeAll(async () => {
    jest.mock('../../../../../app/plugins/crumb')
    createServer = require('../../../../../app/server')
  })

  beforeEach(async () => {
    createMocks()
    server = await createServer()
    await server.initialize()
  })

  test('GET /description-of-the-smell route returns 200', async () => {
    mockSession = {
      description: 'test description'
    }
    const options = {
      method: 'GET',
      url: '/description-of-the-smell'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('POST /description-of-the-smell route with \'answer\' response redirects to details-of-the-smell', async () => {
    const options = {
      method: 'POST',
      url: '/description-of-the-smell',
      payload: {
        description: 'Foobar'
      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe('/details-of-the-smell')
  })

  test('POST /description-of-the-smell route with more that 400 characters response returns page with error message', async () => {
    const options = {
      method: 'POST',
      url: '/description-of-the-smell',
      payload: {
        description:
        '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' +
        '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' +
        '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' +
        '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' +
        '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'
      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('There is a problem')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })
})
