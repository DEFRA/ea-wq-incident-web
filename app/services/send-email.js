function sendEmail (client, templateId, emailAddress, data) {
  return client
    .sendEmail(templateId, emailAddress, {
      personalisation: data,
      reference: ''
    })
    .catch(err => {
      console.error(err)
      throw err
    })
}

module.exports = { sendEmail }
