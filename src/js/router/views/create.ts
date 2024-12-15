import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import { displayCreate } from "../../components/displayCreate.ts";
import { onCreateListing } from "../../ui/auth/create.ts";
import { showLoader } from "../../utilities/showLoader.ts";
import { hideLoader } from "../../utilities/hideLoader.ts";

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");

  if (page) {
    showLoader(document.body);
    try {
      const header = document.createElement("header-component");
      const main = document.createElement("main");
      const footer = document.createElement("footer-component");
      const create = displayCreate();

      main.appendChild(create);
      page.append(header, main, footer);

      const form = document.querySelector("#createForm");
      form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        onCreateListing(event);
      });
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader(document.body);
    }
  }
}

initializePage();
