//getting the form / buttons
const loginRegister_form = document.querySelector('#login_or_register');
const login_button = document.getElementById("login");
const register_button = document.getElementById("register");

//the dummy data structures for username/passwords
//we would make a call to the server to check the user list and match the password 
// user:user and admin:admin credentials here
let users = {user: "user", admin: "admin"};

//added event listeners to the buttons
login_button.addEventListener('click', login);
register_button.addEventListener('click', register);


function login(e) {
	e.preventDefault();
	
	const username = loginRegister_form.querySelector('#username').value;
	const password = loginRegister_form.querySelector('#password').value;
	console.log(password);

	//check if user is in the database
	if (username in users)
	{	
		 if(users[username] == password)
		 {
		 	alert("Welcome back " + username + "!");
		 	 if (username === "admin")
			 {
			 	window.location.href = "Admin.html";
			 }

			 else
			 {
			 	window.location.href = "User_Profile.html";
			 }
		 }
		 else
		 {
		 	alert("Password incorrect!");
		 }
	}

	else
	{
		 alert("Username not found!");
	}

}

function register(e) {
	e.preventDefault();
	window.location.href = "/register";
}