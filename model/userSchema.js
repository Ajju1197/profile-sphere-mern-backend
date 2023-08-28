const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    tokens:[
        {
            token:{
                type: String,
                required: true,
            }
        }
    ]
});

// Protecting the password of user
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hashSync(this.password , 12 );
        this.cpassword = await bcrypt.hashSync(this.cpassword , 12 ); 
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    const uniqToken = await jwt.sign({_id : this._id}, process.env.JWTSECRET_KEY);
    this.tokens = this.tokens.concat({token: uniqToken});
    this.save();
    return uniqToken;
}

const User = mongoose.model('USER', userSchema);

module.exports = User;