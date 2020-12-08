import * as map from './map.js';
import * as ajax from './ajax.js';
import * as utilities from './utilities.js';
import * as table from './table.js';
import * as storage from './storage.js';
import * as details from './details.js';

let sats;

let endpoints = {
	getAllStarlinkSats: 'https://api.spacexdata.com/v4/starlink',
	getAllPastLaunches: 'https://api.spacexdata.com/v3/launches/past',
	getOneLaunch: 'https://api.spacexdata.com/v3/launches/',
	getAllCores: 'https://api.spacexdata.com/v3/cores',
	getLastLaunch: 'https://api.spacexdata.com/v3/launches/latest',
	getNextLaunch: 'https://api.spacexdata.com/v3/launches/next',
};

let init = () => {
	storage.getSavedState();
	map.initMap();
	setupUI();
	getLastLaunch();
	getNextLaunch();
};

let setupUI = () => {
	// Save state handlers
	searchField.onkeyup = e => {
		storage.saveState();
		searchTable();
	};

	starlinkNavItem.onclick = () => {
		if (!sats) {
			loadSats();
		}
	};

	falcon1HistoryNav.onclick = () => {
		getFalcon1Launches();
	};

	falcon9HistoryNav.onclick = () => {
		getFalcon9Launches();
	};

	falconHeavyHistoryNav.onclick = () => {
		getFalconHeavyLaunches();
	};
	
	launchNameRadio.onclick = () => {
		alert("Wroked");
	}
	
	boosterRadio.onchange = () => {
			
	}
};

let getFalcon1Launches = () => {
	utilities.displayLoading('#databaseTableDiv');
	map.resetPois();
	let displayLaunchHistory = jsonString => {
		let allLaunches = JSON.parse(jsonString);
		let headerColumns = ['Launch Name', 'Success', 'Launch Details'];
		table.drawDatabaseTable(headerColumns);
		for (let launch of allLaunches) {
			table.drawDatabaseRow([`<a href="#" class="getFlightDetails" data-value="${launch.flight_number}">${launch.mission_name}</a>`, launch.launch_success, launch.details], launch);
			map.countLaunchLocations(launch);
		}
		for (let [location, launchNumber] of Object.entries(map.launchLocations)) {
			if (launchNumber > 0) {
				map.addGeneralLaunchLocation(location, launchNumber, 'launch');
			}
		}

		table.addLinksToRow();

		// Plot launch locations on map
	};

	utilities.hideDiv('databaseHomeDiv');
	utilities.showDiv('databaseDiv');
	ajax.getData(endpoints.getAllPastLaunches + '/?rocket_id=falcon1', displayLaunchHistory);
};

let getFalcon9Launches = () => {
	utilities.displayLoading('#databaseTableDiv');
	map.resetPois();

	let displayLaunchHistory = jsonString => {
		let allLaunches = JSON.parse(jsonString);
		let headerColumns = ['Launch Name', 'Success', 'Launch Details', 'Booster', 'Booster Flights', 'Recovered'];
		table.drawDatabaseTable(headerColumns);
		for (let launch of allLaunches) {
			table.drawDatabaseRow(
				[
					`<a href="#" class="getFlightDetails" data-value="${launch.flight_number}">${launch.mission_name}</a>`,
					launch.launch_success,
					launch.details,
					launch.rocket.first_stage.cores[0].core_serial,
					launch.rocket.first_stage.cores[0].flight,
					launch.rocket.first_stage.cores[0].land_success,
					//`<a href="#">${launch.rocket.first_stage.cores[0].core_serial}</a>`,
				],
				launch
			);
			map.countLaunchLocations(launch);
		}
		for (let [location, launchNumber] of Object.entries(map.launchLocations)) {
			if (launchNumber > 0) {
				map.addGeneralLaunchLocation(location, launchNumber, 'launch');
			}
		}
		

		table.addLinksToRow();
	};
	utilities.hideDiv('databaseHomeDiv');
	utilities.showDiv('databaseDiv');
	ajax.getData(endpoints.getAllPastLaunches + '/?rocket_id=falcon9', displayLaunchHistory);
};

let getFalconHeavyLaunches = () => {
	utilities.displayLoading('#databaseTableDiv');
	map.resetPois();

	let displayLaunchHistory = jsonString => {
		let allLaunches = JSON.parse(jsonString);
		let headerColumns = ['Launch Name', 'Success', 'Launch Details'];
		table.drawDatabaseTable(headerColumns);
		for (let launch of allLaunches) {
			table.drawDatabaseRow([`<a href="#" class="getFlightDetails" data-value="${launch.flight_number}">${launch.mission_name}</a>`, launch.launch_success, launch.details], launch);
			map.countLaunchLocations(launch);
		}
		for (let [location, launchNumber] of Object.entries(map.launchLocations)) {
			if (launchNumber > 0) {
				map.addGeneralLaunchLocation(location, launchNumber, 'launch');
			}
		}
		table.addLinksToRow();
	};
	utilities.hideDiv('databaseHomeDiv');
	utilities.showDiv('databaseDiv');
	ajax.getData(endpoints.getAllPastLaunches + '/?rocket_id=falconheavy', displayLaunchHistory);
};

let getNextLaunch = () => {
	let callback = jsonString => {
		let launch = JSON.parse(jsonString);
		nextLaunchHomeDiv.innerHTML = `
		<h5>${launch.mission_name}</h5>
		`;
	};
	ajax.getData(endpoints.getNextLaunch, callback);
};

let getLastLaunch = () => {
	let callback = jsonString => {
		let launch = JSON.parse(jsonString);
		lastLaunchHomeDiv.innerHTML = `
		<h5>${launch.mission_name}</h5>
		`;
	};
	ajax.getData(endpoints.getLastLaunch, callback);
};

function searchTable() {
	// Declare variables
	var input, filter, table, rows, searchTerm, i, searchText;
	input = document.querySelector('#searchField');
	filter = input.value.toUpperCase();
	table = document.querySelector('#currentDatabaseDivTable');
	rows = table.querySelectorAll('tr');
	
	// if (storage.)

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < rows.length; i++) {
		searchTerm = rows[i].querySelectorAll('td')[0];
		if (searchTerm) {
			searchText = searchTerm.textContent || searchTerm.innerText;
			if (searchText.toUpperCase().indexOf(filter) > -1) {
				rows[i].style.display = '';
			} else {
				rows[i].style.display = 'none';
			}
		}
	}
}

let loadSats = () => {
	const url = endpoints.getAllStarlinkSats;
	let poiLoaded = jsonString => {
		sats = JSON.parse(jsonString);
		// console.log(sats);

		for (let starlink of sats) {
			map.addMarker(starlink, 'poi');
		}
	};

	ajax.getData(url, poiLoaded);
};

export { init };
