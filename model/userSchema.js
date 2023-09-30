import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    subscribedUsers: {
        type: [String],
    },
    fromGoogle: {
        type: Boolean,
        default: false,
    },
    isActive:{
        type:Boolean,
        default:false,
    }
}, { timestamps: true }
);

const User = mongoose.model('USER', userSchema);

export default User;