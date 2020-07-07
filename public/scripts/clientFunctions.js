// Creates a form with client details
function addClientForm(sessions){
    
    // Get the H1 tag and change the text
    var title = document.getElementById('pageTitle');
    title.textContent = 'Add New Client';

    // Change the browser tab text
    var pageTitle = document.getElementById('browserTabName')
    pageTitle.textContent = 'Add New Client';

    // Change the "View All" button text
    changeViewAllClientButton('Back');

    // Remove the content already there
    removeDataFromClients();

    // console.log(data);
    var baseDiv = document.querySelector('#response');

    // Now create the form
    var form = document.createElement('form');
    form.method = "POST";
    form.action = "\\clientDetails";

    // First Name Section
    var firstNameDiv = document.createElement("div");
    firstNameDiv.classList.add("form-group");

    var firstNameLabel = document.createElement("label");
    firstNameLabel.setAttribute("for", "firstName");
    firstNameLabel.textContent = "First Name";

    var firstNameInput = document.createElement("input");
    firstNameInput.type = "text";
    firstNameInput.classList.add("form-control");
    firstNameInput.name = "firstNameInput";
    firstNameInput.required = "required";

    firstNameDiv.appendChild(firstNameLabel);
    firstNameDiv.appendChild(firstNameInput);
    form.appendChild(firstNameDiv);

    // Last Name Section
    var lastNameDiv = document.createElement("div");
    lastNameDiv.classList.add("form-group");

    var lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "lastName");
    lastNameLabel.textContent = "Last Name";

    var lastNameInput = document.createElement("input");
    lastNameInput.type = "text";
    lastNameInput.classList.add("form-control");
    lastNameInput.name = "lastNameInput";
    lastNameInput.required = "required";

    lastNameDiv.appendChild(lastNameLabel);
    lastNameDiv.appendChild(lastNameInput);
    form.appendChild(lastNameDiv);

    // Phone Input
    var phoneDiv = document.createElement("div");
    phoneDiv.classList.add("form-group");

    var phoneLabel = document.createElement("label");
    phoneLabel.setAttribute("for", "phone");
    phoneLabel.textContent = "Phone";

    var phoneInput = document.createElement("input");
    phoneInput.type = "text";
    phoneInput.classList.add("form-control");
    phoneInput.name = "phoneInput";
    phoneInput.required = "required";

    phoneDiv.appendChild(phoneLabel);
    phoneDiv.appendChild(phoneInput);
    form.appendChild(phoneDiv);

    var emailDiv = document.createElement("div");
    emailDiv.classList.add("form-group");

    var emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "email");
    emailLabel.textContent = "Email";

    var emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.classList.add("form-control");
    emailInput.name = "emailInput";

    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);
    form.appendChild(emailDiv);

    // Create the checkboxes for the training sessions
    console.log(sessions);
    var trainingSessionBoxes = document.createElement('div');
    trainingSessionBoxes.classList.add("form-group");
    
    for(var i = 0; i < sessions.length; i++) {

        console.log(sessions[i].id);
        var trainingSessionCheckBoxes = document.createElement('div');
        trainingSessionCheckBoxes.classList.add("form-check");

        var checkbox = document.createElement("input");
        checkbox.classList.add("form-check-input");
        checkbox.type = "checkbox";
        checkbox.value = sessions[i].id;
        checkbox.id = "session" + i;
        checkbox.name = "sessionExercises";

        var checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("form-check-label");
        checkboxLabel.textContent = sessions[i].sessionname;

        trainingSessionCheckBoxes.appendChild(checkbox);
        trainingSessionCheckBoxes.appendChild(checkboxLabel);

        trainingSessionBoxes.appendChild(trainingSessionCheckBoxes);
    };

    form.appendChild(trainingSessionBoxes);

    // Submit button
    var submitButton = document.createElement('button');
    submitButton.value = "submit";
    submitButton.classList.add("btn");
    submitButton.classList.add("btn-primary");
    submitButton.textContent = "Submit";
    form.appendChild(submitButton);
    baseDiv.appendChild(form);

}

