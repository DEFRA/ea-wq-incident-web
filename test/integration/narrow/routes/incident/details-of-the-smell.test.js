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
    createServer = require('../../../../../app/server')
  })

  beforeEach(async () => {
    createMocks()
    server = await createServer()
    await server.initialize()
  })

  test('GET /details-of-the-smell route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/details-of-the-smell'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('POST /details-of-the-smell route returns 200 if time is in the future', async () => {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    const options = {
      method: 'POST',
      url: '/details-of-the-smell',
      payload: {
        date: today,
        hour: 23,
        minute: 59
      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('POST /details-of-the-smell route returns 200 if time is incorrect', async () => {
    const options = {
      method: 'POST',
      url: '/details-of-the-smell',
      payload: {
        date: '2021-08-25',
        hour: 14,
        minute: 61
      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('POST /details-of-the-smell route returns 302', async () => {
    mockSession = {
      firstName: 'Mr',
      lastName: 'Test',
      addressLine1: 'Institute of test',
      addressLine2: '',
      townOrCity: 'Teston',
      county: 'Testshire',
      postcode: 'T3 5TR',
      email: 'tester@test.com',
      phonenumber: '1471',
      strength: 'strong smell that may make your hair or clothes smell',
      atHome: 'No',
      location: 'elsewhere',
      description: 'bad',
      date: '2021-08-25T00:00:00.000Z',
      hour: 14,
      minute: 35
    }

    const options = {
      method: 'POST',
      url: '/details-of-the-smell',
      payload: {
        date: '2021-08-25',
        hour: 14,
        minute: 35
      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(302)
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })
})
