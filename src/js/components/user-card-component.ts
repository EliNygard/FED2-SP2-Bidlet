import api from "../../api/instance.ts";
import { Profile } from "../types/types.ts";

class UserCard extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const userName = this.getAttribute("user-name");
    console.log(userName);

    if (userName) {
      try {
        const userData: Profile = await api.profiles.singleProfile(userName);
        console.log(userData);
        this.render(userData);
      } catch (error) {
        console.error(error);
        this.render(null)
      }
    }
  }
  render(userData: Profile | null) {
    if (userData) {
      this.innerHTML = `
        <div class="user-card">
        <h2>${userData.name}</h2>
        <p>${userData.email}</p>
        </div>
        `;
    } else {
      this.innerHTML = `
          <p>Failed to load user data</p>
          `;
    }
  }
}

customElements.define("user-card-component", UserCard);
export default UserCard;
