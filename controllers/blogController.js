import Blog from "../model/Blog.js";


export const postBlogs = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : '';
        const savedBlog = await new Blog({ ...req.body, image });
        await savedBlog.save();
        res.status(200).json(savedBlog);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const updateBlogs = async (req, res) => {
    try {
        const blogUser = await Blog.findById(req.params.id);
        if(blogUser.blogId !== req.user._id) return res.json({error:'You can only edit your blog.'});
        const {...blogFields} = req.body;
        if(req.file){
            blogFields.image = req.file.filename;
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blogFields, { new: true });
        if(!updatedBlog) return res.json({error:'User not found.'});
        res.json({updatedBlog, success:'Blog is Updated.'});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const deleteBlogs = async (req, res) => {
    try {
        const blogUser = await Blog.findById(req.params.id);
        if(blogUser.blogId !== req.user._id) return res.json({error:'You can only delete your blog.'});
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        res.json({deletedBlog, success:'Blog is Deleted.'});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getAllBlogsPosts = async (req, res) => {
    const {blog} = req.query;
    
    try {
        const regex = new RegExp(`${blog}`, 'i');
        const allBlogs = await Blog.find({
            $or: [{title : regex}]
        });
        if (!allBlogs) res.status(403).json({ error: 'No blog posts found.' });
        res.json(allBlogs.reverse());
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getSingleBlog = async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    console.log(blog)
    try {
        if (!blog) res.status(403).json({ error: 'No blog posts found.' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const blogLike = async (req, res, next) => {
    const userId = req.user._id;
    const blogId = req.params.id;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: userId },
            $push: { likes: userId },
        },{new: true});
        res.status(200).json({updatedBlog, success:"The Blog has been liked."})
    } catch (err) {
        res.status(500).json({error:'Internal server error!'})
    }
};

export const blogDisLike = async (req, res, next) => {
    const userId = req.user._id;
    const blogId = req.params.id;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: userId },
            $push:{dislikes: userId},
        },{new: true})
        res.status(200).json({updatedBlog, success:"The Blog has been liked."})
    } catch (err) {
        res.status(500).json({error:'Internal server error!'})
    }
};