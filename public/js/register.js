//getting the form / buttons
const loginRegister_form = document.querySelector('#login_or_register');
const login_button = document.getElementById("login");
const register_button = document.getElementById("register");

const feedback = loginRegister_form.querySelector('#feedback');
//data structures for username/passwords
//we would make a call to the server to check the user list and match the password 
// user:user and admin:admin credentials are included in our db


//added event listeners to the buttons
register_button.addEventListener('click', register);

function register(e) {
	e.preventDefault();
	
	const username = loginRegister_form.querySelector('#username').value;
	const email = loginRegister_form.querySelector('#email').value;
	const password = loginRegister_form.querySelector('#password').value;
	const confPassword = loginRegister_form.querySelector('#confPassword').value;
    const dateOfBirth = loginRegister_form.querySelector('#dateOfBirth').value;

    
	
	//check if user is in the database
	// create account if not found
	 
    var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

    //check if fields are empty in form
    if(dateOfBirth === "" || username === "" || email === ""){
        feedback.innerText = 'Please fill in the fields!'
        feedback.setAttribute("style", "color: red")
    }

    else{
        

        if(pattern.test(dateOfBirth)){
            
            //we would need to send this updated list/user detail to the server
            //check if passwords match
            if(password === confPassword ){
               //check if email/username is in database
                
                if(password != "" || confPassword != "")    {
                   
                    feedback.innerText = 'Creating account...'
                    feedback.setAttribute("style", "color: green")
                    createUser();

                }

                else{
                    feedback.innerText = 'Please enter a password!'
                    feedback.setAttribute("style", "color: red")
                    

                }   
            }

            else{
                feedback.innerText = 'Passwords need to match!'
                feedback.setAttribute("style", "color: red")
               
            }

        }

        else{

            feedback.innerText = 'Invalid date!'
            feedback.setAttribute("style", "color: red")
            
        }

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
            
            
            window.location.href = '/login';
        } else {
        	

            feedback.innerText = 'Username/email already taken/ is invalid!'
            feedback.setAttribute("style", "color: red")
          
     
        }
      
        
    }).catch((error) => {
        feedback.innerText = 'Server error!'
    })
}