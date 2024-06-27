// Import the necessary modules here.

const path = require('path');

exports.getAbsolutePath = (filePath) => {
    return path.resolve(filePath)
};
