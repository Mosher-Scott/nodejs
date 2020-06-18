const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


var mathRouter = require('./routes/math');

express()
  .use(express.static(path.join(__dirname, 'public')))
  //.use(express.static('public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .set()
  //.use('/math', mathRouter) // Add the math route to the app

  .get('/math', getFormSubmission)
  // Set up the homepage we want the users to go to by default
  .get('/', (req, res) => res.sendFile(__dirname + '/public/mathForm.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


  function getFormSubmission(request, response) {
    const operation = request.query.operator;
    const numOne = Number(request.query.numOneInput);
    const numTwo = Number(request.query.numTwoInput);

    // Now send everything to the function to actually do the math
    getAnswer(response, operation, numOne, numTwo);
}

function performMathOperations(operator, numOne, numTwo) {
  switch (operator) {
      case '+':
          result = parseInt(numOne) + parseInt(numTwo);
          break;
       case '-':
           result = parseInt(numOne) - parseInt(numTwo);
          break;
       case '*':
           result = parseInt(numOne) * parseInt(numTwo);
           break;
       case '/':
           result = parseInt(numOne) / parseInt(numTwo);
           break;
       default:
           result = "error";
           break;
  }

  return result;
}

function getAnswer(response, operator, numOne, numTwo) {
  // Run this method to perform the math
  var result = performMathOperations(operator, numOne, numTwo);

 // Return a JSON object
 const values = {operationUsed: operator, firstNumber: numOne, secondNumber: numTwo, result: result }

 // Now render the results for the EJS page.  Need to pass it the JSON file
 response.render('pages/formSubmission', values);
}