// import api from "../../../api/instance.ts";
// import "../../components/header-component.ts";
// import "../../components/footer-component.ts";
// import "../../components/item-page-component-new.ts";
// import { getCurrentBid } from "../../utilities/getCurrentBid";
// import UserProfile from "../../components/item-page-component-new.ts";

// async function initializePage() {
//   console.log("Item page");
//   const page = document.getElementById("app");
//   console.log(page);
//   const parameterString = window.location.search;
//   const searchParameters = new URLSearchParams(parameterString);
//   const listingId = searchParameters.get("id");
//   const userProfile = document.createElement("user-profile") as UserProfile
    
//   if (page) {
//     const header = document.createElement("header-component");
//     const main = document.createElement("main");
//     const footer = document.createElement("footer-component");

//     try {
//       const listing = await api.listing.read(listingId);
//       console.log(listing);
//       const highestBid = getCurrentBid(listing);
//       console.log(highestBid);
//       const { title, description } = listing
//       console.log(title, description);

//       await customElements.whenDefined('user-profile');
//       userProfile.updateProfile(title, description)
      
//     } catch (error) {
//       console.error(error);
//     } finally {
//       console.log("finally");
//     }

//     main.appendChild(userProfile)
//     page.append(header, main, footer)
//   } else {
//     console.error("Could not load list item. Please try again.");
    
//   }

// }

// initializePage();
