const PersonalDataModel = require('../model/myPersonalData');
const User = require('../model/userSchema');

const getAboutUserDetails = async (req, res) => {
    console.log(req);
    try {
        const data = await PersonalDataModel.find();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Getting the all signup users data here.
const getAllUserData = async (req, res) => {
    try {
        const allSignupUsersData = await User.find();
        res.status(200).json(allSignupUsersData);
    } catch (error) {
        res.status(500).json({error:'Internal server error.'})
    }
}

// Getting the single signup user data here.
const getUserData = async (req, res) => {
    try {
        const signupUserData = await User.findById(req.params.id);
        res.json(signupUserData);
    } catch (error) {
        res.status(500).json({error:'Internal server error.'})
    }
}

// Deleting the single signup user data here.
const deleteUserData = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.json(await User.find());
    } catch (error) {
        res.status(500).json({error:'Internal server error.'})
    }
}

module.exports = {getAboutUserDetails, getAllUserData, getUserData, deleteUserData};