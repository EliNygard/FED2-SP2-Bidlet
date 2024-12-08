import api from "../../../api/instance.ts";
import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import { displayItem } from "../../components/displayItem.ts";
import { showLoader } from "../../utilities/showLoader.ts";
import { hideLoader } from "../../utilities/hideLoader.ts";
import { delay } from "../../utilities/delay.ts";

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  const parameterString = window.location.search;
  const searchParameters = new URLSearchParams(parameterString);
  const listingId = searchParameters.get("id");

  if (page) {
    showLoader(document.body);
    try {
      await delay(1000);
      const header = document.createElement("header-component");
      const main = document.createElement("main");
      const footer = document.createElement("footer-component");

      page.append(header, main, footer);
      if (!listingId) {
        throw new Error("Listing ID is missing");
      }

      const listing = await api.listing.read(listingId);
      const item = await displayItem(listing);
      console.log(listing);

      document.title = `Bidlet | ${listing.title}`;

      main.appendChild(item);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
        // display error, create a component
      }
    } finally {
      hideLoader(document.body);
    }
  } else {
    console.error("Could not load list item. Please try again.");
  }
}

initializePage();
