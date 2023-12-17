import { API_BASE_URL } from "../variables/script.js";
import { signOut } from "../API/signout.js";

const loggedInUser = localStorage.getItem("loggedInUser");

const creditAmount = document.getElementById("credit_amount");
const credits = localStorage.getItem('credits');
creditAmount.innerHTML = credits;

const profileLink = document.querySelector(".profile");
const creditsShown = document.querySelector(".credits");

const signOutBtn = document.querySelector(".sign-out");
signOutBtn.onclick = signOut;

const postForm = document.getElementById("postForm");

if(loggedInUser == null){
    profileLink.innerText = "Login";
    profileLink.href = "../../index.html"
    creditsShown.classList.add("d-none");
    signOutBtn.classList.add("d-none");
}

/**
 * Creates a listing which is saved in the Rest API
 * @param {string} url Rest API URL for 'POST' listings
 * @param {string} postData Data of listing input
 * @returns {string} The post to the Rest API URL if the requirements are met
 */
async function createPost(url, postData) {

    try {
        const token = localStorage.getItem("accessToken");
        const fetchOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(postData),
        }
    
        const response = await fetch(url, fetchOptions);
        const json = await response.json();
        console.log(json);
  
    }
    
    catch(error) {
        console.log(error);
    }
}

postForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const titleInput = document.getElementById("title_input").value;
    const bodyInput = document.getElementById("description_input").value;
    const tagsInput = document.getElementById("tags_input").value;
    const mediaInput = document.getElementById("media_input").value;
    const deadlineInput = document.getElementById("deadline_input").value;

    let titleMsg = document.querySelector(".title-msg");
    let deadlineMsg = document.querySelector(".deadline-msg");
    let successfullMsg = document.querySelector(".successfull-msg");

    if(titleInput.length > 0 && deadlineInput.length > 0) {

        try {

            let userPost = {
                title: titleInput,
                description: bodyInput,
                tags: [tagsInput],
                media: [mediaInput],
                endsAt: deadlineInput
            };

            const createPosts_URL = `${API_BASE_URL}/api/v1/auction/listings`;

            await createPost(createPosts_URL, userPost);

            successfullMsg.innerHTML = "Your item was successfully listed!";
            titleMsg.innerHTML = "";
            deadlineMsg.innerHTML = "";
        }

        catch(error) {
            console.log(error);
        }
    }

    else {
        if(titleInput.length <= 0){
            titleMsg.innerHTML = "You need to write a title";
        }

        if(titleInput.length > 0){
            titleMsg.innerHTML = "";
        }

        if(deadlineInput.length <= 0){
            deadlineMsg.innerHTML = "You need to specify the deadline date";
        }

        if(deadlineInput.length > 0){
            deadlineMsg.innerHTML = "";
        }

        if(mediaInput.length <= 0){
            mediaInput.innerHTML = "Media needs to be a valid URL";
        }

        if(mediaInput.length > 0){
            mediaInput.innerHTML = "";
        }
    }
});