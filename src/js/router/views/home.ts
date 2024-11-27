import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import "../../components/listing-card-component.ts";
import api from "../../../api/instance.ts";
import {getCurrentBid} from "../../utilities/getCurrentBid.ts"
import ListingCardComponent from "../../components/listing-card-component.ts";
import { Listing } from "../../types/types.ts"


async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  if (page) {
    const header = document.createElement("header-component");
    const main = document.createElement("main");
    const footer = document.createElement("footer-component");

    const bgListingsSection = document.createElement("div")
    bgListingsSection.className = "bg-brand-default"
    const listingsSection = document.createElement("div")
    listingsSection.className = "max-w-7xl py-8 px-5 mt-4 m-auto grid gap-3 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch"

    bgListingsSection.appendChild(listingsSection)

    const listings = await api.listings.readAll("&_active=true&sortOrder_endsAt=asc");
    // console.log(listings);

    listings.forEach((listing: Listing) => {

      const highestBid = getCurrentBid(listing)
      console.log(highestBid);
      

      const listingCard = document.createElement("listing-card-component") as ListingCardComponent;
      listingCard.title = listing.title;
      listingCard.sellerName = listing.seller?.name || "Anonym";
      listingCard.itemImage = {
        src: listing.media?.[0]?.url || "default-image-url",
        alt: listing.media?.[0]?.alt || `Image of item for sale: ${listing.title}`,
      };
      listingCard.currentBid = `Current bid: ${highestBid}`

      listingsSection.appendChild(listingCard);

      // if (listing.bids) {
      //     listing.bids.forEach((bid) => {
      //         //
      //     })
      // };
    });
    main.appendChild(bgListingsSection)
    page.append(header, main, footer);
  } else {
    console.error("Could not display page");
  }
}

initializePage();
