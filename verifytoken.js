import jwt from 'jsonwebtoken';
import { createError } from './error.js';


export const Authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if(!authorization) return res.status(403).json({error: 'You are not authenticated!'});

    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWTSECRET_KEY, (err,user) =>{
        if(err) return res.status(403).json({error: 'Token is not valid!'});
        req.user = user;
        next();
    });
}