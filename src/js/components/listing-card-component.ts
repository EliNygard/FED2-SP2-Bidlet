class ListingCardComponent extends HTMLElement {
  private titleElement: HTMLElement | null = null;
  private _pendingTitle: string | null = null;
  private sellerNameElement: HTMLElement | null = null;
  private _pendingSellerName: string | null = null;
  private itemImageElement: HTMLImageElement | null = null;
  private _pendingItemImage: { src: string; alt: string } | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <section class="border border-brand-dark py-2 px-3 text-brand-dark font-body">
          <a href="./itemPage">
            <img class="item-img" src="" alt="" />
            <div class="py-4">
              <h2 class="text-lg lg:text-22px title"></h2>
              <p class="text-base lg:text-lg seller-name"></p>
            </div>
            <div class="text-base lg:text-lg pb-7">
              <p class="current-bid">Current bid</p>
              <p class="ends-at">Ends at</p>
              <p class="ended bg-brand-light text-brand-default inline-flex py-px px-1 rounded">Sold</p>
            </div>
          </a>
        </section>
      `;

    this.titleElement = this.querySelector(".title");
    this.sellerNameElement = this.querySelector(".seller-name");
    this.itemImageElement = this.querySelector(".item-img") as HTMLImageElement;

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
}

customElements.define("listing-card-component", ListingCardComponent);

export default ListingCardComponent;
