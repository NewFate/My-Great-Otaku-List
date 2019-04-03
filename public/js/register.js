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
             createUser();
			 // users[username] = password;
			 // alert("Created Account!");

			 // if (username === "admin")
			 // {
			 // 	window.location.href = "Admin.html";
			 // }

			 // else
			 // {
			 // 	window.location.href = "User_Profile.html";
			 // }
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

function createUser() {
    const url = '/register';
    // The data we are going to send in our request
    let data = {
        username: loginRegister_form.querySelector('#username').value,
        email: loginRegister_form.querySelector('#email').value,
        password: loginRegister_form.querySelector('#password').value,
        dateOfBirth: loginRegister_form.querySelector('#dateOfBirth').value
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {
        // Handle response we get from the API
        // Usually check the error codes to see what happened
        const message = document.querySelector('#message')
        if (res.status === 200) {
            console.log('Created User')
            //message.innerText = 'Success: Added a student.'
            //message.setAttribute("style", "color: green")
           
        } else {
            console.log(res)
        	console.log('Username/email has been taken!')
            //message.innerText = 'Could not add student'
            //message.setAttribute("style", "color: red")
     
        }
        //console.log(res)
        
    }).catch((error) => {
        console.log(error)
    })
}