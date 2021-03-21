const { render } = require('pug');
const { config } = require('../../config');


const logErrors = (err, req, res, next) => {
  console.log(err.stack);
  next(err);
}

const clientErrorHandler = (err, req, res, next) => {
  console.log(req.xhr);
  // verify the source
  if (req.xhr) {
    res.status(500).json({ error: err.message });
  } else {
    next(err);
  }
}

const errorHandler = (err, req, res, next) => {
  // catch error while streaming
  if (res.headersSent) {
    next(err);
  }

  if (!config.dev) {
    delete err.status;
  }

  res.status(err.status || 500);
  res.render('error', { error: err });
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler,
}