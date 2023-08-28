const mongoose = require('mongoose');
// this MongoDB URI
const DB = process.env.DATABASE;

// Connecting the DataBase of MongoDB With Mongoose.
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB connection success');
}).catch(err => {
    console.log(err + ' ' + 'no Connection');
});