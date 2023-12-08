import { API_BASE_URL } from "../variables/script.js";

const loggedInUser = localStorage.getItem("loggedInUser");
const profileInfo_URL = `${API_BASE_URL}/api/v1/auction/profiles/${loggedInUser}`;
const fetchPosts_URL = `${API_BASE_URL}/api/v1/auction/profiles/${loggedInUser}/listings?limit=20&_seller=true&_bids=true`;

export async function fetchInfo(url) {
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

          const avatar = document.querySelector(".avatar");
          const username = document.querySelector(".username");
          const credits_profile = document.querySelector(".credits-profile");
          const listed_by_you = document.querySelector(".listed-by-you");
          const bids_won = document.querySelector(".bids-won");
    
          if (json.avatar == null){
            avatar.src = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp";
          }
    
          else if(json.avatar != null){
            avatar.src = json.seller.avatar;
          }
           
            username.innerHTML = `@${json.name}`;
            credits_profile.innerHTML = `Credits: <br> ${json.credits}`;
            listed_by_you.innerHTML = `Listed by you: <br>${json._count.listings}`;
            bids_won.innerHTML = `Bids won: <br>${json.wins.length}`;

            // localStorage.setItem("creditsss", credits.json);

    }
  
    catch(error) {
      console.log(error);
    }
}

fetchInfo(profileInfo_URL);

/**
 * Fetches a users own posts from the Rest API
 * @param {string} url Rest API URL for profile
 * @returns {string} All posts the user has posted in the Rest API URL
 */
async function fetchListings(url) {
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
  
              // const anchor = document.createElement("a");
              const listingDiv = document.createElement("div");
              listingDiv.classList.add("listing-div", "p-4", "border", "mt-3", "w-50", "shadow-sm");
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
              auctionDate.innerHTML = `Ends at: ${listing.endsAt}`;
  
              const bids = document.createElement("p");
              bids.classList.add("bids");
              bids.innerHTML = `${listing._count.bids} bids`;
  
              const count = listing.bids.length;
              console.log(count);
  
              const seller = document.createElement("h5");
              seller.classList.add("seller");
              seller.innerHTML = `@${listing.seller.name}`;
  
              const leadingBid = document.createElement("p");
              leadingBid.classList.add("leading-bid");
  
              if(listing.bids.length > 0){
                  leadingBid.innerHTML = `Leading bid: ${listing.bids[0].amount} credits`;
              }
  
              else if(listing.bids.length < 1){
                  leadingBid.innerHTML = `Leading bid: no bids`;
              }
  
              const viewBtn = document.createElement("a");
              viewBtn.classList.add("view-btn", "text-decoration-none");
              viewBtn.innerHTML = "View listing";
              viewBtn.id = listing.id;
              //viewBtn.href = `/listing/?id=${listing.id}`; 
  
              const bidBtn = document.createElement("a");
              bidBtn.classList.add("bid-btn", "text-decoration-none", "float-end", "red-btn", "px-3");
              bidBtn.innerHTML = "Bid";
              bidBtn.id = listing.id;
              bidBtn.href = `../singleListing/?id=${listing.id}`; 
  
              listings_section.appendChild(listingDiv);
              //anchor.appendChild(listingDiv);
  
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
              listingDiv.appendChild(viewBtn);
              listingDiv.appendChild(bidBtn);

            }
        }

    }
  
    catch(error) {
      console.log(error);
    }
}

fetchListings(fetchPosts_URL);