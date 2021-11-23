const productModel = require('../models/Products');

//TODO:
//add pagination.

exports.getProducts = async function(req, res, next){
    try{
        console.log("getProducts");
        console.log("query.filterBy:", req.query.filterBy)
        console.log("query.search:", req.query.search)

        let products;
        let sortByObj = {};
        if(req.query.sort){
            sortByObj =
            req.query.sort.split(" ")[0] === "price" ?
            {"sizes.price": req.query.sort.split(" ")[1]} :
            {[req.query.sort.split(" ")[0]]: req.query.sort.split(" ")[1]};
        }

        console.log("sortObj:", sortByObj);
        if(req.query.search){
            console.log("here")
            products = await productModel
            .find({$and:[
                {[req.query.filter]: {$all: req.query.filterBy}},
                {$or:[{theme: req.query.search}, {prodName: req.query.search}]}
            ]})
            .sort(sortByObj)
        }else{
            console.log("there")
            products = await productModel
            .find({[req.query.filter]: {$all: req.query.filterBy}})
            .sort(sortByObj)
        }
        res.status(200).send(products)
    } catch(err){
        console.log("errror:", err)
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






