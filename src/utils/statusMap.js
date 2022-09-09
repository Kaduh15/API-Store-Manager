const status = {
  NOT_FOUND: 404,
  null: 200,
  SUCCESS_INSERT: 201,
  ERRO: 400,
  'any.required': 400,
  'string.min': 422,
  'number.min': 422,
};

const map = (type) => {
  console.log(type);
  console.log(status[String(type)]);
  return status[String(type)] || 500;
};

module.exports = { status, map };
