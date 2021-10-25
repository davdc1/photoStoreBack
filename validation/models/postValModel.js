const Joi = require('joi');

const postValSchema = Joi.object({
    postId: Joi.number().max(1000),
    userId:Joi.number(),
    content: Joi.string(),
    title: Joi.string(),
    date: Joi.string()
})

module.exports = postValSchema;
