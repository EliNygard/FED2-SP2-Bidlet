import api from "../../../api/instance.ts";
import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import { getCurrentBid } from "../../utilities/getCurrentBid.ts";
import { displayItem } from "../../components/displayItem.ts";

async function initializePage(): Promise<void> {
  console.log("Item page!");
  const page = document.getElementById("app");
  console.log(page);
  const parameterString = window.location.search;
  const searchParameters = new URLSearchParams(parameterString);
  const listingId = searchParameters.get("id");

  if (page) {
    const header = document.createElement("header-component");
    const main = document.createElement("main");
    const footer = document.createElement("footer-component");

    try {
      if (!listingId) {
        throw new Error("Listing ID is missing");
      }

      const listing = await api.listing.read(listingId);
      console.log(listing);
      const highestBid = getCurrentBid(listing);
      console.log(highestBid);
      const { title, description } = listing;
      console.log(title, description);

      const item = await displayItem(listing);
      main.appendChild(item);

      page.append(header, main, footer);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      console.log("finally");
    }
  } else {
    console.error("Could not load list item. Please try again.");
  }
}

initializePage();