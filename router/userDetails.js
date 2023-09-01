const express = require('express');
const router = express.Router();
const {getAboutUserDetails, getAllUserData, getUserData, updateUserData, deleteUserData} = require('../controllers/userDetailsController')
require('../db/conn');
const Authenticate = require('../middleware/authenticate');

// router.use(Authenticate);

// router.get('https://profile-sphere-mern.cyclic.app/gettingTheUserDetails', (req, res) => {
//     res.send(req.rootUser);
//     res.status(200).json({ message: 'Welcome to the Nav page' });
// });

router.get(`/aboutUserDetails`, getAboutUserDetails);

router.get('/getAllSignupUserData', getAllUserData);

router.get('/getSingleSignupUserData/:id', getUserData);

router.put('/updateSingleSignupUserData/:id', updateUserData);

router.delete('/deleteSingleSignupUserData/:id', deleteUserData);

module.exports = router;