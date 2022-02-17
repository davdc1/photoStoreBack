const galleryImageModel = require('../models/GalleryImages');

exports.getGalleryImages = async function(req, res, next){
    try{
        let galleryImages = await galleryImageModel.find();
        res.status(200).send(galleryImages)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getGalleryImage = async function(req, res, next){
    try{
        let galleryImage = await galleryImageModel.findOne({_id: req.params.id});
        res.status(200).send(galleryImage);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postGalleryImage = async function(req, res, next){
    try{
        const galleryImageItem = new galleryImageModel(req.body);
        galleryImageItem.save().then(() => res.send(galleryImageItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putGalleryImage = async function(req, res, next){
    try{
        let updateGalleryImage =
        await galleryImageModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updateGalleryImage)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deleteGalleryImage = async function(req, res, next){
    try{
        await galleryImageModel.findOneAndDelete({_id: req.params.id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}