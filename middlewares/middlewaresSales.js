const servicesSales = require('../services/servicesSales');

const validateProductsIds = async (req, res, next) => {
  const arrayOfItemsSold = req.body;

  const validsIds = arrayOfItemsSold.every(({ productId }) => productId);

  if (!validsIds) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const validateQuantities = (req, res, next) => {
  const arrayOfItemsSold = req.body;

  const quantExists = arrayOfItemsSold.every(({ quantity }) => quantity !== undefined);

  if (!quantExists) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const validateQuantityLength = (req, res, next) => {
  const arrayOfItemsSold = req.body;

  const validQuantity = arrayOfItemsSold.every(({ quantity }) => quantity > 0);

  if (!validQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validateIfProductExists = async (req, res, next) => {
  const arrayOfItemsSold = req.body;
  const idProducts = await servicesSales.productsIds();

  const productIdNotFound = arrayOfItemsSold.find(
    ({ productId }) => !(idProducts.includes(productId)),
  );

  if (productIdNotFound) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const validateIfSalesIdExists = async (req, res, next) => {
  const { id } = req.params;
  const isSaleIdValid = await servicesSales.validSalesId(id);

  if (!isSaleIdValid) {
    return res
      .status(404)
      .json({ message: 'Sale not found' });
  }

  next();
};

module.exports = {
  validateProductsIds,
  validateQuantities,
  validateQuantityLength,
  validateIfProductExists,
  validateIfSalesIdExists,
};