let map;

let geojson = {
	type: 'FeatureCollection',
	features: [],
};

let initMap = () => {
	mapboxgl.accessToken = 'pk.eyJ1IjoidHhtNTQ4MyIsImEiOiJja2hkejB2bnowaHIzMnFxcm95N21ycTZqIn0.y9S7WoalH_bFqGip7kxDew';

	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/light-v10',
		center: [-77.67454147338866, 43.08484339838443],
		zoom: 3,
	});

};

let addMarkersToMap = () => {
	// for (let feature of geojson.features) {
		
		// addMarker(feature.geometry.coordinates, feature.properties.title, feature.properties.description, "feature");
// 		let element = document.createElement('div');
// 		element.className = 'feature';
// 
// 		new mapboxgl.Marker(element)
// 			.setLngLat(feature.geometry.coordinates)
// 			.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>'))
// 			.addTo(map);
	// }
};


let flyTo = (center = [0, 0]) => {
	map.flyTo({ center: center });
};

let setZoomLevel = (value = 0) => {
	map.setZoom(value);
};

let setPitchAndBearing = (pitch = 0, bearing = 0) => {
	map.setPitch(pitch);
	map.setBearing(bearing);
};

let addMarker = (thisSat, className) => {
	let element = document.createElement('div');
	element.className = className;
	
	
	new mapboxgl.Marker(element)
		.setLngLat([thisSat.longitude, thisSat.latitude])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + thisSat.spaceTrack.TLE_LINE0 + '</h3><p>Launched on: ' + thisSat.spaceTrack.LAUNCH_DATE + '</p>'))
		.addTo(map);

}

export {
	initMap,
	addMarkersToMap,
	flyTo,
	setZoomLevel,
	setPitchAndBearing,
	addMarker
};
