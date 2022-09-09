const express = require('express');

const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');

const router = express.Router();

router.get('/', salesController.getAll);

router.post('/', salesValidation, salesController.createSale);

module.exports = router;
