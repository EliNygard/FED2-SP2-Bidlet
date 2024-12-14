import { updateMetaDescription } from "../utilities/updateMetaDescription.ts";

export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case "/":
        case "/index":
        case "/index/":
            document.title = "Bidlet"
            updateMetaDescription("Welcome to Bidlet, your destination for unique auctions")
            await import("./views/home.ts")
            break;
        case "/item":
        case "/item/":
            updateMetaDescription("Get more info about this Bidlet, browse images, read the description and see if it has any bids.")
            await import ("./views/itemPage.ts")
            break;
        case "/search":
        case "/search/":
            document.title = "Bidlet | Search for your next Bidlet"
            updateMetaDescription("Search for exciting auction items and find your next treasure.")
            await import ("./views/search.ts")
            break
        case "/login":
        case "/login/":
            document.title = "Bidlet | Log in to Bidlet"
            updateMetaDescription("Log in to your Bidlet account to start selling your own items and bid on others.")
            await import ("./views/login.ts")
            break
        case "/register":
        case "/register/":
            document.title = "Bidlet | Register to Bidlet"
            updateMetaDescription("Register an account at Bidlet to start selling your own items and bid on others")
            await import ("./views/register.ts")
            break
        case "/profile":
        case "/profile/":
            updateMetaDescription("Your profile page where you can see your items, your wins and your bids. Change your profile image.")
            await import ("./views/profile.ts")
            break
        case "/create":
        case "/create/":
            document.title = "Bidlet | Create a new Bidlet"
            updateMetaDescription("Create a new Bidlet you want to put out for auction. Maybe you get a good price.")
            await import ("./views/create.ts")
            break
        default:
            document.title = "Bidlet | Page not found"
            updateMetaDescription("Sorry, we could not find this page.")
            await import("./views/notFound.ts")
    }
}