const result = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.querySelector('.clear-button');
const equalsButton = document.querySelector('.equals-button');
const decimalButton = document.querySelector('.decimal-button');
const zeroButton = document.querySelector('.zero-button');
const changeSignsButton = document.querySelector('.change-sign-button');

const MAX_LENGTH = 10;
const OPERATORS = new Set(['+', '-', '÷', 'x']);
const NUMBERS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

changeSignsButton.addEventListener('click', () => {
	let trimmedContent = result.value.trim();
	if (trimmedContent && trimmedContent.charAt(0) !== '-') {
		result.value = '-' + result.value;
	} else {
		result.value = result.value.substring(1);
	}
});

clearButton.addEventListener('click', () => {
	result.value = '0';
});

decimalButton.addEventListener('click', () => {
	if (!result.value.includes('.') && result.value.length <= MAX_LENGTH) {
		result.value += '.';
	}
});

zeroButton.addEventListener('click', () => {
	if (result.value.trim() !== '0' && result.value.length <= MAX_LENGTH) {
		result.value += '0';
	}
});

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		let currText = result.value.trim();
		// let lastCharacter = currText.charAt(result.textContent.length-1);
		if (currText === '0') {
			result.value = button.textContent;
		} else if (result.value.length <= MAX_LENGTH) {
			result.value += button.textContent;
		}

		// if (
		// 	result.value.length > 3 &&
		// 	result.value.trim().charAt(result.value.length - 1) !== '.'
		// ) {
		// 	let resultInteger = parseInt(result.value.replace(',', ''));
		// 	result.value = resultInteger.toLocaleString('en-US');
		// }
	});
});

function isAllNumbers(values) {
	for (const value of values) {
		if (OPERATORS.has(value) || value === ',') {
			return false;
		}
	}
	return true;
}

function operate(operator, leftTerm, rightTerm) {}
