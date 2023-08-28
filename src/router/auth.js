const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/conn');
const User = require('../model/userSchema');
const PersonalDataModel = require('../model/myPersonalData');
const Authenticate = require('../middleware/authenticate');

// Routings
router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: 'Please fill the field properly.' });
    }

    try {

        // Check for duplicate user
        const userExit = await User.findOne({ email: email });

        if (userExit) {
            return res.status(422).json({ error: 'email already exits.' });
        } else if (password != cpassword) {
            return res.status(422).json({ error: 'password is no matching.' });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();

            res.status(201).json({ message: 'User registered Successfully.' })
        }


    } catch (error) {
        console.log(error);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Please Enter email.' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Please Enter password.' });
        }

        const signUpUser = await User.findOne({ email: email });

        if (signUpUser) {
            const isPasswordMatch = await bcrypt.compare(password, signUpUser.password);
            const token = await signUpUser.generateAuthToken();
            console.log(token);

            if (!isPasswordMatch) {
                res.status(400).json({ error: 'Invalid Credentials' });
            }

            res.cookie("token", token, {
                expires: new Date(Date.now() + 2589000000),
                httpOnly: true,
            }).status(200).json({ message: 'User SignIn Successfully.' });

        } else {
            res.status(400).json({ error: 'Invalid Credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
});

router.get(`/aboutUserDetails`, async (req, res) => {
    try {
        const data = await PersonalDataModel.find();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/navbar', Authenticate, (req, res) => {
    res.send(req.rootUser);
    res.status(200).json({ message: 'Welcome to the about page' });
});

module.exports = router;