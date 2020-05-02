'use strict';

const startBtn = document.getElementById('start');
const budgetValue = document.getElementsByClassName('budget-value')[0];
const daybudgetValue = document.getElementsByClassName('daybudget-value')[0];
const expensesNameValue = document.getElementsByClassName('expenses-name-value')[0];
const optionalexpensesNameValue = document.getElementsByClassName('optionalexpenses-name-value')[0];
const expensesValue = document.getElementsByClassName('expenses-value')[0];
const optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
const incomeValue = document.getElementsByClassName('income-value')[0];
const incomeNameValue = document.getElementsByClassName('income-name-value')[0];
const monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0];
const yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0];
const dateMain = document.getElementById('date_main');
const moneyMain = document.getElementById('money_main');
const chosePerc = document.getElementsByClassName('choose-percent')[0];
const addExp = document.querySelector('#add-exp');
const addOptexp = document.querySelector('#add-optexp');
const addInc = document.querySelector('#add-inc');

const expensesInp = document.getElementsByClassName('expenses-item');
const incomeInp = document.getElementsByClassName('income-item');
const commitExpBtn = document.getElementsByTagName('button')[1];
const commitOptExpBtn = document.getElementsByTagName('button')[3];
const commitIncomeBtn = document.getElementsByTagName('button')[5];
const calcBtn = document.getElementsByTagName('button')[6];

const optionalexpensesInp = document.querySelectorAll('.optionalexpenses-item');
const savingsChk = document.querySelector('#savings');
const sumInp = document.querySelector('#sum');
const percentInp = document.querySelector('#percent');
const yearVal = document.querySelector('.year-value');
const monthVal = document.querySelector('.month-value');
const dayVal = document.querySelector('.day-value');

const appData = {
	aMoney: 0,
	aTime: '',
	aExpenses: {},
	aOptionalExpenses: {},
	aIncome: {},
	aSavings: false,
	aMoneyPerDay: 0,
	aMonthIncome: 0,
	aYearIncome: 0,
};

function checkEror(item, clsname) {
	for (let i = 0; i < item.length; i++) {
		if (item[i].value == '') {
			item[i].classList.add(clsname);
		} else {
			item[i].classList.remove(clsname);
		}
	}
}

function addInput(inClass, inWrap) {
	for (let i = 0; i < 2; i++) {
		let inp = document.createElement('input');
		inp.classList.add(inClass);
		inp.type = 'text';
		if (i == 0) {
			inp.placeholder = 'Наименование';
		} else {
			inp.placeholder = 'Сумма';
		}
		document.getElementsByClassName(inWrap)[0].appendChild(inp);
	}
}

function incomeCalc() {
	let sum = +sumInp.value,
		percent = +percentInp.value;

	appData.aMonthIncome = sum / 100 / 12 * percent;
	appData.aYearIncome = sum / 100 * percent;

	monthsavingsValue.textContent = appData.aMonthIncome.toFixed(2);
	yearsavingsValue.textContent = appData.aYearIncome.toFixed(2);
}

function incomeClear() {
	sumInp.value = '';
	percentInp.value = '';
	monthsavingsValue.textContent = '';
	yearsavingsValue.textContent = '';
}

startBtn.addEventListener('click', function (event) {
	let time = '',
		money = 0;
	event.preventDefault();
	time = dateMain.value;
	money = +moneyMain.value;
	if (time == '' || time == null) {
		dateMain.classList.add('date-item-error');
	} else {
		dateMain.classList.remove('date-item-error');
	}
	if (money == '' || money == null || typeof (money) != 'number') {
		moneyMain.classList.add('money-item-error');
	} else {
		moneyMain.classList.remove('money-item-error');
	}
	if (time != '' && time != null && money != '' && money != null && typeof (money) === 'number') {
		appData.aMoney = money;
		appData.aTime = time;
		budgetValue.textContent = money.toFixed(2);
		yearVal.value = new Date(Date.parse(time)).getFullYear();
		monthVal.value = new Date(Date.parse(time)).getMonth() + 1;
		dayVal.value = new Date(Date.parse(time)).getDate();
		addExp.disabled = false;
		addInc.disabled = false;
		addOptexp.disabled = false;
		commitIncomeBtn.disabled = false;
		commitExpBtn.disabled = false;
		commitOptExpBtn.disabled = false;
		calcBtn.disabled = false;
	}
});

