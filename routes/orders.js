require('../data/database');
const express = require('express');
const router = express.Router();
const orderModel = require('../models/Orders');
const orderCont = require('../controllers/orderController');
const orderValSchema = require('../validation/models/orderValModel')
const valErrorHandler = require('../validation/errorHandlers/valErrorHandler');
const validator = require("express-joi-validation").createValidator({
    passError: true,
});



router.get('/', orderCont.getOrders);
router.get('/:id', orderCont.getOrder);
router.get('/user/:userId', orderCont.getOrdersByUserId);
router.post('/', validator.body(orderValSchema), valErrorHandler,  orderCont.postOrder);
router.put('/:id', orderCont.putOrder);
router.delete('/:id', orderCont.deleteOrder);

module.exports = router;


