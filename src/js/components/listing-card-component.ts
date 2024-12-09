import { Listing } from "../types/types";
import { calculateTimeRemaining } from "../utilities/formatting";
import { getCurrentBid } from "../utilities/getCurrentBid";

class ListingCardComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    try {
      const listingData = this.getAttribute("data-listing");
      if (listingData) {
        const listing = JSON.parse(listingData);
        this.render(listing);
      }
    } catch (error) {
      console.error(error);
    }
  }

  render(listing: Listing | null) {
    if (listing) {
      const highestBid = getCurrentBid(listing);
      const id = listing.id;
      const media = listing.media?.[0]
      const imageUrl = media?.url || "default-image-url"
      const imageAlt = media?.alt || `Item for sale, ${listing.title}`

      this.innerHTML = `
        <section class="border border-brand-dark pt-2 pb-7 px-4 mx-auto md:mx-0 max-w-96 md:max-w-full text-brand-dark font-body flex flex-col h-full">
          <a class="item-page-link" href="./item?id=${id}">
            <div class="m-auto h-60 flex justify-center items-center">
              <img class="max-w-full max-h-full object-contain item-img" src="${imageUrl}" alt="${imageAlt}" />
            </div>
            <div class="mx-2">
              <div class="mt-4">
                <h2 class="title mb-1 text-lg lg:text-22px overflow-hidden">${listing.title}</h2>
                <p class="seller-name text-base lg:text-lg">${listing.seller?.name}</p>
              </div>
              <div class="text-base lg:text-lg mt-4">
                <p class="current-bid mb-1">Current bid: ${highestBid} kr</p>
                <p class="ends-at">Ends at: ${calculateTimeRemaining(listing.endsAt)}</p>
              </div>
            </div>  
          </a>
        </section>
        `;
    }
  }
}

customElements.define("listing-card-component", ListingCardComponent);

export default ListingCardComponent;
