import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import "../../components/user-card-component.ts";
import api from "../../../api/instance.ts";
import { showLoader } from "../../utilities/showLoader.ts";
import { hideLoader } from "../../utilities/hideLoader.ts";

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  if (page) {
    showLoader(page);
    try {
      const userName = api.user.name;
      page.className = "page-content"
      const header = document.createElement("header-component");
      const main = document.createElement("main");
      const footer = document.createElement("footer-component");
      const userCard = document.createElement("user-card-component");
      // userCard.className = "relative"
      userCard.setAttribute("user-name", userName);

      main.appendChild(userCard);
      page.append(header, main, footer);
      
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader(page);
    }
  }
}

initializePage();
