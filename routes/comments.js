require('../data/database');
const express = require('express');
const router = express.Router();
const commentModel = require('../models/Comments');
const commentCont = require('../controllers/commentController')


router.get('/', commentCont.getAllComments);
router.get('/withPost', commentCont.getAllCommentsWithPost);
router.get('/:commentId', commentCont.getComment);
router.get('/withPost/:commentId', commentCont.getCommentWithPost);
router.get('/forPost/:postId', commentCont.getAllCommentsForPostId);
//router.post('/', commentCont.postComment);
//router.post('/:postRef', commentCont.postCommentWithPostRef);
router.post('/', commentCont.postComment)
router.put('/:commentId', commentCont.postComment);
router.delete('/:commentId', commentCont.deleteComment);


module.exports = router;

//http://localhost:5000/comments/6159f5717123e0f6edf4e320