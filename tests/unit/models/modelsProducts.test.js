const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const modelsProducts = require('../../../models/modelsProducts');

const products = [
  { "id": 1, "name": "Martelo de Thor" },
  { "id": 2, "name": "Traje de encolhimento" },
  { "id": 3, "name": "Escudo do Capitão América" }
];

const ids = [
  { "id": 1 },
  { "id": 2 },
  { "id": 3 },
];

describe('Testes da camada model', () => {
  describe('A função getAll', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([products]);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se o retorno da getAll é um array', async () => {
      const response = await modelsProducts.getAll();
      expect(response).to.be.a('array');
    });

    it('Testa se o array retornado é igual ao esperado', async () => {
      const response = await modelsProducts.getAll();
      expect(response).to.be.equal(products);
    });
  });

  describe('A função getById', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([[products[0]]]);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se o retorno da getById é um array', async () => {
      const response = await modelsProducts.getById(1);
      expect(response).to.be.a('array');
    });

    it('Testa se a função retorna o produto correto', async () => {
      const response = await modelsProducts.getById(1);
      expect(response).to.be.deep.equal([products[0]]);
    });
  });

  describe('A função getIdProducts', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([ids])
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se o retorno da getIdProducts é um array', async () => {
      const response = await modelsProducts.getIdProducts();
      expect(response).to.be.a('array');
    });

    it('Testa se o array retornado é igual ao esperado', async () => {
      const response = await modelsProducts.getIdProducts();
      expect(response).to.be.equal(ids);
    });
  });

  describe('A função insertProduct', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se é retornado um objeto', async () => {
      const response = await modelsProducts.insertProduct('Capa de invisibilidade');
      expect(response).to.be.a('object').with.keys('id', 'name');
    });

    it('Testa se o objeto retornado possui o id correto', async () => {
      const response = await modelsProducts.insertProduct('Capa de invisibilidade');
      expect(response).to.be.deep.equal({ id: 4, name: 'Capa de invisibilidade' });
    });
  });
});