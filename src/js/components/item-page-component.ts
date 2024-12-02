import { onBid } from "../formSubmissions/onBid";
import { Bid } from "../types/types";
import { calculateTimeRemaining, formatDate, formatDateAndTime } from "../utilities/formatting";

class ItemPageComponent extends HTMLElement {
  private itemImageElement: HTMLImageElement | null = null;
  private _pendingItemImage: { src: string; alt: string } | null = null;
  private titleElement: HTMLElement | null = null;
  private _pendingTitle: string | null = null;
  private sellerElement: HTMLElement | null = null;
  private _pendingSeller: string | null = null;
  private currentBidElement: HTMLElement | null = null;
  private _pendingCurrentBid: string | null = null;
  private timeLeftElement: HTMLElement | null = null;
  private _pendingTimeLeft: string | null = null;
  private endsAtElement: HTMLElement | null = null;
  private _pendingEndsAt: string | null = null;
  private descriptionElement: HTMLElement | null = null;
  private _pendingDescription: string | null = null;
  private bidInput: HTMLInputElement | null = null;
  private bidButton: HTMLElement | null = null;
  private bidMessage: HTMLElement | null = null;
  private bidAmount: HTMLElement | null = null;

  constructor() {
    super();
    // this.handleBid = this.handleBid.bind(this);
  }

  connectedCallback() {
    this.innerHTML = `
        <section class="flex flex-col m-auto my-6 px-4 max-w-xl animate-pulse">
      <!-- <div class="flex justify-end">
        <span class="fa-solid fa-ellipsis-vertical"></span>
      </div> -->
      <div class="">
        <img class="max-w-full max-h-full object-contain item-img" src="" alt="" />
        <ul id="carousel"></ul>
      </div>

      <div class="flex justify-center gap-12 mt-4">
        <button aria-label="Previous button" id="prev-button" class="">
          <span aria-hidden="true" class="fa-solid fa-chevron-left"></span>
        </button>
        <button aria-label="Next button" id="next-button" class="">
          <span aria-hidden="true" class="fa-solid fa-chevron-right"></span>
        </button>
      </div>

      <div class="mb-6 mt-8">
        <ul class="mb-6 tags"></ul>
        <div>
          <h1 class="title font-heading text-2xl md:text-3xl mb-2"></h1>
          <a href="">
            <p class="seller font-body text-sm md:text-base mb-5"></p>
          </a>
          <p class="current-bid font-body text-base md:text-lg mb-4">Current bid: 600 kr</p>
          <p class="time-left"></p>
          <p class="ends-at font-body text-sm md:text-base"></p>
        </div>
      </div>

      <form class="flex flex-col gap-4" action="" name="bid">
        <label class="hidden" id="bid"">Add your bid</label>
        <input
          class="form-input max-w-max70"
          id="bid-input"
          type="text"
          name="bid-amount"
          pattern="\\d+(.\\d+)?"
          title="Please enter a valid number."
          required
        />

        <button id="bid-btn" class="btn btn-big">Place your bid</button>
        
        </form>


      
      <section class="mt-12">
        <h2 class="font-heading text-xl md:text-2xl mb-2">Description</h2>
        <p class="description font-body text-base md:text-lg"></p>
      </section>

      <section class="mt-12 mr-10 flex flex-col gap-4 max-w-60">
        <h2 class="bids-title font-heading text-xl md:text-2xl">All bids</h2>
        <ul class="bids-list"></ul>
      </section>
    </section>
        `;

    this.itemImageElement = this.querySelector(".item-img") as HTMLImageElement;
    this.titleElement = this.querySelector(".title");
    this.sellerElement = this.querySelector(".seller");
    this.currentBidElement = this.querySelector(".current-bid");
    this.timeLeftElement = this.querySelector(".time-left");
    this.endsAtElement = this.querySelector(".ends-at");
    this.descriptionElement = this.querySelector(".description");
    this.bidInput = this.querySelector("#bid-input");
    this.bidButton = this.querySelector("#bid-btn");
    this.bidMessage = this.querySelector("#bid-message");
    this.bidAmount = this.querySelector("#bid-amount");

    if (this._pendingItemImage !== null) {
      this.itemImage = this._pendingItemImage;
      this._pendingItemImage = null;
    }
    if (this._pendingTitle !== null) {
      this.title = this._pendingTitle;
      this._pendingTitle = null;
    }
    if (this._pendingSeller !== null) {
      this.seller = this._pendingSeller;
      this._pendingSeller = null;
    }
    if (this._pendingCurrentBid !== null) {
      this.currentBid = this._pendingCurrentBid;
      this._pendingCurrentBid = null;
    }
    if (this._pendingTimeLeft !== null) {
      this.timeLeft = this._pendingTimeLeft;
      this._pendingTimeLeft = null;
    }
    if (this._pendingEndsAt !== null) {
      this.endsAt = this._pendingEndsAt;
      this._pendingEndsAt = null;
    }
    if (this._pendingDescription !== null) {
      this.description = this._pendingDescription;
      this._pendingDescription = null;
    }

    this.dispatchEvent(new Event("renderComplete"));


    this.bidButton?.addEventListener("click", this.handleBid)
}

