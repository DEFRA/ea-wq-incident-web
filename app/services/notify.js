const config = require('../config')
const NotifyClient = require('notifications-node-client').NotifyClient
const { notifyApiKey, notifyTemplateId, emailToAddress } = config
const client = new NotifyClient(notifyApiKey)

function sendEmail (data) {
  return client.sendEmail(
    notifyTemplateId,
    emailToAddress,
    {
      personalisation: data,
      reference: ''
    })
}

module.exports = {
  client,
  sendEmail
}
