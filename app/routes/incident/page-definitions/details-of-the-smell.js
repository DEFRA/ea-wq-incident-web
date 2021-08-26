module.exports = {
  submitButtonText: 'Finish',
  components: [
    {
      type: 'MultilineTextField',
      name: 'smellDescription',
      title: 'How would you describe the smell',
      titleForError: 'Answer how would you describe the smell',
      schema: { max: 400 },
      options: { rows: 5, required: false }
    },
    {
      type: 'DatePartsField',
      name: 'dateOfSmell',
      title: 'What date did you notice the smell',
      titleForError: 'Answer what date did you notice the smell'
    },
    {
      type: 'TextField',
      inputType: 'time',
      name: 'timeOfSmell',
      title: 'What time of day did you notice the smell',
      hint: 'Use the 24 hour clock format for example 13:20',
      titleForError: 'Answer what time of day did you notice the smell',
      options: { classes: 'govuk-input--width-5' }
    }
  ]
}
