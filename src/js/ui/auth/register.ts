import api from "../../../api/instance.ts";
import { RegisterUser } from "../../types/types.ts";
import "../../components/auth-component.ts";
import "../../components/auth-loader-component.ts";
import { ApiError } from "../../../api/error.ts";
import { createErrorMessageElement } from "../errorHandling/createErrorMessage.ts";
import { displayLoginComponent } from "../displayLoginComp.ts";

export async function onRegister(event: Event) {
  event.preventDefault();

  const authComponent = document.querySelector("auth-component");
  const form = event.target as HTMLFormElement | null;
  if (!form) {
    console.error("Register form not found. Please try again.");
    return;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()) as unknown as RegisterUser;
  const button = form.querySelector("button[type='submit']");
  if (!button) {
    console.error("Submit button not found");
    return;
  }
  const loader = document.createElement("auth-loader-component");
  button.textContent = "";
  button.appendChild(loader);

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

    if (authComponent) {
      const heading = authComponent.querySelector("h1");
      const errorMessage = createErrorMessageElement(
        error instanceof ApiError ? error.message : "An error occurred. Please try again",
      );
      if (heading) {
        heading.insertAdjacentElement("afterend", errorMessage);
      } else {
        authComponent.appendChild(errorMessage);
      }
    }
  } finally {
    button.removeChild(loader);
    button.textContent = "Register";
  }
}
