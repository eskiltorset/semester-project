import { API_BASE_URL } from "../variables/script.js";

const update_URL = `${API_BASE_URL}/api/v1/auction/profiles/`;

/**
 * Updates a listing from the Rest API
 * @param {number} id ID of the listing
 * @returns {string} updates the listing if the user has authentication for it
 */
export async function update(name, newListingData){
    const token = localStorage.getItem('accessToken');
    name = localStorage.getItem('loggedInUser');
    const url = `${update_URL}${name}/media`

    if(!token){
        throw new Error("You must be logged in to update your avatar.");
    }

    if(!name){
        throw new Error("You must pass a valid name");
    }

    const options = {
        method: "put",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newListingData)
    };

    const response = await fetch(url, options);

    if (response.ok){
        return await response.json();
    }

    throw new Error("could not update this item.");
}

