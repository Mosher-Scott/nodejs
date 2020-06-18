function getInfo() {

    var numberOne = document.getElementById("numOneInput").value;
    var numberTwo = document.getElementById("numTwoInput").value;
    var operator = document.getElementById("operator").value;

    var result = performMathOperations(operator, numberOne, numberTwo);

    console.log(numberOne, operator, numberTwo, "=", result);

    document.getElementById("answer").innerHTML = result;

}

