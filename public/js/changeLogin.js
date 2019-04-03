

function update(name){
	//console.log("HERE?");
	// check if im logged in or not
	var elem = document.getElementById("l1");
	var parent = elem.parentNode;
	elem.parentNode.removeChild(elem);
	const anime = document.createElement("a");
	//console.log("LENGHT");
	//console.log(name.length);
	if(name.length == 0){
		anime.setAttribute("href", "/login");
		anime.innerText = 'Login';
	}else{
		anime.setAttribute("href", "/logout");
		anime.innerText = 'Logout';
	}

	parent.appendChild(anime);
	
	elem = document.getElementById("l2");
	parent = elem.parentNode;

	if(name.length == 0){
		elem.parentNode.removeChild(elem);
	}

}