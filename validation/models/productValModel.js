const Joi = require('joi');

const commentValSchema = Joi.object({
    prodName:Joi.string(),
    rank: Joi.number(),
    theme: Joi.string(),
    imageName: Joi.string(),
    sizes: Joi.array()
})

module.exports = commentValSchema;