const status = {
  NOT_FOUND: 404,
  null: 200,
  SUCCESS_INSERT: 201,
  ERRO: 400,
};

const map = (type) => status[String(type)] || 500;

module.exports = { status, map };
