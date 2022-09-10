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

  return { type: null, data: result };
};

const insertProduct = async ({ name }) => {
  const result = await productsModel.insertProduct(name);

  if (!result) {
    return {
      type: 'ERRO',
      data: {
        message: 'Product already exists',
      },
    };
  }

  return { type: 'SUCCESS_INSERT', data: result };
};

const updateProductById = async (id, { name }) => {
  let product = await productsModel.getById(id);

  if (!product) {
    return {
      type: 'NOT_FOUND', data: { message: 'Product not found' },
    };
  }

  await productsModel.updateProductById(id, name);
  product = await productsModel.getById(id);

  return { type: null, data: product };
};

const deleteById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    return {
      type: 'NOT_FOUND', data: { message: 'Product not found' },
    };
  }

  await productsModel.deleteById(id);

  return { type: 'DELETE_SUCCESS' };
};

const getByName = async (name) => {
  if (!name) return { type: null, data: await productsModel.getAll() };
  const result = await productsModel.getByName(name);

  return { type: null, data: result };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProductById,
  deleteById,
  getByName,
};
