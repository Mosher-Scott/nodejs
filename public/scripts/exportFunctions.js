// These are exported to index.js to be used
var methods = {
    // Does the heavy work of doing the math operations
    performMathOperations: function(operator, numOne, numTwo) {
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
    },

    // Takes the values from the form, 
    getAnswer: function(response, operator, numOne, numTwo) {
        // Run this method to perform the math
        var result = methods.performMathOperations(operator, numOne, numTwo);
    
        // Return a JSON object
        const values = {operationUsed: operator, firstNumber: numOne, secondNumber: numTwo, result: result }
        
        // Now render the results for the EJS page.  Need to pass it the JSON file
        response.render('pages/formSubmission', values);
        },

    // Called when you want to start calculating shipping rates.  Will return the values to the calling page
    calculateRate: function(response, method, weight) {

        var shipTotal = 0;
    
        switch(method) {
            case "flat":
                shipTotal = methods.calculateFirstClassFlatPrices(weight);
                break;
            case "package":
                shipTotal = methods.calculateFirstClassPackageRates(weight);
                break;
            default:
                shipTotal = 0;
                break;
        }

        // Create our JSON for returning the values
        const result = {shipMethod: method, packageWeight: weight, total: shipTotal};

        // Render the results for the page we want it to go to
        response.render('pages/postalEstimate.ejs', result);
    },

    
    // Handles calculating the package rates
    calculateFirstClassPackageRates: function(weight) {
        var shipTotal = 0;
    
        if (weight <= 4) {
            shipTotal = 3.8;
        } else if (weight >= 5 && weight <=8) {
            shipTotal = 4.6;
        } else if (weight >= 9 && weight <=12) {
            shipTotal = 5.3;
        } else if (weight == 13) {
            shipTotal = 5.9;
        }
    
        return shipTotal;
    },
    
    // Will handle the actual calculation of the flat rate envelope pricing
    calculateFirstClassFlatPrices: function(weight) {
    
        // Create an object with the weight as the key
        var firstClassEnvFlatPrices = {
            1: 1,
            2: 1.2,
            3: 1.4,
            4: 1.6,
            5: 1.8,
            6: 2,
            7: 2.2,
            8: 2.4,
            9: 2.6,
            10: 2.8,
            11: 3,
            12: 3.2,
            13: 3.4
        }
    
        return firstClassEnvFlatPrices[weight];
    }
}

exports.data = methods;