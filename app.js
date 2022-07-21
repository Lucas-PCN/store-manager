const express = require('express');
const bodyParser = require('body-parser');
const controllersProducts = require('./controllers/controllersProducts');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controllersProducts.getAll);

app.get('/products/:id', controllersProducts.getById);

app.post('/products', controllersProducts.insertProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;