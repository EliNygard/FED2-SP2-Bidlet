import "../../components/header-component.ts";
import "../../components/footer-component.ts";
import { displayCreate } from "../../components/displayCreate.ts";
import { onCreateListing } from "../../ui/auth/create.ts";

function initializePage(): void {
  const page = document.getElementById("app");
  if (page) {
    const header = document.createElement("header-component");
    const main = document.createElement("main");
    const footer = document.createElement("footer-component");
    const create = displayCreate();

    main.appendChild(create);
    page.append(header, main, footer);

    const form = document.querySelector("#createForm");
    form?.addEventListener("submit", async (event) => {
      event.preventDefault()
      onCreateListing(event);
    });
  }
}

initializePage();

// const dateInput = document.querySelector('input[type="datetime-local"]') as HTMLInputElement | null;

// if (dateInput) {
//     dateInput.addEventListener('change', () => {
//         const localValue = dateInput.value; // e.g., "2024-12-08T15:30"
//         console.log(localValue);

//         if (localValue) {
//             // Convert to ISO string with UTC timezone
//             const utcDate = new Date(localValue).toISOString();
//             console.log(utcDate); // Logs: "2024-12-08T15:30:00.000Z"
//         }
//     });
// }
