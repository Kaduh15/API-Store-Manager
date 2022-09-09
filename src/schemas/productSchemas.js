const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
});

module.exports = { productSchema };
