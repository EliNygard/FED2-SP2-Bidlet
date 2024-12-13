import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import "../../components/listing-card-component.ts";
import api from "../../../api/instance.ts";
import { showLoader } from "../../utilities/showLoader.ts";
import { hideLoader } from "../../utilities/hideLoader.ts";
import { Listing } from "../../types/types.ts";

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  if (page) {
    showLoader(page);

    try {
      const header = document.createElement("header-component");
      const main = document.createElement("main");
      const footer = document.createElement("footer-component");

      const bgListingsSection = document.createElement("div");
      bgListingsSection.className = "bg-brand-default";
      const listingsSection = document.createElement("div");
      listingsSection.className =
        "max-w-7xl py-8 px-5 mt-4 m-auto grid gap-3 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch";

      const listings = await api.listings.readAll("&_active=true&sort=created&sortOrder=desc");
      console.log(listings);

      listings.forEach((listing: Listing) => {
        const listingCard = document.createElement("listing-card-component");
        listingCard.setAttribute("data-listing", JSON.stringify(listing));
        listingsSection.appendChild(listingCard);
      });

      bgListingsSection.appendChild(listingsSection);
      main.append(bgListingsSection);
      page.append(header, main, footer);
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader(page);
    }
  } else {
    console.error("Could not display page");
  }
}

initializePage();
