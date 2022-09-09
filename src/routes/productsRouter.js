const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/', productsController.insertProduct);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

module.exports = router;
