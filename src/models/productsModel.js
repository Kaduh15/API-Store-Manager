const connection = require('./connection');

const getById = async (id) => {
  const query = 'SElECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);

  return product;
};

const getAll = async () => {
  const query = 'SElECT * FROM products';
  const [products] = await connection.execute(query);

  return products;
};

const insertProduct = async (name) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);

  return insertId;
};

const updateProductById = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, id]);

  return result;
};

const deleteById = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [id]);

  return affectedRows;
};

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name LIKE ?';
  const [result] = await connection.execute(query, [`%${name}%`]);

  return result;
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProductById,
  deleteById,
  getByName,
};
