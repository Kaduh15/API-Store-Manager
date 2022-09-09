const camelize = require('camelize');

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
    return camelize(newSale);
  });

  return { type: null, data };
};

const getAllById = async (id) => {
  const { date } = await salesModel.getSalesById(id);
  console.log('🚀 ~ file: salesService.js ~ line 42 ~ getAllById ~ date', date);
  const salesProducts = await salesModel.getAllSalesProductsById(id);
  console.log('🚀 ~ file: salesService.js ~ line 44 ~ getAllById ~ salesProducts', salesProducts);

  const data = salesProducts.map((sale) => {
    const newSale = { ...sale, date };
    return camelize(newSale);
  });

  return { type: null, data };
};

module.exports = {
  createSale,
  getAll,
  getAllById,
};
