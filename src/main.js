import * as map from './map.js';
import * as ajax from './ajax.js';

let sats;
let currentState = {
	prefix: "txm5483-",
	searchTerm: null,

};
let endpoints = {
	getAllStarlinkSats: "https://api.spacexdata.com/v4/starlink",
	getAllPastLaunches: "https://api.spacexdata.com/v3/launches/past",
	getOneLaunch: "https://api.spacexdata.com/v3/launches/",
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
		
	databaseHomeButton.onclick = () => {
		hideDiv("databaseDiv");
		
		showDiv("databaseHomeDiv");
	}
	
	databaseBackButton.onclick = () => {
		hideDiv("databaseDetailsView");
		hideDiv("databaseHomeDiv");
		
		showDiv("databaseDiv");

	}


	falcon1HistoryNav.onclick = () => {
		displayLoading('#databaseDiv');
		let displayLaunchHistory = (jsonString) => {
			let allLaunches = JSON.parse(jsonString);
			let headerColumns = ["Launch Name", "Success", "Launch Details"];
			drawDatabaseTable(headerColumns);
			for (let launch of allLaunches) {
				drawDatabaseRow([
					`<a href="#" class="getFlightDetails" data-value="${launch.flight_number}">${launch.mission_name}</a>`,
					launch.launch_success,
					launch.details,
					
				],launch)
			}
			let detailsLinks = document.querySelectorAll('.getFlightDetails');
			detailsLinks.forEach(link =>{
				link.onclick = (e) => {
					console.log(e.target.dataset.value);
					drawDetailsView(e.target.dataset.value);
				}
			});

		}
		hideDiv("databaseHomeDiv");
		showDiv("databaseDiv");
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
					`<a href="#" class="getFlightDetails" data-value="${launch.flight_number}">${launch.mission_name}</a>`,
					launch.launch_success,
					launch.details,
					launch.rocket.first_stage.cores[0].core_serial
					//`<a href="#">${launch.rocket.first_stage.cores[0].core_serial}</a>`,

				],launch);
			}
			
			let detailsLinks = document.querySelectorAll('.getFlightDetails');
			detailsLinks.forEach(link =>{
				link.onclick = (e) => {
					console.log(e.target.dataset.value);
					drawDetailsView(e.target.dataset.value);
				}
			});

		}
		hideDiv("databaseHomeDiv");
		showDiv("databaseDiv");
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
					`<a href="#" class="getFlightDetails" data-value="${launch.flight_number}">${launch.mission_name}</a>`,
					launch.launch_success,
					launch.details
				],launch)
			}
			let detailsLinks = document.querySelectorAll('.getFlightDetails');
			detailsLinks.forEach(link =>{
				link.onclick = (e) => {
					console.log(e.target.dataset.value);
					drawDetailsView(e.target.dataset.value);
				}
			});

		}
		hideDiv("databaseHomeDiv");
		showDiv("databaseDiv");
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

let drawDatabaseRow = (inColumns, thisLaunch = {}, inClass = 'table-light') => {
	console.log(thisLaunch);
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
		// thisRow += `</tr>
		// <!-- Modal -->
		// <div class="modal fade" id="flightDetailsDiv${thisLaunch.flight_number}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		//   <div class="modal-dialog modal-dialog-centered" role="document">
		// 	<div class="modal-content">
		// 	  <div class="modal-header">
		// 		<h5 class="modal-title" id="exampleModalLongTitle">${thisLaunch.mission_name}</h5>
		// 		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		// 		  <span aria-hidden="true">&times;</span>
		// 		</button>
		// 	  </div>
		// 	  <div class="modal-body">
		// 		<p>Details: ${thisLaunch.details}</p>
		// 		<a href="${thisLaunch.links.video_link}">Link to Launch Video</a>
		// 		
		// 	  </div>
		// 	</div>
		//   </div>
		// </div>
		// `
		console.log(thisRow);
		document.querySelector("tbody").innerHTML += thisRow;
	}
}

// let divFlip = (divToHide, divToShow) => {
// 	document.querySelector(`#${divToShow}`).style.display = "";
// };

let showDiv = (divToShow) => {
	document.querySelector(`#${divToShow}`).style.display = "";
}

let hideDiv = (divToHide) => {
	document.querySelector(`#${divToHide}`).style.display = "none";
}

let drawDatabseControls = () => {
	databaseControls.innerHTML = `
	<button>
	`
};

let drawDetailsView = (launchNumber) => {
	document.querySelector("#databaseDetailsView").innerHTML += "";
	hideDiv("databaseDiv");
	showDiv("databaseDetailsView");
	
	let callback = (jsonString) => {
		let launch = JSON.parse(jsonString);
		console.log(launch);
		let thisDetailsView = `
		<div id="#thisDetailsView">
			<p>${launch.mission_name}</p>
		</div>
		`;
		document.querySelector("#databaseDetailsView").innerHTML += thisDetailsView;
	};
	ajax.getData(endpoints.getOneLaunch+launchNumber, callback);
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
