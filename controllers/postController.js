const postModel = require('../models/Posts');

exports.getPosts = async function(req, res, next){
    try{
        console.log("get posts");
        let posts = await postModel.find();
        console.log("i'm here");
        res.status(200).send(posts)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getPost = async function(req, res, next){
    try{
        console.log("get post by id");
        let post = await postModel.findOne({_id: req.params.id});
        console.log("requsted post:", post);
        res.status(200).send(post);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postPost = async function(req, res, next){
    try{
        console.log("post post");
        const postItem = new postModel(req.body);
        postItem.save().then(() => res.send(postItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putPost = async function(req, res, next){
    try{
        console.log("put post", req.params.id);
        let updatePost = await postModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updatePost)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deletePost = async function(req, res, next){
    try{
        console.log("delete post");
        await postModel.findOneAndDelete({_id: req.params.id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}