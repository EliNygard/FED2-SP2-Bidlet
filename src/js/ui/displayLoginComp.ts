export function displayLoginComponent() {
    const page = document.getElementById("app");
  
    if (!page) {
      console.error("No page found. Please try again.");
      return;
    }
  
    page.innerHTML = "";
  
    const message = document.createElement("p");
    message.textContent = "Registration successful! Please log in to continue.";
    message.className = "";
  
    page.appendChild(message);
  
    const loginComponent = document.createElement("auth-component");
    loginComponent.setAttribute("data-mode", "login");
  
    page.appendChild(loginComponent);
  }