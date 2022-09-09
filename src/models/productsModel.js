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
  const [result] = await connection.execute(query, [name]);

  console.log(result.insertId);
  return result;
};

module.exports = {
  getAll,
  getById,
  insertProduct,
};
