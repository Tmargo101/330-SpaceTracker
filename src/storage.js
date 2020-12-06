let currentState = {
	prefix: "txm5483-",
	searchTerm: null,
};

let getSavedState = () => {
	currentState.searchTerm = localStorage.getItem(currentState.prefix+"searchTerm");

	// if we find a previously set name value, display it
	if (currentState.searchTerm){
		searchField.value = currentState.searchTerm;
	}
};

let saveState = () => {
	localStorage.setItem(currentState.prefix+"searchTerm", searchField.value);
	
}

export  { 
	getSavedState,
	saveState,
	currentState
 }