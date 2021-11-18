const galleryImageModel = require('../models/GalleryImages');

exports.getGalleryImages = async function(req, res, next){
    try{
        console.log("get galleryImages");
        let galleryImages = await galleryImageModel.find();
        console.log("i'm here");
        res.status(200).send(galleryImages)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getGalleryImage = async function(req, res, next){
    try{
        console.log("get galleryImage by id");
        let galleryImage = await galleryImageModel.findOne({_id: req.params.id});
        console.log("requsted galleryImage:", galleryImage);
        res.status(200).send(galleryImage);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postGalleryImage = async function(req, res, next){
    try{
        console.log("post galleryImage");
        const galleryImageItem = new galleryImageModel(req.body);
        galleryImageItem.save().then(() => res.send(galleryImageItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putGalleryImage = async function(req, res, next){
    try{
        console.log("put galleryImage", req.params.id);
        let updateGalleryImage = await galleryImageModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updateGalleryImage)
    } catch(err){
        console.log("put err:", err);
        res.status(500).send(err);
    }
}

exports.deleteGalleryImage = async function(req, res, next){
    try{
        console.log("delete galleryImage");
        await galleryImageModel.findOneAndDelete({_id: req.params.id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}