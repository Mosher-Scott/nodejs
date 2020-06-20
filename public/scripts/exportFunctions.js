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
            case "first-class-flat-rate-envelope":
                shipTotal = methods.calculateFirstClassFlatPrices(weight);
                break;
            case "first-class-package":
                shipTotal = methods.calculateFirstClassPackageRates(weight);
                break;
            default:
                shipTotal = "invalid";
                break;
        }

        // Now configure the shipping method names that are returned.  First remove the dash and replace it with a space
        var method = method.split("-").join(" ");

        // use a regular expression to capitalize the first letter of each word
        var method = method.replace(/(^\w|\s\w)/g, m => m.toUpperCase());

        // Create our JSON for returning the values
        const result = {shipMethod: method, packageWeight: weight, total: shipTotal};

        console.log(result);
        // Render the results for the page we want it to go to
        response.render('pages/postalEstimate.ejs', result);
    },

    
    // Handles calculating the package rates
    calculateFirstClassPackageRates: function(weight) {
        var shipTotal = 0;
    
        if (weight <= 4) {
            shipTotal = 3.80;
        } else if (weight >= 5 && weight <=8) {
            shipTotal = 4.60;
        } else if (weight >= 9 && weight <=12) {
            shipTotal = 5.30;
        } else if (weight == 13) {
            shipTotal = 5.90;
        } else if (weight > 13) {
            shipTotal = "Invalid Weight";
        }

        console.log("Ship total: ", shipTotal);
    
        return shipTotal;
    },
    
    // Will handle the actual calculation of the flat rate envelope pricing
    calculateFirstClassFlatPrices: function(weight) {
       console.log("Weight: ", weight);
        if (weight > 13) {
            return "Invalid Weight";
        } else {
            // Create an object with the weight as the key
            var firstClassEnvFlatPrices = {
                1: 1.00,
                2: 1.20,
                3: 1.40,
                4: 1.60,
                5: 1.80,
                6: 2.00,
                7: 2.20,
                8: 2.40,
                9: 2.60,
                10: 2.80,
                11: 3.00,
                12: 3.20,
                13: 3.40
            }

            // Want to make sure the values have 2 spaces before the period
            return parseFloat(firstClassEnvFlatPrices[weight]).toFixed(2);
        }
        
    }
}

exports.data = methods;