import '../../components/header-component.ts'
import '../../components/footer-component.ts'
import api from "../../../api/instance.ts"

async function initializePage():Promise<void> {
    const page = document.getElementById("app")
    if(page) {
        const header = document.createElement('header-component')
        const main = document.createElement('main')
        const footer = document.createElement('footer-component')

        const listings = await api.listings.readAll("&_active=true")
        console.log(listings);


        
        
        page.append(header, main, footer)

        
    } else {
        console.error("Could not display page");
    }
}

initializePage()