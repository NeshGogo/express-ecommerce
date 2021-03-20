const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');
const productsRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json())
app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter)


const server = app.listen(3000, () => {
  console.log(`listening http://localhost:${server.address().port}/`)
})