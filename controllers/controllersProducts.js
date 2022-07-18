const servicesProducts = require('../services/servicesProducts');

const getAll = async (_req, res) => {
  const products = await servicesProducts.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await servicesProducts.getById(id);

  if (product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product[0]);
};

module.exports = { getAll, getById };