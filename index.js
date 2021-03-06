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
const { stringify } = require('querystring');

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

  // get request to get data
  .get('/clientDetails', getClientDetailsJSON)

  // Returns a list of training sessions assigned to a client
  .get('/clientTrainingSessions', getClientTrainingSessionsJSON)

  // Returns a list of training sessions assigned to a client
  .get('/trainingSessionExercises', getTrainingSessionExercisesJSON)

  // Returns a list of all training sessions
  .get('/allTrainingSessions', getAllTrainingSessionsJSON)

  // Homepage for clients
  .get('/clients', (req, res) => res.render('clients', {
    clientInfo: "test"
  }))

  // Post data for adding a new client
  .post('/clientDetails', addNewClient)

  // Post data for adding a new client
  .post('/editClientDetails', editExistingClient)

  // Delete a client from the database
  .post('/deleteClient', deleteClient)

  // Gets all client info 
  .get('/allClients', getAllClientsJSON)
 

  // Testing
  //.get('/singleclient2', (req, res) => res.render('pages/getClientDetails'))
  //.get('/singleClient', getSingleClient)
  //.get('/clientDetails2', getClientDetails)
  // Generic route to take you to the clients page
  //.get('/clients', getAllClients)


  // Set up the homepage when the homepage is requested
  //.get('/', (req, res) => res.sendFile(__dirname + '/views/pages/index.ejs'))
  .get('/', (req, res) => res.render('index') )
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

// Called to get all clients out of the database, and renders the html page
function getAllClientsJSON(request, response) {

  // Helper function
  getAllClientsFromDb(function(error, result) {
    if (error || result == null) {
      
      response.status(500).json({success:false, data:error});
      response.render(error);
    } else {
      const clients = result;

      // If person is null, there are no results.  Need to handle it
      if(clients == null) {
        console.log("No clients found");
        response.status(404);
        response.end();
      }
      //response.status(200).json(person);
     
      // Set the header for the response
      response.status(200);
          
      response.setHeader('Content-Type', 'application/json');
      // Now display this page with the following data
     // response.render('pages/clientDetails.ejs', person);

      response.json(clients);
    }
  }); // End of helper function
}

// Will process new client data & add it to the database
function addNewClient(request, response) {
  console.log(request.body);

  const firstName = request.body.firstNameInput;
  const lastName = request.body.lastNameInput;
  const phone = request.body.phoneInput;
  const email = request.body.emailInput;
  const sessions = request.body.sessionExercises;

  //console.log(firstName, lastName, phone, email);

  // Helper function to insert the data
  insertNewClientIntoDB(firstName, lastName, phone, email, function(error, result) {
    if (error || result == null) {
      response.status(500).json({success:false, data:error});
  } else { // If you successfully inserted the client into the database, now add in the training sessions
    console.log(result.id);
    // Now use another helper function to insert the training sessions into the table
    sessions.forEach(workout => {
      insertTrainingSessionsIntoDbForClient(result.id, workout, function(error, result) {
        if (error || result == null) {
          response.status(500).json({success:false, data:error});
      } else { }
      })
    }); // end of foreach loop

    // Set the header for the response
      response.status(200);
      response.setHeader('Content-Type', 'text/html');

      console.log(result);
      response.redirect('/clients');
    } // End of first else section
  }); // end of helper function
}

// Deletes a client from the database
function deleteClient(request, response) {
  console.log(request.body);

  const clientId = request.body.id;

  // Create the helper function
  deleteClientTrainingSessionsFromDb(clientId, function(error, result)  {
    console.log("Result: ", result);
    if (error || result == null) {
      console.log(`Something went wrong deleting training sessions for client ID ${clientId} from the table`);
      console.log(error);
      response.status(500).json({success:false, data:error});
    } else {
      console.log(`Successfully deleted training sessions assigned to ${clientId}`);
      // Now delete the training sessions from the table
      deleteClientFromDb(clientId, function(error, result) {
        if (error || result == null) {
          console.log(`Something went wrong deleting client ${clientId} the table`);
          console.log(error);
          response.status(500).json({success:false, data:error});
        } else {
           // Set the header for the response
            response.status(200);
            response.setHeader('Content-Type', 'text/html');

            console.log(result);
            response.redirect('/clients');
        }
      })

    }
  })
}

