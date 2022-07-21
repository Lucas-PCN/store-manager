const modelsProducts = require('../models/modelsProducts');

const getAll = async () => {
  const products = await modelsProducts.getAll();
  const sortedProducts = products.sort((a, b) => a.id - b.id);
  return sortedProducts;
};

const getById = async (id) => {
  const product = await modelsProducts.getById(id);
  return product;
};

const insertProduct = async (name) => {
  const product = await modelsProducts.insertProduct(name);

  return product;
};

module.exports = { getAll, getById, insertProduct };