import multer from 'multer';
import path from 'path';

// Image Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Specify the directory where uploaded images will be stored
    },
    filename: function (req, file, cb) {
        // const uniqueFilename = uuidv4() + path.extname(file.originalname);
        cb(null, file.originalname); // Generate a unique filename for each uploaded image
    },
});

export const upload = multer({ storage });