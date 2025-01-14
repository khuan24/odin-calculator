const displayField = document.querySelector(".display")
let currentNumber = 0
let currentOp = ""

function add(a, b) {
    return a+b
}

function subtract(a, b) {
    return a-b
}

function multiply(a, b) {
    return a*b
}

function divide(a, b) {
    if (b == 0) {
        displayField.textContent("Undefined, cannot divide by 0")
    } else {
        return a/b // will have to round 
    }
}

function operate(a, b, operator) {
    // called when =, +, -, *, or / is pressed
    const result = 0
    switch (operator) {
        case '+': 
            result = add(a,b)
            break
        case '-':
            result = subtract(a,b)
            break;
        case '*':
            result = multiply(a,b)
            break;
        case '/':
            result = divide(a,b)
    }

    // return a result to be displayed and stored as the next first number
    return result
}

function clear() {
    displayField.textContent = '0'
    currentNumber = 0
}

// listen for user input




