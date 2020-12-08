import * as ajax from './ajax.js';
import * as utilities from './utilities.js';
import * as map from './map.js';

let drawDetailsView = (launchNumber) => {
	document.querySelector("#databaseDetailsView").innerHTML = "";
	utilities.displayLoading("#databaseDetailsView");
	utilities.hideDiv("databaseDiv");
	utilities.showDiv("databaseDetailsView");
	
	map.resetPois();
	
	let callback = (jsonString) => {
		let launch = JSON.parse(jsonString);
		let thisDetailsView = `
		<div class="container mt-5 text-center" id="thisDetailsView">
			<h1 class=''>${launch.mission_name}</h1>
			<img src=${launch.links.mission_patch} style="height: 300px;"></img>
		</div>
		`;
		
		document.querySelector("#databaseDetailsView").innerHTML = thisDetailsView;
		drawBreadcrumbs();
		map.addLaunchLocation(launch,'launch', true);
		


	};
	ajax.getData("https://api.spacexdata.com/v3/launches/"+launchNumber, callback);
};

let drawBreadcrumbs = () => {
	databaseBreadcrumb.innerHTML = `
	<li class="breadcrumb-item"><a href="#" id="databaseHomeButton">Home</a></li>
	<li class="breadcrumb-item"><a href="#" id="databaseBackButton">Launches</a></li>
	<li class="breadcrumb-item active" aria-current="page">Details</li>
	`;
	
	databaseHomeButton.onclick = () => {

		databaseBreadcrumb.innerHTML = `
		<li class="breadcrumb-item active" aria-current="page">Home</li>
		`;
		utilities.hideDiv("databaseDetailsView")
		utilities.hideDiv("databaseDiv");
		utilities.showDiv("databaseHomeDiv");
		map.flyToDefault();

	};
	
	databaseBackButton.onclick = () => {
		databaseBreadcrumb.innerHTML = `
		<li class="breadcrumb-item"><a href="#" id="databaseHomeButton">Home</a></li>
		<li class="breadcrumb-item active" aria-current="page">Launches</li>
		`;
		utilities.hideDiv("databaseDetailsView");		
		utilities.hideDiv("databaseHomeDiv");

		utilities.showDiv("databaseDiv");
		map.flyToDefault();

		databaseHomeButton.onclick = () => {
		
			databaseBreadcrumb.innerHTML = `
			<li class="breadcrumb-item active" aria-current="page">Home</li>
			`;
			utilities.hideDiv("databaseDetailsView")
			utilities.hideDiv("databaseDiv");
			utilities.showDiv("databaseHomeDiv");
			map.flyToDefault();

		};
	};

}

export {
	drawDetailsView
}