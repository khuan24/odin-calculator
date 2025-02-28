const displayField = document.querySelector(".display")
const decimalBtn = document.querySelector("#decimal")

const MAX_NUMBER = 99999999
const MIN_NUMBER = 0.00000001
const MAX_LENGTH = 9

let firstNumber = 0
let secondNumber = 0
let currentOp = ""

let buttonJustPressed = document.querySelector("#clear")
let resetDisplay = false
let modifyAccessOn = true

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
        return "bzzt"
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
    
    result = round(result)
    return result
}

function round(n) {
    n = String(n)
    if ((n > 0 && n < MIN_NUMBER) || (n < 0 && n > -MIN_NUMBER)) {
        alert("The resulting number is too small. Try another calculation.")
        n = "0"
    } else if (n < MAX_NUMBER && n.length > 9) {
        n = String(Number(n).toFixed(8))
        if (n.charAt(MAX_LENGTH) > 5) {
            n = n.substring(0, MAX_LENGTH-1) + String(Number(n.charAt(MAX_LENGTH-1)) + 1)
        }
        n = n.substring(0, MAX_LENGTH)
    } else if (n > MAX_NUMBER) {
        alert("This resulting number is too big. Try another calculation.")
        n = "0"
    } 

    return n
}

function clear() {
    displayField.textContent = "0"
    firstNumber = 0
    secondNumber = 0
    currentOp = ""
    decimalBtn.disabled = false
    buttonJustPressed = document.querySelector("#clear")
}

const numberList = document.querySelectorAll(".number")
numberList.forEach((button) => {
    button.addEventListener("click", () => {
        buttonJustPressed = button

        if (resetDisplay) {
            displayField.textContent = ""
            resetDisplay = false
            modifyAccessOn = true
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

            buttonJustPressed = button
            button.classList.add("activated")
        } else if (buttonJustPressed.classList.contains("operator")) {
            document.querySelector(".activated").classList.remove("activated")
            currentOp = button.textContent
            button.classList.add("activated")
        } else if (buttonJustPressed.classList.contains("number")) {
            secondNumber = Number(displayField.textContent)
            displayField.textContent = operate(firstNumber, secondNumber, currentOp)
            
            currentOp = button.textContent
            buttonJustPressed = button
            
            document.querySelector(".activated").classList.remove("activated")
            if (currentOp != "=") {
                button.classList.add("activated")
            }
            
            firstNumber = Number(displayField.textContent)
            secondNumber = 0
            
            modifyAccessOn = false
        } 
        
        decimalBtn.disabled = false
        resetDisplay = true
    })
})

const clearBtn = document.querySelector("#clear") 
clearBtn.addEventListener("click", clear)


const backspaceBtn = document.querySelector("#backspace")
backspaceBtn.addEventListener("click", () => {
    if (displayField.textContent !== "0" && modifyAccessOn) {
        displayField.textContent = displayField.textContent.substring(0, displayField.textContent.length-1)
    } 

    if (displayField.textContent == "") {
        displayField.textContent = "0"
    }
})

const signBtn = document.querySelector("#sign")
signBtn.addEventListener("click", () => {
    if (modifyAccessOn) {
        if (displayField.textContent.charAt(0) == "-") {
            displayField.textContent = displayField.textContent.substring(1, MAX_LENGTH)
        } else if (displayField.textContent != "0") {
            displayField.textContent = "-" + displayField.textContent
        }
    }
})

const percentBtn = document.querySelector("#percent")
percentBtn.addEventListener("click", () => {
    if (modifyAccessOn && displayField.textContent != "0") {
        displayField.textContent = round(Number(displayField.textContent) / 100)
    }
})

// add keyboard support
document.addEventListener('keydown', (event) => {

    if (event.key == "1") {
        document.querySelector("#one").click()
    } else if (event.key == "2") {
        document.querySelector("#two").click()
    } else if (event.key == "3") {
        document.querySelector("#three").click()
    } else if (event.key == "4") {
        document.querySelector("#four").click()
    } else if (event.key == "5") {
        document.querySelector("#five").click()
    } else if (event.key == "6") {
        document.querySelector("#six").click()
    } else if (event.key == "7") {
        document.querySelector("#seven").click()
    } else if (event.key == "8") {
        document.querySelector("#eight").click()
    } else if (event.key == "9") {
        document.querySelector("#nine").click()
    } else if (event.key == "0") {
        document.querySelector("#zero").click()
    } else if (event.key == "+") {
        document.querySelector("#add").click()
    } else if (event.key == "-") {
        document.querySelector("#subtract").click()
    } else if (event.key == "*") {
        document.querySelector("#multiply").click()
    } else if (event.key == "/") {
        document.querySelector("#divide").click()
    } else if (event.key == ".") {
        document.querySelector("#decimal").click()
    } else if (event.key == "=" || event.key == "Enter") {
        document.querySelector("#equal").click()
    } else if (event.key == "Backspace") {
        document.querySelector("#backspace").click()
    } else if (event.key == "%") {
        document.querySelector("#percent").click()
    } else if (event.key == "c" || event.key == "C") {
        document.querySelector("#clear").click()
    }
})

