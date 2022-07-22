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

module.exports = {
  insertSale,
  productsIds,
};