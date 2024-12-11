import api from "../../../api/instance.ts";
import { UpdateProfile } from "../../types/types.ts";

export async function onUpdate(event: Event) {
  event.preventDefault();

  const updateImageContainer = document.querySelector<HTMLElement>("#updateImageContainer");
  const form = event.target as HTMLFormElement | null;
  if (!form) {
    console.error("Update profile image form not found");
    return;
  }
  const button = form.querySelector("button[type='submit']");
  if (!button) {
    console.error("Submit button not found");
    return;
  }
  const loader = document.createElement("auth-loader-component");
  button.textContent = "";
  button.appendChild(loader);

  try {
    const profileName = api.user.name;
    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData.entries());
    const url = formEntries.profileImg as string;

    const data: UpdateProfile = {
      bio: api.user.bio || "",
      avatar: {
        url: url || "",
        alt: `Profile image of ${profileName}`,
      },
      banner: {
        url: api.user.banner.url || "",
        alt: `Banner image of ${profileName}`,
      },
    };

    await api.profiles.update(profileName, data);
  } catch (error) {
    console.error(error);
  } finally {
    button.removeChild(loader);
    button.textContent = "Update";
    updateImageContainer?.classList.toggle("hidden");
  }
}
