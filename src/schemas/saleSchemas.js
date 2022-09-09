const joi = require('joi');

const salesSchema = joi.array()
  .items(
    joi.object({
      productId: joi.number().min(1).required,
      quantity: joi.number().min(1).required,
    }),
).min(1);

module.exports = {
  salesSchema,
};
