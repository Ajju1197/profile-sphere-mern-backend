import express from 'express';
import { postBlogs, updateBlogs, deleteBlogs, getAllBlogsPosts, getSingleBlog, blogLike, blogDisLike } from "../controllers/blogController.js";
import multer from 'multer';

// Image Uploads
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        // const uniqueFilename = uuidv4() + path.extname(file.originalname);
        cb(null, file.originalname); // Generate a unique filename for each uploaded image
    },
});

export const upload = multer({ storage });

const router = express.Router()

router.post('/postBlog', upload.single('image'), postBlogs);

router.put('/updateBlog/:id', upload.single('image'), updateBlogs);

router.delete('/deleteBlog/:id', deleteBlogs);

router.get('/getAllBlogs', getAllBlogsPosts);

router.get('/getSingleBlog/:id', getSingleBlog);

router.put('/likeBlog/:id', blogLike);

router.put('/disLikeBlog/:id', blogDisLike);

export default router;