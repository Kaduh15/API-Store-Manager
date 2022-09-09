const createSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const getAll = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: "2022-09-09T19:11:19.000Z",
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: "2022-09-09T19:11:19.000Z",
  },
];

const getAllById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  createSale,
  getAll,
  getAllById,
};
