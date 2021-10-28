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
    expect(response.statusCode).toBe(200)
  })

  test('POST /about-you route with valid strength response redirects to about-the-smell', async () => {
    const options = {
      method: 'POST',
      url: '/about-you',
      payload: {
        firstName: 'Mr',
        lastName: 'Test',
        addressLine1: 'Institute of test',
        addressLine2: '',
        townOrCity: 'Teston',
        county: 'Testshire',
        postcode: 'T3 5TR',
        email: 'tester@test.com',
        phonenumber: '1471'
      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe('/about-the-smell')
  })

  test('POST /about-you route with invalid response returns page with error message', async () => {
    const options = {
      method: 'POST',
      url: '/about-you',
      payload: {
        strength: undefined
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
