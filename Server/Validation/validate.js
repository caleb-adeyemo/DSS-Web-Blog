// Function to sanitize message input
function sanitizeMessage(message) {
    // Trim whitespace from the beginning and end of the message
    const trimmedMessage = message.trim();

    // Validate message length (e.g., maximum 280 characters)
    if (trimmedMessage.length > 280) {
        return null; // Message Too Long
    }

    // Encode special characters using URL encoding
    const encodedMessage = encodeURIComponent(trimmedMessage);

    return encodedMessage;
}

module.exports = { sanitizeMessage };