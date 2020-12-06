import * as map from './map.js';
import * as ajax from './ajax.js';
import * as utilities from './utilities.js';
import * as table from './table.js';
import * as storage from './storage.js';
import * as details from './details.js';


let sats;

let endpoints = {
	getAllStarlinkSats: "https://api.spacexdata.com/v4/starlink",
	getAllPastLaunches: "https://api.spacexdata.com/v3/launches/past",
	getOneLaunch: "https://api.spacexdata.com/v3/launches/",
	getAllCores: "https://api.spacexdata.com/v3/cores",
	getCapsule: ""
}


let init = () => {
	storage.getSavedState();
	map.initMap();
	map.addMarkersToMap();
	setupUI();
};


let setupUI = () => {

	// Save state handlers
	searchField.onchange = (e) => {
		storage.saveState();
	};

	starlinkNavItem.onclick = () => {
		if (!sats) {
			loadSats();
		}
	};

	falcon1HistoryNav.onclick = () => {
		getFalcon1Launches();
	}

	falcon9HistoryNav.onclick = () => {
		getFalcon9Launches()
	}

	falconHeavyHistoryNav.onclick = () => {
		getFalconHeavyLaunches();
	}
};

let getFalcon1Launches = () => {
	utilities.displayLoading('#databaseDiv');
	let displayLaunchHistory = (jsonString) => {
		let allLaunches = JSON.parse(jsonString);
		let headerColumns = ["Launch Name", "Success", "Launch Details"];
		table.drawDatabaseTable(headerColumns);
		for (let launch of allLaunches) {
			table.drawDatabaseRow([
				`<a href="#" class="getFlightDetails" data-value="${launch.flight_number}">${launch.mission_name}</a>`,
				launch.launch_success,
				launch.details,
				
			],launch)
			
			map.addLaunchLocation(launch, "poi");
		}
		table.addLinksToRow();
		
		// Plot launch locations on map
	}
	
	utilities.hideDiv("databaseHomeDiv");
	utilities.showDiv("databaseDiv");
	ajax.getData(endpoints.getAllPastLaunches + "/?rocket_id=falcon1", displayLaunchHistory);
}

let getFalcon9Launches = () => {
	utilities.displayLoading('#databaseDiv');
	let displayLaunchHistory = (jsonString) => {
		let allLaunches = JSON.parse(jsonString);
		let headerColumns = ["Launch Name", "Success", "Launch Details", "Booster", "Booster Flights", "Recovered"];
		table.drawDatabaseTable(headerColumns);
		for (let launch of allLaunches) {
			table.drawDatabaseRow([
				`<a href="#" class="getFlightDetails" data-value="${launch.flight_number}">${launch.mission_name}</a>`,
				launch.launch_success,
				launch.details,
				launch.rocket.first_stage.cores[0].core_serial,
				launch.rocket.first_stage.cores[0].flight,
				launch.rocket.first_stage.cores[0].land_success
				//`<a href="#">${launch.rocket.first_stage.cores[0].core_serial}</a>`,

			],launch);
			map.addLaunchLocation(launch, "poi");

		}
		table.addLinksToRow();
	}
	utilities.hideDiv("databaseHomeDiv");
	utilities.showDiv("databaseDiv");
	ajax.getData(endpoints.getAllPastLaunches+"/?rocket_id=falcon9", displayLaunchHistory);
}

let getFalconHeavyLaunches = () => {
	utilities.displayLoading('#databaseDiv');
	let displayLaunchHistory = (jsonString) => {
		let allLaunches = JSON.parse(jsonString);
		let headerColumns = ["Launch Name", "Success", "Launch Details"];
		table.drawDatabaseTable(headerColumns);
		for (let launch of allLaunches) {
			table.drawDatabaseRow([
				`<a href="#" class="getFlightDetails" data-value="${launch.flight_number}">${launch.mission_name}</a>`,
				launch.launch_success,
				launch.details
			],launch);
			map.addLaunchLocation(launch, "poi");

		}
		table.addLinksToRow();
	}
	utilities.hideDiv("databaseHomeDiv");
	utilities.showDiv("databaseDiv");
	ajax.getData(endpoints.getAllPastLaunches+"/?rocket_id=falconheavy", displayLaunchHistory);

}


let drawDatabseControls = () => {
	databaseControls.innerHTML = `
	<button>
	`
};


let loadSats = () => {
	const url = endpoints.getAllStarlinkSats;
	let poiLoaded = (jsonString) => {
		sats = JSON.parse(jsonString);
		// console.log(sats);

		for (let starlink of sats) {
			map.addMarker(starlink, "poi");
		}
	}

	ajax.getData(url,poiLoaded);
}

export {
	init
};
