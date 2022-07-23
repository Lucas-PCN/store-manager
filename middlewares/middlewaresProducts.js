const modelsProducts = require('../models/modelsProducts');

const validateId = async (req, res, next) => {
  const { id } = req.params;

  const searchId = await modelsProducts.getById(id);

  if (searchId.length === 0) {
    return res
      .status(404)
      .json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateId,
}; 