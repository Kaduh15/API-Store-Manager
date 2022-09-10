const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const validationIdSale = async (id) => {
  const saleFromId = await salesModel.getSalesById(id);

  if (!saleFromId) {
    return {
      type: 'NOT_FOUND',
      data: {
        message: 'Sale not found',
      },
    };
  }

  return saleFromId;
};

const validationIdProducts = async (salesProducts) => {
  const getProductPromises = salesProducts.map(async ({ productId }) =>
    productsModel.getProductById(productId));

  const result = await Promise.all(getProductPromises);

  const idsNotExists = result.some(({ id }) => !id);

  if (idsNotExists) {
    return {
      type: 'NOT_FOUND',
      data: {
        message: 'Product not found',
      },
    };
  }
};

module.exports = {
  validationIdSale,
  validationIdProducts,
};
