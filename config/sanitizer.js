
function inputSanitizer(input) {
    if (typeof input === 'string') {
        input = input.trim();
    }

    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    if (typeof input === 'string') {
        input = escapeHtml(input);
    }

    const filterUnwantedChars = (str) => {
        return str.replace(/[^a-zA-Z0-9 .,?!@#%&*()\-_=+]/g, '');
    };

    if (typeof input === 'string') {
        input = filterUnwantedChars(input);
    }

    const validateType = (input, expectedType) => {
        switch (expectedType) {
            case 'string':
                return typeof input === 'string';
            case 'number':
                return !isNaN(input);
            case 'boolean':
                return typeof input === 'boolean';
            default:
                return false;
        }
    };

    return input;
}

module.exports = inputSanitizer;
