import { createError } from "../error.js";
import Blog from "../model/Blog.js";
import Comment from "../model/Comment.js";
import User from '../model/userSchema.js';


export const addComment = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const {phone, work, password, cpassword, subscribers, subscribedUsers, fromGoogle, isActive, createdAt, updatedAt, ...others} = user._doc;
    const newComment = new Comment({ ...req.body, user: others });
    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (err) {
        next(err);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(res.params.id);
        const blog = await Blog.findById(res.params.id);
        if (req.user._id === comment.userId || req.user._id === blog.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted.");
        } else {
            return next(createError(403, "You can delete ony your comment!"));
        }
    } catch (err) {
        next(err);
    }
};

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ blogId: req.params.blogId });
        console.log(comments);
        res.status(200).json(comments.reverse());
    } catch (err) {
        next(err);
    }
};