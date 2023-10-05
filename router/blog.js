import express from 'express';
import { postBlogs, updateBlogs, deleteBlogs, getAllBlogsPosts, getSingleBlog, blogLike, blogDisLike } from "../controllers/blogController.js";
import { upload } from '../middleware/upload.js';

const router = express.Router()

router.post('/postBlog', upload.single('image'), postBlogs);

router.put('/updateBlog/:id', upload.single('image'), updateBlogs);

router.delete('/deleteBlog/:id', deleteBlogs);

router.get('/getAllBlogs', getAllBlogsPosts);

router.get('/getSingleBlog/:id', getSingleBlog);

router.put('/likeBlog/:id', blogLike);

router.put('/disLikeBlog/:id', blogDisLike);

export default router;