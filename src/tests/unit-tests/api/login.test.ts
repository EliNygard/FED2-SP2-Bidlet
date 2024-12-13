import { expect, describe, it, beforeEach, vi } from "vitest";
import EndpointsAPI from "../../../api/index.ts";

describe("log in registered user", () => {
  let api: EndpointsAPI;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
    api = new EndpointsAPI();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("stores a token when provided with valid credentials", async () => {
    const response = {
      data: {
        name: "TestUser",
        email: "testuser@stud.noroff.no",
        password: "testPassword123",
        accessToken: "test-token",
      },
    };

    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(response),
    });

    await api.auth.login({
      email: "testuser@stud.noroff.no",
      password: "testPassword123",
    });

    const storedToken = localStorage.getItem("token");

    expect(storedToken).toBe("test-token");
    expect(api.token).toBe("test-token");

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
