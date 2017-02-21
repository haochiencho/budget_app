var BudgetController = (function(){
	// Budget Controller code
})();

var UIController = (function(){
	// User Interface controller code
})();

var AppController = (function(BudgetCtrl, UICtrl){
	// Application controller

	function controlAddItem(){
		console.log('e');
	}

	document.querySelector('.add__btn').addEventListener('click', controlAddItem);

	document.addEventListener('keypress', function(event){
		if(event.keyCode === 13 || event.which === 13){
			controlAddItem();
		}
	});
})(BudgetController, UIController);