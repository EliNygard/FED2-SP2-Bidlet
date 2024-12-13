import { onLogin } from "../ui/auth/login";
import { onRegister } from "../ui/auth/register";

class AuthComponent extends HTMLElement {
  private mode: string = "login";

  constructor() {
    super();
  }

  connectedCallback() {
    this.mode = this.getAttribute("data-mode") || "login";
    this.render();
    this.attachEventListeners();
  }

  setMode(mode: string) {
    this.mode = mode;
    this.setAttribute("data-mode", mode);
    this.render();
    this.attachEventListeners();
  }

  render() {
    const isLogin = this.mode === "login";
    this.innerHTML = `
    <div id="authWrapper" class="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div id="authContainer" class="bg-brand-default px-6 py-2 w-full md:max-w-xl flex flex-col md:my-20 text-brand-dark max-h-[90vh] overflow-y-auto">
      <button class="inline-flex justify-end mt-4 md:mt-9 md:mr-6" id="closeButton" aria-label="Close ${isLogin ? 'log in' : 'register'} form">
        <span class="fa-solid fa-x text-2xl" aria-hidden="true"></span>
      </button>
      <section class="flex flex-col items-center mt-11 mb-8">
        <h1 class="font-heading text-2xl md:text-3xl" id="auth-title">${isLogin ? "Log in" : "Register"} at Bidlet</h1>
        ${
          !isLogin
            ? `
            <p class="font-body text-base text-center max-w-sm mt-10 md:text-lg">Register an account at Bidlet to start bid on items and sell your own</p>
        `
            : ""
        }
        <form class="font-body text-base md:text-lg flex flex-col gap-1 max-w-2xl my-12" name="${isLogin ? "login" : "register"}" id="${isLogin ? "loginForm" : "registerForm"}" action="#">
           ${
             !isLogin
               ? `
            <label for="name" class="">Name *</label>
            <input class="form-input mb-2" type="text" id="name" name="name" />
            `
               : ""
           }
          <label for="email" class="mt-2">Email *</label>
          <input class="form-input mb-2" type="email" id="email" name="email" required />
          
          <label for="password" class="mt-2">Password *</label>
          <input class="form-input" type="password" id="password" name="password" required />
          ${
            !isLogin
              ? `
            <label for="profileImg" class="mt-2">Profile Image</label>
            <input class="form-input mb-2" type="text" id="profileImg" name="profileImg" />
            `
              : ""
          }
          <p class="text-brand-light text-xs md:text-sm">* Required</p>
          <button class="btn btn-auth btn-big mt-12" type="submit">${isLogin ? "Log in" : "Register"}</button>
        </form>
        <div class="flex flex-col items-center text-base md:text-lg">
        ${
          isLogin
            ? `
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
      </div>
        `;
  }

  attachEventListeners() {
    const authForm = this.querySelector<HTMLFormElement>(this.mode === "login" ? "#loginForm" : "#registerForm");

    if (authForm) {
      authForm.onsubmit = (event) => {
        event.preventDefault();
        if (this.mode === "login") {
          onLogin(event);
        } else {
          onRegister(event);
        }
      };
    }
  }
}

customElements.define("auth-component", AuthComponent);
export default AuthComponent;
