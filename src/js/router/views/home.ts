import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import "../../components/listing-card-component.ts";
import api from "../../../api/instance.ts";
import ListingCardComponent from "../../components/listing-card-component.ts";

interface Media {
  url: string;
  alt: string;
}

interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  wins?: string[];
}

interface Bid {
  id: string;
  amount: number;
  bidder: User;
  created: string;
}

interface Listing {
  id?: string;
  title: string;
  description?: string;
  tags?: string[];
  media?: Media[];
  created: string;
  updated: string;
  endsAt: string;
  seller?: User;
  bids?: Bid[];
  _count?: {
    bids: number;
  };
}

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  if (page) {
    const header = document.createElement("header-component");
    const main = document.createElement("main");
    const footer = document.createElement("footer-component");

    const listings = await api.listings.readAll("&_active=true&sortOrder_endsAt=asc");
    // console.log(listings);
    listings.forEach((listing: Listing) => {
      const listingCard = document.createElement("listing-card-component") as ListingCardComponent;
      listingCard.title = listing.title;
      listingCard.sellerName = listing.seller?.name || "Anonym";
      listingCard.itemImage = {
        src: listing.media?.[0]?.url || "default-image-url",
        alt: listing.media?.[0]?.alt || `Image of item for sale: ${listing.title}`
      }
      
      console.log(listing.media?.[0]?.url);
      console.log(listing.media?.[0]?.alt);
      main.appendChild(listingCard);

      // if (listing.bids) {
      //     listing.bids.forEach((bid) => {
      //         //
      //     })
      // };
    });

    page.append(header, main, footer);
  } else {
    console.error("Could not display page");
  }
}

initializePage();
