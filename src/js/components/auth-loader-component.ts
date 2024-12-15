class AuthLoaderComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
    
        const container = document.createElement("div");
        container.classList.add("loader");
    
        const spinner = document.createElement("div");
        spinner.classList.add("spinner");
    
        container.appendChild(spinner);
    
        const style = document.createElement("style");
        style.textContent = `
          .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 0rem;
          }
          
          .spinner {
            width: 20px;
            height: 20px;
            border: 4px solid rgba(255, 210, 116, 0.1);
            border-top: 4px solid rgba(255, 210, 116, 0.8);
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
    
        shadow.appendChild(style);
        shadow.appendChild(container);
      }
}

customElements.define("auth-loader-component", AuthLoaderComponent);    