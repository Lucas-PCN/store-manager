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

const insertProduct = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const product = await servicesProducts.insertProduct(name);

  return res.status(201).json(product);  
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  
  const result = await servicesProducts.updateProduct(name, id);

  return res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  await servicesProducts.deleteProduct(id);

  res.status(204).end();
};

module.exports = { getAll, getById, insertProduct, updateProduct, deleteProduct };