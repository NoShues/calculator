// Display and state variables
const display = document.getElementById('display');
let currentInput = '';
let firstNumber = '';
let operator = '';
let secondNumber = '';

// Basic math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Error: Division by 0";
    return a / b;
}

// Operate function
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

// Update display
function updateDisplay(value) {
    display.textContent = value;
}

// Clear everything
function clearCalculator() {
    currentInput = '';
    firstNumber = '';
    operator = '';
    secondNumber = '';
    updateDisplay('0');
}

// Handle number buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput.length < 15) {
            currentInput += button.textContent;
            updateDisplay(currentInput);
        }
    });
});

// Handle operator buttons
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (firstNumber === '' && currentInput !== '') {
            firstNumber = currentInput;
            operator = button.textContent;
            currentInput = '';
        } else if (firstNumber !== '' && currentInput !== '') {
            secondNumber = currentInput;
            firstNumber = operate(operator, firstNumber, secondNumber);
            operator = button.textContent;
            currentInput = '';
            updateDisplay(firstNumber);
        }
    });
});

// Handle equals button
document.getElementById('equals').addEventListener('click', () => {
    if (firstNumber !== '' && operator !== '' && currentInput !== '') {
        secondNumber = currentInput;
        const result = operate(operator, firstNumber, secondNumber);
        updateDisplay(result);
        firstNumber = result;
        currentInput = '';
    }
});

// Handle clear button
document.getElementById('clear').addEventListener('click', clearCalculator);

// Handle decimal button
document.getElementById('decimal').addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key)) {
        // Numbers
        currentInput += key;
        updateDisplay(currentInput);
    } else if (['+', '-', '*', '/'].includes(key)) {
        // Operators
        if (firstNumber === '') {
            firstNumber = currentInput;
            operator = key;
            currentInput = '';
        }
    } else if (key === 'Enter' || key === '=') {
        // Equals
        if (firstNumber !== '' && operator !== '' && currentInput !== '') {
            secondNumber = currentInput;
            const result = operate(operator, firstNumber, secondNumber);
            updateDisplay(result);
            firstNumber = result;
            currentInput = '';
        }
    } else if (key === 'Backspace') {
        // Backspace
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    } else if (key === 'c' || key === 'C') {
        // Clear
        clearCalculator();
    }
});
