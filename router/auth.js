import express from 'express';
import { signUpAuth, loginAuth, logout } from '../controllers/authController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();


// signup
router.post('/signup', upload.single('profileImage'), signUpAuth);

// logout
router.put('/logout', logout);

// Login route
router.post('/login', loginAuth);

export default router;