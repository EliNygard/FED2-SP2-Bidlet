import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import "../../components/listing-card-component.ts";
import api from "../../../api/instance.ts";
import { showLoader } from "../../utilities/showLoader.ts";
import { hideLoader } from "../../utilities/hideLoader.ts";
import { Listing, Meta } from "../../types/types.ts";

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  if (page) {
    showLoader(page);

    try {
      const header = document.createElement("header-component");
      const main = document.createElement("main");
      const footer = document.createElement("footer-component");

      const heading = document.createElement("h1");
      heading.textContent = "Browse Active and All Bidlets";
      heading.className = "sr-only";
      heading.id = "bidletsHeading";

      const listingsHeader = document.createElement("div");
      listingsHeader.className =
        "max-w-7xl mx-auto px-5 mt-9 flex justify-between md:justify-start md:gap-8 lg:gap-12 font-heading text-base tracking-[.11em] md:text-xl tracking-widest";
      const activeBidletsBtn = document.createElement("button");
      activeBidletsBtn.textContent = "Active Bidlets";
      activeBidletsBtn.className = "tab-btn active";
      activeBidletsBtn.id = "activeBidlets";
      activeBidletsBtn.setAttribute("aria-labelledby", "bidletsHeading");
      const allBidletsBtn = document.createElement("button");
      allBidletsBtn.textContent = "All Bidlets";
      allBidletsBtn.className = "tab-btn";
      allBidletsBtn.id = "allBidlets";
      allBidletsBtn.setAttribute("aria-labelledby", "bidletsHeading");
      listingsHeader.append(activeBidletsBtn, allBidletsBtn);

      const bgListingsSection = document.createElement("div");
      bgListingsSection.className = "bg-brand-default";
      const listingsSection = document.createElement("div");
      listingsSection.className =
        "max-w-7xl py-8 px-5 mt-4 m-auto grid gap-3 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch";

      const listings = await api.listings.readAll("&_active=true&sort=created&sortOrder=desc&limit=10&page=1");
      console.log("First page data:", listings.data);
      console.log("Pagination info:", listings.meta);

      const paginationControls = document.createElement("div");
      paginationControls.id = "paginationControls";

      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Previous";
      prevBtn.id = "prevBtn";
      const pageInfo = document.createElement("span");
      pageInfo.textContent = "";
      pageInfo.id = "pageInfo";
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next";
      nextBtn.id = "nextBtn";

      paginationControls.append(prevBtn, pageInfo, nextBtn);

      listings.data.forEach((listing: Listing) => {
        const listingCard = document.createElement("listing-card-component");
        listingCard.setAttribute("data-listing", JSON.stringify(listing));
        listingsSection.appendChild(listingCard);
      });

      bgListingsSection.append(listingsSection, paginationControls);
      main.append(heading, listingsHeader, bgListingsSection);
      page.append(header, main, footer);

      const listingsHeaderButtons = document.querySelectorAll(".tab-btn");
      listingsHeaderButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          listingsHeaderButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");

          if (!listingsSection) return;

          listingsSection.innerHTML = "";

          if (button.id === "activeBidlets") {
            const listings = await api.listings.readAll("&_active=true&sort=created&sortOrder=desc");
            listings.data.forEach((listing: Listing) => {
              const listingCard = document.createElement("listing-card-component");
              listingCard.setAttribute("data-listing", JSON.stringify(listing));
              listingsSection.appendChild(listingCard);
            });
          } else if (button.id === "allBidlets") {
            const listings = await api.listings.readAll("&sort=created&sortOrder=desc");
            listings.data.forEach((listing: Listing) => {
              const listingCard = document.createElement("listing-card-component");
              listingCard.setAttribute("data-listing", JSON.stringify(listing));
              listingsSection.appendChild(listingCard);
            });
          }
        });
      });

      function updatePaginationControls(meta: Meta) {
        const prevBtn = document.getElementById("prevBtn") as HTMLButtonElement;
        const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
        const pageInfo = document.getElementById("pageInfo");

        if (prevBtn && nextBtn && pageInfo) {
          prevBtn.disabled = meta.isFirstPage;
          nextBtn.disabled = meta.isLastPage;
          pageInfo.textContent = `Page ${meta.currentPage} of ${meta.pageCount}`;
        }
      }
      updatePaginationControls(listings.meta);

      nextBtn.addEventListener("click", async () => {
        const nextPage = api.meta.nextPage;
        const listings = await api.listings.readAll(
          `&_active=true&sort=created&sortOrder=desc&limit=10&page=${nextPage}`,
        );
        listingsSection.innerHTML = "";
        listings.data.forEach((listing: Listing) => {
          const listingCard = document.createElement("listing-card-component");
          listingCard.setAttribute("data-listing", JSON.stringify(listing));
          listingsSection.appendChild(listingCard);
        });

        updatePaginationControls(listings.meta);
      });

      prevBtn.addEventListener("click", async () => {
        const prevPage = api.meta.previousPage;
        const listings = await api.listings.readAll(
          `&_active=true&sort=created&sortOrder=desc&limit=10&page=${prevPage}`,
        );
        listingsSection.innerHTML = "";
        listings.data.forEach((listing: Listing) => {
          const listingCard = document.createElement("listing-card-component");
          listingCard.setAttribute("data-listing", JSON.stringify(listing));
          listingsSection.appendChild(listingCard);
        });

        updatePaginationControls(listings.meta);
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
