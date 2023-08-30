const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/conn');
const {loginAuth, signUpAuth} = require('../controllers/authController');

// Routings
router.get('/', (req, res) => {
    res.send('Hello World')
})

// Login route
router.post('/login', loginAuth);

// signup
router.post('/signup', signUpAuth);

module.exports = router;