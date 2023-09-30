import mongoose from 'mongoose';

const personalDataSchema = new mongoose.Schema({
    aboutId:String,
    name: String,
    age: Number,
    phone:Number,
    email:String,
    dob:String,
    gender:String,
    address: {
        city: String,
        state: String,
        pincode: Number
    },
    designation: String,
    image:String,
    likes:[{
        type : String,
        ref:'User',
        default : 0,
    }],
    isActive: {
        type:Boolean,
        default:false,
    },
},{timestamps:true});

const PersonalDataModel = mongoose.model('MYPERSONALDATA', personalDataSchema);
export default PersonalDataModel;
