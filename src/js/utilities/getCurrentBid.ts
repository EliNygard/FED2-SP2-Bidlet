import { Listing } from "../types/types";

export function getCurrentBid(listing:Listing) {
    if (listing.bids && listing.bids.length > 0) {
        const bidAmounts = listing.bids.map((bid) => bid.amount);

        const highestBid = Math.max(...bidAmounts);

        return highestBid
      } else {
          return 0
      }
}