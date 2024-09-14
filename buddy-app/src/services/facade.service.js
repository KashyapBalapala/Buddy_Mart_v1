const API_URL = 'http://localhost:5000';

async function httpGetAllProducts() {
    const response = await fetch(`${API_URL}/`);
    return await response.json();
}

async function httpGetAllUsers() {
    const response = await fetch(`${API_URL}/users`);
    return await response.json();
}


export {
    httpGetAllProducts,
    httpGetAllUsers
}