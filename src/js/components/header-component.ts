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
    <div id="${loginDropdownId}" class="absolute top-0 left-0 h-full w-full">
    <div class="bg-brand-default px-6 py-2 min-h-screen w-full md:max-w-xl flex flex-col m-auto md:my-20 text-brand-dark">
      <button class="inline-flex justify-end" id="closeButton">X</button>
      <section class="flex flex-col items-center mt-11 mb-8">
        <h1 class="font-heading text-2xl md:text-3xl">Log in at Bidlet</h1>
        <form class="font-body text-base md:text-lg flex flex-col gap-2 max-w-2xl my-12" name="login" id="loginForm" action="">
          <label for="email" class="">Email *</label>
          <input class="form-input mb-2" type="email" id="email" name="email" required />
          <label for="password" class="">Password *</label>
          <input class="form-input" type="password" id="password" name="password" required />
          <p class="text-brand-light text-xs md:text-sm">* Required</p>
          <button class="btn btn-auth btn-big mt-12">Log in</button>
        </form>
        <div class="flex flex-col items-center">
          <p>Not a user on Bidlet yet?</p>
          <a class="underline" href="/register">Register here</a>
        </div>
      </section>
      </div>
    </div>
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

const closeButton = this.querySelector<HTMLButtonElement>("#closeButton")
const loginForm = this.querySelector<HTMLFormElement>("#loginForm")

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault()
  console.log("login button clicked");
  
})

closeButton?.addEventListener("click", () => {
  const loginDropdown = this.querySelector(`#${loginDropdownId}`);
  loginDropdown?.classList.toggle("visible");
      });

if (!isLoggedIn) {
  const profileButton = this.querySelector("#profile-button");
  const loginDropdown = this.querySelector(`#${loginDropdownId}`);
  
  profileButton?.addEventListener("click", () => {
    loginDropdown?.classList.toggle("visible");
      });
    }
  }
  
  
  
}

customElements.define("header-component", HeaderComponent);

export default HeaderComponent;
