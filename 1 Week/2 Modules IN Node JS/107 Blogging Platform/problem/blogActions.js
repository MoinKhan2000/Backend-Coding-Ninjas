// Do not change the pre-written code.
// Make the necessary imports here.

import fs from 'fs';
export const writeBlog = (filePath, name) => {
    fs.writeFileSync(filePath, name);
}

export const publishBlog = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data
}