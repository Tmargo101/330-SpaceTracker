import * as ajax from './ajax.js';
import * as utilities from './utilities.js';

let drawDetailsView = (launchNumber) => {
	document.querySelector("#databaseDetailsView").innerHTML = "";
	utilities.displayLoading("#databaseDetailsView");
	utilities.hideDiv("databaseDiv");
	utilities.showDiv("databaseDetailsView");
	
	let callback = (jsonString) => {
		let launch = JSON.parse(jsonString);
		let thisDetailsView = `
		<div id="#thisDetailsView">
			<p>${launch.mission_name}</p>
		</div>
		`;
		document.querySelector("#databaseDetailsView").innerHTML = "";
		document.querySelector("#databaseDetailsView").innerHTML += thisDetailsView;
		databaseBreadcrumb.innerHTML = `
		<li class="breadcrumb-item"><a href="#" id="databaseHomeButton">Home</a></li>
		<li class="breadcrumb-item"><a href="#" id="databaseBackButton">Launches</a></li>
		<li class="breadcrumb-item active" aria-current="page">Details</li>
		`;
		
		databaseHomeButton.onclick = () => {
			console.log("Go Home Pressed");

			databaseBreadcrumb.innerHTML = `
			<li class="breadcrumb-item active" aria-current="page">Home</li>
			`;
			utilities.hideDiv("databaseDetailsView")
			utilities.hideDiv("databaseDiv");
			utilities.showDiv("databaseHomeDiv");
		};
		
		databaseBackButton.onclick = () => {
			databaseBreadcrumb.innerHTML = `
			<li class="breadcrumb-item"><a href="#" id="databaseHomeButton">Home</a></li>
			<li class="breadcrumb-item active" aria-current="page">Launches</li>
			`;
			utilities.hideDiv("databaseDetailsView");		
			utilities.hideDiv("databaseHomeDiv");
	
			utilities.showDiv("databaseDiv");
			
			databaseHomeButton.onclick = () => {
			
				databaseBreadcrumb.innerHTML = `
				<li class="breadcrumb-item active" aria-current="page">Home</li>
				`;
				utilities.hideDiv("databaseDetailsView")
				utilities.hideDiv("databaseDiv");
				utilities.showDiv("databaseHomeDiv");
			};
		};


	};
	ajax.getData("https://api.spacexdata.com/v3/launches/"+launchNumber, callback);
};

export {
	drawDetailsView
}