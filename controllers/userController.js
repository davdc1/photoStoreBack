const userModel = require('../models/Users');
const generateToken = require('../utils/generateToken');


exports.getUsers = async function(req, res, next){
    try{
        let users = await userModel.find();
        res.status(200).send(users)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getUser = async function(req, res, next){
    try{
        let user = await userModel.findOne({_id: req.params.id});
        res.status(200).send(user);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postUser = async function(req, res){
    try{
        const userItem = new userModel(req.body);
        userItem.save().then(() => res.send(userItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putUser = async function(req, res){
    try{
        let updateUser = await userModel.findOneAndUpdate({_id: req.params._id}, {$set: req.body }, {new: true})
        res.status(200).send(updateUser)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deleteUser = async function(req, res){
    try{
        await userModel.findOneAndDelete({_id: req.params._id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}

exports.addToCart = async function(req, res){
    try{
        let updateUser = await userModel.findOne({_id: req.params._id});
        let itemFound = false; 

        for(let i = 0; i < updateUser.cart.length; i++){
            if(JSON.stringify(updateUser.cart[i].productId) === JSON.stringify(req.body.productId)
            && updateUser.cart[i].idSize === req.body.idSize){
                itemFound = true;
                updateUser.cart[i].quantity = 
                updateUser.cart[i].quantity + req.body.quantity <= 10 ?
                updateUser.cart[i].quantity + req.body.quantity :
                10;
                break;
            }
        }
        if(!itemFound){
            updateUser.cart.push(req.body)
        }
        
        updateUser.save().then(() => res.status(200).send(updateUser))
        .catch((err)=> res.status(500).send(err))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.updateCart = async function(req, res){
    try{
        let user = await userModel.findOneAndUpdate({_id: req.params._id}, {cart: req.body}, {new: true})
        res.status(200).send(user)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.getUserByEmail = async function(req, res){
    try{
        let user = await userModel.findOne({email: req.body.email})
        res.status(200).send(user)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.authUser = async function(req, res){
    
    const { email, password } = req.body;
    const user = await userModel.findOne({email})

    if(user && (await user.matchPassword(password))){
        user.token = generateToken(user._id);
        res.send(user);
    }else{
        res.status(401);
        res.send('incorrect email or password');
    }
    
}

exports.createUser = async function(req, res){
    const userExist = await userModel.findOne({email: req.body.email});

    if(userExist){
        res.status(400)
        throw new Error('user already exists')
    }

    const newUser = await userModel.create(req.body)
    .catch((error) => {
        res.send(error);
    })

    if(newUser){
        newUser.token = generateToken(newUser._id)
        res.status(201).send(newUser)
    }else{
        res.status(400);
        throw new Error('invalid user data')
    }
}

