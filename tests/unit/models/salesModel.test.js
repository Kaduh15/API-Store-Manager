const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/salesModel");

const { } = require("./mocks/sales.mock");

describe("Teste unitario do saleModel", function () {
  afterEach(sinon.restore);

  it("Retorna todos os Produtos", async function () {
    sinon.stub(connection, "execute").resolves([allsales]);

    const result = await salesModel.getAll();
    expect(result).to.deep.equal(allsales);
  });
});
