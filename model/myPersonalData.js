const mongoose = require('mongoose');

const personalDataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: {
        city: String,
        state: String,
        pincode: Number
    },
    designation: String
});

const PersonalDataModel = mongoose.model('MYPERSONALDATA', personalDataSchema);
module.exports = PersonalDataModel;
