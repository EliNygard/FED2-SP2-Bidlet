class FooterComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <footer class="max-w-maxW52 mx-auto py-4">
      <div class="flex justify-center items-center gap-2 font-heading">
        <span aria-label="Copyright" class="fa-regular fa-copyright"></span>
        <p id="copy-year">2024</p>
        <p class="tracking-widest">Bidlet</p>
      </div>
    </footer>
        `;
  }
}

customElements.define("footer-component", FooterComponent);

export default FooterComponent;
