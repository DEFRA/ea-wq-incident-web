describe('Confirmation test', () => {
  let createServer
  let server

  beforeAll(async () => {
    jest.mock('../../../../../app/plugins/crumb')
    createServer = require('../../../../../app/server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /about-the-smell route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/about-the-smell'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('POST /about-the-smell route with valid strength response redirects to is-the-smell-at-home', async () => {
    const options = {
      method: 'POST',
      url: '/about-the-smell',
      payload: {
        strength: 'Slight smell'
      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe('/is-the-smell-at-home')
  })

  test('POST /about-the-smell route with invalid response returns page with error message', async () => {
    const options = {
      method: 'POST',
      url: '/about-the-smell',
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
