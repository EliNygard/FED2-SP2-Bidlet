import api from "../../../api/instance.ts";
import "../../components/auth-loader-component.ts";
import { CreateListing, Media } from "../../types/types";
import { createErrorMessageElement } from "../errorHandling/createErrorMessage.ts";

export async function onCreateListing(event: Event) {
  event.preventDefault();

  const createContainer = document.querySelector("#createContainer");
  const form = event.target as HTMLFormElement | null;
  if (!form) {
    console.error("Register form not found. Please try again.");
    return;
  }
  form.addEventListener("click", () => {
    if (errorMessage && errorMessage.parentNode) {
      errorMessage.parentNode.removeChild(errorMessage);
    }
  });
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
    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData.entries());
    console.log("Form entries", formEntries);

    const title = formEntries.title as string | undefined;
    const description = formEntries.description as string | undefined;
    const endsAt = formEntries.endsAt as string | undefined;

    const utcDate = endsAt
      ? new Date(new Date(endsAt).getTime() - new Date(endsAt).getTimezoneOffset() * 60 * 1000).toISOString()
      : "";
    const now = new Date().toISOString();
    console.log(now);

    const selectedCategories = formData.getAll("category") as string[];
    const imageInputs = form.querySelectorAll('input[name="image"]') as NodeListOf<HTMLInputElement>;
    const images: Media[] = Array.from(imageInputs)
      .map((image) => ({
        url: image.value,
        alt: image.alt || title || "",
      }))
      .filter((media) => media.url.trim() !== "");

    const data: CreateListing = {
      title: title || "",
      description: description || "",
      endsAt: utcDate,
      tags: selectedCategories,
      media: images,
    };

    if (!endsAt) {
      throw new Error("Please select when the auction ends");
    }
    if (endsAt < now) {
      throw new Error("You must choose today or a future time");
    }

    const newListing = await api.listings.create(data);
    if (newListing?.data?.id) {
      window.location.href = `/item?id=${newListing.data.id}`;
    } else {
      throw new Error("Failed to create new listing");
    }
  } catch (error) {
    if (error) {
      console.error(error);
      if (createContainer) {
        const heading = createContainer.querySelector("h1");
        const errorString = error.toString();
        errorMessage = createErrorMessageElement(errorString);
        console.log(errorMessage);
        if (heading) {
          heading.insertAdjacentElement("afterend", errorMessage);
        } else {
          createContainer.appendChild(errorMessage);
        }
      }
    }
  } finally {
    button.textContent = "Publish";
    button.removeChild(loader);
  }
}
