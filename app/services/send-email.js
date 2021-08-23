function sendEmail (client, templateId, emailAddress, personalisation) {
  return client
    .sendEmail(templateId, emailAddress, {
      personalisation: personalisation,
      reference: ''
    })
}

module.exports = { sendEmail }
