import * as map from './map.js';
import * as ajax from './ajax.js';
import * as utilities from './utilities.js';
import * as table from './table.js';
import * as storage from './storage.js';
import * as details from './details.js';

let sats;

let endpoints = {
	getAllStarlinkSats: 'https://api.spacexdata.com/v4/starlink',
	getAllPastLaunches: 'https://api.spacexdata.com/v3/launches',
	getOneLaunch: 'https://api.spacexdata.com/v3/launches/',
	getAllCores: 'https://api.spacexdata.com/v3/cores',
	getLastLaunch: 'https://api.spacexdata.com/v3/launches/latest',
	getNextLaunch: 'https://api.spacexdata.com/v3/launches/next',
};

let init = () => {
	map.initMap();
	setupUI();
	storage.setAllOptions();
	getLastLaunch();
	getNextLaunch();
};

let setupUI = () => {
	
	numberOfReflightsSelect.disabled = true;
	
	// Save state handlers
	searchField.onkeyup = () => {
		storage.saveState();
		table.searchTable();
	};
	
	launchNameRadio.onclick = () => {
		storage.saveState();
		table.searchTable();
	};
	
	boosterRadio.onclick = () => {
		storage.saveState();
		table.searchTable();
	};
	
	landedCheckbox.onclick = () => {
		storage.saveState();
		table.searchTable();
	};
	
	reflownCheckbox.onclick = () => {
		if (reflownCheckbox.checked) {
			numberOfReflightsSelect.disabled = false;
		} else if (!reflownCheckbox.checked) {
			numberOfReflightsSelect.disabled = true;
		}
		storage.saveState();
		table.searchTable();
	};
	
	numberOfReflightsSelect.onchange = () => {
		if (!numberOfReflightsSelect.disabled) {
			storage.saveState();
			table.searchTable();
		}
	};
	
	launchLocationSelect.onchange = () => {
		storage.saveState();
		table.searchTable();
	}
	
	
	
	resetButton.onclick = () => {
		storage.resetAllOptions();
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
		let headerColumns = ['Launch Name', 'Success', 'Launch Details', 'Booster', 'Booster Flights', 'Recovered', 'Launch Site'];
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
					launch.launch_site.site_id,
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
