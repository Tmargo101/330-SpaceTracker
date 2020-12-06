import * as utilities from './utilities.js';
import * as details from './details.js';
import * as map from './map.js';

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
	databaseBreadcrumb.innerHTML = `
		<li class="breadcrumb-item"><a href="#" id="databaseHomeButton">Home</a></li>
		<li class="breadcrumb-item active" aria-current="page">Launches</li>
		`;
	databaseHomeButton.onclick = () => {
		map.resetPois();
		databaseBreadcrumb.innerHTML = `
		<li class="breadcrumb-item active" aria-current="page">Home</li>
		`;
		utilities.hideDiv("databaseDetailsView")
		utilities.hideDiv("databaseDiv");
		
		utilities.showDiv("databaseHomeDiv");
	}
};

let drawDatabaseRow = (inColumns, thisLaunch = {}, inClass = 'table-light') => {
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
		document.querySelector("tbody").innerHTML += thisRow;
	}
};

let addLinksToRow = () => {
	let detailsLinks = document.querySelectorAll('.getFlightDetails');
	detailsLinks.forEach(link =>{
		link.onclick = (e) => {
			details.drawDetailsView(e.target.dataset.value);
		}
	});
}

export {
	drawDatabaseTable,
	drawDatabaseRow,
	addLinksToRow
}
