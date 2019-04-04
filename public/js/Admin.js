//Phase 2

//This is just for message displays so that they don't just stack on each other
let reportChanged = false;
let animeChanged = false;

//ID Holders
reportIds = []

//The event listeners for each section
//const passwordManager = document.querySelector('#PasswordResets');
//passwordManager.addEventListener('click', passwordChanges);
const reportManager = document.querySelector('#ReportInfo');
reportManager.addEventListener('click', reportActions);
const animeManager = document.querySelector('#AnimeApprovals');
animeManager.addEventListener('click', animeListActions);

//Loads whatever data it needs to for the reports and Anime Requests
const reportUrl = '/report';

fetch(reportUrl)
.then((res) => {
	//Gets all reports made in database
    if (res.status === 200) {
        return res.json();
    } else {
        alert('Reports were unattainable from the database.')
    }                
})
.then((json) => {
	//Creates table rows for reports
    reportList = document.querySelector('#ReportTable')
    json.map((report) => {
		reportIds.push(report._id)
		reportBody = document.createElement('tr')
		reportee = document.createElement('td')
		reporteeText = document.createTextNode(report.reportee)
		reportee.appendChild(reporteeText)
		reportBody.appendChild(reportee)
        reporter = document.createElement('td')
		reporterText = document.createTextNode(report.reporter)
		reporter.appendChild(reporterText)
		reportBody.appendChild(reporter)
		anime = document.createElement('td')
		animeText = document.createTextNode(report.anime)
		anime.appendChild(animeText)
		reportBody.appendChild(anime)
		reason = document.createElement('td')
		reasonText = document.createTextNode(report.reason)
		reason.appendChild(reasonText)
		reportBody.appendChild(reason)
		banColumn = document.createElement('td')
		banButton = document.createElement('button')
		banButton.className = 'BanUser'
		banButtonText = document.createTextNode('Ban User')
		banButton.appendChild(banButtonText)
		banColumn.appendChild(banButton)
		reportBody.appendChild(banColumn)
		ignoreColumn = document.createElement('td')
		ignoreButton = document.createElement('button')
		ignoreButton.className = 'DoNotBan'
		ignoreButtonText = document.createTextNode('Ignore')
		ignoreButton.appendChild(ignoreButtonText)
		ignoreColumn.appendChild(ignoreButton)
		reportBody.appendChild(ignoreColumn)
        reportList.firstElementChild.appendChild(reportBody)
    })
}).catch((error) => {
    console.log(error);	
})

const requestUrl = '/suggestInfo';

fetch(requestUrl)
.then((res) => {
	//Gets all anime requests made in database
    if (res.status === 200) {
        return res.json() 
    } else {
        alert('Reports were unattainable from the database.')
    }
})
.then((json) => {
	//Creates table rows for anime requests
	//console.log(json);
    requestList = document.querySelector('#AnimeTable')
    json.map((request) => {
    //	console.log("this is the request");
    //	console.log(request);
		requestBody = document.createElement('tr')
		title = document.createElement('td')
		titleText = document.createTextNode(request.name)
		title.appendChild(titleText)
		requestBody.appendChild(title)
		description = document.createElement('td')
		descriptionText = document.createTextNode(request.description)
		description.appendChild(descriptionText)
		requestBody.appendChild(description)
		imageBlock = document.createElement('td')
		imageFile = document.createElement('img')
		imageFile.src = request.imageURL
		//console.log("THIS IMG IS");
		//console.log(imageFile.src);
		imageBlock.appendChild(imageFile)
		requestBody.appendChild(imageBlock)
		addColumn = document.createElement('td')
		addButton = document.createElement('button')
		addButton.className = 'AddAnime'
		addButtonText = document.createTextNode('Add Anime')
		addButton.appendChild(addButtonText)
		addColumn.appendChild(addButton)
		requestBody.appendChild(addColumn)
		ignoreColumn = document.createElement('td')
		ignoreButton = document.createElement('button')
		ignoreButton.className = 'IgnoreAnime'
		ignoreButtonText = document.createTextNode('Do Not Add')
		ignoreButton.appendChild(ignoreButtonText)
		ignoreColumn.appendChild(ignoreButton)
		requestBody.appendChild(ignoreColumn)
        requestList.firstElementChild.appendChild(requestBody)
    })
}).catch((error) => {
    console.log(error)
})

