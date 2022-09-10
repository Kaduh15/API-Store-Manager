const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const connection = require("../../../src/models/connection");
const productModel = require("../../../src/models/productsModel");

const {
  allProducts,
  product1,
  updateProduct,
} = require("./mocks/products.mock");

describe("Teste unitario do productModel", function () {
  afterEach(sinon.restore);

  it("Retorna todos os Produtos", async function () {
    sinon.stub(connection, "execute").resolves([allProducts]);

    const result = await productModel.getAll();
    expect(result).to.deep.equal(allProducts);
  });

  it("Retorna apenas 1 produto por id", async function () {
    sinon.stub(connection, "execute").resolves([[product1]]);

    const result = await productModel.getById(1);

    expect(result).to.deep.equal(product1);
  });

  it("Inseri um produto", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    const name = 'BORA BILL'

    const result = await productModel.insertProduct(name);

    expect(result).to.equal(1);
  });

  it("Atualiza um Produto", async function () {
    sinon.stub(connection, "execute").resolves([updateProduct]);
    const name = 'BORA BILL'
    const id = 1

    const result = await productModel.updateProductById(id,name);

    expect(result).to.deep.equal(updateProduct);
  });

  it("Deleta um produto por id", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1}]);
    const id = 1

    const result = await productModel.deleteById(id);

    expect(result).to.equal(1);
  });
});
