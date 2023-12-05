import { API_BASE_URL, credits } from "../variables/script.js";
// import { bid } from "../listings_logged_in/bid.js";
// import { userData } from "../listings_logged_in/bid.js";

const creditAmount = document.getElementById("credit_amount");
const creditsLS = localStorage.getItem('credits');
creditAmount.innerHTML = creditsLS;

function getId() {
    const url = new URL(location.href);
    return url.searchParams.get("id");
}

const url = new URL(location.href);
console.log(url);

const postId = getId();

const fetchPost_URL = `${API_BASE_URL}/api/v1/auction/listings/${postId}?limit=20&_seller=true&_bids=true`;
const bid_URL = `${API_BASE_URL}/api/v1/auction/listings/${postId}/bids`;

window.onload = fetchPost(fetchPost_URL);

/**
 * Fetches the viewed post by ID
 * @param {string} url Rest API URL for post by ID 
 * @returns {string} The post that is clicked by the user
 */
async function fetchPost(url) {
        try {
            const token = localStorage.getItem("accessToken");
            
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }, 
            }

            const response = await fetch(url, fetchOptions);
            const json = await response.json();

            console.log(json);

            const listing = json;

            const itemDiv = document.querySelector('.item-div');

            const listingDiv = document.createElement("div");
            listingDiv.classList.add("listing-div", "p-4", "border", "mt-3", "w-75", "shadow-sm", "mx-auto");
            listingDiv.style.height = "600px";
            listingDiv.id = listing.id;  

            const imageDiv = document.createElement("div");
            imageDiv.classList.add("image-div", "border", "w-100", "h-50", "bg-dark");

            const title = document.createElement("h5");
            title.classList.add("title", "fw-bolder", "mt-2");
            title.innerHTML = listing.title;
            
            const description = document.createElement("p");
            description.classList.add("description");
            description.innerHTML = listing.description;

            const auctionDate = document.createElement("p");
            auctionDate.classList.add("auctionDate");

            const x = listing.endsAt;
            const date = new Date(x)

            auctionDate.innerHTML = `Ends at: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

            const bids = document.createElement("p");
            bids.classList.add("bids");
            bids.innerHTML = `${listing._count.bids} bids`;

            const seller = document.createElement("h5");
            seller.classList.add("seller");
            seller.innerHTML = `@${listing.seller.name}`;

            const leadingBid = document.createElement("p");
            leadingBid.classList.add("leading-bid");

            const leadingBidFormula = (listing.bids.length - 1)

            // leadingBid.innerHTML = `Leading bid: ${listing.bids[0].amount} credits`;

            // const viewBtn = document.createElement("a");
            // viewBtn.classList.add("view-btn", "text-decoration-none");
            // viewBtn.innerHTML = "View listing";
            // viewBtn.id = listing.id;

            const bidAmount = document.createElement("input");
            bidAmount.setAttribute("type", "number");
            bidAmount.classList.add("float-end", "px-3", "py-2", "w-25", "border");
            bidAmount.id = "bid_amount";
            bidAmount.href = `../singleListing/?id=${listing.id}`; 

            const bidBtn = document.createElement("a");
            bidBtn.classList.add("bid-btn", "text-decoration-none", "float-end", "red-btn", "px-4", "py-2");
            bidBtn.innerHTML = "Bid";
            bidBtn.id = listing.id;
            // bidBtn.href = `../singleListing/?id=${listing.id}`; 
            // bidBtn.onclick = bid(bid_URL, userData);

            const bidError = document.createElement("p");
            bidError.classList.add("bid-error");
            bidError.innerText = "";

            if(listing.bids.length > 0){
                leadingBid.innerHTML = `Leading bid: ${listing.bids[leadingBidFormula].amount} credits`;
                bidAmount.placeholder = `Min: ${listing.bids[leadingBidFormula].amount + 1} credits`;
                bidAmount.min = listing.bids[leadingBidFormula].amount + 1;
            }

            else if(listing.bids.length < 1){
                leadingBid.innerHTML = `Leading bid: no bids`;
                bidAmount.placeholder = `Min: 1 credit`;
                bidAmount.min = 1;
            }


            bidBtn.addEventListener("click", async (event) => {
                console.log("clicked");

                //event.preventDefault();

                let bidAmountInput = document.getElementById("bid_amount").value;

                try {
                    
                    let bid = {
                        amount: parseInt(bidAmountInput)
                    };
                    console.log(bidAmountInput);

                    await bidOnItem(bid_URL, bid);

                }
            
                catch(error) {
                    console.log(error);
                }

            });



            itemDiv.appendChild(listingDiv);

            if(listing.media){
                const listingImg = document.createElement("img"); 
                listingImg.classList.add("w-100", "object-fit-cover", "h-100");
                listingImg.alt = "Auction Image";
                listingImg.src = listing.media;

                imageDiv.appendChild(listingImg);
            }

            listingDiv.appendChild(imageDiv);
            listingDiv.appendChild(title);
            listingDiv.appendChild(description);
            listingDiv.appendChild(auctionDate);
            listingDiv.appendChild(bids);
            listingDiv.appendChild(leadingBid);
            listingDiv.appendChild(seller);
            listingDiv.appendChild(bidBtn);
            listingDiv.appendChild(bidAmount);
            listingDiv.appendChild(bidError);
            
        }

        catch(error) {
            console.log(error);
        }
}

async function bidOnItem(url, userData) {

    const bidError = document.querySelector(".bid-error");

    try {
        const token = localStorage.getItem("accessToken");
        
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify(userData)
        }

        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);

        let bidAmount = document.getElementById("bid_amount").value;
        console.log(bidAmount);  

        if (response.status === 201) {
            console.log("Bid was successful!");
            bidError.innerText = "Bid was successful!";
            bidError.classList.add("text-success");
            bidError.classList.remove("text-danger");
            creditsAmount = creditsAmount - bidAmount;
        }

        else {
            console.log("Bid failed!");
            bidError.innerText = json.errors[0].message;
            bidError.classList.add("text-danger");
            bidError.classList.remove("text-success");
        }
    }

    catch(error) {
        bidError.innerText = error.errors[0].message;
        console.log(error);
    }
}





            
//fetchPost(fetchPost_URL);

