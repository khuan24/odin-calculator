const displayField = document.querySelector(".display")
const decimalBtn = document.querySelector("#decimal")
const MAX_NUMBER = 9999999999
let firstNumber = 0
let secondNumber = 0
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
        return a/b // will have to round to 10 digits
    }
}

function operate(a, b, operator) {
    // called when =, +, -, ×, or ÷ is pressed
    let result = 0
    switch (operator) {
        case "+": 
            result = add(a,b)
            break
        case "-":
            result = subtract(a,b)
            break;
        case "×":
            result = multiply(a,b)
            break;
        case "÷":
            result = divide(a,b)
    }
    console.log(result)
    result = String(result)

    if (result < MAX_NUMBER && result.length > 10) {
        // NEED TO CHANGE ROUNDING LOGIC
        if (result.charAt(10) > 5) {
            result = result.substring(0, 9) + String(Number(result.charAt(9)) + 1)
        }
        result = result.substring(0, 10)
    }
    // return a result to be displayed
    return result
}

function clear() {
    displayField.textContent = "0"
    firstNumber = 0
    secondNumber = 0
    currentOp = ""
    decimalBtn.disabled = false
}

// listen for numbers to be pressed then display them
const numberList = document.querySelectorAll(".number")
numberList.forEach((button) => {
    button.addEventListener("click", () => {
        if (displayField.textContent.length == 10 && currentOp == "") {
            alert("You cannot enter more than 10 digits.")
        } else {
            if (displayField.textContent == firstNumber && firstNumber !== 0) {
                displayField.textContent = ""
            }
    
            displayField.textContent += button.textContent

            if (displayField.textContent.charAt(0) == "0" && displayField.textContent.length > 1 && !displayField.textContent.includes(".")) {
                displayField.textContent = displayField.textContent.substring(1,2)
            }
    
            if (button.textContent == ".") {
                button.disabled = true
            } 

        }
    })
})

const operatorList = document.querySelectorAll(".operator") 
operatorList.forEach((button) => {
    button.addEventListener(("click"), () => {
        if (currentOp == "") {
            firstNumber = Number(displayField.textContent)
            currentOp = button.textContent
            decimalBtn.disabled = false
        } else if (button.textContent == "=") {
            secondNumber = Number(displayField.textContent)
            displayField.textContent = operate(firstNumber, secondNumber, currentOp)
            currentOp = ""
            secondNumber = 0
        }
        
    })
})

const clearBtn = document.querySelector("#clear") 
clearBtn.addEventListener("click", clear)

// listen for operators to be pressed 

// disable operator buttons when 
// 1) no numbers have been pressed
// 2) an operator has already been pressed

