export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case "/":
            await import("./views/home.ts")
            break;
        case "/item":
        case "/item/index.html":
            await import ("./views/itemPage.ts")
            break;
        case "/search":
            await import ("./views/search.ts")
            break
        case "/login":
            await import ("./views/login.ts")
            break
        case "/register":
            await import ("./views/register.ts")
            break
        case "/profile":
            await import ("./views/profile.ts")
            break
        case "/create":
            await import ("./views/create.ts")
            break
        default:
            await import("./views/notFound.ts")
    }
}