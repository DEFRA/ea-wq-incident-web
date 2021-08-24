function formatData (data) {
  const personalisation = {}
  for (const key in data) {
    personalisation[key] = data[key] === null ? '' : data[key]
  }

  // Location of smell is a conditional question
  // so check for its presence and default (use joi here)
  if (personalisation.smellLocation === undefined) {
    personalisation.smellLocation = ''
  }

  return personalisation
}

function sendEmail (client, templateId, emailAddress, data) {
  const personalisation = formatData(data)
  return client
    .sendEmail(templateId, emailAddress, {
      personalisation: personalisation,
      reference: ''
    })
    .catch(err => {
      console.error(err)
      throw err
    })
}

module.exports = { sendEmail }
