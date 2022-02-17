require('../data/database');
const express = require('express');
const router = express.Router();
const commentCont = require('../controllers/commentController');
const commentValSchema = require('../validation/models/commentValModel')
const valErrorHandler = require('../validation/errorHandlers/valErrorHandler');
const validator = require("express-joi-validation").createValidator({
    passError: true,
});

router.get('/', commentCont.getAllComments);
router.get('/withPost', commentCont.getAllCommentsWithPost);
router.get('/:commentId', commentCont.getComment);
router.get('/withPost/:commentId', commentCont.getCommentWithPost);
router.get('/forPost/:postId', commentCont.getAllCommentsForPostId);
router.post('/', validator.body(commentValSchema), valErrorHandler,  commentCont.postComment)
router.put('/:commentId', commentCont.postComment);
router.delete('/:commentId', commentCont.deleteComment);

module.exports = router;
