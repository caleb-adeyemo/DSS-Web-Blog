// Function to navigate to a specific address
const navigate = (address) => {
    window.location.href = address;
};

// Function to handle forgot password form submission
document.getElementById("forgot-password-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');

    try {
        const response = await fetch('http://localhost:3001/send-reset-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
            credentials: 'include'
        });

        const data = await response.json();
        if (data.success) {
            document.getElementById('message').innerText = data.message;
            navigate("/");
        } else {
            document.getElementById('message').innerText = data.message;
        }
    } catch (error) {
        console.error('Error sending reset link:', error);
    }
});