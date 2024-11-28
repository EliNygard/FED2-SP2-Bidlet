class ListingCardComponent extends HTMLElement {
  private titleElement: HTMLElement | null = null;
  private _pendingTitle: string | null = null;
  private sellerNameElement: HTMLElement | null = null;
  private _pendingSellerName: string | null = null;
  private itemImageElement: HTMLImageElement | null = null;
  private _pendingItemImage: { src: string; alt: string } | null = null;
  private currentBidElement: HTMLElement | null = null;
  private _pendingCurrentBid: string | null = null
  private linkElement: HTMLAnchorElement | null = null
  private _pendingListingId: string | null = null

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <section class="border border-brand-dark py-2 px-3 mx-auto md:mx-0 max-w-96 md:max-w-full text-brand-dark font-body flex flex-col h-full">
          <a class="item-page-link" href="">
          <div class="m-auto h-72 flex justify-center items-center">
            <img class="max-w-full max-h-full object-contain item-img" src="" alt="" />
          </div>
          <div>
            <div class="py-4">
              <h2 class="text-lg lg:text-22px overflow-hidden title"></h2>
              <p class="text-base lg:text-lg seller-name"></p>
            </div>
            <div class="text-base lg:text-lg pb-7">
              <p class="current-bid"></p>
              <p class="ends-at">Ends at</p>
              <p class="ended bg-brand-light text-brand-default inline-flex py-px px-1 rounded">Sold</p>
            </div>
          </div>  
          </a>
        </section>
      `;

    this.titleElement = this.querySelector(".title");
    this.sellerNameElement = this.querySelector(".seller-name");
    this.itemImageElement = this.querySelector(".item-img") as HTMLImageElement;
    this.currentBidElement = this.querySelector(".current-bid")
    this.linkElement = this.querySelector(".item-page-link")

    // Apply pending title if it was set before connectedCallback
    if (this._pendingTitle !== null) {
      this.title = this._pendingTitle;
      this._pendingTitle = null;
    }
    if (this._pendingSellerName !== null) {
      this.sellerName = this._pendingSellerName;
      this._pendingSellerName = null;
    }
    if (this._pendingItemImage !== null) {
      this.itemImage = this._pendingItemImage;
      this._pendingItemImage = null;
    }
    if (this._pendingCurrentBid !== null) {
      this.currentBid = this._pendingCurrentBid
      this._pendingCurrentBid = null
    }
    if (this._pendingListingId !== null) {
      this.listingId = this._pendingListingId
      this._pendingListingId = null
    }
  }

  set itemImage(value: { src: string; alt: string }) {
    if (this.itemImageElement) {
      this.itemImageElement.src = value.src;
      this.itemImageElement.alt = value.alt;
    } else {
      this._pendingItemImage = value;
    }
  }
  set title(value: string) {
    if (this.titleElement) {
      this.titleElement.textContent = value;
    } else {
      // Queue the title update for when the element is connected
      this._pendingTitle = value;
    }
  }
  set sellerName(value: string) {
    if (this.sellerNameElement) {
      this.sellerNameElement.textContent = value;
    } else {
      this._pendingSellerName = value;
    }
  }
  set currentBid(value: string) {
    if (this.currentBidElement) {
      this.currentBidElement.textContent = value
    } else {
      this._pendingCurrentBid = value
    }
  }
  set listingId(value: string) {
    if (this.linkElement) {
      this.linkElement.href = `./item?id=${value}`
    } else {
      this._pendingListingId = value
    }
  }
}

customElements.define("listing-card-component", ListingCardComponent);

export default ListingCardComponent;
