const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWTSECRET_KEY, {expiresIn : '3d'});
}


// login auth
const loginAuth = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// signup auth
const signUpAuth = async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    try {
        const user = await User.signup(name, email, phone, work, password, cpassword);

        // Create a token
        const token = createToken(user._id);

        res.status(200).json({email,token, user });

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {loginAuth, signUpAuth};