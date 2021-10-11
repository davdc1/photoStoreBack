require('../data/database');
const express = require('express');
const router = express.Router();
const productModel = require('../models/Products');
const productCont = require('../controllers/productController');

// router.get('/', (req, res) => {
//     productModel.find({}, (err, products) => {
//         console.log('products route');
//         err ? res.status(500).send('error') : res.status(200).json(products);
//     })
// })

// router.get('/:id', (req, res) => {
//     productModel.findOne({id: req.params.id}, (err, product) => {
//         err ? /*console.log("post error:", err)*/res.status(500).send('error') : res.status(200).send(product);
//     });
// })

// router.post('/', (req, res) => {
//     const productItem = new productModel(req.body);
//     productItem.save().then(() => res.send(productItem));
// });


// router.delete('/:id', (req, res) => {
//     productModel.findOneAndDelete({id:req.params.id}, (err) => {
//         err ? res.send(err) : res.status(200).send({});
//     })
// })

// router.put('/', (req, res) => {
//     productModel.findOneAndUpdate({id:req.body.id}, {$set: req.body }, (err, updateProduct) => {
//         err ? res.status(500).send(err) : res.send(updateProduct);
//     });
// });

router.get('/', productCont.getProducts);
router.get('/:id', productCont.getProduct);
router.post('/', productCont.postProduct);
router.put('/:id', productCont.putProduct);
router.delete('/:id', productCont.deleteProduct);

module.exports = router;



//in the controller: use url module to parse url in complex requests

// var url = require("url")
// req.url
// var parsedUrl = url.parse(req.url)
