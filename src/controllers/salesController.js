const salesService = require('../services/salesService');
const { map: statusMap } = require('../utils/statusMap');

const createSale = async (req, res, _next) => {
  const { body } = req;

  const result = await salesService.createSale(body);
  res.status(statusMap(result.type)).json({ ...result.data });
};

const getAll = async (_req, _res, _next) => {
  const result = await salesService.getAll();

  _res.status(statusMap(result.type)).json(result.data);
};

module.exports = {
  createSale,
  getAll,
};
