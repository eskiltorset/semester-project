import { API_BASE_URL } from "../variables/script.js";
import { signOut } from "../API/signout.js";

const fetchlistings_URL = `${API_BASE_URL}/api/v1/auction/listings?limit=99&_seller=true&_bids=true`;
const creditAmount = document.getElementById("credit_amount");
const credits = localStorage.getItem('credits');
creditAmount.innerHTML = credits;

const url = new URL(location.href);
console.log(url);

const signOutBtn = document.querySelector(".sign-out");
signOutBtn.onclick = signOut;  

const loggedInUser = localStorage.getItem("loggedInUser");

/**
 * Fetches 99 listings from the Rest API
 * @param {string} url Rest API URL for listings
 * @returns {string} All listings in the Rest API URL with a limit of 99
 */
async function fetchlistings(url) {
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

      json.forEach(listingArray);

      function listingArray(listing){

        const listings_section = document.getElementById('listings_section');

        if(listing.title){

            const listingDiv = document.createElement("div");
            listingDiv.classList.add("listing-div", "p-4", "border", "mt-3", "w-50", "shadow-sm");
            listingDiv.style.height = "620px";
            listingDiv.id = listing.id;  

            const imageDiv = document.createElement("div");
            imageDiv.classList.add("image-div", "border", "w-100", "h-50", "bg-dark");

            const title = document.createElement("h5");
            title.classList.add("title", "fw-bolder", "mt-2", "text-truncate");
            title.innerHTML = listing.title;
            
            const description = document.createElement("p");
            description.classList.add("description", "small", "text-truncate");
            description.innerHTML = listing.description;

            const auctionDate = document.createElement("p");
            auctionDate.classList.add("auctionDate");

            const dateToday = new Date().toJSON();

            if (dateToday > listing.endsAt){
                auctionDate.innerHTML = `<br>This auction has ended`;
                auctionDate.classList.add("text-danger");
            }

            else if (dateToday < listing.endsAt){
                const x = listing.endsAt;
                const date = new Date(x)
    
                auctionDate.innerHTML = `Ends at: <br>${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            }

            const bids = document.createElement("p");
            bids.classList.add("bids", "text-secondary");
            bids.innerHTML = `${listing._count.bids} bid(s)`;

            const seller = document.createElement("h6");
            seller.classList.add("seller");
            seller.innerHTML = `Listed by: <br><span class="text-secondary">@${listing.seller.name}</span>`;

            const leadingBid = document.createElement("p");
            leadingBid.classList.add("leading-bid");

            const leadingBidFormula = (listing.bids.length - 1)

            if(listing.bids.length > 0){
                leadingBid.innerHTML = `Leading bid: <span class="leadingBid">${listing.bids[leadingBidFormula].amount}c</span>`;
            }

            else if(listing.bids.length < 1){
                leadingBid.innerHTML = `Leading bid: no bids`;
            }

            const bidBtn = document.createElement("a");
            bidBtn.classList.add("bid-btn", "text-decoration-none", "float-end", "red-btn", "px-3");
            bidBtn.innerHTML = "Bid";
            bidBtn.id = listing.id;
            bidBtn.href = `../singleListing/?id=${listing.id}`; 

            const profileLink = document.querySelector(".profile");
            const creditsShown = document.querySelector(".credits");

            if(loggedInUser == null){
                profileLink.innerText = "Login";
                profileLink.href = "../../index.html"
                creditsShown.classList.add("d-none");
                signOutBtn.classList.add("d-none");
            }

            listings_section.appendChild(listingDiv);

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

            // ACTIVE FILTER
            const active = document.querySelector("#active");
            const popular = document.querySelector("#popular");
            active.addEventListener("click", (event) => {
                event.preventDefault();

                active.classList.add("text-secondary");
                popular.classList.remove("text-secondary");
                
                    const activeListings = json
                    .filter(listing => dateToday < listing.endsAt);

                    if(activeListings.includes(listing)){
                        listingDiv.style.display = "block";
                        
                    }

                    else{
                        listingDiv.style.display = "none";
                    }
            });

            // POPULAR FILTER
            popular.addEventListener("click", (event) => {
                event.preventDefault();

                popular.classList.add("text-secondary");
                active.classList.remove("text-secondary");

                const mostBids = json
                .filter(listing => listing.bids.length > 10 && dateToday < listing.endsAt);

                    if(mostBids.includes(listing)){
                        listingDiv.style.display = "block";
                    }

                    else{
                        listingDiv.style.display = "none";
                    }
                              
            });

            // SEARCH BAR
            const searchInput = document.querySelector("#search-focus");

            searchInput.addEventListener("keyup", (event) => {
                const { value } = event.target;
            
                const searchQuery = value.toLowerCase();
              
                let title = listing.title.toLowerCase();
              
                if (title.includes(searchQuery)) {
                    listingDiv.style.display = "block";
                } 
                else {
                    listingDiv.style.display = "none";
                }
            });

            }
        }
    }

    catch(error) {
        console.log(error);
    }
}
  
fetchlistings(fetchlistings_URL);





