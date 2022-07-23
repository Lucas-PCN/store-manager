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

const updateProduct = async (name, id) => {
  const result = await modelsProducts.updateProduct(name, id);

  return result;
};

const deleteProduct = async (id) => {
  await modelsProducts.deleteProduct(id);
};

module.exports = { getAll, getById, insertProduct, updateProduct, deleteProduct };