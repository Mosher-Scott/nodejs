const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var functions = require('./public/scripts/functions.js');
var exportedFunctions = require('./public/scripts/exportFunctions.js');

//var mathRouter = require('./routes/math');

express()
  .use(express.static(path.join(__dirname, 'public')))
  //.use(express.static('public'))
  .set('views', [path.join(__dirname, 'views'),
                path.join(__dirname, 'views/pages')])
  .set('view engine', 'ejs')
  .set()

  // When the user wants to use math calculator
  .get('/math', (req, res) => res.sendFile(__dirname + '/public/mathForm.html'))

  .get('/mathsubmission', getFormSubmission)

  // When the user wants to create a postal estimate
  .get('/postal', (req, res) => res.sendFile(__dirname + '/public/postalRateCalculator.html'))

   // When the form is submitted for an estimate on postage
  .get('/estimate', getPostalData)

  // Set up the homepage when the homepage is requested
  //.get('/', (req, res) => res.sendFile(__dirname + '/views/pages/index.ejs'))
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// Get the form submission for a simple calculator
function getFormSubmission(request, response) {
  const operation = request.query.operator;
  const numOne = Number(request.query.numOneInput);
  const numTwo = Number(request.query.numTwoInput);

  // Now send everything to the function to actually do the math
  exportedFunctions.data.getAnswer(response, operation, numOne, numTwo);
}

// Get form submission data for calculating the postal cost
function getPostalData(request, response) {
  const shipMethod = request.query.shipMethod;
  const weight = request.query.weight;

  // Now call the other methods to do the calculations
  exportedFunctions.data.calculateRate(response, shipMethod, weight);
}
