

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('calculator-form');
    const resultArea = document.getElementById('result-area');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const value1 = document.getElementById('value1').value;
        const value2 = document.getElementById('value2').value;
        const operation = document.getElementById('operation').value;

        // Validate inputs
        if (value1 === '') {
            resultArea.textContent = 'Value-1 needs to be filled in, please';
            return;
        }
        if (value2 === '') {
            resultArea.textContent = 'Value-2 needs to be filled in, please';
            return;
        }
        if (isNaN(value1) || isNaN(value2)) {
            resultArea.textContent = 'Please enter valid numbers';
            return;
        }

        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);

        // Validate operation
        if (operation === '/' && num2 === 0) {
            resultArea.textContent = 'Cannot divide by zero';
            return;
        }

        let result;
        if (operation === '+') {
            result = num1 + num2;
        } else if (operation === '-') {
            result = num1 - num2;
        } else if (operation === '*') {
            result = num1 * num2;
        } else if (operation === '/') {
            result = num1 / num2;
        } else {
            resultArea.textContent = 'Invalid operation';
            return;
        }

        resultArea.textContent = `Result: ${result}`;
    });
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('mouseover', function () {
            input.style.backgroundColor = '#e0e0e0';
        });
        input.addEventListener('mouseout', function () {
            input.style.backgroundColor = 'white';
        });
    });
});
