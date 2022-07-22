const modelsSales = require('../models/modelsSales');
const modelsProducts = require('../models/modelsProducts');

const insertSale = async (arrayOfItemsSold) => {
  const result = await modelsSales.insertSale(arrayOfItemsSold);

  return result;
};

const productsIds = async () => {
  const allProducts = await modelsProducts.getIdProducts();

  return (allProducts).map(({ id }) => id);
};

const serialize = ({ date, product_id: productId, sale_id: saleId, quantity }) => ({
  saleId,
  date,
  productId,
  quantity,
});

const getAll = async () => {
  const result = await modelsSales.getAll();
  const sales = result.map(serialize);

  return sales;
};

const getById = async (id) => {
  const result = await modelsSales.getById(id);
  const sale = result.map(({ date, product_id: productId, quantity }) => ({
    date,
    productId,
    quantity,
  }));

  return sale;
};

const validSalesId = async (saleId) => {
  const result = await modelsSales.getSalesId();

  return result.map(({ id }) => id).includes(Number(saleId));
};

module.exports = {
  insertSale,
  productsIds,
  getAll,
  getById,
  validSalesId,
};