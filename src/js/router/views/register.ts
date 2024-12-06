import "../../components/auth-component.ts";

function initializePage(): void {
  const page = document.getElementById("app");
  if (page) {
    const main = document.createElement("main");

    const registerForm = document.createElement("auth-component");
    registerForm.setAttribute("data-mode", "register");
    // registerForm.className = "inset-0 bg-white z-50 flex items-center justify-center"

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
