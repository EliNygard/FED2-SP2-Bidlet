// import api from "../../../api/instance.ts";
// import "../../components/header-component.ts";
// import "../../components/footer-component.ts";
// import "../../components/item-page-component.ts";
// import ItemPageComponent from "../../components/item-page-component.ts";
// import { getCurrentBid } from "../../utilities/getCurrentBid.ts";

// async function initializePage(): Promise<void> {
//   const page = document.getElementById("app");
//   console.log(page);
  
//   const parameterString = window.location.search;
//   const searchParameters = new URLSearchParams(parameterString);
//   const listingId = searchParameters.get("id");
//   if (page) {
//     const header = document.createElement("header-component");
//     const main = document.createElement("main");
//     const footer = document.createElement("footer-component");

    
//     try {

//         const listing = await api.listing.read(listingId);
//         console.log(listing);
//         const highestBid = getCurrentBid(listing)
                        
//         const listingItem = document.createElement("item-page-component") as ItemPageComponent
//         listingItem.listingId = listing.id
//         listingItem.itemImage = {
//             src: listing.media?.[0]?.url || "default-image-url",
//             alt: listing.media?.[0]?.alt || `Image of item for sale: ${listing.title}`
//         }
//         listingItem.title = listing.title
//         listingItem.seller = listing.seller.name
//         listingItem.currentBid = `Current bid: ${highestBid} kr`
//         listingItem.timeLeft = listing.endsAt
//         listingItem.endsAt = listing.endsAt
//         listingItem.description = listing.description
        
//         main.appendChild(listingItem)
//         console.log(listingItem);
        
//         listingItem.addEventListener("renderComplete", function handleRenderComplete() {
//             console.trace("RenderComplete event triggered");

//         const tags = listing.tags
//         if (tags) {
//             listingItem.addTags(tags);
//             console.log(tags);
//         }
//         const bids = listing.bids
//         if (bids) {
//             listingItem.addBids(bids)
//             console.log(bids);
            
//         }

//         listingItem.removeEventListener("renderComplete", handleRenderComplete);
//     })
        
//     } catch (error) {
//         if (error instanceof Error) {
//             console.error(error.message);
            
//         } else {
//             console.error("Ups, an unknown error occurred. We are sorry about the trouble. Please try again.");
            
//         }
        
//     }
//     page.append(header, main, footer);
//   } else {
//     console.error("Could not load list item. Please try again.");
//   }
// }

// initializePage();
