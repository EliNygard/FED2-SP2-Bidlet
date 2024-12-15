import "./auth-component.ts";

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    const loggedinLinks = `
    <a aria-label="Link to Create new Bidlet" title="Create a new Bidlet" href="./create">
        <span aria-hidden="true" class="fa-solid fa-plus text-xl text-brand-dark hover:text-accent-dark sm:text-2xl"></span>
      </a>
      <a aria-label="Link to profile page" title="Go to your profile page" href="./profile">
        <span aria-hidden="true" class="fa-regular fa-user text-xl text-brand-dark hover:text-accent-dark sm:text-2xl"></span>
      </a>
    `;

    const loggedOutLinks = `
    <button id="profile-button" aria-label="Link to log in or register page" aria-controls="login-dropdown" aria-expanded="false" title="Log in or register an account">
      <span aria-hidden="true" class="fa-regular fa-user text-xl text-brand-dark hover:text-accent-dark sm:text-2xl"></span>
    </button>

    <auth-component data-mode="login" id="login-dropdown" class="hidden" tabindex="-1" aria-hidden="true" aria-live="polite" role="dialog" aria-labelledby="auth-title"></auth-component>
    `;

    this.innerHTML = `
    <header class="max-w-7xl mx-auto py-4 px-5 sticky">
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
      const profileButton = this.querySelector("#profile-button") as HTMLButtonElement;
      const authComponent = this.querySelector("auth-component");
      const closeButton = this.querySelector("#closeButton") as HTMLButtonElement;

      profileButton?.addEventListener("click", () => {
        const isExpanded = profileButton.getAttribute("aria-expanded") === "true"
        authComponent?.classList.toggle("hidden", isExpanded)
        authComponent?.classList.toggle("block", !isExpanded)
        profileButton.setAttribute("aria-expanded", (!isExpanded).toString())
        authComponent?.setAttribute("aria-hidden", isExpanded.toString())
        closeButton.focus()
      });

      closeButton?.addEventListener("click", () => {
        authComponent?.classList.toggle("hidden")
        authComponent?.classList.toggle("block")
        authComponent?.setAttribute("aria-hidden", "true")
        profileButton?.setAttribute("aria-hidden", "false")
        profileButton.focus()
      });
    }
  }
}

customElements.define("header-component", HeaderComponent);

export default HeaderComponent;
