
// Functions to export
var queries = {
    // getClientDetails: function (request, response) {

    //     // testing
    //     // console.log("ID: ", request.body.id);
    //     const id = request.body.id;
      
    //     // Helper function
    //     getSingleClientFromDb(id, function(error, result) {
    //       if (error || result == null) {
            
    //         response.status(500).json({success:false, data:error});
    //       } else {
    //         const person = result[0];
      
    //         console.log(person);
      
    //         // If person is null, there are no results.  Need to handle it
    //         if(person == null) {
    //           console.log("No results")
    //           response.status(404);
              
    //         } else {
    //             // Set the header for the response
    //             response.status(200);
      
    //             // Now display this page with the following data
    //             response.render('pages/clientDetails.ejs', person);
    //         }
    //       }
    //     }); // End of helper function
    //   }

}

exports.data = queries;