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
		inputBtn: '.add__btn'
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
	}

	var controlAddItem = function(){
		// get input
		var input = UICtrl.getInput();
		// add item to budget controller
		BudgetCtrl.addItem(input.type, input.description, input.amount);
		console.log(input);
	}

	return {
		init: function(){
			console.log('application has started');
			setupEventListeners();
		}
	}


})(BudgetController, UIController);

AppController.init();