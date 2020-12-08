let map;

let launchLocations = {
	kwajalein_atoll: 0,
	ksc_lc_39a: 0,
	ccafs_slc_40: 0,
	vafb_slc_4e: 0
};

let initMap = () => {
	mapboxgl.accessToken = 'pk.eyJ1IjoidHhtNTQ4MyIsImEiOiJja2hkejB2bnowaHIzMnFxcm95N21ycTZqIn0.y9S7WoalH_bFqGip7kxDew';

	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/outdoors-v11',
		center: [-120.67454147338866, 30.08484339838443],
		zoom: 2,
	});

};

let flyTo = (center, inZoom = 10) => {
	map.flyTo({center: center, zoom: inZoom});
};

let setZoomLevel = (value = 0) => {
	map.setZoom(value);
};

let setPitchAndBearing = (pitch = 0, bearing = 0) => {
	map.setPitch(pitch);
	map.setBearing(bearing);
};

let flyToDefault = () => {
	let lngLat = [-120.67454147338866, 30.08484339838443];
	flyTo(lngLat, 2);
}

let addMarker = (thisSat, className) => {
	let element = document.createElement('div');
	element.className = className;
	
	
	new mapboxgl.Marker(element)
		.setLngLat([thisSat.longitude, thisSat.latitude])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + thisSat.spaceTrack.TLE_LINE0 + '</h3><p>Launched on: ' + thisSat.spaceTrack.LAUNCH_DATE + '</p>'))
		.addTo(map);

}

let addGeneralLaunchLocation = (name, numberOfLaunches, className) => {
	let latitude, longitude;
	let launchSite_friendly;

	let element = document.createElement('div');
	element.className = className;
	
	let launchSite = name;
	switch (launchSite) {
		case "kwajalein_atoll":
			//9.048234464818664, 167.74327860315398
			//9.048138766529632, 167.74286277259336
			latitude = 9.048234464818664;
			longitude = 167.74327860315398;
			launchSite_friendly = "Kwajalein Atoll";
			break;
		case "ksc_lc_39a":
			//28.608724142882494, -80.60423669166772
			latitude = 28.608724142882494;
			longitude = -80.60423669166772;
			launchSite_friendly = "Kennedy Space Center - LC-39A"
			break;
		case "ccafs_slc_40":
			//28.562245429305698, -80.57729210229223
			latitude = 28.562245429305698;
			longitude = -80.57729210229223;
			launchSite_friendly = "Cape Caneveral Air Force Station - SLC-40"
			break;
		case "vafb_slc_4e":
			// 34.6321279150527, -120.61065970218115
			latitude = 34.6321279150527;
			longitude = -120.61065970218115;
			launchSite_friendly = "Vandenburg - SLC-4"
			break;
	}
	
	new mapboxgl.Marker(element)
		.setLngLat([longitude, latitude])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${launchSite_friendly}</h3><p>Number of Launches from here: ${numberOfLaunches}</p>`))
		.addTo(map);
	
}


let addLaunchLocation = (launch, className, flyToLocation = false) => {
	let latitude, longitude, zoom;
	let launchSite_friendly;

	let element = document.createElement('div');
	element.className = className;
	
	let launchSite = launch.launch_site.site_id;
	switch (launchSite) {
		case "kwajalein_atoll":
			//9.048234464818664, 167.74327860315398
			latitude = 9.048234464818664;
			longitude = 167.74327860315398;
			zoom = 14;
			launchSite_friendly = "Kwajalein Atoll";
			break;
		case "ksc_lc_39a":
			//28.608724142882494, -80.60423669166772
			latitude = 28.608724142882494;
			longitude = -80.60423669166772;
			zoom = 11;
			launchSite_friendly = "Kennedy Space Center - LC-39A"
			break;
		case "ccafs_slc_40":
			//28.562245429305698, -80.57729210229223
			latitude = 28.562245429305698;
			longitude = -80.57729210229223;
			zoom = 11;
			launchSite_friendly = "Cape Caneveral Air Force Station - SLC-40"
			break;
		case "vafb_slc_4e":
			// 34.6321279150527, -120.61065970218115
			latitude = 34.6321279150527;
			longitude = -120.61065970218115;
			zoom = 13;
			launchSite_friendly = "Vandenburg - SLC-4";
			break;
	}
	
	
	new mapboxgl.Marker(element)
		.setLngLat([longitude, latitude])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + launchSite_friendly + '</h3><p>Launched on: ' + 'GET LAUNCH DATE' + '</p>'))
		.addTo(map);
		
	if (flyToLocation == true) {
		let lngLat = [longitude, latitude];		
		flyTo(lngLat, zoom);
	}


}

let addLandingLocation = (launch, className) => {
	let latitude, longitude;
	let landingSite_friendly;

	let element = document.createElement('div');
	element.className = className;
	
	let launchSite = launch.launch_site.site_id;
	console.log(launchSite);
	switch (launchSite) {
		case "kwajalein_atoll":
			//9.048234464818664, 167.74327860315398
			latitude = 9.048234464818664;
			longitude = -167.74327860315398;
			launchSite_friendly = "Kwajalein Atoll";
			break;
		case "ksc_lc_39a":
			//28.608724142882494, -80.60423669166772
			latitude = 28.608724142882494;
			longitude = -80.60423669166772;
			launchSite_friendly = "Kennedy Space Center - LC-39A"
			break;
		case "ccafs_slc_40":
			//28.562245429305698, -80.57729210229223
			latitude = 28.562245429305698;
			longitude = -80.57729210229223;
			launchSite_friendly = "Cape Caneveral Air Force Station - SLC-40"
			break;
		case "vafb_slc_4e":
			// 34.6321279150527, -120.61065970218115
			latitude = 34.6321279150527;
			longitude = -120.61065970218115;
			launchSite_friendly = "Vandenburg - SLC-4"
			break;
		default: 
			break;
	}
	
	
	new mapboxgl.Marker(element)
		.setLngLat([longitude, latitude])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + launchSite_friendly + '</h3><p>Launched on: ' + 'GET LAUNCH DATE' + '</p>'))
		.addTo(map);

}

let countLaunchLocations = (launch) => {
	let launchSite = launch.launch_site.site_id;
	switch (launchSite) {
		case "kwajalein_atoll":
			launchLocations.kwajalein_atoll += 1;
			break;
		case "ksc_lc_39a":
			launchLocations.ksc_lc_39a += 1;
			break;
		case "ccafs_slc_40":
			launchLocations.ccafs_slc_40 += 1;
			break;
		case "vafb_slc_4e":
			launchLocations.vafb_slc_4e += 1;
			break;
		default: 
			break;
	}	
}

let resetPois = () => {
	launchLocations.kwajalein_atoll = 0;
	launchLocations.ksc_lc_39a = 0;
	launchLocations.ccafs_slc_40 = 0;
	launchLocations.vafb_slc_4e = 0;
	$('.poi').remove();
	$('.launch').remove();
}



export {
	initMap,
	flyTo,
	flyToDefault,
	setZoomLevel,
	setPitchAndBearing,
	addMarker,
	addLaunchLocation,
	addGeneralLaunchLocation,
	countLaunchLocations,
	launchLocations,
	resetPois
};
