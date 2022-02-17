const productModel = require('../models/Products');

//TODO:
//add pagination.

exports.getProducts = async function(req, res){
    try{
        let products, sortByObj = {};
        if(req.query.sort){
            sortByObj =
            req.query.sort.split(" ")[0] === "price" ?
            {"sizes.price": req.query.sort.split(" ")[1]} :
            {[req.query.sort.split(" ")[0]]: req.query.sort.split(" ")[1]};
        }
        if(req.query.search){
            products = await productModel
            .find({$and:[
                {[req.query.filter]: {$all: req.query.filterBy}},
                {$or:[{theme: req.query.search}, {prodName: req.query.search}]}
            ]})
            .sort(sortByObj)
        }else{
            products = await productModel
            .find({[req.query.filter]: {$all: req.query.filterBy}})
            .sort(sortByObj)
        }
        res.status(200).send(products)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getProduct = async function(req, res){
    try{
        let product = await productModel.findOne({_id: req.params.id});
        res.status(200).send(product);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postProduct = async function(req, res){
    try{
        const productItem = new productModel(req.body);
        productItem.save().then(() => res.send(productItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putProduct = async function(req, res){
    try{
        let updateProduct = await productModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updateProduct)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deleteProduct = async function(req, res){
    try{
        await productModel.findOneAndDelete({_id: req.params.id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}






