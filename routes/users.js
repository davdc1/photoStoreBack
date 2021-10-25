require('../data/database');
const express = require('express');
const router = express.Router();
const userModel = require('../models/Users');
const userCont = require('../controllers/userController');
const protect = require('../middleWare/authMiddleWare.js');
//import protect from ('../middleWare/authMiddleWare.js')

router.get('/', userCont.getUsers);
router.get('/:id', userCont.getUser);
// router.post('/', userCont.postUser);
router.post('/getid', userCont.getUserByEmail);
router.put('/:id', userCont.putUser);
router.put('/addtocart/:_id', userCont.addToCart)
router.put('/updatecart/:_id', userCont.updateCart);
router.delete('/:id', userCont.deleteUser);

//experimental:
router.post('/login', userCont.authUser);
router.get('/profile/:id', protect.protect, userCont.getUser);
router.post('/', userCont.createUser);

// router.delete('/:_id', (req, res) => {
//     console.log("delete user");
//     userModel.findOneAndDelete({_id:req.params.id}, (err) => {
//         err ? res.send(err) : res.status(200).send({});
//     })
// })

module.exports = router;
                    
                    
