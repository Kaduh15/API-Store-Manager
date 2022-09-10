const salesService = require('../services/salesService');
const { map: statusMap } = require('../utils/statusMap');

const createSale = async (req, res, _next) => {
  const { body } = req;

  const result = await salesService.createSale(body);

  res.status(statusMap(result.type)).json(result.data);
};

const getAll = async (_req, res, _next) => {
  const result = await salesService.getAll();

  res.status(statusMap(result.type)).json(result.data);
};

const getAllById = async (req, res, _next) => {
  const { id } = req.params;

  const { type, data } = await salesService.getAllById(id);

  res.status(statusMap(type)).json(data);
};

const deleteById = async (req, res, _next) => {
  const { id } = req.params;

  const { type, data } = await salesService.deleteById(id);

  res.status(statusMap(type)).json(data);
};

const updateSalesProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { body } = req;

  const { type, data } = await salesService.updateSalesProduct(id, body);

  res.status(statusMap(type)).json(data);
};

module.exports = {
  createSale,
  getAll,
  getAllById,
  deleteById,
  updateSalesProduct,
};
