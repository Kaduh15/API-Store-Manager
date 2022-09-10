const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/salesModel");

const {
  getAllSales,
  getAllSalesProducts,
  getSalesById,
  getAllSalesProductsById,
} = require("./mocks/sales.mock");

describe("Teste unitario do saleModel", function () {
  afterEach(sinon.restore);

  it("Cadastra um venda", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 3 }]);

    const result = await salesModel.createSale();
    expect(result).to.equal(3);
  });

  it("Cadastra um quantidade de um produto", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    const result = await salesModel.insertSaleProducts(3, { productId: 1, quantity: 1});
    expect(result).to.equal(1);
  });

  it("Buscas todas as vendas", async function () {
    sinon.stub(connection, "execute").resolves([getAllSales]);

    const result = await salesModel.getAllSales();
    expect(result).to.deep.equal(getAllSales);
  });

  it("Buscas todas as vendas", async function () {
    sinon.stub(connection, "execute").resolves([getAllSalesProducts]);

    const result = await salesModel.getAllSalesProducts();
    expect(result).to.deep.equal(getAllSalesProducts);
  });

  it("Buscas venda por id", async function () {
    sinon.stub(connection, "execute").resolves([[getSalesById]]);

    const result = await salesModel.getSalesById(1);
    expect(result).to.deep.equal(getSalesById);
  });

  it("Buscas todos os produtos de uma venda por id", async function () {
    sinon.stub(connection, "execute").resolves([getAllSalesProductsById]);

    const result = await salesModel.getAllSalesProductsById(1);
    expect(result).to.deep.equal(getAllSalesProductsById);
  });

  it("Deleta uma venda por id", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    const result = await salesModel.deleteSaleById(1);
    expect(result).to.deep.equal(1);
  });

  it("Deleta todos os produtos de uma venda por id", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 2 }]);

    const result = await salesModel.deleteSalesProductsById(1);
    expect(result).to.deep.equal(2);
  });
});
