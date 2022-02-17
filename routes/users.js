require('../data/database');
const express = require('express');
const router = express.Router();
const userCont = require('../controllers/userController');
const protect = require('../middleWare/authMiddleWare.js');
const userValSchema = require('../validation/models/userValModel')
const valErrorHandler = require('../validation/errorHandlers/valErrorHandler');
const validator = require("express-joi-validation").createValidator({
    passError: true,
});

router.get('/', userCont.getUsers);
router.get('/:id', userCont.getUser);
router.post('/getid', validator.body(userValSchema), valErrorHandler, userCont.getUserByEmail);
router.put('/:_id', userCont.putUser);
router.put('/addtocart/:_id', userCont.addToCart)
router.put('/updatecart/:_id', userCont.updateCart);
router.delete('/:_id', userCont.deleteUser);
router.post('/', userCont.createUser);

//experimental:
router.post('/login', userCont.authUser);
router.get('/profile/:id', protect.protect, userCont.getUser);

module.exports = router;
                    
                    
