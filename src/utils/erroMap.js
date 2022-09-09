const status = {
  NOT_FOUND: 404,
  null: 200,
};

const map = (type) => status[String(type)] || 500;

module.exports = { status, map };
