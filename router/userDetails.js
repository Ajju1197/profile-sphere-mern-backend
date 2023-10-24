import express from 'express';
const router = express.Router();
import { getAllUserData, getUserData, updateUserData, deleteUserData, subscribe, unsubscribe, like, dislike} from '../controllers/userDetailsController.js';
import  {Authenticate}  from '../middleware/authenticate.js';
import multer from 'multer';

// Authentication for all routes
router.use(Authenticate);

// Image Uploads
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        // const uniqueFilename = uuidv4() + path.extname(file.originalname);
        cb(null, file.originalname); // Generate a unique filename for each uploaded image
    },
});

export const upload = multer({ storage });


router.get('/getAllSignupUserData', getAllUserData);

router.get('/getSingleSignupUserData/:id', getUserData);

router.put('/updateSingleSignupUserData/:id', upload.single('profileImage'), updateUserData);

router.delete('/deleteSingleSignupUserData/:id', deleteUserData);

//subscribe a user
router.put("/sub/:id", subscribe);

//unsubscribe a user
router.put("/unsub/:id", unsubscribe);

//like a video
router.put("/like/:videoId", like);

//dislike a video
router.put("/dislike/:videoId", dislike);

export default router;