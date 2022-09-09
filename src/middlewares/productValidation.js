const { productSchema } = require('../schemas/productSchemas');

const { map: statusMap } = require('../utils/statusMap');

const productValidation = (req, res, next) => {
  const { body } = req;
  const validation = productSchema.validate(body);

  if (validation.error) {
    return res
      .status(statusMap(validation.error.details[0].type))
      .json({ message: validation.error.details[0].message });
  }
  next();
};

module.exports = productValidation;
