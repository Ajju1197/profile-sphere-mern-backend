import jwt  from 'jsonwebtoken';
import User from '../model/userSchema.js';

export const Authenticate = async (req, res, next) => {
    // verify authentication.

    // console.log(req);
    const {authorization} = req.headers;
    
    if(!authorization){
        return res.status(401).json({error: 'Authorization token is required.'});
    }
    
    const token = authorization.split(' ')[1];
    
    try {
        jwt.verify(token, process.env.JWTSECRET_KEY, (err, user) =>{
            if(err) return res.status(403).json({error: 'Token is not valid!'});
            req.user = user;
            next();
        });

        // const {_id} = jwt.verify(token, process.env.JWTSECRET_KEY);

        // req.user = await User.findOne({_id}).select('_id');
        // next();
    } catch (error) {
        res.status(401).json({error: 'Request is not authorized.'});
    }
}