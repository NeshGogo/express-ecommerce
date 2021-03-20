const express = require('express');
const router = express.Router();
const ProductService = require('../../services/products');

const productService = new ProductService();

router.get('/', async (req, res, next) => {
  const { tags } = req.query
  try {
    const products = await productService.getProducts({ tags })
    res.status(200).json({
      data: products,
      message: 'Products listed'
    });
  } catch (error) {
    next(error)
  }
});


router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProduct({ productId })
    res.status(200).json({
      data: product,
      message: 'Products listed'
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const product = await productService.createProduct({ product: body })
    res.status(201).json({
      data: product,
      message: 'Product created'
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const { body } = req;
  try {
    const product = await productService.updateProduct({ productId, product: body })
    res.status(200).json({
      data: product,
      message: 'Product updated'
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productService.deleteProduct({ productId })
    res.status(200).json({
      data: product,
      message: 'Products listed'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;