const { createNewPosts, getAllPosts, getUserPosts } = require("../../modals/posts.model");
const { getUser } = require("../../modals/users.model");


async function httpCreateNewPost(req, res) {
    const { userId, content } = req.body;
    try {
        const user = await getUser(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const post = {
            content,
            userId,
        };
        const newPost = await createNewPosts(post);
        res.status(201).json({ message: 'Post created successfully', newPost });
    } catch(error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
}


async function httpGetAllPosts(req, res) {
    try {
        const posts = await getAllPosts();
        // console.log(posts);
        const finalPosts = await Promise.all(posts.map(async (post) => {
            const user = await getUser(post.userId);
            return {
                ...post,
                userName: user.userName,
                profilePic: user.profilePic
            };
        }));
        res.status(200).json(finalPosts);
    } catch(error) {
        res.status(500).json({ message: 'Error retrieving posts', error });
    }
}

async function httpGetUserPosts(req, res) {
    const { userId } = req.params;
    console.log(userId);
    try {
        const user = await getUser(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const posts = await getUserPosts(userId);
        const finalPosts = await Promise.all(posts.map(async (post) => {
            return {
                ...post,
                userName: user.userName,
                profilePic: user.profilePic
            };
        }));
        res.status(200).json(finalPosts);
    } catch(error) {
        res.status(500).json({ message: 'Error retrieving posts', error });
    }
}

module.exports = {
    httpCreateNewPost,
    httpGetAllPosts,
    httpGetUserPosts
}