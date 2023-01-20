const result = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.querySelector('.clear-button');
const equalsButton = document.querySelector('.equals-button');
const decimalButton = document.querySelector('.decimal-button');
const zeroButton = document.querySelector('.zero-button');
const changeSignsButton = document.querySelector('.change-sign-button');
const buttons = document.querySelectorAll('.button');

const MAX_LENGTH = 10;
const OPERATORS = new Set(['+', '-', '÷', '×']);
const NUMBERS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

let leftNumber = null;
let currentOperator = null;
let rightNumber = null;

let lastAnswer = null;

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		button.classList.add('pressed');
		setTimeout(() => button.classList.remove('pressed'), 150);
	});
});

equalsButton.addEventListener('click', () => {
	rightNumber = parseFloat(result.value.trim());
	console.log(`${leftNumber} ${currentOperator} ${rightNumber}`);
	operate(currentOperator, leftNumber, rightNumber);
	currentOperator = null;
	resetActiveOperators();
});

operatorButtons.forEach((operator) => {
	operator.addEventListener('click', () => {
		setOperatorActive(operator.textContent);
		leftNumber = parseFloat(result.value.trim());
		currentOperator = operator.textContent;
	});
});

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
	currentOperator = null;
	lastAnswer = null;
	resetActiveOperators();
});

decimalButton.addEventListener('click', () => {
	if (!result.value.includes('.') && result.value.length <= MAX_LENGTH) {
		result.value += '.';
	}
});

zeroButton.addEventListener('click', () => {
	if (currentOperator !== null) {
		result.value = '0';
	} else if (result.value.trim() !== '0' && result.value.length <= MAX_LENGTH) {
		result.value += '0';
	}
});

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		let currText = result.value.trim();
		resetActiveOperators();
		console.log(currentOperator);
		if (currText === '0' || currentOperator !== null || lastAnswer !== null) {
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

function setOperatorActive(operator) {
	operatorButtons.forEach((button) => {
		if (operator === button.textContent) {
			button.classList.add('active');
		} else {
			button.classList.remove('active');
		}
	});
}

function resetActiveOperators() {
	operatorButtons.forEach((button) => {
		button.classList.remove('active');
	});
}

function operate(operator, leftTerm, rightTerm) {
	let answer = 0;
	console.log(`${leftTerm} ${operator} ${rightTerm}`);
	switch (operator) {
		case '×':
			answer = leftTerm * rightTerm;
			break;
		case '÷':
			if (rightTerm === 0) {
				result.value = `Can't do that`;
				return;
			}
			answer = leftTerm / rightTerm;
			break;
		case '+':
			answer = leftTerm * rightTerm;
			break;
		case '-':
			answer = leftTerm - rightTerm;
			break;
		default:
			return;
	}
	answer = parseFloat(answer).toLocaleString('en-US', {
		maximumFractionDigits:
			MAX_LENGTH - answer.toString().split('.')[0].length - 1,
		minimumFractionDigits: 0,
	});
	lastAnswer = answer;
	result.value = answer;
}
