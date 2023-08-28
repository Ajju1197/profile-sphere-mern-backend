const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const verifyToken = jwt.verify(token, process.env.JWTSECRET_KEY);

        const rootUser = await User.findOne({_id:verifyToken, "tokens.token": token});

        if(!rootUser) throw new Error('User Not Found');

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        console.log(rootUser, token);
        next();
    } catch (error) {
        res.status(401).send('Unauthorized : No token Provided')
        console.log(error);
    }
}

module.exports = Authenticate;