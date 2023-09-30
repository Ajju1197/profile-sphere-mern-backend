import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    blogId:{
        type : String,
    },
    title:{
        type:String,
        required:[true,"Please add a Title"],
    },
    comment: {
        type : String,
    },
    likes: [{
        type : String,
        ref:'User', 
        default : 0,
    }],
    dislikes:[{
        type :String,
        ref:'User', 
        default :0,
    }],
    image: {
        type:String,
    }
},{timestamps:true});

const Blog = mongoose.model('Blogs', BlogSchema);

export default Blog;