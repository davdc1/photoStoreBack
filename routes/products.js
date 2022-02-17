require('../data/database');
const express = require('express');
const router = express.Router();
const productCont = require('../controllers/productController');
const productValSchema = require('../validation/models/productValModel')
const valErrorHandler = require('../validation/errorHandlers/valErrorHandler');
const validator = require("express-joi-validation").createValidator({
    passError: true,
});

router.get('/', productCont.getProducts);
router.get('/:id', productCont.getProduct);
router.post('/', validator.body(productValSchema), valErrorHandler, productCont.postProduct);
router.put('/:id', productCont.putProduct);
router.delete('/:id', productCont.deleteProduct);

module.exports = router;
