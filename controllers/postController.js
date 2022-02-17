const postModel = require('../models/Posts');

exports.getPosts = async function(req, res){
    try{
        let posts = await postModel.find().sort('-date');
        res.status(200).send(posts)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getLatestPost = async function(req, res){
    try{
        let posts = await postModel.find().sort('-date');
        res.status(200).send(posts[0])
    }
    catch(error){
        res.status(500).send(err)
    }
}

exports.getPost = async function(req, res){
    try{
        let post = await postModel.findOne({_id: req.params.id});
        res.status(200).send(post);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postPost = async function(req, res){
    try{
        const postItem = new postModel(req.body);
        postItem.save().then(() => res.send(postItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putPost = async function(req, res){
    try{
        let updatePost = await postModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updatePost)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deletePost = async function(req, res){
    try{
        await postModel.findOneAndDelete({_id: req.params.id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}