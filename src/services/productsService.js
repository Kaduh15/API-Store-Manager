const productsModel = require('../models/productsModel');

const getById = async (id) => {
  const result = await productsModel.getById(id);

  if (!result) {
    return {
      type: 'NOT_FOUND',
      data: {
        message: 'Product not found',
      },
    };
  }

  return { type: null, data: result };
};

const getAll = async () => {
  const result = await productsModel.getAll();

  return result;
};

module.exports = {
  getAll,
  getById,
};
