require('../data/database');
const express = require('express');
const router = express.Router();
const orderCont = require('../controllers/orderController');
const valErrorHandler = require('../validation/errorHandlers/valErrorHandler');
const validator = require("express-joi-validation").createValidator({
    passError: true,
});


router.get('/', orderCont.getOrders);
router.get('/:id', orderCont.getOrder);
router.get('/user/:userId', orderCont.getOrdersByUserId);
router.post('/', orderCont.postOrder);
router.put('/:id', orderCont.putOrder);
router.delete('/:id', orderCont.deleteOrder);

module.exports = router;


