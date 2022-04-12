const Joi = require('joi');

const orderValSchema = Joi.object({
    userId:Joi.string(),
    status:Joi.string(),
    paied:Joi.string(),
    date:Joi.string(),
    shippingAddress:{
        firsrName:Joi.string(),
        lastName:Joi.string(),
        country:Joi.string(),
        city:Joi.string(),
        state:Joi.string(),
        postCode:Joi.string(),
        street:Joi.string(),
        buildingNum:Joi.string(),
        email:Joi.string(),
        phone:Joi.string(),
        message:Joi.string()
    },
    billingAddress:{
        firstName:Joi.string(),
        lastName:Joi.string(),
        country:Joi.string(),
        city:Joi.string(),
        postCode:Joi.string(),
        street:Joi.string(),
        buildingNum:Joi.string(),
        email:Joi.string(),
        phone:Joi.string()
    },
    subTotal:Joi.number(),
    shippingPrice:Joi.number(),
    tax:Joi.number(),
    total:Joi.number(),
    cart:Joi.array()
})


module.exports = orderValSchema; 