export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case "/":
            document.title = "Bidlet"
            await import("./views/home.ts")
            break;
        case "/item":
            await import ("./views/itemPage.ts")
            break;
        case "/search":
            document.title = "Bidlet | Search for your next Bidlet"
            await import ("./views/search.ts")
            break
        case "/login":
            document.title = "Bidlet | Log in to Bidlet"
            await import ("./views/login.ts")
            break
        case "/register":
            document.title = "Bidlet | Register to Bidlet"
            await import ("./views/register.ts")
            break
        case "/profile":
            await import ("./views/profile.ts")
            break
        case "/create":
            document.title = "Bidlet | Create a new Bidlet"
            await import ("./views/create.ts")
            break
        default:
            await import("./views/notFound.ts")
    }
}