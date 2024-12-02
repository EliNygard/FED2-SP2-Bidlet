import api from "../../api/instance.ts";

export async function onBid(event: Event, id: string) {
  event.preventDefault();
  console.log(`Bid added to ${id}`);

  const form = event.target as HTMLFormElement | null
  if (!form) {
    console.error("Form element not found. Please try again.");
    return
  }
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())
  console.log(data);
  const bidAmount = parseFloat(data["bid-amount"] as string)
  console.log(bidAmount);
  
  if (isNaN(bidAmount)) {
    console.error("Invalid bid amount");
    return
  }
  

  try {
    await api.listings.bid(id, bidAmount);
  } catch (error) {
    console.error(error);
  } finally {
    // display a message?
    // window.location.reload();
  }
}
