const reviewModel = require('../../models/review.model');
const User = require('../../models/user.model');
const productModel = require('../../models/product.model');


const createProductreview = async (reviewerId, targetType, productId, rating, comment) => {
    const user = await User.findById(reviewerId);
    if (!user) {
        throw Error('User not found');
    }
    if ( user.UserRole !== 'user') {
        throw Error('User is not authorized to review');
    }
    const newProductreview = new reviewModel({
        reviewer: reviewerId,
        targetType: targetType,
        product: productId,
        rating: rating,
        comment: comment
    });
    await newProductreview.save();  
    return newProductreview;
}

const createSupplierreview = async (reviewerId, targetType, supplierId, rating, comment) => {
    const user = await User.findById(reviewerId);
    if (!user) {
        throw Error('User not found');
    }
    if (user.userRole !== 'user') {
        throw Error('User is not authorized to review');
    }
    const newSupplierreview = new reviewModel({
        reviewer: reviewerId,
        targetType: targetType,
        supplier: supplierId,
        rating: rating,
        comment: comment
    });
    await newSupplierreview.save();
    return newSupplierreview;
}


const deleteReview = async (reviewId, reviewerId) => {
    const user = await User.findById(reviewerId);
    if (!user) {
        throw Error('User not found');
    }
    if (user.userRole !== 'user') {
        throw Error('User is not authorized to delete review');
    }
    const fetchReview = await reviewModel.findById(reviewId);
    if (!fetchReview) {
        throw Error('Review not found');
    }
    if (fetchReview.reviewer.toString() !== reviewerId) {
        throw Error('You are not authorized to delete this review');
    }
    await reviewModel.findByIdAndDelete(reviewId);
    return { message: 'Review deleted successfully' };
}


const editReview = async (reviewId, reviewerId, updateData) => {  
    const user = await User.findById(reviewerId);
    if (!user) {
        throw Error('User not found');
    }
    if (user.userRole !== 'user') {
        throw Error('User is not authorized to edit review');
    }
    const review = await reviewModel.findById(reviewId);
    if( !review) {
        throw Error ('Review not found');       
}
    if( review.reviewer.toString() !== reviewerId){
         throw Error ('You cannot edit this review');   
    }
    Object.assign(review, updateData);
    await review.save();
    return review;
}

const getProductReviews = async (productId) => {
    const reviews = await reviewModel.find({ product: productId });
    if (!reviews || reviews.length === 0) {
        throw Error('No reviews found for this product');
    }
    return reviews;
}
const getSupplierReviews = async (supplierId) => {
    const reviews = await reviewModel.find({ supplier: supplierId });
    if (!reviews || reviews.length === 0) {
        throw Error('No reviews found for this supplier');
    }
    return reviews;
}   



module.exports = {
    createProductreview,
    createSupplierreview,
    deleteReview,
    editReview,
    getProductReviews,
    getSupplierReviews,
};