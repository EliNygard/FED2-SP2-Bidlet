import { expect, describe, it, beforeEach } from "vitest";
import EndpointsAPI from "../../../api/index.ts";

describe("Storage functions", () => {
    let api: EndpointsAPI;

    beforeEach(() => {
        localStorage.clear()
        api = new EndpointsAPI()
    })
    
    describe("set token", () => {
        it("saves the token to local storage", () => {
            const testToken = "test-token"
            api.token = testToken
            expect(api.token).toBe(testToken)
        })
    })

    describe("get token", () => {
        it("gets the token from local storage", () => {
            api.token = "test-token"
            const retrievedToken = api.token
            expect(retrievedToken).toBe("test-token")
        })

        it("returns null when no token exists", () => {
            const token = api.token
            expect(token).toBeNull()
        })
    })
})
