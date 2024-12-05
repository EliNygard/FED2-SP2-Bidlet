import "./auth-component.ts";

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    const loginDropdownId = "login-dropdown";

    const loggedinLinks = `
    <a aria-label="Link to Create new Bidlet page" title="Create a new Bidlet" href="./create">
        <span aria-hidden="true" class="fa-solid fa-plus text-xl text-brand-dark hover:text-accent-dark sm:text-2xl"></span>
      </a>
      <a aria-label="Link to profile page" title="Go to your profile page" href="./profile">
        <span aria-hidden="true" class="fa-regular fa-user text-xl text-brand-dark hover:text-accent-dark sm:text-2xl"></span>
      </a>
    `;

    const loggedOutLinks = `
    <button id="profile-button" aria-label="Link to log in or register page" title="Log in or register an account">
      <span aria-hidden="true" class="fa-regular fa-user text-xl text-brand-dark hover:text-accent-dark sm:text-2xl"></span>
    </button>

    <auth-component data-mode="login" id="${loginDropdownId}" class="absolute top-0 left-0 h-full w-full"></auth-component>
    `;

    this.innerHTML = `
    <header class="max-w-7xl mx-auto px-5 sticky">
  <nav class="flex justify-between items-center">
    <div>
      <a title="home" class="text-xl font-heading tracking-widest text-brand-dark hover:text-accent-dark sm:text-3xl md:text-4xl" href="./">Bidlet</a>
    </div>
    <div class="flex gap-7 sm:gap-14 md:gap-16">
      <a aria-label="Link to Search page" title="Search for your next Bidlet" href="./search">
        <span aria-hidden="true" class="fa-solid fa-magnifying-glass text-xl text-brand-dark hover:text-accent-dark sm:text-2xl"></span>
      </a>
      ${isLoggedIn ? loggedinLinks : loggedOutLinks}
    </div>
  </nav>
</header>
`;

    if (!isLoggedIn) {
      const profileButton = this.querySelector("#profile-button");
      const authComponent = this.querySelector(`auth-component`);
      const closeButton = this.querySelector("#closeButton");
      console.log(closeButton);
      console.log(authComponent);

      profileButton?.addEventListener("click", () => {
        if (authComponent?.classList.contains("visible")) {
          authComponent.classList.remove("visible");
          authComponent.classList.add("hidden");
        } else {
          authComponent?.classList.remove("hidden");
          authComponent?.classList.add("visible");
        }
      });

      // move this to auth-component?:
      closeButton?.addEventListener("click", () => {
        if (authComponent?.classList.contains("visible")) {
          console.log("closing login dropdown");
          authComponent.classList.remove("visible");
          authComponent.classList.add("hidden");
        }
      });
    }
  }
}

customElements.define("header-component", HeaderComponent);

export default HeaderComponent;
