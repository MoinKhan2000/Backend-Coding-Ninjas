import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the directory exists and handle cases where file might be undefined
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    if (file) {
      // Generate a unique filename with a timestamp and random number
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + '-' + uniqueSuffix + ext);
    } else {
      cb(new Error('No file provided'));
    }
  }
});

// Export the multer upload instance
export const upload = multer({ storage });
