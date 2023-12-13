import { API_BASE_URL } from "../variables/script.js";

const update_URL = `${API_BASE_URL}/api/v1/auction/profiles/`;

/**
 * Updates a post from the Rest API
 * @param {number} id ID of the post
 * @returns {string} updates the post if the user has authentication for it
 */
export async function update(name, newPostData){
    const token = localStorage.getItem('accessToken');
    name = localStorage.getItem('loggedInUser');
    const url = `${update_URL}${name}/media`

    if(!token){
        throw new Error("You must be logged in to update a post.");
    }

    if(!name){
        throw new Error("You must pass a valid post name");
    }

    const options = {
        method: "put",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newPostData)
    };

    const response = await fetch(url, options);

    if (response.ok){
        return await response.json();
    }

    throw new Error("could not update this item.");
}

