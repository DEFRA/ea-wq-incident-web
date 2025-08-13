module.exports = {
  method: '*',
  path: '/{any*}',
  handler: (_, h) => h.redirect('https://www.gov.uk/report-smell').permanent()
}
