const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    work:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    cpassword:{
        type: String,
        required: true,
    },
});

// Signup function.
userSchema.statics.signup = async function(name, email, phone, work, password, cpassword){
    // Validation part
    if (!name || !email || !phone || !work || !password || !cpassword) throw Error('All fields are must be filled.');
    // if(!validator.isEmail(email)) throw Error('Email is not valid.');
    if(!validator.isStrongPassword(password)) throw Error('Password is not strong enough.');
    if (password != cpassword) throw Error('Password is not matching.');
    
    // checking the user exits
    let existingUser = await this.findOne({email});
    if(existingUser){
        throw Error('Email already exits.');
    }

    // Hashing the passwords
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const hashCPass = await bcrypt.hash(cpassword, salt);

    // finally creating the user register data.
    const user = await this.create({name, email, phone, work, password: hashPass, cpassword:hashCPass});

    return user;
}

// Login function.
userSchema.statics.login = async function(email, password){
    // Validation part
    if (!email || !password) throw Error('All fields are must be filled.');

    // Checking if the email is exit
    const user = await this.findOne({ email })
    if(!user) throw Error('Incorrect email');
    
    // Checking if the password is exit
    const match = await bcrypt.compare(password, user.password);
    if(!match) throw Error('Incorrect password');

    return user;
}


const User = mongoose.model('USER', userSchema);

module.exports = User;