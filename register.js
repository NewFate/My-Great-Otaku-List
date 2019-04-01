//getting the form / buttons
const loginRegister_form = document.querySelector('#login_or_register');
const login_button = document.getElementById("login");
const register_button = document.getElementById("register");

//the dummy data structures for username/passwords
//we would make a call to the server to check the user list and match the password 
// user:user and admin:admin credentials here
let users = {user: "user", admin: "admin"};

//added event listeners to the buttons
//login_button.addEventListener('click', login);
register_button.addEventListener('click', register);

function register(e) {
	e.preventDefault();
	
	const username = loginRegister_form.querySelector('#username').value;
	const email = loginRegister_form.querySelector('#email').value;
	const password = loginRegister_form.querySelector('#password').value;
	const confPassword = loginRegister_form.querySelector('#confPassword').value;
	

	//check if user is in the database
	// create account if not found
	if (!(username in users))
	{
		 //we would need to send this updated list/user detail to the server
		 //check if passwords match
		 if(password === confPassword){
			 //check if email/username is in database
			 users[username] = password;
			 alert("Created Account!");

			 if (username === "admin")
			 {
			 	window.location.href = "Admin.html";
			 }

			 else
			 {
			 	window.location.href = "User_Profile.html";
			 }
		}

		else{
			alert("Passwords don't match!");
		}

	}

	else
	{
		 alert("Username is taken!");
	}

}