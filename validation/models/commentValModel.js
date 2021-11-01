const Joi = require('joi');

const commentValSchema = Joi.object({
    userId:Joi.any(),
    postId: Joi.any(),
    content: Joi.string(),
    title: Joi.string(),
    date: Joi.string()
})

module.exports = commentValSchema;