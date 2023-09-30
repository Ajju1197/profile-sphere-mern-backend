import express from 'express';
const router = express.Router();
import { getAboutUserDetails, updateAboutUserDetails } from "../controllers/aboutController.js";

router.get('/aboutUserDetails', getAboutUserDetails);
router.put('/updateAboutUserDetails/:id', updateAboutUserDetails);

export default router;