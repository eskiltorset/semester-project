const API_BASE_URL = "https://api.noroff.dev";

const errorMessage = document.querySelector(".error-message");

/**
 * Checks if the values in userData is a registered user in the Rest API 
 * @param {string} url Rest API URL for login 
 * @param {string} userData Data of user input
 * @returns {string} A successfull login message if the input is correct and redirected to feed or error
 */
async function loginUser(url, userData) {
  try {
    const postData = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }

    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json);

    if (response.status === 200) {
      console.log("Login successful!");
      window.location.href = "/pages/listings_logged_in/index.html";
    }

    else {
      console.log("Login failed!");
      errorMessage.innerText = json.errors[0].message;
    }

    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);

    let loggedInUser = json.name;
    localStorage.setItem("loggedInUser", loggedInUser);
    console.log(`Name: ${localStorage.getItem("loggedInUser")}`);
    return json;

  }
  catch(error) {
    console.error(error);
  }
}

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  try {
    const emailInput = document.getElementById("email_input").value;
    const pwdInput = document.getElementById("pwd").value;
  
    let userToLogin = {
      email: emailInput,
      password: pwdInput
    };

    const login_URL = `${API_BASE_URL}/api/v1/auction/auth/login`;

    await loginUser(login_URL, userToLogin);
  }
  catch(error) {
    console.log(error);
  }
});



