import { API_BASE_URL } from "../variables/script.js";

const register_URL = `${API_BASE_URL}/api/v1/auction/auth/register`;

const errorMessage = document.querySelector(".error-message");

let nameStored = localStorage.getItem('name');
let emailStored = localStorage.getItem('email');
let passwordStored = localStorage.getItem('password');

const user = {
    name: nameStored,
    email: emailStored,
    password: passwordStored, 
};

/**
 * Registers a new user 
 * @param {string} url Rest API URL for register 
 * @param {string} userData Data of user input
 * @returns {string} A successfull register message or an error if the reqirements is not met
 */
async function registerUser(url, userData) {

    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);

        if (response.status === 201) {
            console.log("Register successful!");
            errorMessage.innerText = "Register successfull!";
            errorMessage.classList.add("text-success");
            errorMessage.classList.remove("text-danger");
        }
      
        else {
            console.log("Register failed!");
            errorMessage.innerText = json.errors[0].message;
            errorMessage.classList.add("text-danger");
            errorMessage.classList.remove("text-success");
        }

    } catch (error) {
        errorMessage.innerHTML = error.errors[0].message;
        
        console.log(error);
    }
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    let nameInput = document.getElementById("name_input").value;
    let emailInput = document.getElementById("email_input").value;
    let pwdInput = document.getElementById("pwd").value;

        try {

            let user = {
                name: nameInput,
                email: emailInput,
                password: pwdInput, 
            };

            await registerUser(register_URL, user);
        }

        catch(error) {
            console.log(error);
            errorMessage.innerHTML = "lol";
        }
});





