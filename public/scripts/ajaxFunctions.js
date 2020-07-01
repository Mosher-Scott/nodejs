// Gets a list of all clients in the database, and creates a table for them all
function getAllClients() {
    var request = new XMLHttpRequest();

    request.open('GET', '/allClients',true);
    request.responseType = 'json';

    request.send();

    request.onload = function() {
        var data = request.response;

        // console.log(data);

        createClientTable(data);
    }
}

// Request to get details for an individual client
function getClientDetails(id) {
    var request = new XMLHttpRequest();

    var url = '/clientDetails?id=' + id;

    request.open('GET', url ,true);
    request.responseType = 'json';

    request.send();

    request.onload = function() {
        var data = request.response;
        showClientDetails(data);
    }
}

// Request to get all training sessions assigned to a specific client
function getTrainingSessions(id) {

    var request = new XMLHttpRequest();

    var url = '/clientTrainingSessions?clientId=' + id;

    //console.log(url);
    
    request.open('GET', url ,true);
    request.responseType = 'json';

    request.send();
    // console.log(request.status);

    request.onload = function() {
        var data = request.response;

        //console.log(data);

        createTrainingSessionTable(data);
    }
}

// Request to get all training sessions assigned to a specific client
function getTrainingSessionExercises(id) {
    console.log(id);
    var request = new XMLHttpRequest();

    var url = '/trainingSessionExercises?sessionId=' + id;

    console.log(url);
    
    request.open('GET', url ,true);
    request.responseType = 'json';

    request.send();
    console.log(request.status);

    request.onload = function() {
        var data = request.response;

        console.log(data);

        //TODO: Now do something with the data
        // createExercisesSection(data);
        createExercisesTable(data);
    }
}

function addNewClientNeededData() {
    var request = new XMLHttpRequest();

    var url = '/alltrainingsessions';

    console.log(url);
    
    request.open('GET', url ,true);
    request.responseType = 'json';

    request.send();
    // console.log(request.status);

    var data;
    request.onload = function() {
        data = request.response;

        addClientForm(data);
    }
}

// Edit Client Stuff
function editClientData(id){
   // console.log("editclientdata");
    // Get the client data
    var clientDataRequest = new XMLHttpRequest();

    var clientDataUrl = '/clientDetails?id=' + id;

    clientDataRequest.open('GET', clientDataUrl ,true);
    clientDataRequest.responseType = 'json';

    clientDataRequest.send();

    var data;
    clientDataRequest.onload = function() {
        //console.log("request");
        data = clientDataRequest.response;

        editClientForm(data);
    }
}


// Request to get all training sessions for the Edit Client form
function EditClientTrainingSessions(id) {

    var request = new XMLHttpRequest();

    var url = '/clientTrainingSessions?clientId=' + id;

    //console.log(url);
    
    request.open('GET', url ,true);
    request.responseType = 'json';

    request.send();
    // console.log(request.status);

    request.onload = function() {
        var data = request.response;

        //console.log(data);

        createTrainingSessionTable(data);
    }
}