'use strict';

const startBtn = document.getElementById('start');
const budgetValue = document.getElementsByClassName('budget-value')[0];
const daybudgetValue = document.getElementsByClassName('daybudget-value')[0];
const levelValue = document.getElementsByClassName('level-value')[0];
const expensesValue = document.getElementsByClassName('expenses-value')[0];
const optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
const incomeValue = document.getElementsByClassName('income-value')[0];
const monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0];
const yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0];

const expensesInp = document.getElementsByClassName('expenses-item');
const commitExpBtn = document.getElementsByTagName('button')[0];
const commitOptExpBtn = document.getElementsByTagName('button')[1];
const calcBtn = document.getElementsByTagName('button')[2];

const optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item');
const incomeInp = document.querySelector('#income');
const savingsChk = document.querySelector('#savings');
const sumInp = document.querySelector('#sum');
const percentInp = document.querySelector('#percent');
const yearVal = document.querySelector('.year-value');
const monthVal = document.querySelector('.month-value');
const dayVal = document.querySelector('.day-value');

/*console.log(startBtn);
console.log(budgetValue);
console.log(daybudgetValue);
console.log(levelValue);
console.log(expensesValue);
console.log(optionalexpensesValue);
console.log(incomeValue);
console.log(monthsavingsValue);
console.log(yearsavingsValue);
console.log(expensesInp);
console.log(commitExpBtn);
console.log(commitOptExpBtn);
console.log(calcBtn);
console.log(optionalexpensesItem);
console.log(incomeInp);
console.log(savingsChk);
console.log(sumInp);
console.log(percentInp);
console.log(yearVal);
console.log(monthVal);
console.log(dayVal);*/

let money = 0;
let time = '';
let exp = 0;
const appData = {
	aMoney: 0,
	aTime: '',
	aExpenses: {},
	aOptionalExpenses: {},
	aIncome: [],
	aSavings: false,
	aMoneyPerDay: 0,
	aMonthIncome: 0,

	/*chooseExpenses: function () {
		for (let i = 0; i < 2; i++) {
			const expName = prompt('Введите обязательную статью расходов', '');
			const expSum = +prompt('Введите сумму', '');
			if (typeof (expName) === 'string' && expName != null && expSum != null &&
                    expName != '' && typeof (expSum) === 'number' && expName.length < 50) {
				appData.aExpenses[expName] = expSum;
			} else {
				i--;
			}
		}
	},*/

	dailyFinance: function () {
		for (const key in appData.aExpenses) {
			exp += appData.aExpenses[key];
		}
		appData.aMoney = money;
		appData.aTime = time;
		appData.aMoneyPerDay = (((appData.aMoney - exp) / 30).toFixed(2));
		alert('Ежедневный бюджет за вычетом обязательных расходов: ' + appData.aMoneyPerDay);
	},

	chooseOptExpenses: function () {
		const opt = confirm('Включить необязательные расходы?');
		if (opt == true) {
			for (let i = 0; i < 3; i++) {
				const expOptName = prompt('Введите необязательную статью расходов', '');
				const expOptSum = +prompt('Введите сумму', '');
				if (typeof (expOptName) === 'string' && expOptName != null && expOptSum != null &&
					expOptName != '' && typeof (expOptSum) === 'number' && expOptName.length < 50) {
					appData.aOptionalExpenses[expOptName] = expOptSum;
				} else {
					i--;
				}
			}
		}
	},

	checkSavings: function () {
		const conf = confirm('Есть ли сбережения?');
		if (conf == true) {
			appData.aSavings = true;
		}
		if (appData.aSavings == true) {
			const save = +prompt('Какова сумма накоплений', '');
			const persent = +prompt('Под какой процент', '');
			appData.aMonthIncome = (save / 100 / 12 * persent).toFixed(2);
			alert('Доход с депозита в месяц: ' + appData.aMonthIncome);
		}
	},

	chooseIncome: function () {
		const items = prompt('Статьи дополнительного дохода через запятую', '');
		appData.aIncome = items.split(', ');
		appData.aIncome.sort();
	}
};


startBtn.addEventListener('click', function () {
	time = prompt('Введите дату в формате YYYY-MM-DD', '');
	money = +prompt('Ваш бюджет на месяц:', '');

	while (isNaN(money) || money == '' || money == null) {
		money = +prompt('Ваш бюджет на месяц:', '');
	}
	appData.aMoney = money;
	appData.aTime = time;
	budgetValue.textContent = money.toFixed(2);
	yearVal.value = new Date(Date.parse(time)).getFullYear();
	monthVal.value = new Date(Date.parse(time)).getMonth() + 1;
	dayVal.value = new Date(Date.parse(time)).getDate();
});

commitExpBtn.addEventListener('click', function () {
	let sum = 0;

	for (let i = 0; i < expensesInp.length; i++) {
		let expName = expensesInp[i].value,
			expSum = +expensesInp[++i].value;

		if (typeof (expName) === 'string' && expName != null && expSum != null &&
			expName != '' && typeof (expSum) === 'number' && expName.length < 50) {
			appData.aExpenses[expName] = expSum;
			sum += +expSum;
		} else {
			i--;
		}
		expensesValue.textContent = sum;
	}
});

commitOptExpBtn.addEventListener('click', function () {
	for (let i = 0; i < 3; i++) {
		const expOptName = prompt('Введите необязательную статью расходов', '');
		const expOptSum = +prompt('Введите сумму', '');
		if (typeof (expOptName) === 'string' && expOptName != null && expOptSum != null &&
			expOptName != '' && typeof (expOptSum) === 'number' && expOptName.length < 50) {
			appData.aOptionalExpenses[expOptName] = expOptSum;
		} else {
			i--;
		}
	}
});