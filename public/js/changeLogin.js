

update(); // call this on the html page.

function update(){

	// check if im logged in or not
	var elem = document.getElementById("l1");
	var parent = elem.parentNode;
	elem.parentNode.removeChild(elem);
	const anime = document.createElement("a");
	anime.setAttribute("href", "/login");
	anime.innerText = 'Login';
	parent.appendChild(anime);
}