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
