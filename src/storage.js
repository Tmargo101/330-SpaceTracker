import * as table from './table.js';

let currentState = {
	prefix: "txm5483-",
	searchTerm: null,
	searchBy: null,
	landedCheckbox: null,
	reflownCheckbox: null,
	numberOfReflightsSelect: null,
	launchLocation: "all",
	rocketSelect: "all"
};

let getSavedState = () => {
	currentState.searchTerm = localStorage.getItem(currentState.prefix+"searchTerm");
	currentState.searchBy = localStorage.getItem(currentState.prefix+"searchBy");
	currentState.landedCheckbox = localStorage.getItem(currentState.prefix+"landedCheckbox");
	currentState.reflownCheckbox = localStorage.getItem(currentState.prefix+"reflownCheckbox");
	currentState.numberOfReflightsSelect = localStorage.getItem(currentState.prefix+"numberOfReflightsSelect");
	currentState.launchLocationSelect = localStorage.getItem(currentState.prefix+"launchLocationSelect");
	currentState.rocketSelect = localStorage.getItem(currentState.prefix+"rocketSelect");
};

let setAllOptions = () => {
	
	getSavedState();
	// if we find a previously set name value, display it
	if (currentState.searchTerm){
		searchField.value = currentState.searchTerm;
	}
	
	if (currentState.searchBy == "launchName") {
		launchNameRadio.checked = true;		
	} else {
		boosterRadio.checked = true;
	}
	
	if (currentState.landedCheckbox == "true") {
		landedCheckbox.checked = true;
	}
	
	if (currentState.reflownCheckbox == "true") {
		reflownCheckbox.checked = true;
		numberOfReflightsSelect.disabled = false;
	}
	
	if (currentState.numberOfReflightsSelect != null) {
		numberOfReflightsSelect.value = currentState.numberOfReflightsSelect;
	}
	
	launchLocationSelect.value = currentState.launchLocationSelect;
	rocketSelect.value = currentState.rocketSelect;

	if (currentState.launchLocationSelect != "all") {
	}
	
	if (currentState.rocketSelect != "all") {
	}

	

}

let saveState = () => {
	
	localStorage.setItem(currentState.prefix+"searchTerm", searchField.value);
	
	if (launchNameRadio.checked == true) {
		localStorage.setItem(currentState.prefix+"searchBy", "launchName");
	} else if (boosterRadio.checked == true) {
		localStorage.setItem(currentState.prefix+"searchBy", "booster");
	}
	
	localStorage.setItem(currentState.prefix+"landedCheckbox", landedCheckbox.checked);
	localStorage.setItem(currentState.prefix+"reflownCheckbox", reflownCheckbox.checked);
	localStorage.setItem(currentState.prefix+"numberOfReflightsSelect", numberOfReflightsSelect.value);
	localStorage.setItem(currentState.prefix+"launchLocationSelect", launchLocationSelect.value);
	localStorage.setItem(currentState.prefix+"rocketSelect", rocketSelect.value);
	getSavedState();
	
	
}

let resetAllOptions = () => {
	localStorage.clear();
	localStorage.setItem("prefix", "txm5483-");
	localStorage.setItem("searchBy", "launchName");
	localStorage.setItem("launchLocation", "all");
	localStorage.setItem("rocketSelect", "all");
	searchField.value = "";
	launchNameRadio.checked = true;
	boosterRadio.checked = false;
	landedCheckbox.checked = false;
	reflownCheckbox.checked = false;
	numberOfReflightsSelect.selectedIndex = "0";
	numberOfReflightsSelect.disabled = true;
	launchLocationSelect.selectedIndex = "0";
	// allLocations.selected = true;
	rocketSelect.selectedIndex = "0";
	saveState();
	table.searchTable();
}

export  { 
	getSavedState,
	saveState,
	currentState,
	resetAllOptions,
	setAllOptions
 }