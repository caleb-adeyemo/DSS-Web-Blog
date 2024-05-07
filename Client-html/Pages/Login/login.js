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

        // Create an object to hold form data
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        // Send form data to the server
        const response = await fetch('http://localhost:3001/', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject),
            credentials: 'include'
        });
        if(response.ok){
            navigate('/home')
        }
        console.log(response);
    } catch (error) {
        // Log and handle any errors that occur
        console.error('There was a problem with the form submission:', error);
    }
}

// Function to handle Sign-up
async function handleSignUp(event) {
    console.log("got into teh sign up")
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target);
    const name = formData.get('name'); // Get the 'form_text_area' message
    const username = formData.get('username'); // Get the 'form_text_area' message
    const email = formData.get('email'); // Get the 'form_text_area' message
    const password = formData.get('password'); // Get the 'form_text_area' message
    const phone = formData.get('phone'); // Get the 'form_text_area' message
    
    const obj = {name, username, email, password, phone }
    // Varaibles
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
        if(response.ok){
            navigate('/')
        }
        console.log(response);
    } catch (error) {
        // Log and handle any errors that occur
        console.error('There was a problem with the form submission:', error);
    }
}