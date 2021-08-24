function sendEmail (client, templateId, emailAddress, data) {
  return client
    .sendEmail(templateId, emailAddress, {
      personalisation: data,
      reference: ''
    })
}

module.exports = { sendEmail }
