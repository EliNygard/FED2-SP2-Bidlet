import '../../components/header-component.ts'

function initializePage():void {
    const page = document.getElementById("app")
    if(page) {
        console.log("home page");
        const header = document.createElement('header-component')
        console.log(header);
        page.appendChild(header)
        
        
        
        // const heading = document.createElement('h1');
        // heading.textContent = 'Hello, Home page!';
        // heading.className = "text-accent-default bg-brand-light"
        // page.appendChild(heading);
    } else {
        console.error("Could not display page");
    }
}

initializePage()