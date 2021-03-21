const express = require('express');
const path = require('path');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const {
  logErrors,
  errorHandler,
  clientErrorHandler,
  wrapErrors
} = require('./utils/middlewares/errorsHandlers');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');
const boom = require('boom');

// app
const app = express();

// middlewares
app.use(express.json())

// statics files
app.use('/static', express.static(path.join(__dirname, 'public')))

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// routes
app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter)

// redirect
app.get('/', (req, res) => {
  res.redirect('/products')
})

app.use( (req, res, next) => {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload },
    } = boom.notFound();
    res.status(statusCode).json(payload);
  }

  res.status(404).render('404');
})

// error handler
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler)

// server
const server = app.listen(3000, () => {
  console.log(`listening http://localhost:${server.address().port}/`)
})