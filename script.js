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
        return a/b // will have to round to 10 digits
    }
}

function operate(a, b, operator) {
    // called when =, +, -, *, or / is pressed
    const result = 0
    switch (operator) {
        case "+": 
            result = add(a,b)
            break
        case "-":
            result = subtract(a,b)
            break;
        case "*":
            result = multiply(a,b)
            break;
        case "/":
            result = divide(a,b)
    }

    // return a result to be displayed and stored as the next first number
    return result
}

function clear() {
    displayField.textContent = "0"
    currentNumber = 0
    currentOp = ""

    const decimalBtn = document.querySelector("#decimal")
    decimalBtn.disabled = false
    
}

// listen for numbers to be pressed then display them
const numberList = document.querySelectorAll(".number")
numberList.forEach((button) => {
    button.addEventListener("click", () => {
        if (displayField.textContent.length == 10) {
            alert("You cannot enter more than 10 digits.")
        } else {
            if (displayField.textContent == "0") {
                displayField.textContent = ""
            }
    
            displayField.textContent += button.textContent
    
            if (button.textContent == ".") {
                button.disabled = true
            }
        }
    })
})

const clearBtn = document.querySelector("#clear") 
clearBtn.addEventListener("click", clear)

// listen for operators to be pressed 

// disable operator buttons when 
// 1) no numbers have been pressed
// 2) an operator has already been pressed

