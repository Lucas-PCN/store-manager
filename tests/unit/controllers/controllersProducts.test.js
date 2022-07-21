const sinon = require('sinon');
const { expect } = require('chai');
const servicesProducts = require('../../../services/servicesProducts');
const controllersProducts = require('../../../controllers/controllersProducts');

const products = [
  { "id": 1, "name": "Martelo de Thor" },
  { "id": 2, "name": "Traje de encolhimento" },
  { "id": 3, "name": "Escudo do Capitão América" }
];

describe('Testes da camada controller', () => {
  describe('A função getAll', () => {
    const request = {};
    const response = {};
    beforeEach(() => {
      sinon.stub(servicesProducts, 'getAll').resolves(products);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(products);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se é retornado o status 200', async () => {
      await controllersProducts.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Testa se é retornado um array com todos os produtos', async () => {
      await controllersProducts.getAll(request, response);
      expect(response.json.calledWith(products));
    });
  });

  describe('A função getById', () => {
    describe('Quando o id pesquisado é valido', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        sinon.stub(servicesProducts, 'getById').resolves([products[0]])
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns([products[0]]);
      });
      afterEach(() => {
        sinon.restore();
      });

      it('Testa se é retornado o status 200', async () => {
        await controllersProducts.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('Testa se é retornado o produto correto', async () => {
        await controllersProducts.getById(request, response);
        expect(response.json.calledWith(products[0])).to.be.equal(true);
      });
    });

    describe('Quando o id pesquisado não é valido', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        sinon.stub(servicesProducts, 'getById').resolves([]);
        request.params = { id: 4 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({ message: 'Product not found' });
      });
      afterEach(() => {
        sinon.restore();
      });

      it('Testa se é retornado o status 404', async () => {
        await controllersProducts.getById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('Testa se é retornada a mensagem de produto não encontrado', async () => {
        await controllersProducts.getById(request, response);
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });
  });
});