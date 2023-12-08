import { API_BASE_URL } from "../variables/script.js";

const creditAmount = document.getElementById("credit_amount");
const credits = localStorage.getItem('credits');
creditAmount.innerHTML = credits;

const postForm = document.getElementById("postForm");

/**
 * Creates a post which is saved in the Rest API
 * @param {string} url Rest API URL for 'post' posts
 * @param {string} postData Data of post input
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

            // window.location.href = `../singleListing/?id=${json.id}`;

            successfullMsg.innerHTML = "Your item was successfully listed!";
            // deadlineMsg.classList.add("text-success");
            // deadlineMsg.classList.remove("text-danger");
            titleMsg.innerHTML = "";
            deadlineMsg.innerHTML = "";
        }

        catch(error) {
            console.log(error);
            // titleMsg.innerHTML = "You need to write a title";
            // deadlineMsg.innerHTML = "You need to specify the deadline date";
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