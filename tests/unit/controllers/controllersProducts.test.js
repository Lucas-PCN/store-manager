const sinon = require('sinon');
const { expect } = require('chai');
const servicesProducts = require('../../../services/servicesProducts');
const controllersProducts = require('../../../controllers/controllersProducts');

const products = [
  { "id": 1, "name": "Martelo de Thor" },
  { "id": 2, "name": "Traje de encolhimento" },
  { "id": 3, "name": "Escudo do Capitão América" }
];

const productAdded = {
  id: 4,
  name: 'Capa de invisibilidade',
};

const productAddedWithShortName = {
  id: 4,
  name: 'Capa',
};

const productAddedWithoutName = {
  id: 4,
};

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

  describe('A função insertProduct', () => {
    describe('Quando o nome do produto inserido está correto', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        sinon.stub(servicesProducts, 'insertProduct').resolves(productAdded);
        request.body = { name: 'Capa de invisibilidade' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(productAdded);
      });
      afterEach(() => {
        sinon.restore();
      });

      it('Testa se é retornado o status 201', async () => {
        await controllersProducts.insertProduct(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('Testa se o retorno é igual ao produto que foi adicionado', async () => {
        await controllersProducts.insertProduct(request, response);
        expect(response.json.calledWith(productAdded)).to.be.equal(true);
      });
    });

    describe('Quando o nome inserido possui menos de 5 caractéres', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        sinon.stub(servicesProducts, 'insertProduct').resolves(productAddedWithShortName);
        request.body = { name: 'Capa' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({ message: '"name" length must be at least 5 characters long' });
      });
      afterEach(() => {
        sinon.restore();
      });

      it('Testa se é retornado o status 422', async () => {
        await controllersProducts.insertProduct(request, response);
        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('Testa se a mensagem correta é retornada', async () => {
        await controllersProducts.insertProduct(request, response);
        expect(response.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
      });
    });

    describe('Quando deseja-se inserir um produto sem nome', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        sinon.stub(servicesProducts, 'insertProduct').resolves(productAddedWithoutName);
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({ message: '"name" is required' });
      });
      afterEach(() => {
        sinon.restore();
      });

      it('Testa se é retornado o status 400', async () => {
        await controllersProducts.insertProduct(request, response);
        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('Testa se a mensagem retornada é a correta', async () => {
        await controllersProducts.insertProduct(request, response);
        expect(response.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
      });
    });
  });
});