const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const createSale = async (sales) => {
  const getProductPromises = sales.map(async ({ productId }) =>
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

  const resultSaleCreated = await salesModel.createSale();
  sales.forEach((sale) => salesModel.insertSaleProducts(resultSaleCreated.insertId, sale));

  return { type: 'SUCCESS_INSERT', data: { id: resultSaleCreated.insertId, itemsSold: sales } };
};

const getAll = async () => {
  const sales = await salesModel.getAllSales();
  const salesProducts = await salesModel.getAllSalesProducts();

  const data = salesProducts.map((sale) => {
    const { date } = sales.find(({ id }) => id === sale.sale_id);
    const newSale = { ...sale, date };
    return newSale;
  });

  return { type: null, data };
};

module.exports = {
  createSale,
  getAll,
};
