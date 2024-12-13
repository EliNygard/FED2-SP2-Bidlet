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
      password: "testPassword123",
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
    ).rejects.toThrow("Email already in use");
  });
});
