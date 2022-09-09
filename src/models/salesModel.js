const connection = require('./connection');

const createSale = async () => {
  const query = 'INSERT INTO sales VALUES ()';
  const [sale] = await connection.execute(query);

  return sale;
};

const getProductById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [productId]);
  return { ...product };
};

const insertSaleProducts = async (saleId, { productId, quantity }) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [sale] = await connection.execute(query, [saleId, productId, quantity]);
  console.log(`salesModel: ${JSON.stringify(sale)}`);
  return sale;
};

module.exports = {
  createSale,
  getProductById,
  insertSaleProducts,
};
