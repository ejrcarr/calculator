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

const MAX_LENGTH = 9;
const OPERATIONS = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'÷': (a, b) => {
		if (b !== 0) {
			return a / b;
		}
		return null;
	},
	'×': (a, b) => a * b,
	'%': (a, b) => a / b,
};

let equation = {
	left: null,
	operator: null,
	right: null,
};

let currentSide = 'left';
let lastAnswer = null;

initializeNumberButtonsFunction();
initializeButtonClickEffects();
initializeOperatorFunctions();
equalsButton.addEventListener('click', handleEquals);
clearButton.addEventListener('click', handleClear);
decimalButton.addEventListener('click', handleDecimalButton);
zeroButton.addEventListener('click', handleZeroButton);
changeSignsButton.addEventListener('click', handleChangeSigns);
percentButton.addEventListener('click', handlePercentButtion);

function initializeButtonClickEffects() {
	buttons.forEach((button) => {
		button.addEventListener('click', addOnClickEffect);
	});
}

function addOnClickEffect() {
	this.classList.add('pressed');
	setTimeout(() => this.classList.remove('pressed'), 200);
}

function handlePercentButtion() {
	operate(percentButton.textContent, getCurrentResult(), 100);
}

function handleEquals() {
	equation.right = getCurrentResult();
	operate(equation.operator, equation.left, equation.right);
	resetEquation();
}

function resetEquation() {
	equation.left = null;
	equation.operator = null;
	equation.right = null;
	currentSide = 'left';
	resetActiveOperators();
}

function getCurrentResult() {
	return Number(result.value.replace(',', ''));
}

function initializeOperatorFunctions() {
	operatorButtons.forEach((operator) => {
		operator.addEventListener('click', handleOperatorButtons);
	});
}

function handleOperatorButtons() {
	setOperatorActive(this.textContent);
	if (equation.right !== null) {
		lastAnswer = operate(equation.operator, equation.left, equation.right);
		equation.left = lastAnswer;
		equation.right = null;
	} else {
		equation.left = getCurrentResult();
	}
	equation.operator = this.textContent;
	currentSide = 'right';
}

function handleChangeSigns() {
	let trimmedContent = result.value.trim();
	if (equation.operator !== null && equation.right === null) {
		result.value = '-0';
	} else if (trimmedContent && trimmedContent.charAt(0) !== '-') {
		result.value = '-' + result.value;
	} else {
		result.value = result.value.substring(1);
	}
	equation[currentSide] = getCurrentResult();
}

function handleClear() {
	result.value = '0';
	if (this.textContent === 'C') {
		equation.right = null;
		this.textContent = 'AC';
		setOperatorActive(equation.operator);
	} else {
		lastAnswer = null;
		resetEquation();
		resetActiveOperators();
	}
}

function handleDecimalButton() {
	if (equation[currentSide] == '-0') {
		result.value = '-0' + this.textContent;
	} else if (equation[currentSide] === null) {
		result.value = '0.';
	} else if (!result.value.includes('.') && result.value.length <= MAX_LENGTH) {
		result.value += '.';
	}
	equation[currentSide] = getCurrentResult();
}

function handleZeroButton() {
	if (equation[currentSide] === null || equation[currentSide] === '0') {
		result.value = '0';
	} else if (
		result.value.trim() !== '0' &&
		result.value.length <= MAX_LENGTH &&
		!result.value.includes('e')
	) {
		clearButton.textContent = 'C';
		result.value += '0';
	} else if (result.value.length > MAX_LENGTH || result.value.includes('e')) {
		result.value = getCurrentResult() + '0';
		result.value = new Intl.NumberFormat(undefined, {
			notation: 'scientific',
		})
			.format(getCurrentResult())
			.replace('E', 'e');
	}
	equation[currentSide] = getCurrentResult();
}

function initializeNumberButtonsFunction() {
	numberButtons.forEach((button) => {
		button.addEventListener('click', handleNumberButton);
	});
}

function handleNumberButton() {
	resetActiveOperators();
	clearButton.textContent = 'C';
	if (result.value == '-0' && result.value === '-0.') {
		result.value = '-' + this.textContent;
	} else if (
		equation[currentSide] === null ||
		(result.value == '0' && result.value != '0.')
	) {
		result.value = this.textContent;
	} else if (result.value.length <= MAX_LENGTH && !result.value.includes('e')) {
		result.value += this.textContent;
	} else if (result.value.length > MAX_LENGTH || result.value.includes('e')) {
		result.value = getCurrentResult() + this.textContent;
		result.value = new Intl.NumberFormat(undefined, {
			notation: 'scientific',
		})
			.format(getCurrentResult())
			.replace('E', 'e');
		console.log('in this if');
	}
	console.log(result.value);
	console.log(getCurrentResult());
	// result.value = getStringVersion(getCurrentResult());
	equation[currentSide] = getCurrentResult();
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

function getStringVersion(number) {
	console.log(number);
	console.log('getStringFunc');
	if (number.toString().includes(',')) {
		return number.toLocaleString();
	} else {
		return number.toLocaleString('en-US', {
			maximumFractionDigits:
				MAX_LENGTH - number.toString().split('.')[0].length - 1,
			minimumFractionDigits: 0,
		});
	}
}

function operate(operator, leftTerm, rightTerm) {
	if ((leftTerm === null || rightTerm) === null || operator === null) {
		return;
	}
	answer = OPERATIONS[operator](leftTerm, rightTerm);
	console.log(`${leftTerm} ${operator} ${rightTerm} = ${answer}`);
	lastAnswer = answer;
	if (answer === null) {
		result.value = 'Nope';
		return;
	} else if (answer < 0.000001) {
		if (answer.toString().split('E')[0].length > 5) {
			let answerArray = answer.toString().split('e');
			answerArray[0] = Math.round(answerArray[0].substring(0, 3));
			answer = answerArray.join('e');
		}
		result.value = answer;
	} else if (answer > 100000000) {
		let scientificNotation = new Intl.NumberFormat(undefined, {
			notation: 'scientific',
		}).format(answer);
		result.value = scientificNotation.replace('E', 'e');
	} else {
		result.value = getStringVersion(answer);
	}
	return answer;
}
