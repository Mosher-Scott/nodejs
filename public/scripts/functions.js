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

// Function to take JSON data and display it on the page
function getAllClients() {
    var request = new XMLHttpRequest();

    request.open('GET', '/allClients',true);
    request.responseType = 'json';

    request.send();

    request.onload = function() {
        var data = request.response;

        console.log(data);

        createClientTable(data);
    }
}

// Gets client details
function getClientDetails(id) {
    var request = new XMLHttpRequest();

    var url = '/clientDetails?id=' + id;

    request.open('GET', url ,true);
    request.responseType = 'json';

    request.send();

    request.onload = function() {
        var data = request.response;

        console.log(data);

        showClientDetails(data);
    }

}

function removeDataFromClients() {
     // The div that contains all the responses
     var baseDiv = document.querySelector('#response');
    baseDiv.textContent = '';
}

// Creates a table with client details
function showClientDetails(data){
    console.log(data);
}

// Creates a table displaying data for all clients
function createClientTable(data) {

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

        // Details Button
        var id = data[i].id;
        var details = document.createElement('td');
        var span = document.createElement('span');
        span.innerHTML = "<button id='button" + id + "' class='btn btn-primary btn-sm' onclick='getClientDetails(" + id + ")' ?>Details</button>";
        //var viewDetails = document.createElement('button');

        // viewDetails.classList = "btn btn-primary btn-sm";
        // viewDetails.textContent = "Details";
        details.appendChild(span);
        tr.appendChild(details);

        // Delete Button
        var deletething = document.createElement('td');
        var deleteSpan = document.createElement('span');
        deleteSpan.innerHTML = "<button id='button" + id + "' class='btn btn-primary btn-sm' onclick='deleteClient(" + id + ")' ?>Delete</button>";
        deletething.appendChild(deleteSpan);
        tr.appendChild(deletething);

        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    baseDiv.appendChild(table);

}


function deleteClient(id) {
    alert("Delete: " + id);
}

