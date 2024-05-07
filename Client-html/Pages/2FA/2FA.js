// Get the cookies and put em in an object
let cookeObj = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key,value]) =>({...accumulator, [key.trim()]: decodeURIComponent(value)}),{});

// Set the qrcode address
document.getElementById("qrcode").src = cookeObj.qrCodeImageDataUrl

// On page load
window.onload = () => {
    
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length >= 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
    });

    // Focus on the first input field
    inputs[0].focus();
};
