const jwt = require('jsonwebtoken');
const userModel = require('../models/Users');
const asyncHandler = require('express-async-handler');


//import jwt from 'jsonwebtoken';
//import userModel from '../models/Users';
//import asyncHandler from 'express-async-handler'




exports.protect = asyncHandler(async (req, res, next) => {
    let token

    console.log('protect middleWare')

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userModel.findById(decoded._id).select('-password');
            console.log('user at protected:', req.user);
            
       }
       catch(error){
        console.error(error);
        res.status(401);
        throw new Error('not authorized. invalid token')
       }
    }

    if(!token){
        console.log('no token');
        res.status(401)
        throw new Error('not authorized')
    }

    next();
})


