const Joi = require('joi');
const boom = require('boom');

const validate = (data, schema) => {
  const { error } = Joi.object(schema).validate(data);
  return error;
}

const validationHandler = (schema, check = 'body') => {
  return (req, res, next) => {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  }
}


module.exports = validationHandler;