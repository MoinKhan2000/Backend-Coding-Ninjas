import multer from 'multer';
import path from 'path';
// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file) {
            cb(null, './uploads/');
        }
    },
    filename: (req, file, cb) => {
        if (file) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            cb(null, file.original + '-' + uniqueSuffix + ext);
        }
    }
});

export const upload = multer({ storage })