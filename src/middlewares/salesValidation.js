const { salesSchema } = require('../schemas/saleSchemas');

const { map: statusMap } = require('../utils/statusMap');

const salesValidation = (req, res, next) => {
  const { body } = req;
  const { error } = salesSchema.validate(body);

  if (error) {
    console.log(JSON.stringify(error.details, null, 2));
    return res.status(statusMap(error.details[0].type)).json({
      message: error.details[0].message.replace(
        error.details[0].context.label,
        error.details[0].context.key,
      ),
    });
  }
  next();
};

module.exports = salesValidation;
