class SearchFormComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="max-w-7xl m-auto">
        <form id="searchForm" class="mt-12 mx-4 flex justify-center">
          <label for="searchInput" class="sr-only">Search among all our items</label>
          <input id="searchInput" class="border border-brand-dark p-2 w-4/5" type="text" placeholder="Search among all our items">
          <button class="bg-accent-default text-brand-dark py-2 px-4">Search</button>
        </form>
        </div>
      `;

    const form = this.querySelector<HTMLFormElement>("#searchForm");

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = this.querySelector<HTMLInputElement>("#searchInput")?.value;
      if (query) {
        this.dispatchEvent(
          new CustomEvent("search", {
            detail: { query },
            bubbles: true,
          }),
        );
      }
    });
  }
}

customElements.define("search-form-component", SearchFormComponent);
