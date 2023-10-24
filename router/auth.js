import express from 'express';
import { signUpAuth, loginAuth, logout } from '../controllers/authController.js';
import multer from 'multer';

const router = express.Router();


// Image Uploads
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        // const uniqueFilename = uuidv4() + path.extname(file.originalname);
        cb(null, file.originalname); // Generate a unique filename for each uploaded image
    },
});

export const upload = multer({ storage });


// signup
router.post('/signup', upload.single('profileImage'), signUpAuth);

// logout
router.put('/logout', logout);

// Login route
router.post('/login', loginAuth);

export default router;