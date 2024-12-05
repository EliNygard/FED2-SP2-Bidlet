import api from "../../../api/instance.ts";
import { RegisterUser } from "../../types/types.ts";
import "../../components/auth-component.ts";
import { ApiError } from "../../../api/error.ts";

export async function onRegister(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;

  if (!form) {
    console.error("Register form not found. Please try again.");
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()) as unknown as RegisterUser;

  // loader

  try {
    await api.auth.register(data);
    displayLoginComponent();
  } catch (error) {
    if (error instanceof ApiError) {
        console.error("Registration failed:", {
          status: error.status,
          statusText: error.statusText,
          messages: error.messages,
        });
      } else {
        console.error("Registration failed:", error);
      }

    const authComponent = document.querySelector("auth-component")
    if (authComponent) {
        const heading = authComponent.querySelector("h1")
        console.log(heading);
        const errorMessage = createErrorMessageElement(
            error instanceof ApiError ? error.message : "An error occured. Please try again"
        )
        if (heading) {
            heading.insertAdjacentElement("afterend", errorMessage)
        } else {
            authComponent.appendChild(errorMessage)
        }
        
    } 
    // alert("Could not register user." + error.messages +". Please try again." || "An unknown error occurred. Please try again.")
  } finally {
    // hide loader
  }
}

function createErrorMessageElement(message: string): HTMLElement {
    const container = document.createElement("div")
    container.className = "mt-9 border border-alert-dark bg-alert-light py-4 px-5 font-body text-base max-w-96 flex gap-6"

    const errorText = document.createElement("p")
    errorText.textContent = `${message}. Please try again.`
    
    const closeButton = document.createElement("button")
    closeButton.className = "cursor-pointer"
    closeButton.addEventListener("click", () => {
        container.remove()
    })

    const icon = document.createElement("span")
    icon.className = "fa-solid fa-x"

    closeButton.appendChild(icon)
    container.appendChild(errorText)
    container.appendChild(closeButton)

    return container
}

function displayLoginComponent() {
  const page = document.getElementById("app");

  if (!page) {
    console.error("No page found. Please try again.");
    return;
  }

  page.innerHTML = "";

  const message = document.createElement("p");
  message.textContent = "Registration successful! Please log in to continue.";
  message.className = "";

  page.appendChild(message);

  const loginComponent = document.createElement("auth-component");
  loginComponent.setAttribute("data-mode", "login");

  page.appendChild(loginComponent);
}
