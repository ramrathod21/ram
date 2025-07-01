const reviewService = require('../services/review.services');


const createProductreview = async (req, res)=>
{
    try{ 
        const { reviewerId, targetType, productId, rating, comment } = req.body;
        const newProductreview = await reviewService.createProductreview(reviewerId, targetType, productId, rating, comment);
        res.status(201).json({ message: 'Product review created successfully', review: newProductreview });

    }
    catch {
        res.status(400).json({ error: 'Error creating product review' });  

    }

}

const createSupplierreview = async (req, res) => {
    try{
        const { reviewerId, targetType, supplierId, rating, comment } = req.body;
        const newSupplierreview = await reviewService.createSupplierreview(reviewerId, targetType, supplierId, rating, comment);
        res.status(201).json({ message: 'Supplier review created successfully', review: newSupplierreview });

    }
    catch{
        res.status(400).json({ error: 'Error creating supplier review' });

    }

}

const deleteRerview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { reviewerId } = req.body; // Assuming reviewerId is passed in the request body
        const result = await reviewService.deleteRerview(reviewId, reviewerId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error deleting review' });
    }
}



const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await reviewService.getProductReviews(productId);
        res.status(200).json({ message: 'Product reviews fetched successfully', reviews });
    } catch (error) {
        res.status(400).json({ error: 'Error fetching product reviews' });
    }
}

const getSupplierReviews = async (req, res) => {
    try{
        const { supplierId } = req.params;
        const reviews = await reviewService.getSupplierReviews(supplierId);
        res.status(200).json({ message: 'Supplier reviews fetched successfully', reviews });

    }
    catch(error) {
        console.error(error);
        res.status(400).json({ error: 'Error fetching supplier reviews' });

    }
}

const editReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { reviewerId, updateData } = req.body; // Assuming updateData is passed in the request body
        const updatedReview = await reviewService.editReview(reviewId, reviewerId, updateData);
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        res.status(400).json({ error: 'Error updating review' });
    }
}
    
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { reviewerId } = req.body; // Assuming reviewerId is passed in the request body
        const result = await reviewService.deleteReview(reviewId, reviewerId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error deleting review' });
    }
}


module.exports = {
    createProductreview,
    createSupplierreview,
    deleteReview,
    editReview,
    getProductReviews,
    getSupplierReviews,
};