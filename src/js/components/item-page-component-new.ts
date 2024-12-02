// import styles from '../../css/item-page.css?inline';

// class UserProfile extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: 'open' }).innerHTML = `
//         <style>${styles}</style>
//         <div class="name" id="nameSlot">Name</div>
//         <div class="email" id="emailSlot">Email</div>
//         <section class="user-profile">
//       <!-- <div>
//         <span class="fa-solid fa-ellipsis-vertical"></span>
//       </div> -->
//       <div class="">
//         <img src="" alt="" />
//         <ul id="carousel"></ul>
//       </div>

//       <div>
//         <button aria-label="Previous button" id="prev-button">
//           <span aria-hidden="true" class="fa-solid fa-chevron-left"></span>
//         </button>
//         <button aria-label="Next button" id="next-button">
//           <span aria-hidden="true" class="fa-solid fa-chevron-right"></span>
//         </button>
//       </div>

//       <div">
//         <ul></ul>
//         <div>
//           <h1></h1>
//           <a href="">
//             <p></p>
//           </a>
//           <p>Current bid: 600 kr</p>
//           <p class="time-left"></p>
//           <p class="ends-at font-body text-sm md:text-base"></p>
//         </div>
//       </div>

//       <form action="" name="bid">
//         <label id="bid"">Add your bid</label>
//         <input
//           class="form-input"
//           id="bid-input"
//           type="text"
//           name="bid-amount"
//           pattern="\\d+(.\\d+)?"
//           title="Please enter a valid number."
//           required
//         />

//         <button id="bid-btn" class="btn btn-big">Place your bid</button>
        
//         </form>


      
//       <section class="mt-12">
//         <h2 class="font-heading text-xl md:text-2xl mb-2">Description</h2>
//         <p class="description font-body text-base md:text-lg"></p>
//       </section>

//       <section class="mt-12 mr-10 flex flex-col gap-4 max-w-60">
//         <h2 class="bids-title font-heading text-xl md:text-2xl">All bids</h2>
//         <ul class="bids-list"></ul>
//       </section>
//     </section>
//       `;
//     }
  
//     // Method to update the name and email dynamically
//     updateProfile(title: string, description: string): void {
//       const nameSlot = this.shadowRoot?.getElementById('nameSlot');
//       const emailSlot = this.shadowRoot?.getElementById('emailSlot');
//       if (nameSlot) {
//         nameSlot.textContent = title;
//       }
//       if (emailSlot) {
//         emailSlot.textContent = description;
//       }
//     }
//   }
  
//   customElements.define('user-profile', UserProfile);
  
//   export default UserProfile;
  