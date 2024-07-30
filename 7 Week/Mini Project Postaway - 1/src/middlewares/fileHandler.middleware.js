import multer from "multer";
import path from 'path';
const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, path.resolve('./uploads'))
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.originalname)
      cb(null, file.originalname + '-' + uniqueSuffix + ext)
    }
  }
)

export const upload = multer({ storage })