//This is just for message displays so that they don't just stack on each other
let passwordChanged = false;
let reportChanged = false;
let animeChanged = false;

//The event listeners for each section
const passwordManager = document.querySelector('#PasswordResets');
passwordManager.addEventListener('click', passwordChanges);
const reportManager = document.querySelector('#ReportInfo');
reportManager.addEventListener('click', reportActions);
const animeManager = document.querySelector('#AnimeApprovals');
animeManager.addEventListener('click', animeListActions);

//It's currently just a dummy function, but it will handle te password resets accordingly with the account storage once functional
function passwordChanges (e) {
	e.preventDefault();
	
	const resetElement = document.createElement('p');
	if (e.target.classList.contains('resetPass')) {
		const resetPhrase = document.createTextNode(e.target.parentElement.parentElement.firstElementChild.innerText + " successfully changed passwords!");
		resetElement.appendChild(resetPhrase);
		e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
	} else if (e.target.classList.contains('declineReset')) {
		const resetPhrase = document.createTextNode(e.target.parentElement.parentElement.firstElementChild.innerText + " denied password change.");
		resetElement.appendChild(resetPhrase);
		e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
	}
	if (passwordChanged == false) {
		passwordChanged = true;
		passwordManager.appendChild(resetElement);
	} else {
		passwordManager.removeChild(passwordManager.children[2])
		passwordManager.appendChild(resetElement);
	}
	
}

//This will later add an account to a stored banned array that will trigger a message if they try to sign in after
function reportActions (e) {
	e.preventDefault();
	
	const reportElement = document.createElement('p');
	if (e.target.classList.contains('BanUser')) {
		const reportPhrase = document.createTextNode(e.target.parentElement.parentElement.firstElementChild.innerText + " has been banned!");
		reportElement.appendChild(reportPhrase);
		e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
	} else if (e.target.classList.contains('DoNotBan')) {
		const reportPhrase = document.createTextNode(e.target.parentElement.parentElement.firstElementChild.innerText + " has not been banned.");
		reportElement.appendChild(reportPhrase);
		e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
	}
	if (reportChanged == false) {
		reportChanged = true;
		reportManager.appendChild(reportElement);
	} else {
		reportManager.removeChild(reportManager.children[2])
		reportManager.appendChild(reportElement);
	}
	
}

//This will simply add a new entry based on the info given when implemented later
function animeListActions (e) {
	e.preventDefault();
	
	const animeElement = document.createElement('p');
	if (e.target.classList.contains('AddAnime')) {
		const animePhrase = document.createTextNode(e.target.parentElement.parentElement.firstElementChild.innerText + " has been added to the anime list!");
		animeElement.appendChild(animePhrase);
		const animeName = e.target.parentElement.parentElement.firstElementChild.innerText;
		const animeDesc = e.target.parentElement.parentElement.children[2].innerText;
		e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
	} else if (e.target.classList.contains('IgnoreAnime')) {
		const animePhrase = document.createTextNode(e.target.parentElement.parentElement.firstElementChild.innerText + " has not been added to the anime list.");
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