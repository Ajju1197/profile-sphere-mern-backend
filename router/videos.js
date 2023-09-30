import express from 'express';
import { addVideo, addView, getByTag, getVideo, random, search, sub, trend } from "../controllers/video.js"; 
import { Authenticate } from '../verifytoken.js';
const router = express.Router();


//create a video
router.post("/", Authenticate, addVideo)
router.put("/:id", Authenticate, addVideo)
router.delete("/:id", Authenticate, addVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",Authenticate, sub)
router.get("/tags", getByTag)
router.get("/search", search)

export default router;