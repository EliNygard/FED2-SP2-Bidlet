class LoaderComponent extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
  
      // Create a container for the loader
      const container = document.createElement("div");
      container.classList.add("loader");
  
      // Create the spinner (or any loading graphic)
      const spinner = document.createElement("div");
      spinner.classList.add("spinner");
  
      // Append spinner to the container
      container.appendChild(spinner);
  
      // Apply styles
      const style = document.createElement("style");
      style.textContent = `
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          margin-top: 4rem;
        }
        
        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid rgba(0, 0, 0, 0.8);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `;
  
      // Attach elements to the shadow DOM
      shadow.appendChild(style);
      shadow.appendChild(container);
    }
  }
  
  // Define the custom element
  customElements.define("loader-component", LoaderComponent);
  