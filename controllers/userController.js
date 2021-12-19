const userModel = require('../models/Users');
const { ObjectId } = require('mongodb')
const generateToken = require('../utils/generateToken');

// exports.deleteUser = (req, res) => {
//     userModel.findOneAndDelete({ userId: req.params.userId }, (err) => {
//       err ? res.send(err) : res.status(200).send({});
//     });
//   };
  

exports.getUsers = async function(req, res, next){
    try{
        console.log("get users");
        let users = await userModel.find();
        console.log("getUsers");
        res.status(200).send(users)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getUser = async function(req, res, next){
    try{
        console.log("get user by id");
        let user = await userModel.findOne({_id: req.params.id});
        res.status(200).send(user);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postUser = async function(req, res, next){
    try{
        console.log("post user");
        const userItem = new userModel(req.body);
        userItem.save().then(() => res.send(userItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putUser = async function(req, res, next){
    try{
        console.log("put user");
        let updateUser = await userModel.findOneAndUpdate({_id: req.params._id}, {$set: req.body }, {new: true})
        res.status(200).send(updateUser)
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

exports.deleteUser = async function(req, res, next){
    try{
        console.log("delete user");
        await userModel.findOneAndDelete({_id: req.params._id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}

exports.addToCart = async function(req, res, next){
    try{
        console.log("add to cart");
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
        
        updateUser.save().then((res)=>console.log("save:"))
        .catch((err)=> console.log('save err:', err))
        res.status(200).send(updateUser)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.updateCart = async function(req, res, next){
    try{
        console.log("update cart");
        let user = await userModel.findOneAndUpdate({_id: req.params._id}, {cart: req.body}, {new: true})
        //user.save().catch((error) => console.log("error:", error));
        res.status(200).send(user)
    } catch(err){
        res.status(500).send(err);
        console.log("error update cart:", err);
    }
}

exports.getUserByEmail = async function(req, res, next){
    try{
        console.log("get user by email");
        let user = await userModel.findOne({email: req.body.email})
        res.status(200).send(user)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.authUser = async function(req, res, next){
    console.log("authUser")
    
    const { email, password } = req.body;
    const user = await userModel.findOne({email})
    console.log("user:::::",user);

    if(user && (await user.matchPassword(password))){
        user.token = generateToken(user._id);
        res.send(user);
    }else{
        res.status(401);
        res.send('incorrect email or password');
        console.log("incorrect email or password");
    }
    
}

exports.createUser = async function(req, res, next){
    console.log("create user")
    const userExist = await userModel.findOne({email: req.body.email})

    if(userExist){
        res.status(400)
        throw new Error('user alrady exist')
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

