import { ApiError } from "../../../api/error.ts";
import api from "../../../api/instance.ts";
import { LoginUser } from "../../types/types.ts";
import { createErrorMessageElement } from "../errorHandling/createErrorMessage.ts";
import "../../components/auth-loader-component.ts";

export async function onLogin(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement | null;
  if (!form) {
    console.error("Login form not found. Please try again.");
    return;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()) as unknown as LoginUser;
  console.log(data);
  const button = form.querySelector("button[type='submit']");
  if (!button) {
    console.error("Submit button not found");
    return;
  }
  const loader = document.createElement("auth-loader-component");
  button.textContent = "";
  button.appendChild(loader);
  let errorMessage: HTMLElement | null = null;

  try {
    const { name } = await api.auth.login(data);
    window.location.href = `./profile?name=${name}`;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("Log in failed:", {
        status: error.status,
        statusText: error.statusText,
        messages: error.messages,
      });
    } else {
      console.error("Log in failed:", error);
    }

    const authComponent = document.querySelector("auth-component");
    console.log(authComponent);

    if (authComponent) {
      const heading = authComponent.querySelector("h1");
      errorMessage = createErrorMessageElement(
        error instanceof ApiError ? error.message : "An error occurred. Please try again.",
      );
      if (heading) {
        heading.insertAdjacentElement("afterend", errorMessage);
      } else {
        authComponent.appendChild(errorMessage);
      }
    }
  } finally {
    button.removeChild(loader);
    button.textContent = "Log in";
    form.addEventListener("click", () => {
      if (errorMessage && errorMessage.parentNode) {
        errorMessage.parentNode.removeChild(errorMessage);
      }
    });
  }
}
