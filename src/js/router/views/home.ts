import '../../components/header-component.ts'

function initializePage():void {
    const page = document.getElementById("app")
    if(page) {
        const header = document.createElement('header-component')
        page.appendChild(header)
    } else {
        console.error("Could not display page");
    }
}

initializePage()