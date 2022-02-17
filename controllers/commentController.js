const commentModel = require('../models/Comments');
const { ObjectId } = require('mongodb');

exports.getComment = async function(req, res){
    try{
        let comment = await commentModel.findOne({_id: req.params.commentId});
        res.status(200).send(comment);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.getAllComments = async function(req, res){
    try{
        let comments = await commentModel.find();
        res.status(200).send(comments)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getCommentWithPost = async function(req, res){
    try{
        const comment = await commentModel.findOne({_id: req.params.commentId})
        .populate('postId');
        res.send(comment);
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.getAllCommentsWithPost = async function(req, res){
    try{
        const comments = await commentModel.find().populate('postId');
        res.send(comments);
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.getAllCommentsForPostId = async function(req, res){
    try{
        const comments = await commentModel.find({postId: req.params.postId})
        .populate('userId')
        res.send(comments);
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.postComment = async function(req, res){
    try{
        const commentItem = new commentModel(req.body);
        commentItem.userId = ObjectId(req.body.userId);
        commentItem.save().then(() => res.send(commentItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putComment = async function(req, res){
    try{
        let updateComment = await commentModel.findOneAndUpdate({_id:req.params.commentId}, {$set: req.body })
        res.status(200).send(updateComment)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deleteComment = async function(req, res){
    try{
        await commentModel.findOneAndDelete({_id: req.params.commentId});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}


