import "../../components/auth-component.ts";

function initializePage(): void {
  const page = document.getElementById("app");
  if (page) {
    const main = document.createElement("main");

    const registerForm = document.createElement("auth-component");

    registerForm.setAttribute("data-mode", "register");

    main.appendChild(registerForm);
    page.appendChild(main);

    const closeButton = document.querySelector("#closeButton");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        window.location.href = "./";
      });
    }
  }
}

initializePage();
