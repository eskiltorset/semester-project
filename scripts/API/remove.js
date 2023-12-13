import { API_BASE_URL } from "../variables/script.js";

const remove_URL = `${API_BASE_URL}/api/v1/auction/listings/`;

/**
 * Removes a post from the Rest API
 * @param {number} id ID of the post
 * @returns {string} deletes the post if the user has authentication for it
 */
export async function remove(id = 0){
    const token = localStorage.getItem('accessToken');
    const url = `${remove_URL}${id}`

    if(!token){
        throw new Error("You must be logged in to delete a post.");
    }

    if(!id){
        throw new Error("You must pass a valid post id");
    }

    const options = {
        method: "delete",
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await fetch(url, options);

    if (response.ok){
        return await response.json();
    }

    throw new Error("could not delete this item.");
}
