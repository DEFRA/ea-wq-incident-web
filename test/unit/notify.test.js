const sendEmailError = new Error('Email send error')
const mockSuccessfulSendEmail = jest.fn().mockResolvedValue({ result: true })
const mockFailedSendEmail = jest.fn().mockRejectedValue(sendEmailError)

jest.mock('../../app/config', () => {
  return {
    notifyApiKey: 'notifyApiKey',
    notifyTemplateId: 'notifyTemplateId',
    emailToAddress: 'test@test.com'
  }
})

describe('notify', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('Send email success', async () => {
    jest.doMock('notifications-node-client', () => {
      return {
        NotifyClient: jest.fn(() => {
          return { sendEmail: mockSuccessfulSendEmail }
        })
      }
    })

    const { sendEmail } = require('../../app/services/notify')
    const result = await sendEmail({})
    expect(mockSuccessfulSendEmail).toHaveBeenCalled()
    expect(result).toEqual({ result: true })
  })

  test('Send email fail', async () => {
    jest.doMock('notifications-node-client', () => {
      return {
        NotifyClient: jest.fn(() => {
          return { sendEmail: mockFailedSendEmail }
        })
      }
    })

    const { sendEmail } = require('../../app/services/notify')

    sendEmail()
      .catch(err => {
        expect(mockFailedSendEmail).toHaveBeenCalled()
        expect(err).toBe(sendEmailError)
      })
  })
})
