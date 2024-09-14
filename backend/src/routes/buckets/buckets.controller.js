const { createNewBucket, getBucket, updateBucket, getSharedBuckets } = require("../../modals/buckets.model");
const { getUser, updateBucketDetails } = require("../../modals/users.model");


async function httpCreateNewBucket(req, res) {
    const { userId } = req.body;
    const user = await getUser(userId);
    if (!user)  {
        return res.status(404).json({ message: 'User not found' });
    }
    const newBucket = await createNewBucket(userId);
    updateBucketDetails(user, bucketId);
    return res.status(201).json({ message: 'Bucket created', bucket: newBucket });
}

async function httpAddProduct(req, res) {
    const { userId, productId, quantity } = req.body;
    const user = await getUser(userId);
    if (!user || !user.basketId) {
        return res.status(404).json({ message: 'User or bucket not found' });
    }

    const bucket = await getBucket(user.bucketId);
    const productIndex = bucket.products.findIndex(p => p.productId === productId);
    if (productIndex >= 0) {
        bucket.products[productIndex].quantity += quantity;
    } else {
        bucket.products.push({ productId, quantity });
    }

    await updateBucket(bucket);
    res.status(200).json({ message: 'Product added to bucket', bucket });
}

async function httpShareBucket(req, res) {
    const { bucketId } = req.params;
    const bucket = await getBucket(bucketId);
    bucket.isShared = true;
    await updateBucket(bucket);
    res.status(200).json({ message: 'Bucket is shared', bucket });
}

async function httpGetSharedBuckets(req, res) {
    const { userId } = req.params;
    const user = await getUser(userId);
    const buckets = await getSharedBuckets(user.friends);
    return res.status(200).json({ message: 'Buckets fetched', buckets});
}

module.exports = {
    httpCreateNewBucket,
    httpAddProduct,
    httpShareBucket,
    httpGetSharedBuckets
}