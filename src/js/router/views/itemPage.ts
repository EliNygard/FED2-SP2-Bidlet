import api from "../../../api/instance.ts";
import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import "../../components/loader-component.ts";
import { displayItem } from "../../components/displayItem.ts";

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  const parameterString = window.location.search;
  const searchParameters = new URLSearchParams(parameterString);
  const listingId = searchParameters.get("id");

  if (page) {
    const header = document.createElement("header-component");
    const main = document.createElement("main");
    const footer = document.createElement("footer-component");
    const loader = document.createElement("loader-component")

    main.appendChild(loader)
    page.append(header, main, footer);
    try {
      if (!listingId) {
        throw new Error("Listing ID is missing");
      }

      const listing = await api.listing.read(listingId);
      const item = await displayItem(listing);

      main.appendChild(item);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
        // display error, create a component
      }
    } finally {
      main.removeChild(loader)
    }
  } else {
    console.error("Could not load list item. Please try again.");
  }
}

initializePage();