require('../data/database');
const express = require('express');
const router = express.Router();
const postModel = require('../models/Posts');
const postCont = require('../controllers/postController')


router.get('/', postCont.getPosts);
router.get('/:id', postCont.getPost);
router.post('/', postCont.postPost);
router.put('/:id', postCont.putPost);
router.delete('/:id', postCont.deletePost);

module.exports = router;

