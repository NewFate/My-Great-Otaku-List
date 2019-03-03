const editProfile = document.querySelector('#editProfile');
const profileInfoForm = document.querySelector('#ProfileInfo')

editProfile.addEventListener('click', editProfileDetails);


function editProfileDetails(e){
	e.preventDefault();
	displayInputSpace();
}

function displayInputSpace(){
	var button = document.getElementById("edit_profile");
	var inputs = profileInfoForm.children[1].children;
	console.log(profileInfoForm.children);
	if (button.innerText == "Edit Profile"){
		button.innerText = 'Save';

		for(let i=0; i<inputs.length; i++){
			console.log(inputs[i]);
			//inputs[i].parentNode.removeChild(inputs[i]);
			if(inputs[i].className == "name" ){
				inputs[i].innerHTML = "<h2>Name: </h2>";
				var nameInput = document.createElement("INPUT");
				nameInput.setAttribute("type", "text");
				nameInput.setAttribute("placeholder", "Name");
				nameInput.setAttribute("position", "absolute");
				nameInput.setAttribute("top", "200px");
				nameInput.setAttribute("left", "600px");
				inputs[i].appendChild(nameInput);
			}
			if(inputs[i].className == "email"){
				inputs[i].innerHTML = "<h2>Email: </h2>";
				var emailInput = document.createElement("INPUT");
				emailInput.setAttribute("type", "text");
				emailInput.setAttribute("placeholder", "Email");
				inputs[i].appendChild(emailInput);
			}
			if(inputs[i].className == "dob"){
				inputs[i].innerHTML = "<h2>Date of Birth: </h2>";
				var dobInput = document.createElement("INPUT");
				dobInput.setAttribute("type", "text");
				dobInput.setAttribute("placeholder", "Date of Birth");
				inputs[i].appendChild(dobInput);
			}
		}
	}
	else{
		button.innerText = "Edit Profile";
	}
	
}