//This will remove a user from the database if the ban button is pressed
function reportActions (e) {
	e.preventDefault();
	
	//Removes report from database
	//console.log("HERER");
	//console.log(e.target.parentElement.parentElement.children);
	//console.log(e.target.parentElement.rowIndex);
	//const idIndex = e.target.parentElement.parentElement.children.indexOf(e.target.parentElement);
	const idIndex = e.target.parentElement.rowIndex - 1;
	
	
	const reportElement = document.createElement('p');
	if (e.target.classList.contains('BanUser')) {
		const deleteReportUrl = '/reportbyname/' + e.target.parentElement.parentElement.firstElementChild.innerText;
		//console.log("REMOVIN")
		const deleteReport = new Request(deleteReportUrl, {
	        method: 'delete'
	    });
		fetch(deleteReport)
		.then((res) => {
			if (res.status != 200) {
				alert("There was an issue in removing the report from the database")
			}
		})

		//Removes user from database
		let reportPhrase = null
		const userUrl = '/user/' + e.target.parentElement.parentElement.children[0].innerText;
		//console.log("BANING THIS GUY");
		//console.log(userUrl);
		const ban = new Request(userUrl, {
			method: 'delete'
		});
		fetch(ban)
		.then(function(res) {
			if (res.status === 200) {
				reportPhrase = document.createTextNode(e.target.parentElement.parentElement.firstElementChild.innerText + " has been banned!");
				const tableElement = e.target.parentElement.parentElement.parentElement;
				const reportNum = tableElement.children.length;
				const reportObjects = []
				for(let i = 1; i < reportNum; i++) {
					if ((tableElement.children[i].firstElementChild.innerText === e.target.parentElement.parentElement.firstElementChild.innerText)) {
						reportObjects.push(tableElement.children[i])
					}
				}
				for(let j = 0; j < reportObjects.length; j++) {
					tableElement.removeChild(reportObjects[j]);
				}
				reportElement.appendChild(reportPhrase);

			} else {
				reportPhrase = document.createTextNode("There has been an issue with the banning process.")
				reportElement.appendChild(reportPhrase);

			}
        	
		}).catch((error) => {
			console.log("THIS is the error");
			console.log(error);
			reportPhrase = document.createTextNode("There has been an issue with the banning process.")
			reportElement.appendChild(reportPhrase);
		});
	} else if (e.target.classList.contains('DoNotBan')) {
		const deleteReportUrl = '/report/' + reportIds[idIndex];
		const deleteReport = new Request(deleteReportUrl, {
	        method: 'delete'
	    });
		fetch(deleteReport)
		.then((res) => {
			if (res.status != 200) {
				alert("There was an issue in removing the report from the database")
			}
		})
		const reportPhrase = document.createTextNode(e.target.parentElement.firstElementChild.innerText + " has not been banned.");
		reportElement.appendChild(reportPhrase);
		e.target.parentElement.parentElement.removeChild(e.target.parentElement);
	}
	if (reportChanged == false) {
		reportChanged = true;
		reportManager.appendChild(reportElement);
	} else {
		reportManager.removeChild(reportManager.children[2])
		reportManager.appendChild(reportElement);
	}
	
}

//This will simply add a new entry based on the info given if it is added
function animeListActions (e) {
	e.preventDefault();
	
	//Removing request from database
	const animeName = e.target.parentElement.parentElement.firstElementChild.innerText;
	let modAnimeName = animeName.slice();
	modAnimeName = modAnimeName.replace(/ /g, "_");
	console.log("ANIME NAME IS ");
	console.log(modAnimeName);
	const deleteRequestUrl = '/suggestInfo/' + modAnimeName;
	const deleteRequest = new Request(deleteRequestUrl, {
        method: 'delete'
    });
	fetch(deleteRequest)
	.then((res) => {
		if (res.status != 200) {
			alert("There was an issue in removing the suggestion from the database")
		}
	})
	
	const animeElement = document.createElement('p');
	let animePhrase = null;
	if (e.target.classList.contains('AddAnime')){ 
		//Adding new anime to database
		const url = '/animeInfo';
		let data = {
			name: e.target.parentElement.parentElement.firstElementChild.innerText,
			description: e.target.parentElement.parentElement.children[1].innerText,
			imageURL: e.target.parentElement.parentElement.children[2].firstElementChild.src,
			averageScore: 0,
			nReviews: 0
		};
	
		const suggestion = new Request(url, {
			method: 'post', 
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
		});
	
		fetch(suggestion)
		.then(function(res) {
			if (res.status === 200) {
				animePhrase = document.createTextNode(animeName + " has been added to the anime list!");
				animeElement.appendChild(animePhrase);
           
			} else {
				animePhrase = document.createTextNode('The suggestion has failed to upload.');
				animeElement.appendChild(animePhrase);
			}
			
		}).catch((error) => {
			animePhrase = document.createTextNode('The suggestion has failed to upload.');
			animeElement.appendChild(animePhrase);
		});
		//HTML modifiers
		
		const animeDesc = e.target.parentElement.parentElement.children[2].innerText;
		e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
	} else if (e.target.classList.contains('IgnoreAnime')) {
		animePhrase = document.createTextNode(animeName + " has not been added to the anime list.");
		animeElement.appendChild(animePhrase);
		e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
	}
	if (animeChanged == false) {
		animeChanged = true;
		animeManager.appendChild(animeElement);
	} else {
		animeManager.removeChild(animeManager.children[2])
		animeManager.appendChild(animeElement);
	}
}