const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

dotenv.config({path: './config.env'});

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Router folder imported.
app.use(require('./router/auth'));
app.use(require('./router/userDetails'));

// this is PORT
const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
    console.log('Port is Running in 5000');
})