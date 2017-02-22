var BudgetController = (function(){
	// Budget Controller code
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
	var DOM = UICtrl.getDOMstrings();

	var controlAddItem = function(){
		// get input
		var input = UICtrl.getInput();
		console.log(input);
	}

	document.querySelector(DOM.inputBtn).addEventListener('click', controlAddItem);

	document.addEventListener('keypress', function(event){
		if(event.keyCode === 13 || event.which === 13){
			controlAddItem();
		}
	});
})(BudgetController, UIController);