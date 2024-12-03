import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import "../../components/listing-card-component.ts";
import "../../components/loader-component.ts";
import api from "../../../api/instance.ts";
import { populateListings } from "../../utilities/populateListings.ts";
import { delay } from "../../utilities/delay.ts";

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  if (page) {
    const loader = document.createElement("loader-component");
    const header = document.createElement("header-component");
    const main = document.createElement("main");
    const footer = document.createElement("footer-component");

    const bgListingsSection = document.createElement("div");
    bgListingsSection.className = "bg-brand-default";
    const listingsSection = document.createElement("div");
    listingsSection.className =
      "max-w-7xl py-8 px-5 mt-4 m-auto grid gap-3 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch";

    main.append(loader, bgListingsSection);
    page.append(header, main, footer);

    try {
      await delay(1000);
      const listings = await api.listings.readAll("&_active=true&sort=created&sortOrder=desc");
      // console.log(listings);
      bgListingsSection.appendChild(listingsSection);
      populateListings(listings, listingsSection);
    } catch (error) {
      console.error(error);
    } finally {
      main.removeChild(loader);
    }

    // main.appendChild(bgListingsSection);
    // page.append(header, main, footer);
  } else {
    console.error("Could not display page");
  }
}

initializePage();
