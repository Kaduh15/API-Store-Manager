const camelize = require('camelize');

const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { validationIdSale, validationIdProducts } = require('./utils');

const createSale = async (sales) => {
  console.log('🚀 ~ file: salesService.js ~ line 8 ~ createSale ~ sales', sales);
  const getProductPromises = sales.map(async ({ productId }) => productsModel.getById(productId));

  const result = await Promise.all(getProductPromises);

  const idsNotExists = result.some((product) => !product);
  if (idsNotExists) {
    return {
      type: 'NOT_FOUND',
      data: {
        message: 'Product not found',
      },
    };
  }
  const resultSaleCreated = await salesModel.createSale();
  sales.forEach(async (sale) => salesModel.insertSaleProducts(resultSaleCreated.insertId, sale));
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
  const saleFromId = await salesModel.getSalesById(id);

  if (!saleFromId) {
    return {
      type: 'NOT_FOUND',
      data: {
        message: 'Sale not found',
      },
    };
  }

  const salesProducts = await salesModel.getAllSalesProductsById(id);

  const data = salesProducts.map((sale) => {
    const { sale_id, ...rest } = { ...sale, date: saleFromId.date };
    return camelize(rest);
  });

  return { type: null, data };
};

const deleteById = async (id) => {
  const saleFromId = await salesModel.getSalesById(id);

  if (!saleFromId) {
    return {
      type: 'NOT_FOUND',
      data: {
        message: 'Sale not found',
      },
    };
  }

  await salesModel.deleteSalesProductsById(id);

  await salesModel.deleteSaleById(id);

  return { type: 'DELETE_SUCCESS' };
};

const updateSalesProduct = async (id, salesProducts) => {
  const hasIdSale = await validationIdSale(id);
  if (hasIdSale.type) return hasIdSale;
  const hasIdproduct = await validationIdProducts(salesProducts);
  if (hasIdproduct) return hasIdproduct;

  const salesProductsPromises = salesProducts.map(async (saleProduct) =>
    salesModel.updateSalesProducts(id, saleProduct));

  await Promise.all(salesProductsPromises);

  const result = await salesModel.getAllSalesProductsById(id);

  const data = result.map(({ sale_id, ...rest }) => camelize(rest));

  return {
    type: null,
    data: {
      saleId: id,
      itemsUpdated: data,
    },
  };
};

module.exports = {
  createSale,
  getAll,
  getAllById,
  deleteById,
  updateSalesProduct,
};
