const result = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.querySelector('.clear-button');
const equalsButton = document.querySelector('.equals-button');
const decimalButton = document.querySelector('.decimal-button');
const zeroButton = document.querySelector('.zero-button');
const changeSignsButton = document.querySelector('.change-sign-button');
const buttons = document.querySelectorAll('.button');
const percentButton = document.querySelector('.percent-button');

const MAX_LENGTH = 10;
const OPERATORS = new Set(['+', '-', '÷', '×']);
const NUMBERS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

let equation = {
	left: null,
	operator: null,
	right: null,
};
let currentSide = 'left';
let lastAnswer = null;

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		button.classList.add('pressed');
		setTimeout(() => button.classList.remove('pressed'), 200);
	});
});

percentButton.addEventListener('click', () => {
	result.value = parseFloat(result.value.trim()) / 100;
});

equalsButton.addEventListener('click', () => {
	rightNumber = parseFloat(result.value.trim());
	console.log(`${equation.left} ${equation.operator} ${equation.right}`);
	operate(equation.operator, equation.left, equation.right);
	equation.left = null;
	equation.operator = null;
	equation.right = null;
	currentSide = 'left';
	resetActiveOperators();
});

operatorButtons.forEach((operator) => {
	operator.addEventListener('click', () => {
		setOperatorActive(operator.textContent);
		if (
			equation.left !== null &&
			equation.operator !== null &&
			equation.right !== null
		) {
			equation.left = operate(equation.operator, equation.left, equation.right);
			equation.right = null;
		} else if (equation.left === null) {
			equation.left = lastAnswer;
		} else {
			leftNumber = parseFloat(result.value.trim().replace(',', ''));
			equation.left = leftNumber;
		}
		equation.operator = operator.textContent;
		currentSide = 'right';
	});
});

changeSignsButton.addEventListener('click', () => {
	let trimmedContent = result.value.trim();
	if (trimmedContent && trimmedContent.charAt(0) !== '-') {
		result.value = '-' + result.value;
		equation[currentSide] = result.value;
	} else {
		result.value = result.value.substring(1);
		equation[currentSide] = result.value;
	}
});

clearButton.addEventListener('click', () => {
	result.value = '0';
	equation.left = null;
	equation.operator = null;
	equation.right = null;
	lastAnswer = null;
	currentSide = 'left';
	resetActiveOperators();
});

decimalButton.addEventListener('click', () => {
	if (lastAnswer !== null) {
		result.value = '0.';
		lastAnswer = null;
	} else if (!result.value.includes('.') && result.value.length <= MAX_LENGTH) {
		result.value += '.';
	}
});

zeroButton.addEventListener('click', () => {
	if (lastAnswer !== null) {
		result.value = '0';
		lastAnswer = null;
	} else if (equation.operator !== null) {
		result.value = '0';
		equation.left = 'null';
	} else if (result.value.trim() !== '0' && result.value.length <= MAX_LENGTH) {
		result.value += '0';
	}
});

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		resetActiveOperators();
		console.log(equation);
		if (equation[currentSide] === null || equation[currentSide] === '0') {
			result.value = button.textContent;
		} else if (result.value.length <= MAX_LENGTH) {
			result.value += button.textContent;
		}
		equation[currentSide] = result.value;
	});
});

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
	leftTerm = parseFloat(leftTerm);
	rightTerm = parseFloat(rightTerm);
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
			answer = leftTerm + rightTerm;
			break;
		case '-':
			answer = leftTerm - rightTerm;
			break;
		default:
			return;
	}

	lastAnswer = answer;
	result.value = answer.toLocaleString('en-US', {
		maximumFractionDigits:
			MAX_LENGTH - answer.toString().split('.')[0].length - 1,
		minimumFractionDigits: 0,
	});
	console.log(answer);
	return answer;
}
