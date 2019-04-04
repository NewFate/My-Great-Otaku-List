//getting the form / buttons
const loginRegister_form = document.querySelector('#login_or_register');
const login_button = document.getElementById("login");
const register_button = document.getElementById("register");

const feedback = loginRegister_form.querySelector('#feedback');

//the dummy data structures for username/passwords
//we would make a call to the server to check the user list and match the password 
// user:user and admin:admin credentials here
let users = {user: "user", admin: "admin"};

//added event listeners to the buttons
login_button.addEventListener('click', login);
register_button.addEventListener('click', register);


function login(e) {
	e.preventDefault();
	
	const url = '/login';
    // The data we are going to send in our request
    let data = {
        username: loginRegister_form.querySelector('#username').value,
        password: loginRegister_form.querySelector('#password').value
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
            //console.log('Logged In')
            feedback.innerText = 'Logging in...'
            feedback.setAttribute("style", "color: green")
            
            return res.json();
            
           
        } else {
            feedback.innerText = 'Username/password incorrect!!'
            feedback.setAttribute("style", "color: red")
        	//console.log('Username/Password Incorrect!')
        	console.log(data.username)
        	console.log(data.password)
        }
        //console.log(res)
        
    }).catch((error) => {
        console.log(error)
    }).then((json) => {
        console.log("USERNAME IS");
        console.log(json.userName);
        if(json.userName == "admin"){
            window.location.href = "/admin";
        }else{
            window.location.href = "/userprofile";
        }
       
    });

}

function register(e) {
	e.preventDefault();
	window.location.href = "/register";
}