import express from 'express';
const router = express.Router();
import { getAllUserData, getUserData, updateUserData, deleteUserData, subscribe, unsubscribe, like, dislike} from '../controllers/userDetailsController.js';
import  {Authenticate}  from '../middleware/authenticate.js';
import { upload } from '../middleware/upload.js';

router.use(Authenticate);

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