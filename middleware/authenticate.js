const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) => {
    // verify authentication.

    console.log(req);
    const {authorization} = req.headers
    
    if(!authorization){
        return res.status(401).json({error: 'Authorization token is required.'})
    }
    
    const token = authorization.split(' ')[1];
    
    try {
        const {_id} = jwt.verify(token, process.env.JWTSECRET_KEY);

        req.user = await User.findOne({_id}).select('_id');
        next();
    } catch (error) {
        res.status(401).json({error: 'Request is not authorized.'})
    }
}

module.exports = Authenticate;