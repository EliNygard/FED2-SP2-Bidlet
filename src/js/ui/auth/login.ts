import api from "../../../api/instance.ts"
import { LoginUser } from "../../types/types.ts";

export async function onLogin(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement | null
    if (!form) {
        console.error("Login form not found. Please try again.");
        return
    }
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries()) as unknown as LoginUser
    console.log(data);
    

    // loader

    try {
        const { name } = await api.auth.login(data) 
        window.location.href = `./profile?name=${name}`
    } catch (error) {
        console.error("Login failed:", error);
        //display error
        alert(error)
        window.location.href = "./"
    } finally {
        // hide loader
    }
    
}