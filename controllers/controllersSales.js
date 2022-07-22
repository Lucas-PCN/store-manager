const servicesSales = require('../services/servicesSales');

const insertSale = async (req, res) => {
  const arrayOfItemsSold = req.body;
  
  const result = await servicesSales.insertSale(arrayOfItemsSold);

  return res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await servicesSales.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await servicesSales.getById(id);

  return res.status(200).json(result);
};

module.exports = {
  insertSale,
  getAll,
  getById,
};