// Function for deleting a client from the client table
function deleteClientFromDb(id, callback) {
  console.log(`Now deleting client ID ${id} from the database`);

  const params = [id];

  const sql = 'DELETE FROM CLIENT WHERE id = $1::int';

  console.log("ID: ", id);

  pool.query(sql, params, function(err, result) {

    if(err) {
      console.log(`an error occurred deleting client ID ${id} from the database`)
      console.log(err)
      callback(err, null);
    }

    console.log("Successfully deleted userID", id, " from the system");
    // Now let the callback function know we're done
    callback(null, 1);

  })
}

// Function for deleting a client from the client table
function deleteClientTrainingSessionsFromDb(id, callback) {
  console.log(`Now deleting training sessions for client ID ${id} from the database`);

  const params = [id];

  const sql = 'DELETE FROM clienttrainingsessions WHERE clientid = $1::int';

  pool.query(sql, params, function(err, result) {

    if(err) {
      console.log("an error occurred")
      console.log(err)
      callback(err, null);
    }

    console.log("Successfully deleted training sessions for userID", id, "from the system");
    // Now let the callback function know we're done
    callback(null, 1);
  })
}

// Will process new client data & add it to the database
function editExistingClient(request, response) {
  //console.log("Request Body: ", request.body);

  const clientId = request.body.id;
  const firstName = request.body.firstNameInput;
  const lastName = request.body.lastNameInput;
  const phone = request.body.phoneInput;
  const email = request.body.emailInput;
  const sessions = request.body.sessionExercises;

  // Helper function to update the data
  editExisingClientInDB(firstName, lastName, phone, email, clientId, function(error, result) {
    if (error || result == null) {
      console.log("Something went wrong updating the table");
      console.log(error);
      response.status(500).json({success:false, data:error});
  } else { // If you successfully updated the client, then now update the training sessions
    //console.log(result.id);

    // Get the sessions assigned to the client
    getClientTrainingSessions(clientId, function(error, result) {
      if (error || result == null) {
        console.log("Something went wrong getting the training sessions");
        response.status(500).json({success:false, data:error});
      } else {

        console.log(sessions);
        // TODO: Convert string to array if typeof(sessions == string), then process it
        console.log(result);

        // Compare the results from the DB query with the form data.  If an element in the dbquery results isn't in the form data array, remove it from the db
        result.forEach(dbQueryResult => {

          var inSessionsArray = false;
          //console.log("\nTop of for forEach");
          //console.log(`231 inSessionsArray = ${inSessionsArray}`);
          //console.log("Query Result ID:", dbQueryResult.id);
          //console.log("Query Result Session ID:", dbQueryResult.sessionid);

            // 1. Now loop through the sessions array and compare values
            for (var i = 0; i < sessions.length; i++) {
              
              //console.log("line 238 sessions[i] value", sessions[i] )
              
              if (sessions[i] == dbQueryResult.sessionid) {
                //console.log(`Match. sessions[i] = ${sessions[i]} is in the database array`);
                inSessionsArray = true;
                console.log(`243 inSessionsArray = ${inSessionsArray}`);
                break;
              } else {
                console.log(`dbQueryResult.sessionid  ${dbQueryResult.sessionid} != session value: ${sessions[i]}`);
              }

              //console.log(`249 inSessionsArray = ${inSessionsArray}`);
              
            } // end of for loop to check the sessions array

            // At the end of checking the sessions array if inSessionsArray still is false, remove dbQueryResult.id from the clienttrainingsession table
            if (inSessionsArray == false) {

              removeTrainingSessionFromClient(dbQueryResult.id, function(error, result) {
                if (error || result == null) {
                  console.log("Something went wrong removing the training session from the table");
                  console.log(error);
                  response.status(500).json({success:false, data:error});
                } else {
                  console.log(`Successfully removed row ${dbQueryResult.id}`)
                }
              }) // end of callback function
              
            } // end of if statement

        }) // End of forEach statement for comparing db and form data

        // Now check if the session ID from the form is already in the database
        sessions.forEach(workout => {
          console.log(`Workout: ${workout}`);
          // 1. If workout (aka sessionID) is in result array, skip it
          for (var j = 0; j < result.length; j++) {
            console.log(`dbQueryResult: ${result[j].sessionid}`);
            
            var isInDb = false;
            // If it exists, break out of the loop
            if(workout == result[j].sessionid) {
              // console.log("match");
              isInDb = true;
              break;
            }
          } // end of for loop

          // 2. If the workout (aka sessionID) is not in the result array, run function to add it to the table.  Will need clientId and workout values
          if (!isInDb) {
            console.log(`Adding workout ${workout} for clientId ${clientId} into database`);

            addTrainingSessionToClient(workout, clientId, function(error, result) {
              if (error || result == null) {
                console.log("Something went wrong adding the training session from the table");
                response.status(500).json({success:false, data:error});
              } else {
                console.log(`Successfully added workout ${workout} to client ${clientId}`);
              }
            }) // end of callback function

          } // end of !isInDb statement
        }); // end of sessions foreach loop
      } // end of else statement
    }); // End getClientTrainingSessions

    // Set the header for the response
      response.status(200);
      response.setHeader('Content-Type', 'text/html');

      //console.log(result);
      response.redirect('/clients');
    } // End of first else section
  }); // end of helper function
}

