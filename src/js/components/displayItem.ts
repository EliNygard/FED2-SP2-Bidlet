import { onBid } from "../formSubmissions/onBid";
import { Listing } from "../types/types";
import { calculateTimeRemaining, formatDateAndTime } from "../utilities/formatting";
import { getCurrentBid } from "../utilities/getCurrentBid";

export async function displayItem(listing: Listing): Promise<HTMLElement> {
    const section = document.createElement("section");
    section.className = "flex flex-col m-auto my-6 px-4 max-w-xl";
    console.log(listing);
    

    // Image section
    const imageSection = document.createElement("div");
    imageSection.className = "flex justify-center"
    const image = document.createElement("img");
    image.className = "max-w-full max-h-full object-contain item-img";
    if (listing.media) {
        image.src = listing.media?.[0]?.url || "default-image-url";
        image.alt = listing.media?.[0]?.alt || `Image of item for sale: ${listing.title}`;
    }
    imageSection.appendChild(image);

    const carousel = document.createElement("ul");
    carousel.id = "carousel";
    imageSection.appendChild(carousel);

    section.appendChild(imageSection);

    // Navigation buttons
    const navButtonsDiv = document.createElement("div");
    navButtonsDiv.className = "flex justify-center gap-12 mt-4";

    const prevButton = document.createElement("button");
    prevButton.ariaLabel = "Previous button";
    prevButton.id = "prev-button";
    const prevIcon = document.createElement("span");
    prevIcon.className = "fa-solid fa-chevron-left";
    prevIcon.setAttribute("aria-hidden", "true");
    prevButton.appendChild(prevIcon);

    const nextButton = document.createElement("button");
    nextButton.ariaLabel = "Next button";
    nextButton.id = "next-button";
    const nextIcon = document.createElement("span");
    nextIcon.className = "fa-solid fa-chevron-right";
    nextIcon.setAttribute("aria-hidden", "true");
    nextButton.appendChild(nextIcon);

    navButtonsDiv.appendChild(prevButton);
    navButtonsDiv.appendChild(nextButton);

    section.appendChild(navButtonsDiv);

    // Tags and item details
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "mb-6 mt-8";

    const tagsList = document.createElement("ul");
    tagsList.className = "mb-6 tags flex gap-3";
    detailsDiv.appendChild(tagsList);

    const tags = listing.tags;
    console.log(tags);
    
    if (tags) {
        tags.forEach((tag:string) => {
        const tagItem = document.createElement("li")
        tagItem.className = "font-heading uppercase text-xs md:text-sm text-brand-dark bg-brand-default hover:bg-accent-default rounded inline-flex px-1 py-1"
        tagItem.textContent = tag
        tagsList.append(tagItem)
    });
    }

    const detailsInnerDiv = document.createElement("div");

    const title = document.createElement("h1");
    title.className = "title font-heading text-2xl md:text-3xl mb-3";
    title.textContent = listing.title || "No title available";
    detailsInnerDiv.appendChild(title);

    const sellerLink = document.createElement("a");
    const seller = document.createElement("p");
    seller.className = "font-body text-sm md:text-base mb-7";
    
    seller.textContent = listing.seller?.name || "Unknown seller";
    sellerLink.appendChild(seller);
    detailsInnerDiv.appendChild(sellerLink);

    const currentBid = document.createElement("p");
    currentBid.className = "font-body text-base md:text-lg mb-6";
    const highestBid = getCurrentBid(listing)
    currentBid.textContent = `Current bid: ${highestBid || "0"} kr`;
    detailsInnerDiv.appendChild(currentBid);

    const timeLeft = document.createElement("p");
    timeLeft.className = "font-body mb-2 text-sm md:text-base";
    const timeLeftConverted = calculateTimeRemaining(listing.endsAt)
    timeLeft.textContent = timeLeftConverted || "No time information";
    detailsInnerDiv.appendChild(timeLeft);

    const endsAt = document.createElement("p");
    endsAt.className = "ends-at font-body text-sm md:text-base";
    const endsAtConverted = formatDateAndTime(listing.endsAt)
    endsAt.textContent = `Auction ends at ${endsAtConverted || "No end date"}`;
    detailsInnerDiv.appendChild(endsAt);

    detailsDiv.appendChild(detailsInnerDiv);
    section.appendChild(detailsDiv);

    // Bid form
    const form = document.createElement("form");
    form.className = "flex flex-col gap-4";
    form.name = "bid";

    const label = document.createElement("label");
    label.className = "hidden";
    label.htmlFor = "bid-input";
    label.textContent = "Add your bid";
    form.appendChild(label);

    const input = document.createElement("input");
    input.className = "form-input max-w-max70";
    input.id = "bid-input";
    input.type = "text";
    input.name = "bid-amount";
    input.pattern = "\\d+(\\.\\d+)?";
    input.title = "Please enter a valid number.";
    input.required = true;
    form.appendChild(input);

    const bidButton = document.createElement("button");
    bidButton.id = "bid-btn";
    bidButton.className = "btn btn-big btn-accent";
    bidButton.textContent = "Place your bid";
    bidButton.setAttribute("type", "submit")
    
    form.appendChild(bidButton);
    form.addEventListener("submit", (event: Event) => {
        const id = listing.id
        onBid(event, id)
    })

    section.appendChild(form);

    // Description section
    const descriptionSection = document.createElement("section");
    descriptionSection.className = "mt-12";

    const descriptionTitle = document.createElement("h2");
    descriptionTitle.className = "font-heading text-xl md:text-2xl mb-2";
    descriptionTitle.textContent = "Description";
    descriptionSection.appendChild(descriptionTitle);

    const description = document.createElement("p");
    description.className = "description font-body text-base md:text-lg";
    description.textContent = listing.description || "No description available.";
    descriptionSection.appendChild(description);

    section.appendChild(descriptionSection);

    // Bids section
    const bidsSection = document.createElement("section");
    bidsSection.className = "mt-12 mr-10 flex flex-col gap-4 max-w-60";

    const bidsTitle = document.createElement("h2");
    bidsTitle.className = "bids-title font-heading text-xl md:text-2xl";
    bidsTitle.textContent = "All bids";
    bidsSection.appendChild(bidsTitle);

    const bidsList = document.createElement("ul");
    bidsList.className = "bids-list";
    bidsSection.appendChild(bidsList);
    const bids = listing.bids;
    if (bids) {
        bids.forEach((bid: { created: string; amount: number }) => {
        const bidItem = document.createElement("li")
        bidItem.className = "bids-list flex flex-row justify-between"
        const bidDate = document.createElement("p");
        bidDate.textContent = formatDateAndTime(bid.created);
        
        bidDate.className = "font-body text-base md:text-lg";
        const bidAmount = document.createElement("p");
        bidAmount.textContent = `${bid.amount} kr`;
        bidAmount.className = "font-body text-base md:text-lg";

        bidItem.append(bidDate, bidAmount);
        bidsList.appendChild(bidItem)
    });
    }
    

    section.appendChild(bidsSection);

    return section;
}
