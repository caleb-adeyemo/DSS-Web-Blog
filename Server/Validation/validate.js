// Function to sanitize message input
function sanitizeMessage(message) {
    // Trim whitespace from the beginning and end of the message
    const trimmedMessage = message.trim();

    // Validate message length (e.g., maximum 280 characters)
    if (trimmedMessage.length > 280) {
        return null; // Invalid message format
    }
    // Sanitize message to remove potentially harmful characters
    const sanitizedMessage = trimmedMessage.replace(/[^\w\s]/gi, '');
    return sanitizedMessage;
}

module.exports = {sanitizeMessage};