const orderModel = require('../models/Orders');

exports.getOrders = async function(req, res, next){
    try{
        let orders = await orderModel.find();
        console.log("get orders");
        res.status(200).send(orders)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getOrdersByUserId = async function(req, res, next){
    console.log("getOrdersByUserId");
    try{
        let orders = await orderModel.find({userId: req.params.userId})
        // .populate('userId')
        // .populate({path: 'cart', populate: {path: '{}', populate:{path:'_id'}}});
        // .populate({path: 'cart', populate: {path: 'productId'}})
        console.log("get orders");
        res.status(200).send(orders)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getOrder = async function(req, res, next){
    try{
        console.log("get order by id");
        let order = await orderModel.findOne({_id: req.params.id});
        res.status(200).send(order);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postOrder = async function(req, res, next){
    try{
        console.log("post order");
        const orderItem = new orderModel(req.body);
        orderItem.save().then(() => res.send(orderItem))
    } catch(err){
        console.log("error:", err);
        res.status(500).send(err);
    }
}

exports.putOrder = async function(req, res, next){
    try{
        console.log("put order");
        let updateOrder = await orderModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updateOrder)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deleteOrder = async function(req, res, next){
    try{
        console.log("delete order:", req.params);
        await orderModel.findOneAndDelete({_id: req.params.id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}