function initializePage():void {
    const container = document.createElement('div');
    container.className = "text-center mx-auto mt-14 p-4 max-w-2xl"

    const heading = document.createElement('h1');
    heading.textContent = '404 - Page Not Found';
    heading.className = "font-heading text-2xl md:text-3xl mb-4"

    const message = document.createElement('p');
    message.textContent = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
    message.className = "font-body text-base md:text-lg"

    container.appendChild(heading);
    container.appendChild(message);

    document.body.appendChild(container);
}

initializePage()