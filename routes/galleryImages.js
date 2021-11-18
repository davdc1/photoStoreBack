require('../data/database');
const express = require('express');
const router = express.Router();
const galleryImageModel = require('../models/GalleryImages');
const galleryImageCont = require('../controllers/galleryImageController');


router.get('/',galleryImageCont.getGalleryImages);
router.get('/:id', galleryImageCont.getGalleryImage);
router.post('/', galleryImageCont.postGalleryImage);
router.put('/:id',galleryImageCont.putGalleryImage);
router.delete('/:id',galleryImageCont.deleteGalleryImage);

module.exports = router;