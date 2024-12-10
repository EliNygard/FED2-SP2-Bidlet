import { RegisterUser, LoginUser, CreateListing } from "../js/types/types";
import { ApiError } from "./error";

export default class EndpointsAPI {
  apiBase: string = "";

  constructor(apiBase: string = "https://v2.api.noroff.dev") {
    this.apiBase = apiBase;
  }

  get apiListingsPath() {
    return `${this.apiBase}/auction/listings`;
  }

  get apiListingsQueryParam() {
    return `?_bids=true&_seller=true`;
  }

  get apiListingsActiveParam() {
    return `&_active=true`;
  }

  get apiProfilesPath() {
    return `${this.apiBase}/auction/profiles`
  }

  get apiProfilesQueryParams() {
    return `?_listings=true&_wins=true`
  }

  set token(accessToken: string) {
    localStorage.setItem("token", accessToken);
  }

  get token(): string | null {
    try {
      return localStorage.getItem("token") || "";
    } catch {
      return "";
    }
  }

  set user(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }

  get user() {
    try {
      return JSON.parse(localStorage.user) || "{}";
    } catch {
      return "{}";
    }
  }

  static base = "https://v2.api.noroff.dev";

  private apiKey = "fe311d91-e71a-404d-a858-c3e3e9bd0e65";

  static paths = {
    register: `${EndpointsAPI.base}/auth/register`,
    login: `${EndpointsAPI.base}/auth/login`,
  };

  util = {
    setupHeaders: (body: boolean, token: boolean, key: boolean) => {
      const headers = new Headers();

      if (body) {
        headers.append("Content-Type", "application/json");
      }
      if (token) {
        headers.append("Authorization", `Bearer ${this.token}`);
      }
      if (key) {
        headers.append("X-Noroff-API-Key", this.apiKey);
      }

      return headers;
    },
  };

  auth = {
    register: async ({ name, email, password, avatar }: RegisterUser): Promise<void> => {
      const body = JSON.stringify({ name, email, password, avatar });
      const response = await fetch(EndpointsAPI.paths.register, {
        headers: this.util.setupHeaders(true, false, false),
        method: "POST",
        body,
      });

      const json = await response.json();

      if (!response.ok) {
        const errorMessages = json?.errors?.length
          ? json.errors.map((error: { message: string }) => error.message).join(". ")
          : "Something went wrong. Please try again.";

        throw new ApiError(response.status, response.statusText, errorMessages);
      }

      const { data } = json;
      return data;
    },
    login: async ({ email, password }: LoginUser) => {
      const body = JSON.stringify({ email, password });
      const response = await fetch(EndpointsAPI.paths.login, {
        headers: this.util.setupHeaders(true, true, true),
        method: "POST",
        body,
      });

      const json = await response.json();

      if (!response.ok) {
        const errorMessages = json?.errors?.length
          ? json.errors.map((error: { message: string }) => error.message).join(". ")
          : "Something went wrong. Please try again.";

        throw new ApiError(response.status, response.statusText, errorMessages);
      }

      const { data } = json;
      const { accessToken: token, ...user } = data;
      this.user = user;
      this.token = token;
      localStorage.token = token;

      return data;
    },
    logout: () => {
      try {
        this.user = "{}"
        this.token = ""
        window.location.href = "./"
      } catch (error) {
        console.error("Error during logout:", error);
        alert("Could not log out. Please try again")
      } finally {
        localStorage.clear()
      }
    }
  };

  profiles = {
    singleProfile: async (userName: string | null) => {
      if (!userName) {
        throw new Error("No user name found")
      }

      const url = new URL(`${this.apiProfilesPath}/${userName}${this.apiProfilesQueryParams}`)
      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "GET",
      })

      if (response.ok) {
        const { data } = await response.json()
        return data
      }
      throw new Error("Could not get profile")
    },
    bidsByProfile: async (userName: string | null) => {
      if (!userName) {
        throw new Error("No user name found")
      }

      const url = new URL(`${this.apiProfilesPath}/${userName}/bids?_listings=true`)
      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "GET",
      })

      if (response.ok) {
        const { data } = await response.json()
        return data
      }
      throw new Error("Could not get your bids")
    }

  }

  listing = {
    read: async (id: string | null) => {
      if (!id) {
        throw new Error("Invalid listing ID");
      }

      const url = new URL(`${this.apiListingsPath}/${id}${this.apiListingsQueryParam}`);
      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, false, false),
        method: "GET",
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("Could not fetch listing");
    },
  };

  listings = {
    readAll: async (parameter: string) => {
      const url = new URL(`${this.apiListingsPath}${this.apiListingsQueryParam}${parameter}`);
      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, false, false),
        method: "GET",
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("Could not fetch listings");
    },
    create: async ({ title, description, tags = [], media = [], endsAt }: CreateListing) => {
      try {
        const payload: CreateListing = {
          title, description, tags, media, endsAt,
        }

        if(!title) {
          throw new Error("You must have a title")
        }

        if (tags.length > 0) {
          payload.tags = tags
        }
        if (media.length > 0) {
          payload.media = media
        }

        const response = await fetch(this.apiListingsPath, {
          headers: this.util.setupHeaders(true, true, true),
          method: "POST",
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          // const errorBody = await response.json()
          // console.log(errorBody.errors);
          // extractErrors(errorBody)
          
          throw new Error(`Failed to create new Bidlet ${response.statusText}`)
        }

        const data = await response.json()
        return data

      } catch (error) {
        console.error(error);
        throw error
      }
    },
    bid: async (id: string | null, body: number) => {
      if (!id) {
        throw new Error("Could not find listing iD");
      }

      const url = new URL(`${this.apiListingsPath}/${id}/bids`);
      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "POST",
        body: JSON.stringify({ amount: body }),
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("Could not make bid. Please try again.");
    },
    search: async (query: string | null) => {
      if (!query) {
        throw new Error("Please type in your search.");
      }

      const url = new URL(`${this.apiListingsPath}/search?q=${query}&_seller=true&_bids=true&sort=endsAt&sortOrder=desc`);
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("Could not find a match for the search. Please try again.");
    },
  };
}
