import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        user: {
            type: Object,
            required: true,
        },
        blogId: {
            type: String,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Comment =  mongoose.model("Comment", CommentSchema);
export default Comment;