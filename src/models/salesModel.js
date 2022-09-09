const connection = require('./connection');

const createSale = async () => {
  const query = 'INSERT INTO sales VALUES ()';
  const [sale] = await connection.execute(query);

  return sale;
};

const insertSaleProducts = async (saleId, { productId, quantity }) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [sale] = await connection.execute(query, [saleId, productId, quantity]);
  console.log(`salesModel: ${JSON.stringify(sale)}`);
  return sale;
};

const getAllSales = async () => {
  const query = 'SELECT * FROM sales';
  const [sales] = await connection.execute(query);
  console.log(sales);
  return sales;
};
const getAllSalesProducts = async () => {
  const query = 'SELECT * FROM sales_products';
  const [sales] = await connection.execute(query);
  console.log(sales);
  return sales;
};

module.exports = {
  createSale,
  insertSaleProducts,
  getAllSales,
  getAllSalesProducts,
};
