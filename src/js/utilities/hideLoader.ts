export function hideLoader(element: HTMLElement): void {
    const loader = element.querySelector("loader-component")
    loader?.remove()
}