// Query for updating a user in the database
function editExisingClientInDB(firstName, lastName, phone, email, id, callback) {
  console.log("Now running query to insert a new client");
  
  // Create an array to hold all parameters
  const params = [firstName, lastName, phone, email, id];
  // console.log(params);

  // Use a placeholder for the id
  const sql = "UPDATE CLIENT SET first_name = $1, last_name = $2, phone = $3, email = $4 WHERE id = $5::int";

  // Run the query with parameters
  pool.query(sql, params, function(err, result) {
    // check for error
    if(err) {
      console.log("an error occurred")
      console.log(err)
      callback(err, null);
    }

    console.log("Successfully updated userID", id);
    // Now let the callback function know we're done
    callback(null, result.rowCount);

  }) // end of query
}

// Function for removing a training session from the clienttrainingsessiontable
function removeTrainingSessionFromClient(id, callback) {
  console.log(`Now removing row ${id} from the clientrainingsession table`);

  const params = [id];

  const sql = "DELETE FROM clienttrainingsessions WHERE id = $1::int";

  pool.query(sql, params, function(err, result) {
    if(err) {
      console.log("Crap, something went wrong and couldn't remove the row from the table")
      console.log(err);
      callback(err, null);
    }

    console.log("Successfully removed row: ", id);
    // Now let the callback function know we're done
    callback(null, result.rowCount);

  }) // end of query

}

// Add training session to the client
function addTrainingSessionToClient(workout, id, callback) {
  console.log(`Now removing row ${id} from the clientrainingsession table`);

  const params = [workout, id];

  const sql = " INSERT INTO clienttrainingsessions (sessionid, clientid) VALUES ($1::int, $2::int)";

  pool.query(sql, params, function(err, result) {
    if(err) {
      console.log("Crap, something went wrong and couldn't add the session to the client")
      console.log(err);
      callback(err, null);
    }

    console.log("Successfully add workout: ", workout);
    // Now let the callback function know we're done
    callback(null, result.rowCount);

  }) // end of query
}

// Query to get training session details for a specific client
function getClientTrainingSessions(id, callback) {
  console.log("Now running query to get all training sessions assigned to a client");

  // Use a placeholder for the id
  const sql = "SELECT sessionid, id FROM clienttrainingsessions WHERE clientid = $1::int";

  const params = [id];
  //console.log("getClientTrainingSessionsId = ", id);

  // Run the query with parameters
  pool.query(sql, params, function(err, result) {
    // check for error
    if(err) {
      console.log("an error occurred")
      console.log(err)
      callback(err, null);
    }

    // Checking for debug
    //console.log("Result: ", result.rows)

    // Now let the callback function know we're done
    callback(null, result.rows);
  }) // end of query
} // end of function

// Called to get a single client out of the database
// Processes GET data
function getClientDetailsJSON(request, response) {

  // testing
  // console.log("ID: ", request.body.id);
 // const id = request.body.id; // For post request
  const id = request.query.id;

  // Helper function
  getSingleClientFromDb(id, function(error, result) {
    if (error || result == null) {
      
      response.status(500).json({success:false, data:error});
    } else {
      const person = result[0];

      console.log(person);

      // If person is null, there are no results.  Need to handle it
      if(person == null) {
        console.log("No client found with ID of " + id)
        response.status(404);
        response.end();
        
      } else {
        // Set the header for the response
        response.status(200);
        response.setHeader('Content-Type', 'application/json');
        response.json(person);
      }
    }
  }); // End of helper function
}

// Gets all training sessions assigned to a specific client 
// Processes GET data
function getClientTrainingSessionsJSON(request, response) {

  const id = request.query.clientId;

  // Helper function
  getTrainingSessionDetailsFromDB(id, function(error, result) {
    if (error || result == "undefined") {
      
      response.status(404).json({success:false, data:error});
      response.json("");
    } else {
      const sessions = result;

      // If person is null, there are no results.  Need to handle it
      if(sessions == null) {
        console.log("No training sessions found for client ID" + id)
        response.status(404);
        response.end();
        
      } else {
        // Set the header for the response
        response.status(200);
        response.setHeader('Content-Type', 'application/json');
        response.json(sessions);
      }
    }
  }); // End of helper function
}

