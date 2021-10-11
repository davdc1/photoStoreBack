require('../data/database');
const express = require('express');
const router = express.Router();
const orderModel = require('../models/Orders');
const orderCont = require('../controllers/orderController');


router.get('/', orderCont.getOrders);
router.get('/:id', orderCont.getOrder);
router.post('/', orderCont.postOrder);
router.put('/:id', orderCont.putOrder);
router.delete('/:id', orderCont.deleteOrder);

module.exports = router;


