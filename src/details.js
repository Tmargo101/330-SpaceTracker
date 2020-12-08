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
			<div class="row">
				<div class="col-6">
					<h1 class=''>${launch.mission_name}</h1>
				</div>
				<div class="col-6">
					<img src=${launch.links.mission_patch} style="height: 175px;"></img>
				</div>
			</div>
			<div class="row mt-5">
				<div class="col-6">
					<h5>Launched in</h5>
					<p>${launch.launch_year}</p>
					<hr>
					<h5>Rocket Type</h5>
					<p>${launch.rocket.rocket_type}</p>
					<hr>
					<div class="row">
						<div class="col-6">
							<h5>Payload</h5>
							<p>${launch.rocket.second_stage.payloads[0].payload_id}</p>
						</div>
						<div class="col-6">
							<h5>Customer</h5>
							<p>${launch.rocket.second_stage.payloads[0].customers[0]}</p>
						</div>
					</div>
				</div>
				<div class="col-6">
					<h5>Details</h5>
					<p>${launch.details}</p>
				</div>
			</div>
			<div class="row mt-2 justify-content-center">
				<div class="col-6">
					<h4>Launch Video</h4>
				</div>
			</div>
			<div class="row mt-1 justify-content-center">
				<div class="col-xl-6 col-lg-9 embed-responsive embed-responsive-16by9">
					<iframe class="embed-responsive-item" id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/${launch.links.youtube_id}" frameborder="0"></iframe>
				</div>
			</div>
			
			
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
	<li class="breadcrumb-item">Home</li>
	<li class="breadcrumb-item"><a href="#" id="databaseBackButton">Launches</a></li>
	<li class="breadcrumb-item active" aria-current="page">Details</li>
	`;
	
// 	databaseHomeButton.onclick = () => {
// 
// 		databaseBreadcrumb.innerHTML = `
// 		<li class="breadcrumb-item active" aria-current="page">Home</li>
// 		`;
// 		utilities.hideDiv("databaseDetailsView")
// 		utilities.hideDiv("databaseDiv");
// 		utilities.showDiv("databaseHomeDiv");
// 		map.flyToDefault();
// 
// 	};
	
	databaseBackButton.onclick = () => {
		databaseBreadcrumb.innerHTML = `
		<li class="breadcrumb-item">Home</li>
		<li class="breadcrumb-item active" aria-current="page">Launches</li>
		`;
		utilities.hideDiv("databaseDetailsView");		
		utilities.hideDiv("databaseHomeDiv");

		utilities.showDiv("databaseDiv");
		map.flyToDefault();

// 		databaseHomeButton.onclick = () => {
// 		
// 			databaseBreadcrumb.innerHTML = `
// 			<li class="breadcrumb-item active" aria-current="page">Home</li>
// 			`;
// 			utilities.hideDiv("databaseDetailsView")
// 			utilities.hideDiv("databaseDiv");
// 			utilities.showDiv("databaseHomeDiv");
// 			map.flyToDefault();
// 
// 		};
	};

}

export {
	drawDetailsView
}