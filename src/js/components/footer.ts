class FooterComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = `
        
        `
    }
}

customElements.define("footer-component", FooterComponent)

export default FooterComponent