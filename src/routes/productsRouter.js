const express = require('express');
const productsController = require('../controllers/productsController');
const productValidation = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', productValidation, productsController.insertProduct);

router.put('/:id', productValidation, productsController.updateProductById);

router.delete('/:id', productsController.deleteById);

module.exports = router;
