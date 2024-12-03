import ListingCardComponent from "../components/listing-card-component";
import { Listing } from "../types/types";
import { getCurrentBid } from "./getCurrentBid";

export function populateListings(listings: Listing[], listingsSection: HTMLElement): void {
    listings.forEach((listing: Listing) => {
        const highestBid = getCurrentBid(listing)
        const listingCard = document.createElement("listing-card-component") as ListingCardComponent;
          listingCard.listingId = listing.id;
          listingCard.itemImage = {
            src: listing.media?.[0]?.url || "default-image-url",
            alt: listing.media?.[0]?.alt || `Image of item for sale: ${listing.title}`,
          };
          listingCard.title = listing.title;
          listingCard.sellerName = listing.seller?.name || "Anonym";
          listingCard.currentBid = `Current bid: ${highestBid} kr`;
          listingCard.endsAt = listing.endsAt;

          listingsSection.appendChild(listingCard);
    })
  }