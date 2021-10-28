describe('Location test', () => {
  let createServer
  let server

  beforeAll(async () => {
    createServer = require('../../../../../app/server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /where-is-the-smell route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/where-is-the-smell'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('POST /where-is-the-smell route with populated location response redirects to description-of-the-smell', async () => {
    const options = {
      method: 'POST',
      url: '/where-is-the-smell',
      payload: {
        location: 'a valid address'
      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe('/description-of-the-smell')
  })

  test('POST /where-is-the-smell route with no selection returns page with error message', async () => {
    const options = {
      method: 'POST',
      url: '/where-is-the-smell',
      payload: {
        location: undefined
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
