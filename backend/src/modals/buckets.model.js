const buckets = require('./buckets.mongo');

async function createNewBucket(userId) {
    const bucket = {
        userId: userId,
        products: [],
        isShared: false,
    };
    await buckets.findOneAndUpdate({
        userId: userId,
      }, bucket, {
        upsert: true,
    });
    return bucket;
}


async function getBucket(bucketId) {
    return await buckets.findOne({_id: bucketId});
}

async function updateBucket(bucket) {
    await buckets.findOneAndUpdate({
        _id: bucket._id,
      }, bucket, {
        upsert: true,
    });
}

async function getSharedBuckets(ownerIds) {
    try {
        const buckets = await Bucket.find({
            $or: [
                { ownerId: { $in: ownerIds } },
                { isShared: true }               
            ]
        });
        return buckets;
    } catch(error) {
        console.error('Error fetching buckets:', error);
    }
}


module.exports = {
    createNewBucket,
    getBucket,
    updateBucket,
    getSharedBuckets
}