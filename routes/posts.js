require('../data/database');
const express = require('express');
const router = express.Router();
const postCont = require('../controllers/postController')
const postValSchema = require('../validation/models/postValModel')
const valErrorHandler = require('../validation/errorHandlers/valErrorHandler');
const validator = require("express-joi-validation").createValidator({
    passError: true,
  });

router.get('/', postCont.getPosts);
router.get('/latest', postCont.getLatestPost);
router.get('/:id', postCont.getPost);
router.post('/', validator.body(postValSchema), valErrorHandler, postCont.postPost);
router.put('/:id', postCont.putPost);
router.delete('/:id', postCont.deletePost);

module.exports = router;