function getAllTrainingSessionsJSON(request, response) {

  // Helper function
  getAllTrainingSessionsFromDB(function(error, result) {
    if (error || result == "undefined") {
      
      response.status(404).json({success:false, data:error});
      response.json("");
    } else {
      const sessions = result;

      // If person is null, there are no results.  Need to handle it
      if(sessions == null) {
        console.log("Error, nothing found")
        response.status(404);
        response.end();
        
      } else {
        // Set the header for the response
        response.status(200);
        response.setHeader('Content-Type', 'application/json');
        response.json(sessions);
      }
    }
  }); // End of helper function
}

// Gets all exercises attached to a training session
function getTrainingSessionExercisesJSON(request, response) {

  const sessionId = request.query.sessionId;

  // Helper function
  getTrainingSessionExercisesFromDB(sessionId, function(error, result) {
    if (error || result == "undefined") {
      
      response.status(404).json({success:false, data:error});
      response.json("");
    } else {
      const sessions = result;

      // If person is null, there are no results.  Need to handle it
      if(sessions == null) {
        console.log("No Exercises found for training session with ID: " + sessionId)
        response.status(404);
        response.end();
        
      } else {
        // Set the header for the response
        response.status(200);
        response.setHeader('Content-Type', 'application/json');
        response.json(sessions);
      }
    }
  }); // End of helper function
}

// Called to get all clients out of the database, and renders the html page
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
      response.render('pages/clientsTest',{clientData: clients});
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

// Gets all exercises assigned to a specific training session
function getTrainingSessionExercisesFromDB(id, callback) {
  console.log("Now querying database to find all exercises assigned to training session " + id);

  // Use a placeholder for the id
  const sql = 'SELECT e.id, e.name, e.instructions, mg.name AS "musclegroup" FROM exercises AS e JOIN sessionexercises as se ON se.exerciseid = e.id JOIN trainingsessions AS ts ON ts.id = se.sessionid JOIN musclegroups as mg ON mg.id = e.musclegroup WHERE ts.id = $1::int';

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

// Query the database to get everything from the client table
function getAllClientsFromDb(callback) {
  console.log("Now getting all clients from the DB");

  // Use a placeholder for the id
  const sql = "SELECT * FROM client ORDER BY id ASC";

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

// Query to get client training session details
function getTrainingSessionDetailsFromDB(id, callback) {
  console.log("Now running query to get client training session details");

  // Use a placeholder for the id
  const sql = "SELECT ts.id, ts.sessiondescription, ts.sessionName, ts.setReps FROM trainingsessions AS ts join clienttrainingsessions AS cts ON cts.sessionid = ts.id WHERE cts.clientid = $1::int";

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
    // console.log("Result: ", result.rows)

    // Now let the callback function know we're done
    callback(null, result.rows);
  }) // end of query
} // end of function

// Query to get training session details
function getAllTrainingSessionsFromDB(callback) {
  console.log("Now running query to get all training session");

  // Use a placeholder for the id
  const sql = "SELECT id, sessionname from trainingsessions";

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

// Query for inserting a new user into the database
function insertNewClientIntoDB(firstName, lastName, phone, email, callback) {
  console.log("Now running query to insert a new client");
  
  // Create an array to hold all parameters
  const params = [firstName, lastName, phone, email];

  // Use a placeholder for the id
  const sql = "INSERT INTO client (first_name, last_name, phone, email) VALUES ($1, $2, $3, $4) RETURNING *";

  // Run the query with parameters
  pool.query(sql, params, function(err, result) {
    // check for error
    if(err) {
      console.log("an error occurred")
      console.log(err)
      callback(err, null);
    }

    // Now let the callback function know we're done
    callback(null, result.rows[0]);

  }) // end of query
}

// Query for inserting a new user into the database
function insertTrainingSessionsIntoDbForClient(clientId, sessionId, callback) {
  console.log("Now inserting training session info");
  
  // Create an array to hold all parameters
  const params = [clientId, sessionId];

  // Use a placeholder for the id
  const sql = "INSERT INTO clienttrainingsessions (clientid, sessionid) VALUES ($1, $2) RETURNING *";

  // Run the query with parameters
  pool.query(sql, params, function(err, result) {
    // check for error
    if(err) {
      console.log("an error occurred")
      console.log(err)
      callback(err, null);
    }

    // Now let the callback function know we're done
    callback(null, result.rows[0]);

  }) // end of query
}
