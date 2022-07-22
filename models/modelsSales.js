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

module.exports = {
  addSaleId,
  insertSale,
};