import * as map from './map.js';
import * as ajax from './ajax.js';

let sats;

let init = () => {
	map.initMap();
	map.addMarkersToMap();
	setupUI();
};

let setupUI = () => {
	
	loadButton.onclick = () => {
		if (!sats) {
			loadSats();
		}
	}
};

let loadSats = () => {
	const url = "https://api.spacexdata.com/v4/starlink";
	let poiLoaded = (jsonString) => {
		sats = JSON.parse(jsonString);
		console.log(sats);
		
		for (let starlink of sats) {
			map.addMarker(starlink, "poi");
		}
	}
	
	ajax.downloadFile(url,poiLoaded);
}

export {
	init
};
