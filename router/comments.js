import express from 'express';
import { addComment, getComments, deleteComment } from '../controllers/comment.js';
import { Authenticate } from '../verifytoken.js';
const router = express.Router();

router.post('/', Authenticate, addComment);
router.get('/:videoId', getComments);
router.delete('/:id', Authenticate, deleteComment);

export default router;