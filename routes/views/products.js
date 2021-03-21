const express = require('express');
const router = express.Router();
const ProductService = require('../../services/products');

const productService = new ProductService();

router.get('/', async (req, res, next) => {
  try {
    throw new Error('this is an error');
    const products = await productService.getProducts({tags: null});
    res.render('products', { products });
  } catch (error) {
    next(error);
  }
})

module.exports = router;