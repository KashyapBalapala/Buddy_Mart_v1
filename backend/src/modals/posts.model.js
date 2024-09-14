const posts = require('./posts.mongo');


async function createNewPosts(post) {
    await posts.create(post);
    return post;
}

async function getAllPosts() {
    return await posts.find({}).lean();
}

async function getUserPosts(userId) {
    const userPosts = await posts.find({
        userId: userId
    }).lean();
    return userPosts;
}


module.exports = {
    createNewPosts,
    getAllPosts,
    getUserPosts
}