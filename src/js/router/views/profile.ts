import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import "../../components/user-card-component.ts";
import api from "../../../api/instance.ts";

async function initializePage(): Promise<void> {
  const page = document.getElementById("app");
  if (page) {
    const header = document.createElement("header-component");
    const main = document.createElement("main");
    const footer = document.createElement("footer-component");

    const userName = api.user.name;
    console.log(userName);
    const userData = await api.profiles.singleProfile(userName);
    console.log(userData);

    const userCard = document.createElement("user-card-component");
    userCard.setAttribute("user-name", userName);
    console.log(userCard);

    main.appendChild(userCard);
    page.append(header, main, footer);
  }
}

initializePage();
