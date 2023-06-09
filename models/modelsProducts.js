const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE products.id = ?';
  const [product] = await connection.execute(query, [id]);
  return product;
};

const getIdProducts = async () => {
  const query = 'SELECT id FROM StoreManager.products';
  const [idProducts] = await connection.execute(query);

  return idProducts;
};

const insertProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUE (?)';
  const [result] = await connection.execute(query, [name]);

  return {
    id: result.insertId,
    name,
  };
};

const updateProduct = async (name, id) => {
  const query = `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`;
  await connection.execute(query, [name, id]);
  
  return {
    id,
    name,
  };
};

const deleteProduct = async (id) => {
  const query = `DELETE FROM StoreManager.products
  WHERE id = ?`;
  await connection.execute(query, [id]);

  return null;
};

module.exports = { getAll, getById, insertProduct, getIdProducts, updateProduct, deleteProduct };