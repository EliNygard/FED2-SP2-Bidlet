import "../../components/header-component.ts";
import "../../components/footer-component.ts";

function initializePage():void {
    console.log("create new Bidlet");
    const page = document.getElementById("app");
  if (page) {
    const header = document.createElement("header-component");
    const main = document.createElement("main");
    const footer = document.createElement("footer-component");





    page.append(header, main, footer);
  }
    
}

initializePage()