const displayField = document.querySelector(".display")
const decimalBtn = document.querySelector("#decimal")
const MAX_NUMBER = 99999999
const MAX_LENGTH = 9
let firstNumber = 0
let secondNumber = 0
let currentOp = ""
let resetDisplay = false
let backspaceAccessOn = true

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
        return a/b 
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

    if (result < MAX_NUMBER && result.length > 9) {
        result = String(Number(result).toFixed(8))
        if (result.charAt(MAX_LENGTH) > 5) {
            result = result.substring(0, MAX_LENGTH-1) + String(Number(result.charAt(MAX_LENGTH-1)) + 1)
        }
        result = result.substring(0, MAX_LENGTH)
    } else if (result > MAX_NUMBER) {
        alert("This resulting number is too big. Try another calculation.")
        result = "0"
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
        if (resetDisplay) {
            displayField.textContent = ""
            resetDisplay = false
            backspaceAccessOn = true
        }
        
        if (currentOp == "=") {
            clear()
        }

        displayField.textContent += button.textContent

        if (displayField.textContent.length > MAX_LENGTH) {
            displayField.textContent = displayField.textContent.substring(0, MAX_LENGTH)
            alert("You've reached the maximum limit of digits allowed.")
        }

        if (displayField.textContent.charAt(0) == "0" && displayField.textContent.length > 1 && !displayField.textContent.includes(".")) {
            displayField.textContent = displayField.textContent.substring(1,2)
        }

        if (button.textContent == ".") {
            button.disabled = true
        } 
        
    })
})

const operatorList = document.querySelectorAll(".operator") 
operatorList.forEach((button) => {
    button.addEventListener(("click"), () => {
        if (currentOp == "" || currentOp == "=") {
            firstNumber = Number(displayField.textContent)
            currentOp = button.textContent
            
            decimalBtn.disabled = false
            resetDisplay = true
        } else {
            secondNumber = Number(displayField.textContent)
            displayField.textContent = operate(firstNumber, secondNumber, currentOp)
            
            currentOp = button.textContent
            firstNumber = Number(displayField.textContent)
            secondNumber = 0
            
            decimalBtn.disabled = false
            resetDisplay = true
            backspaceAccessOn = false
        }
        
    })
})

const clearBtn = document.querySelector("#clear") 
clearBtn.addEventListener("click", clear)


const backspaceBtn = document.querySelector("#backspace")
backspaceBtn.addEventListener("click", () => {
    if (displayField.textContent !== "0" && backspaceAccessOn) {
        displayField.textContent = displayField.textContent.substring(0, displayField.textContent.length-1)
    } 

    if (displayField.textContent == "") {
        displayField.textContent = "0"
    }
})

const signBtn = document.querySelector("#sign")
signBtn.addEventListener("click", () => {
    if (displayField.textContent.charAt(0) == "-") {
        displayField.textContent = displayField.textContent.substring(1, MAX_LENGTH)
    } else if (displayField.textContent != "0") {
        displayField.textContent = "-" + displayField.textContent
    }
})

