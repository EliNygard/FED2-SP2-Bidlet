import api from "../../../api/instance.ts";
import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import { displayItem } from "../../components/displayItem.ts";
import { showLoader } from "../../utilities/showLoader.ts";
import { hideLoader } from "../../utilities/hideLoader.ts";
import { handleCarousel } from "../../utilities/handleCarousel.ts";

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  const parameterString = window.location.search;
  const searchParameters = new URLSearchParams(parameterString);
  const listingId = searchParameters.get("id");
  const token = api.token
  
  if (page) {
    showLoader(document.body);
    try {
      const header = document.createElement("header-component");
      const main = document.createElement("main");
      const footer = document.createElement("footer-component");
      
      if (!listingId) {
        throw new Error("Listing ID is missing");
      }
      
      const listing = await api.listing.read(listingId);
      const item = await displayItem(listing);
      
      document.title = `Bidlet | ${listing.title}`;
      
      page.append(header, main, footer);
      main.appendChild(item);

      if (!token) {
        const bidButton = document.getElementById("bid-btn")
        if (bidButton) {
          bidButton.className = "disabled: btn btn-big btn-disabled"
          bidButton.title = "You must be logged in to make a bid"
        }
      }

      handleCarousel();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
        alert(error);
      }
    } finally {
      hideLoader(document.body);
    }
  } else {
    console.error("Could not load list item. Please try again.");
  }
}

initializePage();
