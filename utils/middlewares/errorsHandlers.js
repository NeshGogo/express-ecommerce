const { config } = require('../../config');
const boom = require('boom');
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

const withErrorStack = (error, stack) => {
  if (config.dev) {
    return { ...error, stack };
  }
}

const logErrors = (err, req, res, next) => {
  console.log(err.stack);
  next(err);
}

const wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err)
}

const clientErrorHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload }
  } = err;
  // catch errors for AJAX request or if an error ocurrs while streaming
  if (isRequestAjaxOrApi(req) || req.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

const errorHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload }
  } = err;

  res.status(statusCode);
  res.render('error', withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler,
}