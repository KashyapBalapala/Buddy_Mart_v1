const express = require('express');
const { httpCreateNewBucket, httpAddProduct, httpShareBucket, httpGetSharedBuckets } = require('./buckets.controller');

const bucketsRouter = express.Router();

bucketsRouter.post('/create', httpCreateNewBucket);
bucketsRouter.post('/addProduct', httpAddProduct);
bucketsRouter.post('/share/:bucketId', httpShareBucket);
bucketsRouter.get('/:userId', httpGetSharedBuckets);

module.exports = bucketsRouter;