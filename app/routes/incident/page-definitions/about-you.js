module.exports = {
  components: [
    {
      type: 'TextField',
      name: 'firstName',
      title: 'First name',
      options: { classes: 'govuk-input--width-10' }
    },
    {
      type: 'TextField',
      name: 'lastName',
      title: 'Last name',
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
      options: { classes: 'govuk-input--width-20' }
    },
    {
      type: 'TextField',
      name: 'addressLine1',
      title: 'Address line 1',
      options: { classes: 'govuk-input--width-20', required: false }
    },
    {
      type: 'TextField',
      name: 'addressLine2',
      title: 'Address line 2',
      options: { classes: 'govuk-input--width-20', required: false }
    },
    {
      type: 'TextField',
      name: 'townOrCity',
      title: 'Town or city',
      options: { classes: 'govuk-input--width-20' }
    },
    {
      type: 'TextField',
      name: 'postcode',
      title: 'Postcode',
      options: { classes: 'govuk-input--width-20' }
    },
    {
      type: 'EmailAddressField',
      name: 'email',
      title: 'Email address',
      hint: '(To receive your reference number)',
      options: { classes: 'govuk-input--width-20' }
    },
    {
      type: 'TelephoneNumberField',
      name: 'phonenumber',
      title: 'Phone number',
      hint: '(as an alternative to an email address in case we need to contact you)',
      options: { classes: 'govuk-input--width-10', required: false }
    }
  ]
}
