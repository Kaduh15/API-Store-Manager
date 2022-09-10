const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const salesService = require("../../../src/services/salesService");
const salesController = require("../../../src/controllers/salesController");

const { createSale, getAll, getAllById } = require("./mocks/sales.mock");

describe("Teste unitario do salesController", function () {
  afterEach(sinon.restore);

  it("Cria um venda", async function () {
    sinon.stub(salesService, "createSale").onFirstCall().resolves({
      type: "SUCCESS_INSERT",
      data: createSale,
    });

    const res = {};
    const req = { params: { id: 3 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.createSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(createSale);
  });

  it("Busca todas as vendas", async function () {
    sinon.stub(salesService, "getAll").resolves({
      type: null,
      data: getAll,
    });

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getAll);
  });

  it("Busca todas as vendas por id", async function () {
    sinon.stub(salesService, "getAllById").resolves({
      type: null,
      data: getAllById,
    });

    const res = {};
    const req = {params: { id: 2 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getAllById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getAllById);
  });

  it("Deleta uma vendas por id", async function () {
    sinon.stub(salesService, "deleteById").resolves({
      type: "DELETE_SUCCESS",
    });

    const res = {};
    const req = {params: { id: 1 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getAllById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith();
  });
});
