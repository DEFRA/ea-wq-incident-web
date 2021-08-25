describe('Home test', () => {
  let createServer
  let server
  let sessionHandler
  let mockSession = {}
  let notify

  function createMocks () {
    jest.mock('../../../../app/services/session-handler')
    sessionHandler = require('../../../../app/services/session-handler')
    sessionHandler.get.mockImplementation(() => mockSession)
    jest.mock('../../../../app/services/notify')
    notify = require('../../../../app/services/notify')
    notify.sendEmail.mockImplementation(jest.fn().mockResolvedValue({ result: true }))
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
    mockSession = {}
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

    mockSession = {
      firstName: 'Mr',
      lastName: 'Test',
      address: 'Institute of test',
      addressLine1: '345',
      addressLine2: null,
      townOrCity: 'Teston',
      postcode: 'T3 5TR',
      email: 'tester@test.com',
      phonenumber: '1471',
      smellStrength: 'strong smell that may make your hair or clothes smell',
      smellAtHome: 'No',
      smellLocation: 'elsewhere',
      smellDescription: 'bad',
      dateOfSmell: '2021-08-25T00:00:00.000Z',
      timeOfSmell: '14:35'
    }
    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })
})