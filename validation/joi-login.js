const Joi = require('@hapi/joi')

const validateLogin = user => {
    const schema = Joi.object({
        email:Joi.string()
        .email(),

        password:Joi.string()
        .min(5)
        .max(200)
        .required()
    })
return schema.validate(user);
}
   
module.exports = validateLogin