commitExpBtn.addEventListener('click', function (event) {
	event.preventDefault();
	expensesNameValue.textContent = '';
	let sum = 0,
		expName = '',
		expSum = '';

	for (let i = 0; i < expensesInp.length; i++) {
		expName = expensesInp[i].value;
		expSum = +expensesInp[++i].value;
		checkEror(expensesInp, 'expenses-item-error');
		if (typeof (expName) === 'string' && expName != null && expName != '' && expName.length < 50 &&
			typeof (expSum) === 'number' && expSum != null) {
			appData.aExpenses[expName] = expSum;
			sum += +expSum;
			expensesNameValue.textContent += expName + ', ';

		}
		expensesValue.textContent = sum;
	}
	expensesNameValue.textContent = expensesNameValue.textContent.slice(0, -2);
});

commitOptExpBtn.addEventListener('click', function (event) {
	event.preventDefault();
	optionalexpensesNameValue.textContent = '';
	let sum = 0,
		expOptName,
		expOptSum;
	for (let i = 0; i < optionalexpensesInp.length; i++) {
		expOptName = optionalexpensesInp[i].value;
		expOptSum = +optionalexpensesInp[++i].value;
		checkEror(optionalexpensesInp, 'optionalexpenses-item-error');
		if (typeof (expOptName) === 'string' && expOptName != null && expOptSum != null &&
			expOptName != '' && typeof (expOptSum) === 'number' && expOptName.length < 50) {
			appData.aOptionalExpenses[expOptName] = expOptSum;
			sum += +expOptSum;
			optionalexpensesNameValue.textContent += expOptName + ', ';

		}
		optionalexpensesValue.textContent = sum;
	}
	optionalexpensesNameValue.textContent = optionalexpensesNameValue.textContent.slice(0, -2);
});

commitIncomeBtn.addEventListener('click', function (event) {
	event.preventDefault();
	incomeNameValue.textContent = '';
	let sum = 0,
		incName,
		incSum;
	for (let i = 0; i < incomeInp.length; i++) {
		incName = incomeInp[i].value;
		incSum = +incomeInp[++i].value;
		checkEror(incomeInp, 'income-item-error');
		if (typeof (incName) === 'string' && incName != null && incSum != null &&
			incName != '' && typeof (incSum) === 'number' && incName.length < 50) {
			appData.aIncome[incName] = incSum;
			sum += +incSum;
			incomeNameValue.textContent += incName + ', ';
		}
		incomeValue.textContent = sum;
	}
	incomeNameValue.textContent = incomeNameValue.textContent.slice(0, -2);
});

calcBtn.addEventListener('click', function () {
	event.preventDefault();
	daybudgetValue.textContent = '';
	let exp = 0,
		oExp = 0,
		inc = 0;
	for (const key in appData.aExpenses) {
		exp += appData.aExpenses[key];
	}
	for (const key in appData.aOptionalExpenses) {
		oExp += appData.aOptionalExpenses[key];
	}
	for (const key in appData.aIncome) {
		inc += appData.aIncome[key];
	}
	appData.aMoneyPerDay = (((((appData.aMoney + inc) - (exp + oExp))) / 30).toFixed(2));
	daybudgetValue.textContent = appData.aMoneyPerDay;
});

addExp.addEventListener('click', function (event) {
	event.preventDefault();
	addInput('expenses-item', 'wrapper-exp');
});

addOptexp.addEventListener('click', function (event) {
	event.preventDefault();
	addInput('optionalexpenses-item', 'wrapper-optexp');
});

addInc.addEventListener('click', function (event) {
	event.preventDefault();
	addInput('income-item', 'wrapper-inc');
});

savingsChk.addEventListener('click', function () {
	if (appData.aSavings == true) {
		appData.aSavings = false;
		sumInp.readOnly = true;
		percentInp.readOnly = true;
		incomeClear();
	} else {
		appData.aSavings = true;
		sumInp.readOnly = false;
		percentInp.readOnly = false;
		incomeClear();
	}
});

sumInp.addEventListener('input', function () {
	incomeCalc();
});

chosePerc.addEventListener('input', function () {
	incomeCalc();
});

new WOW().init();