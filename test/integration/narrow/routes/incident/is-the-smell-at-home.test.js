describe('Feedback test', () => {
  let createServer
  let server

  beforeAll(async () => {
    createServer = require('../../../../../app/server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /is-the-smell-at-home route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/is-the-smell-at-home'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('POST /is-the-smell-at-home route with \'No\' response redirects to where is the smell', async () => {
    const options = {
      method: 'POST',
      url: '/is-the-smell-at-home',
      payload: {
        atHome: 'No',
        crumb: 'xyz'
      },
      headers: {
        cookie: 'crumb=xyz'
      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe('/where-is-the-smell')
  })

  test('POST /is-the-smell-at-home route with \'Yes\' response redirects to details-of-the-smell', async () => {
    const options = {
      method: 'POST',
      url: '/is-the-smell-at-home',
      payload: {
        atHome: 'Yes',
        crumb: 'xyz'
      },
      headers: {
        cookie: 'crumb=xyz'
      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe('/details-of-the-smell')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })
})
