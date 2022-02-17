const orderModel = require('../models/Orders');
const userModel = require('../models/Users');

exports.getOrders = async function(req, res){
    try{
        let orders = await orderModel.find();
        res.status(200).send(orders)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getOrdersByUserId = async function(req, res){
    try{
        let orders = await orderModel.find({userId: req.params.userId})
        res.status(200).send(orders)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getOrder = async function(req, res){
    try{
        let order = await orderModel.findOne({_id: req.params.id});
        res.status(200).send(order);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postOrder = async function(req, res){
    try{
        const orderItem = new orderModel(req.body);
        orderItem.save()
        .then(async () => {
            let user = await userModel.findOneAndUpdate({_id: req.body.userId}, {cart: []}, {new: true});
            res.status(200).send(user);
        })
        .catch((error) => res.status(500).send(error))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putOrder = async function(req, res){
    try{
        let updatedOrder = await orderModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updatedOrder)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deleteOrder = async function(req, res){
    try{
        await orderModel.findOneAndDelete({_id: req.params.id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}