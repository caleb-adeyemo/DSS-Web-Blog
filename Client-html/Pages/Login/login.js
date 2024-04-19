// login.js
const loginForm = document.getElementById("login-form"); 
loginForm.addEventListener("submit", handleSubmit);

// Function to handle change
function handleChange(event) {
    
}

function toggleForms() {
    var form1 = document.getElementById('form1');
    var form2 = document.getElementById('form2');

    if (form1.classList.contains('hidden')) {
        form1.classList.remove('hidden');
        form2.classList.add('hidden');
    } else {
        form2.classList.remove('hidden');
        form1.classList.add('hidden');
    }
}

// Function to handle form submission
async function handleSubmit(e) {
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

// Function to navigate to a specific address
const navigate = (address) => {
  window.location.href = address;
};

function lifeLine(){
    console.log("Working")
}
