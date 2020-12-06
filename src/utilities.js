let displayLoading = (div) => {
	document.querySelector(div).innerHTML = "<h3 class='text-center'>Loading...</h3>";
};

let showDiv = (divToShow) => {
	document.querySelector(`#${divToShow}`).style.display = "";
}

let hideDiv = (divToHide) => {
	document.querySelector(`#${divToHide}`).style.display = "none";
}




export  { 
	displayLoading,
	showDiv,
	hideDiv
 }