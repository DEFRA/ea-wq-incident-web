let mockSetup
let insights

function createMocks () {
  jest.mock('applicationinsights')
  const applicationinsights = require('applicationinsights')
  mockSetup = jest.fn(() => { return { start: jest.fn() } })
  applicationinsights.setup.mockImplementation(mockSetup)
  applicationinsights.defaultClient = { context: { keys: {}, tags: {} } }
}
describe('app insights', () => {
  const OLD_ENV = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
    createMocks()
    insights = require('../../app/services/insights')
  })
  afterAll(() => {
    process.env = OLD_ENV
  })
  test('insights should not start when no APPINSIGHTS_CONNECTIONSTRING', async () => {
    process.env.APPINSIGHTS_CONNECTIONSTRING = undefined
    insights.setup()
    expect(mockSetup).toHaveBeenCalledTimes(0)
  })
  test('insights should start when APPINSIGHTS_CONNECTIONSTRING provided', async () => {
    process.env.APPINSIGHTS_CONNECTIONSTRING = '00000000-aaaa-bbbb-cccc-dddddddddddd'
    insights.setup()
    expect(mockSetup).toHaveBeenCalledTimes(1)
  })
})
