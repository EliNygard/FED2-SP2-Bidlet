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

      const listingsHeader = document.createElement("div")
      listingsHeader.className = "max-w-7xl mx-auto px-5 mt-9 flex justify-between md:justify-start md:gap-8 lg:gap-12 font-heading text-base tracking-[.11em] md:text-xl tracking-widest"
      const activeBidletsBtn = document.createElement("button")
      activeBidletsBtn.textContent = "Active Bidlets"
      activeBidletsBtn.className = "tab-btn"
      activeBidletsBtn.id = "activeBidlets"
      const allBidletsBtn = document.createElement("button")
      allBidletsBtn.textContent = "All Bidlets"
      allBidletsBtn.className = "tab-btn"
      allBidletsBtn.id = "allBidlets"
      listingsHeader.append(activeBidletsBtn, allBidletsBtn)

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
      main.append(listingsHeader, bgListingsSection);
      page.append(header, main, footer);

      const listingsHeaderButtons = document.querySelectorAll(".tab-btn")
      console.log(listingsHeaderButtons);
      listingsHeaderButtons.forEach((button) => {
        button.addEventListener("click", async () => {

          listingsHeaderButtons.forEach((btn) => btn.classList.remove("active"))
          button.classList.add("active")

          if (!listingsSection) return

          listingsSection.innerHTML = ""

          if (button.id === "activeBidlets") {
            const listings = await api.listings.readAll("&_active=true&sort=created&sortOrder=desc")
            listings.forEach((listing: Listing) => {
              const listingCard = document.createElement("listing-card-component");
              listingCard.setAttribute("data-listing", JSON.stringify(listing));
              listingsSection.appendChild(listingCard);
            });
          }

          else if (button.id === "allBidlets") {
            const listings = await api.listings.readAll("&sort=created&sortOrder=desc")
            listings.forEach((listing: Listing) => {
              const listingCard = document.createElement("listing-card-component");
              listingCard.setAttribute("data-listing", JSON.stringify(listing));
              listingsSection.appendChild(listingCard);
            });
          }
        })
      })
      
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
