module.exports = {
  components: [
    {
      type: 'MultilineTextField',
      name: 'smellLocation',
      title: 'Where did you notice this smell',
      hint: 'Give as much detail as possible, for example the street name, postcode, description of the location',
      schema: { max: 400 },
      options: { rows: 5 }
    }
  ]
}
