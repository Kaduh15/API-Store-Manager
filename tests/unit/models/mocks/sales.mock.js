const getAllSales = [
  { id: 1, date: '2022-09-10T14:28:01.000Z' },
  { id: 2, date: '2022-09-10T14:28:01.000Z' }
];

const getAllSalesProducts = [
  { sale_id: 1, product_id: 1, quantity: 5 },
  { sale_id: 1, product_id: 2, quantity: 10 },
  { sale_id: 2, product_id: 3, quantity: 15 }
]

const getSalesById = { id: 1, date: '2022-09-10T14:31:30.000Z' }

const getAllSalesProductsById = [
  { sale_id: 1, product_id: 1, quantity: 5 },
  { sale_id: 1, product_id: 2, quantity: 10 }
]

module.exports = {
  getAllSales,
  getAllSalesProducts,
  getSalesById,
  getAllSalesProductsById,
};
