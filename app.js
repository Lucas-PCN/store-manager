const express = require('express');
const bodyParser = require('body-parser');
const controllersProducts = require('./controllers/controllersProducts');
const controllersSales = require('./controllers/controllersSales');
const middlewaresSales = require('./middlewares/middlewaresSales');
const middlewaresProducts = require('./middlewares/middlewaresProducts');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controllersProducts.getAll);

app.get('/products/:id', controllersProducts.getById);

app.post('/products', controllersProducts.insertProduct);

app.post('/sales',
  middlewaresSales.validateProductsIds,
  middlewaresSales.validateQuantities,
  middlewaresSales.validateQuantityLength,
  middlewaresSales.validateIfProductExists,
  controllersSales.insertSale);

app.get('/sales', controllersSales.getAll);

app.get('/sales/:id',
  middlewaresSales.validateIfSalesIdExists,
  controllersSales.getById);

app.put('/products/:id',
  middlewaresProducts.validateId,
  controllersProducts.updateProduct);

app.delete('/products/:id',
  middlewaresProducts.validateId,
  controllersProducts.deleteProduct);

app.delete('/sales/:id',
  middlewaresSales.validateIfSalesIdExists,
  controllersSales.deleteSale);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;