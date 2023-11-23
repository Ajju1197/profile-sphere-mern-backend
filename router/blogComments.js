import express from 'express';
import { addComment, getComments, deleteComment } from '../controllers/blogCommentController.js';

const router = express.Router();

router.post('/addComment', addComment);
router.get('/getBlogComment/:blogId', getComments);
router.delete('deleteBlogComment/:blogId', deleteComment);

export default router;