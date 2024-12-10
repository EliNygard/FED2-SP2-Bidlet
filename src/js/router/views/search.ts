import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import "../../components/search-form-component.ts";
import "../../components/listing-card-component.ts";
import api from "../../../api/instance.ts";
import { Listing } from "../../types/types.ts";
import { showLoader } from "../../utilities/showLoader.ts";
import { hideLoader } from "../../utilities/hideLoader.ts";

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  if (page) {
    showLoader(page);
    try {
      const header = document.createElement("header-component");
      const main = document.createElement("main");
      const searchForm = document.createElement("search-form-component");
      const footer = document.createElement("footer-component");

      const bgListingsSection = document.createElement("div");
      bgListingsSection.className = "bg-brand-default mt-4";
      const listingsSection = document.createElement("div");
      listingsSection.className =
        "max-w-7xl py-8 px-5 mt-4 m-auto grid gap-3 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch";

      const listings = await api.listings.readAll("&_active=true&sort=endsAt&sortOrder=asc");
      console.log(listings);

      listings.forEach((listing: Listing) => {
        const listingCard = document.createElement("listing-card-component");
        listingCard.setAttribute("data-listing", JSON.stringify(listing));
        listingsSection.appendChild(listingCard);
      });

      bgListingsSection.appendChild(listingsSection);
      main.append(searchForm, bgListingsSection);
      page.append(header, main, footer);

      const displayQuery = document.createElement("p");
      displayQuery.className = "max-w-7xl m-auto px-5 pt-4 font-heading text-base md:text-lg";
      
      // Get search query and display search result
      searchForm.addEventListener("search", async (event: Event) => {
        const searchEvent = event as CustomEvent;
        const query = searchEvent.detail.query;
        console.log(query);
        displayQuery.textContent = `Search result for '${query}':`;
        
        main.innerHTML = "";

        main.append(searchForm);

        listingsSection.innerHTML = "";
        
        showLoader(main);
        try {
          const searchResult = await api.listings.search(query);

          if (searchResult.length === 0) {
            displayQuery.innerHTML = `We could not find any listings with the search '${query}'. Please try again.`
          } else {
            searchResult.forEach((result: Listing) => {
              const listingCard = document.createElement("listing-card-component");
              listingCard.setAttribute("data-listing", JSON.stringify(result));
              listingsSection.appendChild(listingCard);
            });
          }
          bgListingsSection.append(displayQuery, listingsSection);
          main.appendChild(bgListingsSection);
        } catch (error) {
          console.error("Error fetching search results.", error);
        } finally {
          hideLoader(main);
        }
      });
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
