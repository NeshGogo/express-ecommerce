const express = require('express');
const router = express.Router();
const productsMock = require('../../utils/mocks/products');


router.get('/', (req, res) => {
  const { query } = req.query
  res.status(200).json({
    data: productsMock,
    message: 'Products listed'
  });
});


router.get('/:productId', (req, res) => {
  const { productId } = req.params;

  res.status(200).json({
    data: productsMock[productId],
    message: 'Products listed'
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    data: productsMock[0],
    message: 'Product created'
  });
});

router.put('/:productId', (req, res) => {
  const { productId } = req.params;
  const { body } = req;
  res.status(200).json({
    data: productsMock[0],
    message: 'Product updated'
  });
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  res.status(200).json({
    data: productsMock[0],
    message: 'Products listed'
  });
});

module.exports = router;