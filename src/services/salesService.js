const salesModel = require('../models/salesModel');

const createSale = async (sales) => {
  const getProductPromises = sales.map(async ({ productId }) =>
    salesModel.getProductById(productId));

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

  const resultSaleCreated = await salesModel.createSale();
  sales.forEach((sale) => salesModel.insertSaleProducts(resultSaleCreated.insertId, sale));

  return { type: 'SUCCESS_INSERT', data: { id: resultSaleCreated.insertId, itemsSold: sales } };
};

module.exports = {
  createSale,
};
