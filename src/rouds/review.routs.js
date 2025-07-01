const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review.controller');


router.post('/product', reviewController.createProductreview);
router.post('/supplier', reviewController.createSupplierreview);
router.delete('/delete/:reviewId', reviewController.deleteReview);
router.get('/product/:productId', reviewController.getProductReviews);
router.get('/supplier/:supplierId', reviewController.getSupplierReviews);
model.exports = router;