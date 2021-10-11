const userModel = require('../models/Users');
const { ObjectId } = require('mongodb')


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
        let updateUser = await userModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updateUser)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deleteUser = async function(req, res, next){
    try{
        console.log("delete user");
        await userModel.findOneAndDelete({_id: req.params.id});
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
        let user = await userModel.findOne({_id: req.params._id})
        user.cart = req.body;
        user.save();
        res.status(200).send(user)
    } catch(err){
        res.status(500).send(err);
    }
}

