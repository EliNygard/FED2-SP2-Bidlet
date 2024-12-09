import api from "../../api/instance.ts";
import { Profile } from "../types/types.ts";

class UserCard extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const userName = this.getAttribute("user-name");

    if (userName) {
      try {
        const userData: Profile = await api.profiles.singleProfile(userName);
        console.log(userData);
        this.render(userData);
      } catch (error) {
        console.error(error);
        this.render(null);
      }
    }
  }
  render(userData: Profile | null) {
    if (userData) {
      this.innerHTML = `
        <div class="mx-auto">
        <div class="max-w-4xl mx-auto px-6 mt-14">
          <section class="flex">
          <button id="profileImage" class="w-24 h-32">
            <img class="rounded-md h-full object-cover" src="${userData.avatar?.url}" alt="">
          </button>
          <div class="font-body ml-4 flex flex-col items-start">
            <h1 class="text-2xl mb-5">${userData.name}</h1>
            <div class="flex flex-col items-center text-sm">
              <p>${userData.credits}</p>
              <p>credits</p>
            </div>
          </div>
        </section>
        
        <div class="my-9">
          <button class="btn btn-accent px-3 py-2 text-brand-dark text-xs">Log out</button>
        </div>
  
        <header class="font-body text-base md:text-lg flex justify-between max-w-sm">
          <button class="hover:underline active:underline">My items</button>
          <button class="hover:underline active:underline">My wins</button>
          <button class="hover:underline active:underline">My bids</button>
        </header>

      </div>

      <div class="bg-brand-default">

        <div id="itemsContainer" class="max-w-4xl py-8 px-6 mt-4 m-auto grid gap-3 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          

        </div>
      </div>
      
    </div>
        `;
    } else {
      this.innerHTML = `
          <p>Failed to load user data</p>
          `;
    }
    const itemsContainer = this.querySelector<HTMLElement>("#itemsContainer")
    console.log(itemsContainer);
    const myListings = userData?.listings
    console.log(myListings);
    myListings?.forEach((listing) => {
      console.log(listing);
      
    })
    
  }

  
}

customElements.define("user-card-component", UserCard);
export default UserCard;
