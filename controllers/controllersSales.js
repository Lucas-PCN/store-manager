const servicesSales = require('../services/servicesSales');

const insertSale = async (req, res) => {
  const arrayOfItemsSold = req.body;
  
  const result = await servicesSales.insertSale(arrayOfItemsSold);

  return res.status(201).json(result);
};

module.exports = {
  insertSale,
};