const sinon = require('sinon');
const { expect } = require('chai');
const modelsSales = require('../../../models/modelsSales');
const modelsProducts = require('../../../models/modelsProducts');
const servicesSales = require('../../../services/servicesSales');

const newSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 10
    },
    {
      productId: 2,
      quantity: 50
    }
  ]
};

const ids = [
  { "id": 1 },
  { "id": 2 },
  { "id": 3 },
];

const idsChanged = [1, 2, 3];

describe('Testa a camada de Services', () => {
  describe('A função insertSale', () => {
    beforeEach(() => {
      sinon.stub(modelsSales, 'insertSale').resolves(newSale);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se é retornado um objeto com as chaves "id" e "itemSold"', async () => {
      const response = await servicesSales.insertSale(newSale);
      expect(response).to.be.a('object').with.keys('id', 'itemsSold');
    });

    it('Testa se o objeto retornado possui as chaves e valores corretos', async () => {
      const response = await servicesSales.insertSale(newSale);
      expect(response).to.be.deep.equal(newSale);
    });
  });

  describe('A função productsIds', () => {
    beforeEach(() => {
      sinon.stub(modelsProducts, 'getIdProducts').resolves(ids)
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se o retorno da productsIds é um array', async () => {
      const response = await servicesSales.productsIds();
      expect(response).to.be.a('array');
    });

    it('Testa se o array retornado é igual ao esperado', async () => {
      const response = await servicesSales.productsIds();
      expect(response).to.be.deep.equal(idsChanged);
    });
  });
});