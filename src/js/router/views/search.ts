import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import "../../components/search-form-component.ts";
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
    const searchForm = document.createElement("search-form-component");
    const footer = document.createElement("footer-component");

    const bgListingsSection = document.createElement("div");
    bgListingsSection.className = "bg-brand-default";
    const listingsSection = document.createElement("div");
    listingsSection.className =
      "max-w-7xl py-8 px-5 mt-4 m-auto grid gap-3 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch";

    // bgListingsSection.appendChild(listingsSection);
    main.append(searchForm, loader, bgListingsSection);
    page.append(header, main, footer);

    try {
      await delay(1000);
      const listings = await api.listings.readAll("&_active=true&sort=endsAt&sortOrder=asc");
      bgListingsSection.appendChild(listingsSection);
      populateListings(listings, listingsSection);
    } catch (error) {
      console.error("Error fetching listings.", error);
    } finally {
      main.removeChild(loader);
    }

    // Get search query and display search result
    searchForm.addEventListener("search", async (event: Event) => {
      const searchEvent = event as CustomEvent;
      const query = searchEvent.detail.query;
      console.log("Search query:", query);

      listingsSection.innerHTML = "";

      main.appendChild(loader);

      try {
        await delay(1000);
        const searchResult = await api.listings.search(query);
        console.log(searchResult);
        bgListingsSection.appendChild(listingsSection);
        populateListings(searchResult, listingsSection);

        if (searchResult.length === 0) {
          const noResultsMessage = document.createElement("p");
          noResultsMessage.textContent = "No listings found. Please try a new search.";
          listingsSection.appendChild(noResultsMessage);
        }
      } catch (error) {
        console.error("Error fetching search results.", error);
      } finally {
        main.removeChild(loader);
      }
    });
  } else {
    console.error("Could not display page");
  }
}

initializePage();
