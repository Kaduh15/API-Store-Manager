const express = require('express');
const productsController = require('../controllers/productsController');
const productValidation = require('../middlewares/productValidation');

const router = express.Router();

router.post('/', productValidation, productsController.insertProduct);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

module.exports = router;
