// Function to navigate to a specific address
const navigate = (address) => {
    window.location.href = address;
};

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageElement = document.getElementById('message');
const form = document.getElementById('passwordResetForm');

// Get email from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
if (email) {
    emailInput.value = email;
}
const token = urlParams.get('token');

if (token){
    // Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const newPassword = formData.get('password');

    // Send reset password request to server
    const response = await fetch('http://localhost:3001/send-reset-link/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword })
    });

    const data = await response.json();

    messageElement.textContent = data.msg;

    // If password successfully reset. Navigate tot he login page
    if (data.success){
        navigate("/");
    }
});
}
