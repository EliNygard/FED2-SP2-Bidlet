import "../../js/components/loader-component.ts";

export function showLoader(element: HTMLElement): void {
    const loader = document.createElement("loader-component");
    element.appendChild(loader);
}