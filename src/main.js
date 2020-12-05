import * as map from './map.js';
import * as ajax from './ajax.js';

let sats;
let boosters;
let launches;
let capsules;
let dragons;


let endpoints = {
	getAllStarlinkSats: "https://api.spacexdata.com/v3/starlink",
	getAllPastLaunches: "https://api.spacexdata.com/v3/launches/past",
	getAllCores: "https://api.spacexdata.com/v3/cores",
	getCapsule: ""

}

let init = () => {
	map.initMap();
	map.addMarkersToMap();
	setupUI();
};

let setupUI = () => {
	starlinkNavItem.onclick = () => {
		if (!sats) {
			loadSats();
		}
};

	falcon1HistoryNav.onclick = () => {
		let displayLaunchHistory = (jsonString) => {
		let allLaunches = JSON.parse(jsonString);
		let headerColumns = ["Launch Name", "Success", "Launch Details"];
		drawDatabaseTable(headerColumns);
		for (let launch of allLaunches) {
			if (launch.flight_number < 6) {
				drawDatabaseRow([
					launch.name,
					launch.success,
					launch.details
				])
			}
}
		}
		ajax.getData(endpoints.getAllPastLaunches, displayLaunchHistory);
	}

	falcon9HistoryNav.onclick = () => {
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

	cargoDragonHistoryNav.onclick = () => {
		let displayLaunchHistory = (jsonString) => {
			let allLaunches = JSON.parse(jsonString);
			let headerColumns = ["Launch Name", "Success", "Launch Details"];
			drawDatabaseTable(headerColumns);
			for (let launch of allLaunches) {
				if (launch.capsules[0]) {

					drawDatabaseRow([
						launch.name,
						launch.success,
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
	<table id="currentDatabaseDivTable" class="table table-responsive" data-sticky-header="true" style="overflow-y:scroll; max-height: 80vh;">
		<thead class="thead-dark">
			<tr>`;

	for (let column of inColumns) {
		thisTable += `
		<th>${column}</th>`;
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
		currentDatabaseDivTable.innerHTML += thisRow;
	}
}

let drawPopup = () => {

}

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
