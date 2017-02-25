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

	var data = {
		items: {
			expense: [],
			income: []
		},
		total: {
			expense: 0,
			income: 0
		}

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
		expenseContainer: '.expenses__list'
	}

	return {
		getInput: function(){
			return {
				// type will be 'income' or 'expense'
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				amount: document.querySelector(DOMstrings.inputAmount).value
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
	};

	var updateBudget = function(){
		// calculate budget
	}

	var controlAddItem = function(){
		var input, newItem;

		// get input
		input = UICtrl.getInput();

		// add item to budget controller
		newItem = BudgetCtrl.addItem(input.type, input.description, input.amount);

		// add item to user interface
		UICtrl.addListItem(newItem, input.type);

		// clear input fields
		UIController.clearFields();

	}

	return {
		init: function(){
			console.log('application has started');
			setupEventListeners();
		}
	}


})(BudgetController, UIController);

AppController.init();