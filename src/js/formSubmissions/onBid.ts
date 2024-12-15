import api from "../../api/instance.ts";
import { Listing } from "../types/types.ts";
import { getCurrentBid } from "../utilities/getCurrentBid.ts";

export async function onBid(event: Event, listing: Listing) {
  event.preventDefault();

  const token = api.token
  const id = listing.id;
  const highestBid = getCurrentBid(listing);

  const form = event.target as HTMLFormElement | null
  if (!form) {
    console.error("Form element not found. Please try again.");
    return
  }
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())
  const bidAmount = parseFloat(data["bid-amount"] as string)
  
  if (!token) {
    alert("You must be logged in to make a bid")
  }

  if (token && bidAmount <= highestBid) {
    alert("Your bid must be higher than the current bid. Please try again.")
  }
  
  if (isNaN(bidAmount)) {
    console.error("Invalid bid amount");
    return
  }

  if (token && bidAmount > highestBid) {
    alert(`You are placing a bid of ${bidAmount} kr`)
  }

  try {
    await api.listings.bid(id, bidAmount);
  } catch (error) {
    console.error(error);
  } finally {
    window.location.reload();
  }
}
