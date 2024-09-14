const products = require('./products.mongo');


async function addNewProduct(product) {
    await products.findOneAndUpdate({
        title: product.title,
      }, product, {
        upsert: true,
    });
}

async function getAllProducts() {
    return await products.find();
}

module.exports = {
    getAllProducts,
    addNewProduct
}