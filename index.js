require('dotenv').config(); // Require the .env file that contains the database string
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require("body-parser"); // Used for post requests

// Need this to connect to the DB
const connectionString = process.env.DATABASE_URL || "postgres://erlpzgduapjutd:8e441a6e94c2303b22cba3f9e49299b4512d7ad674471a1bfa9774a026e23e44@localhost:5432/d89mifq9oa741m?ssl=true"

const { Pool } = require('pg')
// const pool = new Pool();

const pool = new Pool({connectionString: connectionString});

var functions = require('./public/scripts/functions.js');
var exportedFunctions = require('./public/scripts/exportFunctions.js');
var clients = require('./public/scripts/clientQueries.js');

//var mathRouter = require('./routes/math');

express()

  .use(express.static(path.join(__dirname, 'public')))

  // Need this to handle post data
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

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

  //.get('/singleClient', getSingleClient)

  //.get('/clientDetails2', getClientDetails)

  .post('/clientDetails', getClientDetails)

  .get('/singleclient2', (req, res) => res.render('pages/getClientDetails'))

  .get('/allclients', getAllClients)

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

// Called to get a single client out of the database, mainly for testing
// function getSingleClient(request, response) {

//   const id = 1;

//   // Helper function
//   getSingleClientFromDb(id, function(error, result) {
//     if (error || result == null) {
      
//       response.status(500).json({success:false, data:error});
//     } else {
//       const person = result[0];

//       // If person is null, there are no results.  Need to handle it
//       if(person == null) {
//         console.log("No results")
//       }
//       //response.status(200).json(person);
     
//       // Set the header for the response
//       response.status(200);

//       // Now display this page with the following data
//       response.render('pages/clientDetails.ejs', person);
//     }
//   }); // End of helper function
// }

// Called to get a single client out of the database

// Processes POST data
function getClientDetails(request, response) {

  // testing
  // console.log("ID: ", request.body.id);
  const id = request.body.id;

  // Helper function
  getSingleClientFromDb(id, function(error, result) {
    if (error || result == null) {
      
      response.status(500).json({success:false, data:error});
    } else {
      const person = result[0];

      console.log(person);

      // If person is null, there are no results.  Need to handle it
      if(person == null) {
        console.log("No results")
        response.status(404);
        
      } else {
          // Set the header for the response
          response.status(200);

          // Now display this page with the following data
          response.render('pages/clientDetails.ejs', person);
      }
    }
  }); // End of helper function
}


// Called to get all clients out of the database
function getAllClients(request, response) {

  // Helper function
  getAllClientsFromDb(function(error, result) {
    if (error || result == null) {
      
      response.status(500).json({success:false, data:error});
      response.render(error);
    } else {
      const clients = result;

      // If person is null, there are no results.  Need to handle it
      if(clients == null) {
        console.log("No results")
      }
      //response.status(200).json(person);
     
      // Set the header for the response
      response.status(200);

      var clientStuff = JSON.stringify(clients)
          
      // Now display this page with the following data
      response.render('pages/allclients',{clientData: clients});
      //console.log(clients);
      //console.log(clients[3]['first_name']);
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
    //console.log(JSON.stringify(result.rows))

    // Now let the callback function know we're done
    callback(null, result.rows);

  }) // end of query
} // end of function

// This actually connects to the database and runs the query
function getAllClientsFromDb(callback) {
  console.log("Now running query to get all clients");

  // Use a placeholder for the id
  const sql = "SELECT * FROM client";

  // Run the query with parameters
  pool.query(sql, function(err, result) {
    // check for error
    if(err) {
      console.log("an error occurred")
      console.log(err)
      callback(err, null);
    }

    // Checking for debug
    // console.log("Result: ", result.rows)

    // Now let the callback function know we're done
    callback(null, result.rows);
  }) // end of query
} // end of function