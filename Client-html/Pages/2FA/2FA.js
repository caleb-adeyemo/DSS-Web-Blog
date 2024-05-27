// Function to navigate to a specific address
const navigate = (address) => {
  window.location.href = address;
};

// Get the cookies and put them in an object
let cookieObj = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

// Set the QR code address
document.getElementById("qrcode").src = cookieObj.qrCodeImageDataUrl;

// On page load
window.onload = () => {
  const inputs = document.querySelectorAll('input[type="number"]');

  inputs.forEach((input, index) => {
      input.addEventListener('input', function () {
          if (this.value.length >= 1 && index < inputs.length - 1) {
              inputs[index + 1].focus();
          }
      });
  });

  // Focus on the first input field
  inputs[0].focus();
};

// Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get the OTP values from the form inputs
  const otpInputs = document.querySelectorAll('.input_field input[type="number"]');
  let otp = '';
  otpInputs.forEach(input => {
      otp += input.value;
  });

  // Variables
  let response = null;

  // Try to send the data
  try {
      response = await fetch('http://localhost:3001/Auth/Qrcode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otp }),
          credentials: 'include',
      });

      const { success, message } = await response.json();
      // If the request is successful
      if (success) {
          // Log the response data
          console.log(message);
          // Navigate to home
          navigate("/home");
      } else {
          console.error('Failed to submit form:', message);
      }
  } catch (error) {
      console.error('Error submitting form:', error.message);
  }
};

// Add event listener to the form
const form = document.querySelector('form').addEventListener('submit', handleSubmit);
