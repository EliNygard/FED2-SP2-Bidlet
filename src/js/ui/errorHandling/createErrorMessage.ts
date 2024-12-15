export function createErrorMessageElement(message: string): HTMLElement {
    const container = document.createElement("div")
    container.className = "mt-9 border border-alert-dark bg-alert-light py-4 px-5 font-body text-base max-w-96 flex gap-6"
    container.setAttribute("role", "alert")

    const errorText = document.createElement("p")
    errorText.textContent = `${message}. Please try again.`
    
    const closeButton = document.createElement("button")
    closeButton.className = "cursor-pointer"
    closeButton.addEventListener("click", () => {
        container.remove()
    })

    const icon = document.createElement("span")
    icon.className = "fa-solid fa-x"

    closeButton.appendChild(icon)
    container.appendChild(errorText)
    container.appendChild(closeButton)

    return container
}