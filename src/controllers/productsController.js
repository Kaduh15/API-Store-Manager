const productsService = require('../services/productsService');
const erroMap = require('../utils/erroMap');

const getById = async (req, res, _next) => {
  const { id } = req.params;

  const result = await productsService.getById(id);

  res.status(erroMap.map(result.type)).json(result.data);
};

const getAll = async (_req, res, _next) => {
  const products = await productsService.getAll();

  res.status(200).json(products);
};

module.exports = {
  getAll,
  getById,
};
