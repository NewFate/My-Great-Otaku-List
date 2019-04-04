
// This function is to be called from all the views.
// It will make sure that the right upper corner
// Has the correct info on if someone is logged in or not.
// And give login/logout options.

function update(name){
	var elem = document.getElementById("l1");
	var parent = elem.parentNode;
	var ul = parent.parentNode;

	elem.parentNode.removeChild(elem);
	const anime = document.createElement("a");
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

	if(name == "admin"){
		console.log(ul);
		var admin = document.createElement("li");
		admin.setAttribute("id", "left");
		var texxt = document.createElement("a");
		texxt.innerText ='Admin Page';
		texxt.setAttribute("href", "/admin");
		admin.appendChild(texxt);
		ul.appendChild(admin);
	}
	

}