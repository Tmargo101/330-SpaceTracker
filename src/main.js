import * as map from './map.js';
import * as ajax from './ajax.js';

let sats;
let currentState = {
	prefix: "txm5483-",
	searchTerm: null,

};
let endpoints = {
	getAllStarlinkSats: "https://api.spacexdata.com/v3/starlink",
	getAllPastLaunches: "https://api.spacexdata.com/v3/launches/past",
	getAllCores: "https://api.spacexdata.com/v3/cores",
	getCapsule: ""
}

let getSavedState = () => {
	currentState.searchTerm = localStorage.getItem(currentState.prefix+"searchTerm");

	// if we find a previously set name value, display it
	if (currentState.searchTerm){
		searchField.value = currentState.searchTerm;
	}
};

let init = () => {
	getSavedState();

	map.initMap();
	map.addMarkersToMap();
	drawDatabaseHome();
	setupUI();
};

let displayLoading = (div) => {
	document.querySelector(div).innerHTML = "<h3 class='text-center'>Loading...</h3>";
}

let setupUI = () => {

	// Save state handlers
	searchField.onchange = (e) => {
		localStorage.setItem(currentState.prefix+"searchTerm", e.target.value);
	};


	starlinkNavItem.onclick = () => {
		if (!sats) {
			loadSats();
		}
	};

	falcon1HistoryNav.onclick = () => {
		displayLoading('#databaseDiv');
		let displayLaunchHistory = (jsonString) => {
			let allLaunches = JSON.parse(jsonString);
			let headerColumns = ["Launch Name", "Success", "Launch Details"];
			drawDatabaseTable(headerColumns);
			for (let launch of allLaunches) {
				drawDatabaseRow([
					`<a href="#">${launch.mission_name}</a>`,
					launch.launch_success,
					launch.details
				])
			}
		}
		ajax.getData(endpoints.getAllPastLaunches + "/?rocket_id=falcon1", displayLaunchHistory);
	}

	falcon9HistoryNav.onclick = () => {
		displayLoading('#databaseDiv');
		let displayLaunchHistory = (jsonString) => {
			let allLaunches = JSON.parse(jsonString);
			let headerColumns = ["Launch Name", "Success", "Launch Details", "Booster"];
			drawDatabaseTable(headerColumns);
			for (let launch of allLaunches) {
				drawDatabaseRow([
					`<a href="#">${launch.mission_name}</a>`,
					launch.launch_success,
					launch.details,
					`<a href="#">${launch.rocket.first_stage.cores[0].core_serial}</a>`

				])

			}
		}
		ajax.getData(endpoints.getAllPastLaunches+"/?rocket_id=falcon9", displayLaunchHistory);
	}

	falconHeavyHistoryNav.onclick = () => {
		displayLoading('#databaseDiv');
		let displayLaunchHistory = (jsonString) => {
			let allLaunches = JSON.parse(jsonString);
			let headerColumns = ["Launch Name", "Success", "Launch Details"];
			drawDatabaseTable(headerColumns);
			for (let launch of allLaunches) {
				drawDatabaseRow([
					launch.mission_name,
					launch.launch_success,
					launch.details
				])
			}
		}
		ajax.getData(endpoints.getAllPastLaunches+"/?rocket_id=falconheavy", displayLaunchHistory);
	}


	dragonHistoryNav.onclick = () => {
		displayLoading('#databaseDiv');
		let displayLaunchHistory = (jsonString) => {
			let allLaunches = JSON.parse(jsonString);
			let headerColumns = ["Launch Name", "Success", "Launch Details"];
			drawDatabaseTable(headerColumns);
			for (let launch of allLaunches) {
				if (launch.capsules[0]) {

					drawDatabaseRow([
						launch.mission_name,
						launch.launch_success,
						launch.details
					])
				}
			}
		}
		ajax.getData(endpoints.getAllPastLaunches, displayLaunchHistory);
	}
};

let drawDatabaseTable = (inColumns) => {
	let thisTable = `
	<table id="currentDatabaseDivTable" class="table table-responsive" style="overflow-y:scroll; max-height: 80vh;">
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
	databaseDiv.innerHTML = thisTable;
};

let drawDatabaseRow = (inColumns, inClass = 'table-light') => {
	if (currentDatabaseDivTable) {
		let thisRow = `<tr class="${inClass}">`
		for (let column of inColumns) {
			if (column != null) {
				thisRow += `<td>${column}</td>`
			} else {
				thisRow += `<td>No Information Provided</td>`
			}
		}
		thisRow += `</tr>`
		document.querySelector("tbody").innerHTML += thisRow;
	}
}

let drawPopup = () => {

}

let drawDatabaseHome = () => {
	databaseDiv.innerHTML = `
	<div class="text-center">
		<button class="mt-5 mb-3 btn btn-outline-primary btn-lg" id="falcon1HistoryNav">Falcon 1 Launches</button><br>
		<button class="m-3 btn btn-outline-primary btn-lg" id="falcon9HistoryNav">Falcon 9 Launches</button><br>
		<button class="m-3 btn btn-outline-primary btn-lg" id="falconHeavyHistoryNav">Falcon Heavy Launches</button><br>
		<button class="m-3 btn btn-outline-primary btn-lg" id="dragonHistoryNav">Dragon Capsule Launches</button><br>

	</div>
	<div class="text-center mt-5">
		<h3 class="mb-3">Next Launch</h3>
		<p>ARABSAT</p>
		<p>Nov 20</p>
	</div>
	<div class="text-center mt-5">
		<h3 class="mb-3">Last Launch</h3>
		<p>Starlink</p>
		<p>Nov 10</p>
	</div>
	`
};

let drawDatabseControls = () => {
	databaseControls.innerHTML = `
	<button>
	`
};

let loadSats = () => {
	const url = endpoints.getAllStarlinkSats;
	let poiLoaded = (jsonString) => {
		sats = JSON.parse(jsonString);
		console.log(sats);

		for (let starlink of sats) {
			map.addMarker(starlink, "poi");
		}
	}

	ajax.getData(url,poiLoaded);
}

let loadData = (endpointToLoad) => {
	const url = endpointToLoad
}

export {
	init
};
