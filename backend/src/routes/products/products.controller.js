const { getAllProducts, addNewProduct } = require('../../modals/products.model');

async function httpAddNewProduct(req, res) {
    const product = req.body;
    if (!product.title || !product.price || !product.rating || !product.image || !product.quantity) {
        return res.status(400).json({
            error: 'Missing Product Property'
        });
    }
    await addNewProduct(product);
    return res.status(201).json(product);
}

async function httpGetAllProducts(req, res) {
    res.status(200).json(await getAllProducts());
}

module.exports = {
    httpAddNewProduct,
    httpGetAllProducts,
}