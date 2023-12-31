import User from '../model/userSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { createError } from '../error.js';

// Creating the token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWTSECRET_KEY, { expiresIn: '1d' });
}


// login auth
export const loginAuth = async (req, res) => {
    const { email, password } = req.body;

    // Validation part
    if (!email || !password) return res.status(403).json({error: 'All fields are must be filled.'});

    // Checking if the email is exit
    const loginUser = await User.findOne({ email });
    if (!loginUser) return res.status(403).json({error: 'Incorrect email.'});
    
    await User.findByIdAndUpdate(loginUser._id, {$set: {isActive: true}}, { new : true})

    // Checking if the password is exit
    const match = await bcrypt.compare(password, loginUser.password);
    if (!match) return res.status(403).json({error:'Incorrect password.'});

    try {

        const token = createToken(loginUser._id);
        const expirationDate = new Date(Date.now() + 86_400_000 );
        console.log(token);
        const { password, cpassword, ...user } = loginUser._doc;

        res.cookie("auth_cookie", token, {
            httpOnly: true,
        });

        res.status(200).json({token, expiresAt: expirationDate, user, email, success:'Login is Successfull!'});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// signup auth
export const signUpAuth = async (req, res, next) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    const profileImage = req.file ? req.file.filename : '';

    console.log(profileImage);

    // Validation part
    if (!name || !email || !phone || !work || !password || !cpassword) return res.status(400).json({ error: 'All fields are must be filled.' });
    if(!profileImage) return res.json({error: 'Please Upload Image.'});
    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Email is not valid.' });
    if (!validator.isStrongPassword(password)) return res.status(400).json({ error: 'Password is not strong enough.' });
    if (password != cpassword) return res.status(400).json({ error: 'Password is not matching.' });

    // checking the user exits
    let existingUser = await User.findOne({ email });
    if (existingUser) return next(createError(400, 'Email already exits.'));

    try {
        // Hashing the passwords
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const hashCPass = await bcrypt.hash(cpassword, salt);

        // finally creating the user register data.
        const user = await new User({ ...req.body, password: hashPass, cpassword: hashCPass, profileImage });
        await user.save();
        res.status(200).json({userData:user, success: 'User registered successfully.'});

    } catch (error) {
        res.status(400).json({error: 'Something went wrong.'});
    }
}

export const logout = async (req, res) => {
    try {
        const {isActive, userId} = req.body;
        await User.findByIdAndUpdate(userId, {$set: {isActive}}, {new : true});
        res.json({message:'Logout Successfull!'});
    } catch (error) {
        res.json({error:error});
    }
}