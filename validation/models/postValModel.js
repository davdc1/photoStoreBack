const Joi = require('joi');

const postValSchema = Joi.object({
    userId:Joi.any(),
    content: Joi.string(),
    title: Joi.string(),
    date: Joi.string()
})

module.exports = postValSchema;
