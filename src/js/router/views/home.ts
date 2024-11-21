function initializePage():void {
    const page = document.getElementById("app")
    if(page) {
        const heading = document.createElement('h1');
        heading.textContent = 'Hello, Home page!';
        heading.className = "text-accent-default bg-brand-light"
        page.appendChild(heading);
    } else {
        console.error("Could not display page");
    }
}

initializePage()