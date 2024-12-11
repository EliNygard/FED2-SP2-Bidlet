export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case "/":
        case "/index":
        case "/index/":
            document.title = "Bidlet"
            await import("./views/home.ts")
            break;
        case "/item":
        case "/item/":
            await import ("./views/itemPage.ts")
            break;
        case "/search":
        case "/search/":
            document.title = "Bidlet | Search for your next Bidlet"
            await import ("./views/search.ts")
            break
        case "/login":
        case "/login/":
            document.title = "Bidlet | Log in to Bidlet"
            await import ("./views/login.ts")
            break
        case "/register":
        case "/register/":
            document.title = "Bidlet | Register to Bidlet"
            await import ("./views/register.ts")
            break
        case "/profile":
        case "/profile/":
            await import ("./views/profile.ts")
            break
        case "/create":
        case "/create/":
            document.title = "Bidlet | Create a new Bidlet"
            await import ("./views/create.ts")
            break
        default:
            await import("./views/notFound.ts")
    }
}