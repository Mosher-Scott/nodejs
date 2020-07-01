
function getInfo() {

    var numberOne = document.getElementById("numOneInput").value;
    var numberTwo = document.getElementById("numTwoInput").value;
    var operator = document.getElementById("operator").value;

    var result = performMathOperations(operator, numberOne, numberTwo);

    console.log(numberOne, operator, numberTwo, "=", result);

    document.getElementById("answer").innerHTML = result;

}

// Does the heavy work of doing the math operations
function performMathOperations (operator, numOne, numTwo) {
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



// Change the text of the "All Clients" button
function changeViewAllClientButton(text)
 {
    var button = document.getElementById('viewAllClientButton');
    button.textContent = text;
 }

// Removes all child elements from the response div
function removeDataFromClients() {
     // The div that contains all the responses
     var baseDiv = document.querySelector('#response');
    baseDiv.textContent = '';
}

// Creates a table with client details
function showClientDetails(data){
    
    // Get the H1 tag and change the text
    var title = document.getElementById('pageTitle');
    title.textContent = 'Client Info For ' + data.first_name + " " + data.last_name;

    // Change the browser tab text
    var pageTitle = document.getElementById('browserTabName')
    pageTitle.textContent = 'Client Info';

    // Change the "View All" button text
    changeViewAllClientButton('Back');

    // Remove the content already there
    removeDataFromClients();

    // console.log(data);
    var baseDiv = document.querySelector('#response');

    var table = document.createElement('table');
    table.classList=('table table-striped')
    table.id = "clientList";
    var thead = document.createElement('thead');

    // Now create the row & headers
    var thr = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.classList.add("scope='col'");
    th1.textContent = "ID";

    var th2 = document.createElement('th');
    th2.classList.add("scope='col'");
    th2.textContent = "First Name";

    var th3 = document.createElement('th');
    th3.classList.add("scope='col'");
    th3.textContent = "Last Name";

    var th4 = document.createElement('th');
    th4.classList.add("scope='col'");
    th4.textContent = "Phone";

    var th5 = document.createElement('th');
    th5.classList.add("scope='col'");
    th5.textContent = "Email";``

    var th6 = document.createElement('th');
    th6.classList.add("scope='colgroup'");
    th6.classList.add('colspan="2"');
    th6.textContent = "Options";

    thr.appendChild(th1);
    thr.appendChild(th2);
    thr.appendChild(th3);
    thr.appendChild(th4);
    thr.appendChild(th5);
    thr.appendChild(th6);
    thead.appendChild(thr);

    var tbody = document.createElement('tbody');

    var tr = document.createElement('tr');

    // ID row
    var id = document.createElement('td');
    id.textContent = data.id;
    tr.appendChild(id);

    // First name
    var first_name = document.createElement('td');
    first_name.textContent = data.first_name;
    tr.appendChild(first_name);

    // First name
    var last_name = document.createElement('td');
    last_name.textContent = data.last_name;
    tr.appendChild(last_name);

    // First name
    var phone = document.createElement('td');
    phone.textContent = data.phone;
    tr.appendChild(phone);

    // Email
    var email = document.createElement('td');
    email.textContent = data.email;
    tr.appendChild(email);

    // TODO: Edit Options so they work
    // Details Button
    var id = data.id;
    var details = document.createElement('td');
    var span = document.createElement('span');
    span.innerHTML = "<button id='button" + id + "' class='btn btn-primary btn-sm' onclick='editClient(" + id + ")' ?>Edit</button>";
    //var viewDetails = document.createElement('button');

    // viewDetails.classList = "btn btn-primary btn-sm";
    // viewDetails.textContent = "Details";
    details.appendChild(span);
    tr.appendChild(details);

    // Delete Button
    var deletething = document.createElement('td');
    var deleteSpan = document.createElement('span');
    deleteSpan.innerHTML = "<button id='button" + id + "' class='btn btn-danger btn-sm' onclick='deleteClient(" + id + ")' ?>Delete</button>";
    deletething.appendChild(deleteSpan);
    tr.appendChild(deletething);

    tbody.appendChild(tr);

    table.appendChild(thead);
    table.appendChild(tbody);

    baseDiv.appendChild(table);
}

//
function resetClientPageTitle(text) {
    // Get the H1 tag and change the text back
    var title = document.getElementById('pageTitle');
    title.textContent = text;

    var pageTitle = document.getElementById('browserTabName')
    pageTitle.textContent = text;
}

// Create div & table for displaying exercises for a training session. TESTING USING A POPUP
function createExercisesSection(data) {
    // Get the top level div
    var baseDiv = document.querySelector('#response');

    // Create the modal div
    var modalTop = document.createElement("div");
    modalTop.id = 'myModal';
    modalTop.classList.add("modal");

    var modalContent = document.createElement("div");
    modalContent.classList.add('modal-content');

    // Close button
    var closeButtonTop = document.createElement("span");
    closeButtonTop.classList.add("close");
    closeButtonTop.textContent = "Close";

    var text = document.createElement('p');
    text.textContent = "Hi there, this is a popup";

    modalContent.appendChild(closeButtonTop);

    modalContent.appendChild(text);

    modalTop.appendChild(modalContent);

    baseDiv.appendChild(modalTop);

}

// Creates a table displaying all exercises in a training session
function createExercisesTable(data) {
    // The div that will contain the table
    var baseDiv = document.querySelector('#response');

    // Remove Exercise div
   // document.getElementById('trainingSessions').innerHTML = '';

    // TODO: Create a div so it can be removed when a different workout is chosen

    // Create a title for this section
    var sectionTitle = document.createElement('h3');
    sectionTitle.textContent = "Exercises";

    baseDiv.appendChild(document.createElement('hr'));
    baseDiv.appendChild(sectionTitle);

    if (data.length == 0) {
        var info = document.createElement("h4");
        info.textContent = "No Workouts in Training Session";
        baseDiv.appendChild(info);
    } else {
        var table = document.createElement('table');
        table.classList=('table table-striped table-responsive')
        table.id = "exercises";
        var thead = document.createElement('thead');

        // Now create the row & headers
        var thr = document.createElement('tr');
        var th1 = document.createElement('th');
        th1.classList.add("scope='col'");
        th1.textContent = "ID";

        var th2 = document.createElement('th');
        th2.classList.add("scope='col'");
        th2.textContent = "Name";

        var th3 = document.createElement('th');
        th3.classList.add("scope='col'");
        th3.textContent = "Muscle Group";

        thr.appendChild(th1);
        thr.appendChild(th2);
        thr.appendChild(th3);

        // Attach everything to the header of the table
        thead.appendChild(thr);

        var tbody = document.createElement('tbody');

        for(var i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');

            // ID row
            var id = document.createElement('td');
            id.textContent = data[i].id;
            tr.appendChild(id);

            // Name
            var name = document.createElement('td');
            name.textContent = data[i].name;
            tr.appendChild(name);

            // Muscle Group
            var muscleGroup = document.createElement('td');
            muscleGroup.textContent = data[i].musclegroup;
            tr.appendChild(muscleGroup);

            // Instructions
            var instructions = document.createElement('td');
            instructions.textContent = data[i].instructions;
            tr.appendChild(instructions);

            tbody.appendChild(tr);
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        baseDiv.appendChild(table);

    } // End of Else statement
}

// Creates a table displaying data for all clients
function createClientTable(data) {
        
    // Reset the page title & browser tab
    resetClientPageTitle('Clients');

    // Change the button text for viewing all clients
    changeViewAllClientButton('All Clients');

    // Remove all values in the responses div
    removeDataFromClients();

    // The div that will contain the table
    var baseDiv = document.querySelector('#response');

    var table = document.createElement('table');
    table.classList=('table table-striped')
    table.id = "clientList";
    var thead = document.createElement('thead');

    // Now create the row & headers
    var thr = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.classList.add("scope='col'");
    th1.textContent = "ID";

    var th2 = document.createElement('th');
    th2.classList.add("scope='col'");
    th2.textContent = "First Name";

    var th3 = document.createElement('th');
    th3.classList.add("scope='col'");
    th3.textContent = "Last Name";

    var th4 = document.createElement('th');
    th4.classList.add("scope='col'");
    th4.textContent = "Phone";

    var th5 = document.createElement('th');
    th5.classList.add("scope='col'");
    th5.textContent = "Email";

    var th6 = document.createElement('th');
    th6.classList.add("scope='col'");
    th6.textContent = "Options";

    thr.appendChild(th1);
    thr.appendChild(th2);
    thr.appendChild(th3);
    thr.appendChild(th4);
    thr.appendChild(th5);
    thr.appendChild(th6);
    thead.appendChild(thr);

    var tbody = document.createElement('tbody');

    for(var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');

        // ID row
        var id = document.createElement('td');
        id.textContent = data[i].id;
        tr.appendChild(id);

        // First name
        var first_name = document.createElement('td');
        first_name.textContent = data[i].first_name;
        tr.appendChild(first_name);

        // First name
        var last_name = document.createElement('td');
        last_name.textContent = data[i].last_name;
        tr.appendChild(last_name);

        // First name
        var phone = document.createElement('td');
        phone.textContent = data[i].phone;
        tr.appendChild(phone);

        // Email
        var email = document.createElement('td');
        email.textContent = data[i].email;
        tr.appendChild(email);

        // Edit Button
        var id = data[i].id;
        var details = document.createElement('td');
        var span = document.createElement('span');
        span.innerHTML = "<button id='button" + id + "' class='btn btn-primary btn-sm' onclick='displaySingleClientInfo(" + id + ")' ?>Details</button>";
        details.appendChild(span);
        tr.appendChild(details);

        // Delete Button
        var deletething = document.createElement('td');
        var deleteSpan = document.createElement('span');
        deleteSpan.innerHTML = "<button id='button" + id + "' class='btn btn-danger btn-sm' onclick='deleteClient(" + id + ")' ?>Delete</button>";
        deletething.appendChild(deleteSpan);
        tr.appendChild(deletething);

        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    baseDiv.appendChild(table);

}

function displaySingleClientInfo(id) {
    
    // Get the details of the client
    getClientDetails(id);

    // Now attach the training sessions assigned to that client
    getTrainingSessions(id);
}

// Gets the information to be processed for the Edit Client form
function editClient(id) {

    // Run the ajax query
    editClientData(id);
}

// Creates a table containing all the training sessions assigned to a client
function createTrainingSessionTable(data){

    // The div that will contain the table
    var baseDiv = document.querySelector('#response');

    var sessionDiv = document.createElement('div');
    sessionDiv.id = "trainingSessions";

    // Create a title for this section
    var sectionTitle = document.createElement('h3');
    sectionTitle.textContent = "Workout Plans";

    sessionDiv.appendChild(document.createElement('hr'));
    sessionDiv.appendChild(sectionTitle);

    if (data.length == 0) {
        var info = document.createElement("h4");
        info.textContent = "User has no training sessions assigned to them";
        baseDiv.appendChild(info);
    } else {
        var table = document.createElement('table');
        table.classList=('table table-striped')
        table.id = "clientList";
        var thead = document.createElement('thead');

        // Now create the row & headers
        var thr = document.createElement('tr');
        var th1 = document.createElement('th');
        th1.classList.add("scope='col'");
        th1.textContent = "ID";

        var th2 = document.createElement('th');
        th2.classList.add("scope='col'");
        th2.textContent = "Name";

        var th3 = document.createElement('th');
        th3.classList.add("scope='col'");
        th3.textContent = "Reps per Set";

        var th4 = document.createElement('th');
        th4.classList.add("scope='col'");
        th4.textContent = "Description";

        var th5 = document.createElement('th');
        th5.classList.add("id=options");
        th5.classList.add("scope='colgroup'");
        th5.classList.add('colspan="2"');
        th5.textContent = "Options";

        thr.appendChild(th1);
        thr.appendChild(th2);
        thr.appendChild(th3);
        thr.appendChild(th4);
        thr.appendChild(th5);

        // Attach everything to the header of the table
        thead.appendChild(thr);

        var tbody = document.createElement('tbody');

        for(var i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');

            // ID row
            var id = document.createElement('td');
            id.textContent = data[i].id;
            tr.appendChild(id);

            // Name
            var name = document.createElement('td');
            name.textContent = data[i].sessionname;
            tr.appendChild(name);

            // Reps per set
            var repsPerSet = document.createElement('td');
            repsPerSet.textContent = data[i].setreps;
            tr.appendChild(repsPerSet);

            // Description
            var description = document.createElement('td');
            description.textContent = data[i].sessiondescription;
            tr.appendChild(description);

            // Exercises Button
            var id = data[i].id;
            var details = document.createElement('td');
            var span = document.createElement('span');
            //span.innerHTML = "<button id='button" + id + "' class='btn btn-primary btn-sm' onclick='getTrainingSessionExercises(" + id + ")' ?>Exercises</button>"; // TODO: Make this work
            span.innerHTML = '<button type="button" class="btn btn-info btn-sm" id="myBtn" onclick="getTrainingSessionExercises(' + id + ')">View Exercises</button>';
            details.appendChild(span);
            tr.appendChild(details);

            // Delete Button
            var deletething = document.createElement('td');
            var deleteSpan = document.createElement('span');
            deleteSpan.innerHTML = "<button id='button" + id + "' class='btn btn-danger btn-sm' onclick='deleteClient(" + id + ")' ?>Remove</button>"; // TODO: Make this work
            deletething.appendChild(deleteSpan);
            tr.appendChild(deletething);

            tbody.appendChild(tr);
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        sessionDiv.appendChild(table);

        baseDiv.appendChild(sessionDiv);

    } // End of Else statement
}

// Function for editing a client


// TODO: Need to complete this
function deleteClient(id) {
    alert("Delete: " + id);
}

