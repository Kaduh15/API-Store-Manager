const productsService = require('../services/productsService');
const { map: statusMap } = require('../utils/erroMap');

const getById = async (req, res, _next) => {
  const { id } = req.params;

  const result = await productsService.getById(id);

  res.status(statusMap(result.type)).json(result.data);
};

const getAll = async (_req, res, _next) => {
  const products = await productsService.getAll();

  res.status(200).json(products);
};

const insertProduct = async (req, res, _next) => {
  const { body } = req;

  const result = await productsService.insertProduct(body);
  res.status(statusMap(result.type)).json({ id: result.data, name: body.name });
};

module.exports = {
  getAll,
  getById,
  insertProduct,
};
