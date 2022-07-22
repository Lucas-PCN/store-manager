const sinon = require('sinon');
const { expect } = require('chai');
const servicesSales = require('../../../services/servicesSales');
const controllersSales = require('../../../controllers/controllersSales');

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

const saleAdded = [
  {
    productId: 1,
    quantity: 10
  },
  {
    productId: 2,
    quantity: 50
  }
];

describe('Testes da camada Controller', () => {
  describe('A função insertSale', () => {
    const request = {};
    const response = {};
    beforeEach(() => {
      sinon.stub(servicesSales, 'insertSale').resolves(newSale);
      request.body = saleAdded;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(newSale);
    })
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se é retornado o status 201', async () => {
        await controllersSales.insertSale(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('Testa se o retorno é igual a venda que foi adicionada', async () => {
        await controllersSales.insertSale(request, response);
        expect(response.json.calledWith(newSale)).to.be.equal(true);
      });
  })
});