const connection = require('./connection');

const addSaleId = async () => {
  const query = 'INSERT INTO StoreManager.sales VALUES ();';
  const [result] = await connection.execute(query);

  return result.insertId;
};

const insertSale = async (arrayOfItemsSold) => {
  const saleId = await addSaleId();

  await Promise.all(arrayOfItemsSold.map(({ productId, quantity }) => connection
    .query(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
    )));

  return {
    id: saleId,
    itemsSold: arrayOfItemsSold,
  };
};

const getAll = async () => {
  const query = `
  SELECT
    sales_products.sale_id,
    sales.date,
    sales_products.product_id,
    sales_products.quantity
  FROM
    StoreManager.sales_products
  INNER JOIN
    StoreManager.sales
  ON
    sales_products.sale_id = sales.id
  ORDER BY
    sales_products.sale_id, sales_products.product_id`;
  
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = `
  SELECT
    sales.date,
    sales_products.product_id,
    sales_products.quantity
  FROM
    StoreManager.sales as sales
  INNER JOIN
    StoreManager.sales_products as sales_products
  ON
    sales.id = sales_products.sale_id
  WHERE
    sales_products.sale_id = ?`;
  
  const [result] = await connection.execute(query, [id]);
  return result;
};

const getSalesId = async () => {
  const [result] = await connection.query('SELECT id FROM StoreManager.sales');

  return result;
};

module.exports = {
  addSaleId,
  insertSale,
  getAll,
  getById,
  getSalesId,
};