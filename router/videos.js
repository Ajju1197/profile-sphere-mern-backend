import express from 'express';
import { addVideo, addView, getByTag, getVideo, random, search, sub, trend } from "../controllers/video.js"; 
const router = express.Router();


//create a video
router.post("/", addVideo)
router.put("/:id", addVideo)
router.delete("/:id", addVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", sub)
router.get("/tags", getByTag)
router.get("/search", search)

export default router;