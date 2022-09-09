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

module.exports = {
  getAll,
  getById,
};
