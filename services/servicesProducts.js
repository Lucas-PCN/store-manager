const modelsProducts = require('../models/modelsProducts');

const getAll = async () => {
  const products = await modelsProducts.getAll();
  const sortedProducts = products.sort((a, b) => a.id - b.id);
  return sortedProducts;
};

const getById = async (id) => {
  const product = await modelsProducts.getById(id);
  if (!product) return null;
  return product;
};

module.exports = { getAll, getById };