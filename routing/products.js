const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getProductsView);

router.get('/add', productsController.getAddProductView);

router.post('/add', productsController.addNewProduct);

router.get('/new', productsController.getNewProductView);

router.get('/:name', productsController.getProductView);

router.delete('/:name', productsController.deleteProduct);

module.exports = router;
