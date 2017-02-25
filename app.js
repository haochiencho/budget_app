var BudgetController = (function(){
	// Budget Controller code

	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var calculateTotal = function(type){
		var sum = 0;
		data.items[type].forEach(function(cur){
			sum += cur.value;
		});

		data.total[type] = sum;
	}

	var data = {
		items: {
			expense: [],
			income: []
		},
		total: {
			expense: 0,
			income: 0
		},
		budget: 0,
		percentage: -1

	};

	return {
		addItem: function(type, des, val){
			var newItem, ID;
			// ID of the last element in the array + 1
			if(data.items[type].length > 0){
				ID = data.items[type][data.items[type].length - 1].id + 1;				
			} else{
				ID = 0;
			}

			if(type === 'expense'){
				newItem = new Expense(ID, des, val);
			}
			else if (type === 'income'){
				newItem = new Income(ID, des, val);
			}
			
			data.items[type].push(newItem);
			data.total[type] += val;
			return newItem;
		},

		deleteItem: function(type, id){
			var itemIDs = data.items[type].map(function(cur){
				return cur.id;
			});

			index = itemIDs.indexOf(id);

			if(index !== -1){
				// splice removes [arg2] element(s) from array starting at [arg1]
				data.items[type].splice(index, 1);
			}
		},

		calculateBudget: function(){
			calculateTotal('income');
			calculateTotal('expense');

			data.budget = data.total['income'] - data.total['expense'];

			if(data.total.income > 0){
				data.percentage = Math.round((data.total.expense / data.total.income) * 100);
			}
		},

		getBudget: function(){
			return {
				budget: data.budget,
				totalIncome: data.total.income,
				totalExpense: data.total.expense,
				percentage: data.percentage
			};
		},

		test: function(){
			console.log(data);
		}
	}

})();

var UIController = (function(){
	// User Interface controller code
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputAmount: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expenseLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container'
	}

	return {
		getInput: function(){
			return {
				// type will be 'income' or 'expense'
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				amount: parseFloat(document.querySelector(DOMstrings.inputAmount).value)
			}
		},

		addListItem: function(obj, type){
			var html, element;

			// create HTML string with placeholder text
			if(type === 'income'){
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			else if(type === 'expense'){
				element = DOMstrings.expenseContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// Replace the placeholder text with some data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// insert HTML into DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		clearFields: function(){
			var fields, fieldsArr;

			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputAmount);

			fieldsArr = Array.prototype.slice.call(fields);

			// foreach gives access to current object, index number, and entire array
			fieldsArr.forEach(function(current, index, array){
				console.log(current);
				current.value = "";
			});
		},

		displayBudget: function(obj){
			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalIncome;
			document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExpense;
			if(obj.percentage > 0){
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else{
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
		},

		getDOMstrings: function(){
			return DOMstrings;
		}
	}
})();

var AppController = (function(BudgetCtrl, UICtrl){
	// Application controller
	var setupEventListeners = function(){
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', controlAddItem);

		document.addEventListener('keypress', function(event){
			if(event.keyCode === 13 || event.which === 13){
				controlAddItem();
			}
		});

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
	};

	var ctrlDeleteItem = function(event){
		var itemID, splitID, type, ID;
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if(itemID){
			// income-0
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// delete the item from the data structure'
			BudgetCtrl.deleteItem(type, ID);

			// delete item from the user interface

			// update and show the new budget
		}
	};

	var updateBudget = function(){
		// calculate budget
		BudgetCtrl.calculateBudget();

		// return budget
		var budget = BudgetCtrl.getBudget();

		// display the budget on the user interface
		UICtrl.displayBudget(budget);
	}

	var controlAddItem = function(){
		var input, newItem;

		// get input
		input = UICtrl.getInput();

		if(input.description !== "" && !isNaN(input.amount) && input.amount > 0){
		// add item to budget controller
		newItem = BudgetCtrl.addItem(input.type, input.description, input.amount);

		// add item to user interface
		UICtrl.addListItem(newItem, input.type);

		// clear input fields
		UIController.clearFields();

		// calculate and update budget
		updateBudget();
		}
	}

	return {
		init: function(){
			console.log('application has started');
			UICtrl.displayBudget({
				budget: 0,
				totalIncome: 0,
				totalExpense: 0,
				percentage: 0
			});
			setupEventListeners();
		}
	}


})(BudgetController, UIController);

AppController.init();