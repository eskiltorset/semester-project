// import { API_BASE_URL } from "../variables/script.js";

// function getId() {
//     const url = new URL(location.href);
//     return url.searchParams.get("id");
// }

// const url = new URL(location.href);
// console.log(url);

// const postId = getId();

// const bid_URL = `${API_BASE_URL}/api/v1/auction/listings/${postId}/bids`;

// bidBtn.onclick = bid(bid_URL, userData);

// export async function bid(url, userData) {
//     try {
//         const token = localStorage.getItem("accessToken");
        
//         const postData = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             }, 
//             body: JSON.stringify(userData)
//         }

//         const response = await fetch(url, postData);
//         console.log(response);
//         const json = await response.json();
//         console.log(json);

//         let bidAmount = document.getElementById("bid_amount").value;
//         console.log(bidAmount);
//     }

//     catch(error) {
//         console.log(error);
//     }
// }