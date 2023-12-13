import { API_BASE_URL } from "../variables/script.js";
import { signOut } from "../API/signout.js";
import { update } from "../API/update.js";

const loggedInUser = localStorage.getItem("loggedInUser");
const profileInfo_URL = `${API_BASE_URL}/api/v1/auction/profiles/${loggedInUser}`;
const fetchPosts_URL = `${API_BASE_URL}/api/v1/auction/profiles/${loggedInUser}/listings?limit=20&_seller=true&_bids=true`;

const signOutBtn = document.querySelector(".sign-out");
signOutBtn.onclick = signOut;

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
            avatar.src = json.avatar;
          }
           
            username.innerHTML = `@${json.name}`;
            credits_profile.innerHTML = `Credits: <br> ${json.credits}`;
            listed_by_you.innerHTML = `Listed by you: <br>${json._count.listings}`;
            bids_won.innerHTML = `Bids won: <br>${json.wins.length}`;

            const editBtn = document.querySelector(".updateAvatar")
            editBtn.addEventListener("click", async () => {
                const newAvatarInput = document.getElementById("newAvatar");
                const avatarMsg = document.querySelector(".avatarMsg");
                const avatarToUpdate = json.avatar;
                console.log("clicked");
                try{
                    await update(avatarToUpdate, {
                        avatar: newAvatarInput.value
                    });
                    console.log("Update succeeded")
                    avatarMsg.innerText = "Update successfull!";

                    function reload(){
                        location.reload();
                    }
        
                    setTimeout(reload, 1500);
                }
                catch(error){
                    console.log(error);
                }
                
            });

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
            listingDiv.style.height = "560px";
            listingDiv.id = listing.id;  

            const imageDiv = document.createElement("div");
            imageDiv.classList.add("image-div", "border", "w-100", "h-50", "bg-dark");

            const title = document.createElement("h5");
            title.classList.add("title", "fw-bolder", "mt-2");
            title.innerHTML = listing.title;
            
            const description = document.createElement("p");
            description.classList.add("description", "small", "text-truncate");
            description.innerHTML = listing.description;

            const auctionDate = document.createElement("p");
            auctionDate.classList.add("auctionDate");

            const dateToday = new Date().toJSON();

            if (dateToday > listing.endsAt){
                auctionDate.innerHTML = `This auction has ended`;
                auctionDate.classList.add("text-danger");
            }

            else if (dateToday < listing.endsAt){
                const x = listing.endsAt;
                const date = new Date(x)
    
                auctionDate.innerHTML = `Ends at: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
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
                leadingBid.innerHTML = `Leading bid: <span class="leadingBid">${listing.bids[leadingBidFormula].amount} credits</span>`;
            }

            else if(listing.bids.length < 1){
                leadingBid.innerHTML = `Leading bid: no bids`;
            }

            const viewBtn = document.createElement("a");
            viewBtn.classList.add("bid-btn", "text-decoration-none", "float-end", "red-btn", "px-3");
            viewBtn.innerHTML = "View";
            viewBtn.id = listing.id;
            viewBtn.href = `../singleListing/?id=${listing.id}`; 

            // if(loggedInUser == null){
            //     viewBtn.href = `../../index.html`; 
            // }

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

            }
        }

    }
  
    catch(error) {
      console.log(error);
    }
}

fetchListings(fetchPosts_URL);