require('dotenv').config(); // Require the .env file that contains the database string
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


// Need this to connect to the DB
const connectionString = process.env.DATABASE_URL;

const { Pool } = require('pg')
// const pool = new Pool();

const pool = new Pool({connectionString: connectionString,
ssl: {rejectUnauthorized: false}});

var functions = require('./public/scripts/functions.js');
var exportedFunctions = require('./public/scripts/exportFunctions.js');
var queries = require('./public/scripts/sqlQueries.js');

//var mathRouter = require('./routes/math');

express()

  .use(express.static(path.join(__dirname, 'public')))
  //.use(express.static('public'))
  .set('views', [path.join(__dirname, 'views'),
                path.join(__dirname, 'views/pages')])
  .set('view engine', 'ejs')
  .set()

  // When the user wants to use the math calculator
  .get('/math', (req, res) => res.sendFile(__dirname + '/public/mathForm.html'))

  // Called on form submission for the math calculator
  .get('/mathsubmission', getFormSubmission)

  // When the user wants to create a postal estimate
  .get('/postal', (req, res) => res.sendFile(__dirname + '/public/postalRateCalculator.html'))

   // When the form is submitted for an estimate on postage
  .get('/estimate', getPostalData)

  .get('/about', function (req, res, next) {

    queries.rows.getAllClients(pool, results)

    res.send('about')
  }) // End of /about

  .get('/about2', getSingleClient)

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

// Called to get a single client out of the database
function getSingleClient(request, response) {

  const id = 8;

  // Helper function
  getSingleClientFromDb(id, function(error, result) {
    if (error || result == null) {
      
      response.status(500).json({success:false, data:error});
    } else {
      const person = result[0];

      // If person is null, there are no results.  Need to handle it
      if(person == null) {
        console.log("No results")
      }
      response.status(200).json(person);
    }
  }); // End of helper function
}

// This actually connects to the database and runs the query
function getSingleClientFromDb(id, callback) {
  console.log("Now running query");

  // Use a placeholder for the id
  const sql = "SELECT * FROM client WHERE id = $1::int";

  // Create an array to hold all parameters
  const params = [id];

  // Run the query with parameters
  pool.query(sql, params, function(err, result) {
    // check for error
    if(err) {
      console.log("an error occurred")
      console.log(err)
      callback(err, null);
    }

    // Checking for debug
    console.log(JSON.stringify(result.rows))

    // Now let the callback function know we're done
    callback(null, result.rows);
  })
}