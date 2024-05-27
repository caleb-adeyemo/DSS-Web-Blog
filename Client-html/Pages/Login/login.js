// login.js

// Function to navigate to a specific address
const navigate = (address) => {
    window.location.href = address;
};

// Function to toggle btw Login form and signup form
function toggleForms() {
    var form1 = document.getElementById('form1');
    var form2 = document.getElementById('form2');

    if (form1.style.display === 'none') {
        form1.style.display = 'flex';
        form2.style.display = 'none';
    } else {
        form1.style.display = 'none';
        form2.style.display = 'flex';
    }
}
// Event liseners
const loginForm = document.getElementById("login-form").addEventListener("submit", handleLogin);; 
const signupForm = document.getElementById("signup-form").addEventListener("submit", handleSignUp);; 


// Function to handle Log-in
async function handleLogin(e) {
    try {

        // Prevent the default form submission behavior
        e.preventDefault();

        // Get the form data directly from the event target
        const formData = new FormData(e.target);

        // Get the 'username' value
        const username = formData.get('username');
        // Get the 'password' value 
        const password = formData.get('password'); 

        // Create an object to hold all the form information
        const obj = {username, password}

        // Send form data to the server
        let response = await fetch('http://localhost:3001/', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
            credentials: 'include'
        });

        // Get the response from the Server; True/False
        const {success, message} = await response.json();
        if(success){
            navigate('/2fa')
        }else{
            console.log(message)
        }
    } catch (error) {
        // Log and handle any errors that occur
        console.error('There was a problem with the form submission:', error);
    }
}

// Function to handle Sign-up
async function handleSignUp(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get the 'FormData' Object
    const formData = new FormData(event.target);

    // Get the 'name' value
    const name = formData.get('name');
    // Get the 'username' value
    const username = formData.get('username');
    // Get the 'email' value
    const email = formData.get('email');
    // Get the 'password' value
    const password = formData.get('password');
    // Get the 'phone' value
    const phone = formData.get('phone');

    // Create and Object to hold all the form information
    const obj = {name, username, email, password, phone }

    // Response from the Server
    let response = null;
      
    // Try to send the data
    try {
        let url = ['http://localhost:3001/user/create_account'];
        response =await fetch(url[0], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
            credentials: 'include',
        })
        
        // Get the response from the Server; True/False
        const {success, msg} = await response.json()
        if(success){
            navigate('/')
        }else{
            console.log(msg)
        }
    } catch (error) {
        // Log and handle any errors that occur
        console.error('There was a problem with the form submission:', error);
    }
}