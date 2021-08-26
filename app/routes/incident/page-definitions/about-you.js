module.exports = {
  components: [
    {
      type: 'TextField',
      name: 'firstName',
      title: 'First name',
      schema: { max: 60 },
      options: { classes: 'govuk-input--width-10' }
    },
    {
      type: 'TextField',
      name: 'lastName',
      title: 'Last name',
      schema: { max: 60 },
      options: { classes: 'govuk-input--width-10' }
    },
    {
      type: 'Html',
      content: '<h2 class="govuk-heading-m">Your address<h2>'
    },
    {
      type: 'TextField',
      name: 'address',
      title: 'House number or name',
      schema: { max: 70 },
      options: { classes: 'govuk-input--width-20' }
    },
    {
      type: 'TextField',
      name: 'addressLine1',
      title: 'Address line 1',
      schema: { max: 70 },
      options: { classes: 'govuk-input--width-20' }
    },
    {
      type: 'TextField',
      name: 'addressLine2',
      title: 'Address line 2',
      schema: { max: 70 },
      options: { classes: 'govuk-input--width-20', required: false }
    },
    {
      type: 'TextField',
      name: 'townOrCity',
      title: 'Town or city',
      schema: { max: 70 },
      options: { classes: 'govuk-input--width-20' }
    },
    {
      type: 'TextField',
      name: 'postcode',
      title: 'Postcode',
      schema: { max: 10 },
      options: { classes: 'govuk-input--width-20' }
    },
    {
      type: 'EmailAddressField',
      name: 'email',
      title: 'Email address',
      hint: '(To receive your reference number)',
      schema: { max: 100 },
      options: { classes: 'govuk-input--width-20' }
    },
    {
      type: 'TelephoneNumberField',
      name: 'phonenumber',
      title: 'Phone number',
      hint: '(as an alternative to an email address in case we need to contact you)',
      schema: { max: 20 },
      options: { classes: 'govuk-input--width-10', required: false }
    }
  ]
}
