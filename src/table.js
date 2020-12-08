import * as utilities from './utilities.js';
import * as details from './details.js';
import * as map from './map.js';
import * as storage from './storage.js';

let drawDatabaseTable = (inColumns) => {
	let thisTable = `
	<table id="currentDatabaseDivTable" class="table table-responsive" style="overflow-y:scroll; max-height: 50vh;">
		<thead class="thead-dark">
			<tr>`;

	for (let column of inColumns) {
		thisTable += `
		<th>${column}</th>
		`;
	}

	thisTable +=`
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
	</div>
	`;
	databaseTableDiv.innerHTML = thisTable;
	databaseBreadcrumb.innerHTML = `
		<li class="breadcrumb-item"><a href="#" id="databaseHomeButton">Home</a></li>
		<li class="breadcrumb-item active" aria-current="page">Launches</li>
		`;
	databaseHomeButton.onclick = () => {
		map.resetPois();
		databaseBreadcrumb.innerHTML = `
		<li class="breadcrumb-item active" aria-current="page">Home</li>
		`;
		utilities.hideDiv("databaseDetailsView")
		utilities.hideDiv("databaseDiv");
		
		utilities.showDiv("databaseHomeDiv");
	}
};

let drawDatabaseRow = (inColumns, thisLaunch = {}, inClass = 'table-light') => {
	if (currentDatabaseDivTable) {
		let thisRow = `<tr class="${inClass}">`
		for (let column of inColumns) {
			if (column != null) {
				thisRow += `<td>${column}</td>				
				`
			} else {
			thisRow += `<td>No Information Provided</td>`
			}
		}
		document.querySelector("tbody").innerHTML += thisRow;
		searchTable();
	}
};

let addLinksToRow = () => {
	let detailsLinks = document.querySelectorAll('.getFlightDetails');
	detailsLinks.forEach(link =>{
		link.onclick = (e) => {
			details.drawDetailsView(e.target.dataset.value);
		}
	});
};

let searchTable = () => {
	// Declare variables
	let input, filter, thisTable, rows, searchTerm, searchText, searchColumn;
	input = document.querySelector('#searchField');
	filter = input.value.toUpperCase();
	thisTable = document.querySelector('#currentDatabaseDivTable');
	rows = thisTable.querySelectorAll('tr');
	
	switch (storage.currentState.searchBy) {
		case "launchName":
			searchColumn = 0;
			break;
		case "booster":
			searchColumn = 3;
			break;
		default:
			searchColumn = 0;
			break;
	}
	
	// Loop through all table rows, and hide those who don't match the search query
	for (let i = 0; i < rows.length; i++) {
		searchTerm = rows[i].querySelectorAll('td')[searchColumn];
		if (searchTerm) {
			
			searchText = searchTerm.textContent || searchTerm.innerText;
			if (searchText.toUpperCase().indexOf(filter) > -1) {
				rows[i].style.display = '';
			} else {
				rows[i].style.display = 'none';
			}
		}
	}
	
	if (storage.currentState.rocketSelect != "all") {
		filterTable(7, false, [storage.currentState.rocketSelect]);
	}
	
	if (storage.currentState.landedCheckbox == "true") {
		filterTable(5, true, ["false", "No Information Provided"]);
	}
	
	if (storage.currentState.reflownCheckbox == "true") {
		filterTable(4, true, ["1"]);
	}
	
	if (storage.currentState.reflownCheckbox == "true" && storage.currentState.numberOfReflightsSelect > 1) {
		filterTable(4, false, [storage.currentState.numberOfReflightsSelect])
	}
	
	if (storage.currentState.launchLocationSelect != "all") {
		filterTable(6, false, [storage.currentState.launchLocationSelect])
	}
	
	countResults();
	
	
};

let filterTable = (searchColumn, invertSelection, termsToFilterBy) => {
	// Declare variables
	let input, thisTable, rows, searchTerm, searchText;
	
	thisTable = document.querySelector('#currentDatabaseDivTable');
	rows = thisTable.querySelectorAll('tr');

	// Loop through all table rows, and hide those who don't match the search query
	for (let i = 0; i < rows.length; i++) {
		searchTerm = rows[i].querySelectorAll('td')[searchColumn];
		if (searchTerm) {
			searchText = searchTerm.textContent || searchTerm.innerText;
			for (let y = 0; y < termsToFilterBy.length; y++) {
				if (invertSelection == true) {
					if (searchText == termsToFilterBy[y]) {
						rows[i].style.display = 'none';
					}
				} else if (invertSelection == false) {
					if (searchText != termsToFilterBy[y]) {
						rows[i].style.display = 'none';
					}
				}
			}
		}
	}
	countResults();

}

let countResults = () => {
	let results = -1;
	let thisTable = document.querySelector('#currentDatabaseDivTable');
	let rows = thisTable.querySelectorAll('tr');
	
	// Loop through all table rows, and hide those who don't match the search query
	for (let i = 0; i < rows.length; i++) {
		if (rows[i].style.display != 'none') {
			results += 1;
		}
	}
	if (results > 1) {
		resultsAlert.innerHTML = `${results} Results.`;
	} else if (results == 1) { 
		resultsAlert.innerHTML = `${results} Result.`;
	} else {
		resultsAlert.innerHTML = `No Results.`;
	}

};


export {
	drawDatabaseTable,
	drawDatabaseRow,
	addLinksToRow,
	searchTable,
}
