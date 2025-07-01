const productService = require('../services/product.services');




const createProduct = async (req, res) => {
    try{
        const { Name, Description, category, image, supplier, basePrice, tags, location, sku, moq, stock } = req.body;
        const newProduct = await productService.createProduct(Name, Description, category, image, supplier, basePrice, tags, location, sku, moq, stock);
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    }
    catch(error){
        res.status(400).json({ error: 'Error creating product' });
    }
}





const commonProducts = async (req, res) => {
    try{
        const { userId } = req.body;
        const commonProduct = await productService.commonProducts(userId);
        res.status(200).json({ message: 'All products for all users', product: commonProduct });
    }
    catch(error){
        res.status(400).json({ error: 'Error fetching products' });
    }
}





const editProducts =async (req,res) =>{
    try{
        const { productId } = req.params;
        const { supplierId } = req.body;
        const updateData = req.body.updateData; // Assuming updateData is passed in the request body
        const updatedProduct = await productService.editProduct(productId, supplierId, updateData);
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    }
    catch(error){
        res.status(400).json({ error: 'Error updating product' });
    }
}





const deleteProducts = async (req, res) => {
    try {
        const { productId } = req.params;
        const { supplierId } = req.body;
        const deletedProduct = await productService.deleteProduct(productId, supplierId);
        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting product' });
    }
}




const getSupplierProducts = async (req, res) => {
    try {
        const { supplierId } = req.params;
        const products = await productService.getSupplierProducts(supplierId);
        res.status(200).json({ message: 'Products fetched successfully', products });
    } catch (error) {
        res.status(400).json({ error: 'Error fetching supplier products' });
    }
}




const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await productService.getProductsByCategory(category);
        res.status(200).json({ message: 'Products by category fetched successfully', products });
    } catch (error) {
        res.status(400).json({ error: 'Error fetching products by category' });
    }
}






const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.params;
        const productDetails = await productService.getProductDetails(productId);
        res.status(200).json({ message: 'Product details fetched successfully', product: productDetails });
    } catch (error) {
        res.status(400).json({ error: 'Error fetching product details' });
    }
}






const searchProducts = async (req, res) => {
    try {
        const { searchQuery } = req.query; 
        const products = await productService.searchProducts(searchaquery);
        res.status(200).json({ message: 'Products searched successfully', products });
    } catch (error) {
        res.status(400).json({ error: 'Error searching products' });
    }
}






module.exports = {
    createProduct,
    commonProducts,
    editProducts,
    deleteProducts,
    getSupplierProducts,
    getProductsByCategory,
    searchProducts,
    getProductDetails,
};