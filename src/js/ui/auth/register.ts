import api from "../../../api/instance.ts"
import { RegisterUser } from "../../types/types.ts";
import "../../components/auth-component.ts";

export async function onRegister(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;

  if (!form) {
    console.error("Register form not found. Please try again.");
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()) as unknown as RegisterUser

  // loader

  try {
    await api.auth.register(data)
    displayLoginComponent()
  } catch (error) {
    console.error("Registration failed: ", error);
    // display error as in Figma
    // alert("Could not register user." + error.messages +". Please try again." || "An unknown error occurred. Please try again.")
} finally {
    // hide loader
}
}

function displayLoginComponent() {
    const page = document.getElementById("app")

    if (!page) {
        console.error("No page found. Please try again.");
        return
    }

    page.innerHTML = ""

    const message = document.createElement("p")
    message.textContent = "Registration successful! Please log in to continue."
    message.className = ""

    page.appendChild(message)

    const loginComponent = document.createElement("auth-component")
    loginComponent.setAttribute("data-mode", "login")

    page.appendChild(loginComponent)
}
