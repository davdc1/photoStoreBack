const productModel = require('../models/Products');

exports.getProducts = async function(req, res, next){
    try{
        let products = await productModel.find();
        console.log("get Products");
        res.status(200).send(products)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getProduct = async function(req, res, next){
    try{
        console.log("get product by id");
        let product = await productModel.findOne({_id: req.params.id});
        res.status(200).send(product);
    } catch(err){
        console.log("error:", err)
        res.status(500).send(err);
    }
}

exports.postProduct = async function(req, res, next){
    try{
        console.log("post product");
        const productItem = new productModel(req.body);
        productItem.save().then(() => res.send(productItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putProduct = async function(req, res, next){
    try{
        console.log("put product");
        let updateProduct = await productModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updateProduct)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deleteProduct = async function(req, res, next){
    try{
        console.log("delete product:", req.params);
        await productModel.findOneAndDelete({_id: req.params.id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}