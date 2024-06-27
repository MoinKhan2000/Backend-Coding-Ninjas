const fs = require('fs');
const path = require('path');

// Function to get all folders present in the current directory
const getAllFolders = (dirPath, folders = []) => {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
            folders.push(itemPath);
            getAllFolders(itemPath, folders);
        }
    }

    return folders;
};

// Function to delete all node_modules folders
const deleteNodeModules = (folders) => {
    for (const folder of folders) {
        const nodeModulesPath = path.join(folder, 'node_modules');
        if (fs.existsSync(nodeModulesPath)) {
            console.log(`Deleting node_modules folder in ${folder}`);
            fs.rmdirSync(nodeModulesPath, { recursive: true });
        }
    }
};

// Get all folders in the current directory
const folders = getAllFolders(__dirname);

// Delete all node_modules folders
deleteNodeModules(folders);

console.log('All node_modules folders deleted.');
