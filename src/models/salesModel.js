const connection = require('./connection');

const createSale = async () => {
  const query = 'INSERT INTO sales VALUES ()';
  const [sale] = await connection.execute(query);

  return sale;
};

const insertSaleProducts = async (saleId, { productId, quantity }) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [sale] = await connection.execute(query, [saleId, productId, quantity]);

  return sale;
};

const getAllSales = async () => {
  const query = 'SELECT * FROM sales';
  const [sales] = await connection.execute(query);

  return sales;
};

const getAllSalesProducts = async () => {
  const query = 'SELECT * FROM sales_products';
  const [sales] = await connection.execute(query);

  return sales;
};

const getSalesById = async (id) => {
  const query = 'SELECT * FROM sales WHERE id = ?';
  const [[sales]] = await connection.execute(query, [id]);

  return sales;
};

const getAllSalesProductsById = async (id) => {
  const query = 'SELECT * FROM sales_products WHERE sale_id = ?';
  const [sales] = await connection.execute(query, [id]);

  return sales;
};

const deleteSalesProductsById = async (id) => {
  const query = 'DELETE FROM sales_products WHERE sale_id = ?';
  const [result] = await connection.execute(query, [id]);

  return result;
};
const deleteSaleById = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const [result] = await connection.execute(query, [id]);

  return result;
};

const updateSalesProducts = async (saleId, { productId, quantity }) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_Id = ? AND product_Id = ?';
  const [result] = await connection.execute(query, [quantity, saleId, productId]);

  return result;
};

module.exports = {
  createSale,
  insertSaleProducts,
  getAllSales,
  getAllSalesProducts,
  getSalesById,
  getAllSalesProductsById,
  deleteSalesProductsById,
  deleteSaleById,
  updateSalesProducts,
};
