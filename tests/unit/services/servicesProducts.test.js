const sinon = require('sinon');
const { expect } = require('chai');
const modelsProducts = require('../../../models/modelsProducts');
const servicesProducts = require('../../../services/servicesProducts');

const products = [
  { "id": 1, "name": "Martelo de Thor" },
  { "id": 2, "name": "Traje de encolhimento" },
  { "id": 3, "name": "Escudo do Capitão América" }
];

describe('Testes da camada services', () => {
  describe('A função getAll', () => {
    beforeEach(() => {
      sinon.stub(modelsProducts, 'getAll').resolves(products);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Testa se o retorno é um array', async () => {
      const response = await servicesProducts.getAll();
      expect(response).to.be.a('array');
    })

    it('Testa se é retornado um array ordenado pelo id', async () => {
      const response = await servicesProducts.getAll();
      expect(response[0]).to.have.property('id', 1);
      expect(response[1]).to.have.property('id', 2);
    });
  });

  describe('A função getById', () => {
    describe('Se o id do produto buscado existe', () => {
      beforeEach(() => {
        sinon.stub(modelsProducts, 'getById').resolves([products[0]]);
      });
      afterEach(() => {
        sinon.restore();
      });
  
      it('Testa se o retorno é um array', async () => {
        const response = await servicesProducts.getById(1);
        expect(response).to.be.a('array');
        expect(response).to.have.length(1);
      });
  
      it('Testa se o retorno é o produto esperado', async () => {
        const response = await servicesProducts.getById(1);
        expect(response).to.be.deep.equal([products[0]]);
      });
    });

    describe('Se o id do produto buscado não existe', () => {
      beforeEach(() => {
        sinon.stub(modelsProducts, 'getById').resolves([]);
      });
      afterEach(() => {
        sinon.restore();
      });

      it('Testa se o retorno é um array vazio', async () => {
        const response = await servicesProducts.getById(4);
        expect(response).to.be.a('array');
        expect(response).to.have.length(0);
      });
    })
  });
});