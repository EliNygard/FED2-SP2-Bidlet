import '../../components/header-component.ts'
import '../../components/footer-component.ts'

function initializePage():void {
    const page = document.getElementById("app")
    if(page) {
        const header = document.createElement('header-component')
        const main = document.createElement('main')
        main.textContent = 'Main'
        const footer = document.createElement('footer-component')
        
        page.append(header, main, footer)

        
    } else {
        console.error("Could not display page");
    }
}

initializePage()