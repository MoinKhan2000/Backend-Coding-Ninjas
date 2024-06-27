import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('public', 'uploads'))
  },

  filename: (req, file, cb) => {
    const name = Date.now() + file.originalname;
    cb(null, name)
  }

});

export default multer({ storage });