  disconnectedCallback() {
    this.bidButton?.removeEventListener("click", this.handleBid);
  }

  handleBid(event: Event) {
    // add request add bid function here?
    // get the input value here?
    if (this.bidInput) {
        const inputValue = this.bidInput.value.trim()
    
        console.log(inputValue);
        
        onBid(event, this.listingId, inputValue)

    }


    // if (this.bidInput && this.bidMessage && this.bidAmount && this.titleElement) {
    //   const inputValue = this.bidInput.value.trim();
    //   this.titleElement.textContent = this.title;

    //   if (inputValue && !isNaN(Number(inputValue))) {
    //     this.bidAmount.textContent = `${inputValue}kr.`;
    //     this.bidMessage.classList.remove("hidden");
    //   } else {
    //     this.bidMessage.textContent = "Please enter a valid number.";
    //     this.bidMessage.classList.remove("hidden");
    //   }
    // }
  }

  set listingId(value: string) {
    this.listingId = value
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
      this._pendingTitle = value;
    }
  }
  set seller(value: string) {
    if (this.sellerElement) {
      this.sellerElement.textContent = value;
    } else {
      this._pendingSeller = value;
    }
  }
  set currentBid(value: string) {
    if (this.currentBidElement) {
      this.currentBidElement.textContent = value;
    } else {
      this._pendingCurrentBid = value;
    }
  }
  set timeLeft(value: string) {
    if (this.timeLeftElement) {
      const now = new Date();
      const endsAtDate = new Date(value);

      if (endsAtDate < now) {
        this.timeLeftElement.className = "time-left bg-brand-light text-brand-default inline-flex py-px px-1 rounded";
        this.timeLeftElement.textContent = "Auction ended";
        if (this.currentBidElement) {
          this.currentBidElement.remove();
        }
      } else {
        this.timeLeftElement.className = "time-left font-body text-sm md:text-base mb-1";
        this.timeLeftElement.textContent = "Time left: " + calculateTimeRemaining(endsAtDate.toISOString());
      }
    } else {
      this._pendingTimeLeft = value;
    }
  }
  set endsAt(value: string) {
    if (this.endsAtElement) {
      this.endsAtElement.textContent = "Ends at: " + formatDate(value);
    } else {
      this._pendingEndsAt = value;
    }
  }
  set description(value: string) {
    if (this.descriptionElement) {
      this.descriptionElement.textContent = value;
    } else {
      this._pendingDescription = value;
    }
  }

  addTags(tags: string[]) {
    console.log(tags);

    const tagsListElement = this.querySelector(".tags");
    console.log(tagsListElement);

    if (tagsListElement) {
      tags.forEach((tag) => {
        const tagItem = document.createElement("li");
        tagItem.textContent = tag;
        tagItem.className =
          "font-heading uppercase text-xs md:text-sm text-brand-dark bg-brand-default hover:bg-accent-default rounded inline-flex px-1 py-1";
        tagsListElement.appendChild(tagItem);
      });
    }
  }

  addBids(bids: Bid[]) {
    console.log(bids);
    const bidsListElement = this.querySelector(".bids-list");

    if (bidsListElement) {
      bids.forEach((bid) => {
        const bidItem = document.createElement("li");
        bidItem.className = "bids-list flex flex-row justify-between";
        const bidDate = document.createElement("p");
        bidDate.textContent = formatDateAndTime(bid.created);
        bidDate.className = "font-body text-base md:text-lg";
        const bidAmount = document.createElement("p");
        bidAmount.textContent = `${bid.amount} kr`;
        bidAmount.className = "font-body text-base md:text-lg";

        bidItem.append(bidDate, bidAmount);
        bidsListElement.append(bidItem);
      });
    }
  }
}

customElements.define("item-page-component", ItemPageComponent);

export default ItemPageComponent;
