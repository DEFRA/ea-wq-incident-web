const config = require('../config')
const NotifyClient = require('notifications-node-client').NotifyClient
const { notifyApiKey, notifyTemplateId, emailToAddress } = config
const client = new NotifyClient(notifyApiKey)
const { sendEmail: sendNotifyEmail } = require('./send-email')

function sendEmail (data) {
  return sendNotifyEmail(client, notifyTemplateId, emailToAddress, data)
}

module.exports = {
  client,
  sendEmail
}
