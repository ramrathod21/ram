const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');



router.post('/create', productController.createProduct);

router.put('/edit/:productId', productController.editProducts);

router.delete('/delete/:productId', productController.deleteProducts);

router.get('/supplier/:supplierId', productController.getSupplierProducts);

router.get('/products', productController.commonProducts);

router.get('/category/:category', productController.getProductsByCategory);

router.get('/details/:productId', productController.getProductDetails);

router.get('/search', productController.searchProducts);


module.exports = router;