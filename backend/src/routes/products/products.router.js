const express = require('express');
const { httpGetAllProducts, httpAddNewProduct } = require('./products.controller');

const productsRouter = express.Router();

productsRouter.post('/create', httpAddNewProduct);
productsRouter.get('/', httpGetAllProducts);

module.exports = productsRouter;