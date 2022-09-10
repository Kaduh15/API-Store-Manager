const express = require('express');

const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getAllById);

router.post('/', salesValidation, salesController.createSale);

router.delete('/:id', salesController.deleteById);

module.exports = router;
