const productModel = require("../../models/product.model");
const User = require("../../models/user.model")


//create product only suppliers
const createProduct = async (Name,Description,category,image,supplier,basePrice,tags,location,sku,moq,stock ) =>{
    const user = await User.findById(supplier);
    if(!user){
        throw Error ('user not found');
    }
    if(user.userRole !== 'supplier')
    {
        throw Error ('user is not a supplier');
    }
    const newProduct = new productModel({ 
        Name,
        Description,
        category,
        images: image,
        supplier,
        basePrice,
        tags,
        location,
        sku,
        moq,
        stock
    });
    await newProduct.save();
    return newProduct;
}


//edit product only supplier
const editProductSupplier = async (productId, supplierId,updateData) => {
const user = await user.findById(supplierId);
if (!user){
  throw Error('user not found');
}
if(user.userRole !== 'supplier'){
        throw Error('user is not a supplier');
    }
    const product = await productModel.findById(productId);
    if(!product){
        throw Error('product not found');
    }
    if(product.supplier.toString() !== supplierId){
        throw Error('you are not authorized to edit this product');
    }
    Object.assign(product, updateData);
    await product.save();
    return product;
}

//delete product only supplier
const deleteProduct = async (productId ,supplierId) =>{
    const user =await User.findById(supplierId);
    if(!user)   {
        throw Error('user not found');
    }
    if(user.userRole !== 'supplier'){
        throw Error('user is not a supplier');
    }
    const product = await productModel.findById(productId);
    if(!product){
        throw Error('product not found');
    }
    if(product.supplier.toString() !== supplierId){
     throw Error ('you are not authorized for deleting this product');
 }
    await product.deleteOne();
    return {message : 'product deleted successfully '}

}
//get all products of the supplier







//Get all products for all users
const getSupplierProducts =async (supplierId) => {
    const user = await User.findById(supplierId);
    if(!user){
        throw Error('user not found');  
     }
     if(user.userRole !== 'supplier'){
        throw Error('user is not a supplier');
     }
     const products = await productModel.find({supplier: supplierId});
     return products;
}
//Get all products for all users
const commonProducts = async (userId) =>{
    const user = await User.findById(userId);
    if(!user){
        throw Error ('user not found');}
     const allProducts = await productModel.find()
     return allProducts

}
//Get product by Category
const getProductsByCategory = async (category) => {
    const products = await productModel.find({category});
    return products;
}

//Get product details
const getProductDetails = async (productId) => {
    const product = await productModel.findById(productId).populate('supplier','userName userEmail');
    if(!product){
        throw Error('product not found');
    }
    return product;
}
//search products
const searchProducts = async (searchQuery) => {
    const products = await productModel.find({
        $or: [
            { Name: searchQuery },
            { tags: searchQuery },
            { category: searchQuery }
        ]
    });
    return products;
} 

module.exports = {
  createProduct,
  commonProducts,
  editProduct,
  deleteProduct,
  getSupplierProducts,
  getProductsByCategory,
  getProductDetails,
  searchProducts,
};

