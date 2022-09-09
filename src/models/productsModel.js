const connection = require('./connection');

const getById = async (id) => {
  const query = 'SElECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);

  return product;
};

const getProductById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [productId]);
  return { ...product };
};

const getAll = async () => {
  const query = 'SElECT * FROM products';
  const [products] = await connection.execute(query);

  return products;
};

const insertProduct = async (name) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [result] = await connection.execute(query, [name]);

  console.log(result.insertId);
  return result;
};

const updateProductById = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, id]);
  console.log('🚀 ~ file: productsModel.js ~ line 34 ~ updateProductById ~ result', result);

  return result;
};

const deleteById = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  console.log('🚀 ~ file: productsModel.js ~ line 42 ~ deleteById ~ result', result);

  return result;
};

module.exports = {
  getAll,
  getProductById,
  getById,
  insertProduct,
  updateProductById,
  deleteById,
};
