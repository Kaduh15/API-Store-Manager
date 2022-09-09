// tests/integration/controllers/passenger.controller.test.js
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const productsService = require("../../../src/services/productsService");
const productsController = require("../../../src/controllers/productsController");

const { getById, getAll, insertProduct } = require("./mocks/products.mock");

describe("Teste unitario do productsController", function () {

  afterEach(sinon.restore);

  it("Busca produto por com id existente", async function () {
    sinon.stub(productsService, "getById").onFirstCall().resolves({
      type: null,
      data: getById,
    });

    const res = {}
    const req = { params: { id: 1 } }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    await productsController.getById(req, res)
    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(getById)
  });

  it("Busca por todos os produtos", async function () {
    sinon.stub(productsService, "getAll").resolves({
      type: null,
      data: getAll,
    });

    const res = {}
    const req = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    await productsController.getAll(req, res)
    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(getAll)
  });

  it("É possivel inserir um produto", async function () {
    sinon.stub(productsService, "insertProduct").resolves({
      type: "SUCCESS_INSERT",
      data: insertProduct,
    });

    const res = {}
    const req = { body: { name: "Baralho do Aladin" } }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    await productsController.insertProduct(req, res)
    expect(res.status).to.have.been.calledWith(201)
    expect(res.json).to.have.been.calledWith({ id: 2, name: req.body.name })
  });

  it("Atualiza o nome de um produto", async function () {
    sinon.stub(productsService, "updateProductById").resolves({
      type: null,
      data: getById,
    });

    const res = {}
    const req = { params: 1, body: { name: "Baralho do Aladin" } }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    await productsController.updateProductById(req, res)
    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(getById)
  });

  it("Deleta um produto", async function () {
    sinon.stub(productsService, "updateProductById").resolves({
      type: null,
      data: getById,
    });

    const res = {}
    const req = { params: { id: 2 }}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    await productsController.deleteById(req, res)
    expect(res.status).to.have.been.calledWith(204)
    expect(res.json).to.have.been.calledWith()
  });
});
