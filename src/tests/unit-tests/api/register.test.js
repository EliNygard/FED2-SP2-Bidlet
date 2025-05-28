import { expect, describe, it, beforeEach, vi } from "vitest";
import api from "../../../api/instance.ts";

describe("register new profile", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it("returns the user data when the registration succeeds", async () => {
    const successResponse = {
      data: {
        name: "TestUser",
        email: "testuser@stud.noroff.no",
      },
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(successResponse),
    });

    const result = await api.auth.register({
      name: "TestUser",
      email: "testuser@stud.noroff.no",
      password: "",
    });

    console.log(fetch.mock.calls);

    expect(fetch).toHaveBeenCalledTimes(1);

    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe("https://v2.api.noroff.dev/auth/register");

    expect(options.method).toBe("POST");

    expect(options.headers).toBeInstanceOf(Headers);
    expect(options.headers.get("Content-Type")).toBe("application/json");

    const bodyObject = JSON.parse(options.body);
    expect(bodyObject).toEqual({
      name: "TestUser",
      email: "testuser@stud.noroff.no",
      password: "testPassword123",
      avatar: undefined,
    });

    expect(result).toEqual(successResponse.data);
  });

  it("throws an error when registration fails", async () => {
    const errorResponse = {
      errors: [{ message: "Email already in use" }],
    };

    fetch.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: () => Promise.resolve(errorResponse),
    });

    await expect(
      api.auth.register({
        name: "TestUser",
        email: "testuser@stud.noroff.no",
        password: "testPassword123",
      }),
    ).rejects.toMatchObject({
      message: "Email already in use",
      status: 400,
      statusText: "Bad Request",
    });
  });
});
