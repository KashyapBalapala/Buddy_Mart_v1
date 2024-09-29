// const API_URL = 'https://localhost:5000';
const API_URL = 'https://localhost:8000';

async function httpGetAllProducts() {
    const response = await fetch(`${API_URL}/product`);
    return await response.json();
}

async function httpGetAllUsers() {
    const response = await fetch(`${API_URL}/users`);
    return await response.json();
}


async function httpGetAllPosts() {
    const response = await fetch(`${API_URL}/posts/all`);
    return await response.json();
}

async function httpCreateNewPost(post) {
    try {
        return await fetch(`${API_URL}/posts/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        });
      } catch(error) {
        return {
          ok: false,
        }
    }
}

async function httpGetUserPosts(userId) {
  const response = await fetch(`${API_URL}/posts/${userId}`);
  return await response.json();
}

async function httpGetUserFriends(userId) {
  const response = await fetch(`${API_URL}/friend/${userId}`);
  return await response.json();
}

export {
    httpGetAllProducts,
    httpGetAllUsers,
    httpGetAllPosts,
    httpCreateNewPost,
    httpGetUserPosts,
    httpGetUserFriends
}