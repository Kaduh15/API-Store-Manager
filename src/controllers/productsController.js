const productsService = require('../services/productsService');
const { map: statusMap } = require('../utils/statusMap');

const getById = async (req, res, _next) => {
  const { id } = req.params;

  const result = await productsService.getById(id);

  res.status(statusMap(result.type)).json(result.data);
};

const getAll = async (_req, res, _next) => {
  const products = await productsService.getAll();

  res.status(statusMap(products.type)).json(products.data);
};

const insertProduct = async (req, res, _next) => {
  const { body } = req;

  const result = await productsService.insertProduct(body);
  res.status(statusMap(result.type)).json({ id: result.data, name: body.name });
};

const updateProductById = async (req, res, _next) => {
  const { id } = req.params;
  const { body } = req;

  const { type, data } = await productsService.updateProductById(id, body);
  res.status(statusMap(type)).json(data);
};

const deleteById = async (req, res, _next) => {
  const { id } = req.params;

  const { type, data } = await productsService.deleteById(id);

  res.status(statusMap(type)).json(data);
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProductById,
  deleteById,
};
