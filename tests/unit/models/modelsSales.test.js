const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const modelsSales = require('../../../models/modelsSales');

const newSale = [
  {
    productId: 1,
    quantity: 15
  },
  {
    productId: 2,
    quantity: 40
  },
];

describe('Testes da camada model', () => {
  describe('A função addSaleId', () => {
    const result = [{ insertId: 1 }];
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se é retornado um número', async () => {
      const response = await modelsSales.addSaleId();
      expect(response).to.be.a('number');
    })

    it('Testa se é retornado o id inserido', async () => {
      const response = await modelsSales.addSaleId();
      expect(response).to.be.deep.equal(1);
    });
  });

  describe('A função insertSale', () => {
    const result = [{ insertId: 1 }];
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result);
      sinon.stub(modelsSales, 'addSaleId');
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se o retorno da insertSale é um objeto com as chaves "id" e "itemsSold"', async () => {
      const response = await modelsSales.insertSale(newSale);
      expect(response).to.be.a('object').with.keys('id', 'itemsSold');
    });

    it('Testa se a função retorna a venda correta', async () => {
      const response = await modelsSales.insertSale(newSale);
      expect(response).to.be.deep.equal({ id: 1, itemsSold: newSale });
    });
  });
});