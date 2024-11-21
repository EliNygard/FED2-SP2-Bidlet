class UserProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
        <style>
          :host {
            display: block;
            border: 1px solid black;
            padding: 8px;
            font-family: sans-serif;
          }
          .name {
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 0.5em;
          }
          .bio {
            font-size: 1em;
            color: gray;
          }
        </style>
        <div class="name">Loading name...</div>
        <div class="bio">Loading bio...</div>
      `;
    this.nameElement = this.shadowRoot.querySelector(".name");
    this.bioElement = this.shadowRoot.querySelector(".bio");
  }

  // Define setters to update the content dynamically
  set name(value) {
    this.nameElement.textContent = value || "No name provided";
  }

  set bio(value) {
    this.bioElement.textContent = value || "No bio available";
  }
}

customElements.define("user-profile", UserProfile);

export default UserProfile;
