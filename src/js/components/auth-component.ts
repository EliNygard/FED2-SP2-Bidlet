import { onLogin } from "../ui/auth/login";
import { onRegister } from "../ui/auth/register";

class AuthComponent extends HTMLElement {
    private mode: string
  
    constructor() {
    super();
    this.mode = this.getAttribute("data-mode") || "login"
}

connectedCallback() {
      this.mode = this.getAttribute("data-mode") || "login"
    this.render();
    this.attachEventListeners();
  }

  render() {
    const isLogin = this.mode === "login"
    this.innerHTML = `
        <div class="bg-brand-default px-6 py-2 min-h-screen w-full md:max-w-xl flex flex-col m-auto md:my-20 text-brand-dark">
      <button class="inline-flex justify-end" id="closeButton">X</button>
      <section class="flex flex-col items-center mt-11 mb-8">
        <h1 class="font-heading text-2xl md:text-3xl">${isLogin ? "Log in" : "Register" } at Bidlet</h1>
        ${!isLogin ? `
            <p class="font-body text-base md:text-xl">Register an account at Bidlet to start bid on items and sell your own</p>
        ` : ""
        }
        <form class="font-body text-base md:text-lg flex flex-col gap-2 max-w-2xl my-12" name="${isLogin ? "login" : "register"}" id="${isLogin ? "loginForm" : "registerForm"}" action="#">
           ${
            !isLogin ? `
            <label for="name" class="">Name *</label>
            <input class="form-input mb-2" type="text" id="name" name="name" required />
            ` : ""
          }
          <label for="email" class="">Email *</label>
          <input class="form-input mb-2" type="email" id="email" name="email" required />
          <label for="password" class="">Password *</label>
          <input class="form-input" type="password" id="password" name="password" required />
          ${
            !isLogin ? `
            <label for="profileImg" class="">Profile Image</label>
            <input class="form-input mb-2" type="text" id="profileImg" name="profileImg" />
            ` : ""
          }
          <p class="text-brand-light text-xs md:text-sm">* Required</p>
          <button class="btn btn-auth btn-big mt-12">${isLogin ? "Log in" : "Register"}</button>
        </form>
        <div class="flex flex-col items-center">
        ${
            isLogin ? `
            <p>Not a user on Bidlet yet?</p>
            <a class="underline" href="/register">Register here</a>
            `
            : `
            <p>Already have an account?</p>
            <a class="underline" href="./">Log in</a>
            `
        }
        </div>
      </section>
      </div>
        `;
  }

  attachEventListeners() {
    const closeButton = this.querySelector<HTMLButtonElement>("#closeButton");
    const authForm = this.querySelector<HTMLFormElement>(this.mode === "login" ? "#loginForm" : "#registerForm");

    authForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.mode === "login") {
          console.log("login button clicked");
          onLogin(event);
      } else {
        console.log("Register button clicked");
        onRegister(event)
      }
    });

    closeButton?.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent('close-dropdown', { bubbles: true }))
    });
  }
}

customElements.define('auth-component', AuthComponent)
export default AuthComponent