// Creates a form with client details
function editClientForm(data){

    // Get the H1 tag and change the text
    var title = document.getElementById('pageTitle');
    title.textContent = 'Edit Client';

    // Change the browser tab text
    var pageTitle = document.getElementById('browserTabName')
    pageTitle.textContent = 'Edit Client';

    // Change the "View All" button text
    changeViewAllClientButton('Back');

    // Remove the content already there
    removeDataFromClients();

    // console.log(data);
    var baseDiv = document.querySelector('#response');

    // Now create the form.  Send it as a PUT request
    var form = document.createElement('form');
    form.method = "POST";
    form.action = "\\editClientDetails";

    var id = document.createElement("input");
    id.type = "hidden";
    id.name = "id";
    id.value = data.id;
    form.append(id);

    // First Name Section
    var firstNameDiv = document.createElement("div");
    firstNameDiv.classList.add("form-group");

    var firstNameLabel = document.createElement("label");
    firstNameLabel.setAttribute("for", "firstName");
    firstNameLabel.textContent = "First Name";

    var firstNameInput = document.createElement("input");
    firstNameInput.type = "text";
    firstNameInput.classList.add("form-control");
    firstNameInput.name = "firstNameInput";
    firstNameInput.required = "required";
    firstNameInput.value = data.first_name;

    firstNameDiv.appendChild(firstNameLabel);
    firstNameDiv.appendChild(firstNameInput);
    form.appendChild(firstNameDiv);

    // Last Name Section
    var lastNameDiv = document.createElement("div");
    lastNameDiv.classList.add("form-group");

    var lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "lastName");
    lastNameLabel.textContent = "Last Name";

    var lastNameInput = document.createElement("input");
    lastNameInput.type = "text";
    lastNameInput.classList.add("form-control");
    lastNameInput.name = "lastNameInput";
    lastNameInput.required = "required";
    lastNameInput.value = data.last_name;

    lastNameDiv.appendChild(lastNameLabel);
    lastNameDiv.appendChild(lastNameInput);
    form.appendChild(lastNameDiv);

    // Phone Input
    var phoneDiv = document.createElement("div");
    phoneDiv.classList.add("form-group");

    var phoneLabel = document.createElement("label");
    phoneLabel.setAttribute("for", "phone");
    phoneLabel.textContent = "Phone";

    var phoneInput = document.createElement("input");
    phoneInput.type = "text";
    phoneInput.classList.add("form-control");
    phoneInput.name = "phoneInput";
    phoneInput.required = "required";
    phoneInput.value = data.phone;

    phoneDiv.appendChild(phoneLabel);
    phoneDiv.appendChild(phoneInput);
    form.appendChild(phoneDiv);

    var emailDiv = document.createElement("div");
    emailDiv.classList.add("form-group");

    var emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "email");
    emailLabel.textContent = "Email";

    var emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.classList.add("form-control");
    emailInput.name = "emailInput";
    emailInput.value = data.email;

    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);
    form.appendChild(emailDiv);

    baseDiv.appendChild(form);

    // Create the checkboxes
    createEditFormSessionCheckboxes(form, data.id, baseDiv);
}

// Created the checkboxes for the 
function createEditFormSessionCheckboxes(form, id, baseDiv) {
    // Create the checkboxes for the training sessions
    var trainingSessionBoxes = document.createElement('div');
    trainingSessionBoxes.classList.add("form-group");

    // Holds training session data for the client
    var sessions = [];

    // Now get the session data
    var sessionRequest = new XMLHttpRequest();

    var url = '/alltrainingsessions';
    
    //console.log(url);
    sessionRequest.open('GET', url ,true);
    sessionRequest.responseType = 'json';

    sessionRequest.send();
    // console.log(request.status);

    sessionRequest.onload = function() {
        sessions = sessionRequest.response;

        //console.log(sessions);

        for(var i = 0; i < sessions.length; i++) {

            var trainingSessionCheckBoxes = document.createElement('div');
            trainingSessionCheckBoxes.classList.add("form-check");
    
            var checkbox = document.createElement("input");
            checkbox.classList.add("form-check-input");
            checkbox.type = "checkbox";
            checkbox.value = sessions[i].id;
            checkbox.id = "session" + sessions[i].id;
            checkbox.name = "sessionExercises";
    
            var checkboxLabel = document.createElement("label");
            checkboxLabel.classList.add("form-check-label");
            checkboxLabel.textContent = sessions[i].sessionname;
    
            trainingSessionCheckBoxes.appendChild(checkbox);
            trainingSessionCheckBoxes.appendChild(checkboxLabel);
    
            trainingSessionBoxes.appendChild(trainingSessionCheckBoxes);
        }; // End of for loop 
    
        form.appendChild(trainingSessionBoxes);

        // Now check the boxes for sessions assigned to the client
        checkEditFormTrainingSessionBoxes(id, form, baseDiv);
      
    }// End of onload function
}

function checkEditFormTrainingSessionBoxes(id, form, baseDiv) {

    var request = new XMLHttpRequest();

    var url = '/clientTrainingSessions?clientId=' + id;

    //console.log(url);
    
    request.open('GET', url ,true);
    request.responseType = 'json';

    request.send();
    // console.log(request.status);

    request.onload = function() {
        var data = request.response;
        
        // If the user has sessions assigned to them, check the boxes
        if (data != '') {
           // Loop through all the checkboxes and see if the value is in the data array
            for(var i = 0; i < data.length; i++) {
                //console.log("i: ", i);
                //console.log("item: ", data[i].id);
                document.getElementById('session' + data[i].id).checked = true;
            }
        }
        createEditClientSubmitButton(form, baseDiv)
    }
}

function createEditClientSubmitButton(form, baseDiv) {
        // Submit button
        var submitButton = document.createElement('button');
        submitButton.value = "submit";
        submitButton.classList.add("btn");
        submitButton.classList.add("btn-primary");
        submitButton.textContent = "Submit";
        form.appendChild(submitButton);
        baseDiv.appendChild(form);
}