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

  set token(accessToken: string) {
    localStorage.setItem("token", accessToken);
  }

  get token(): string | null {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  }

  util = {
    setupHeaders: (body: boolean, token: boolean) => {
      const headers = new Headers();

      if (body) {
        headers.append("Content-Type", "application/json");
      }
      if (token) {
        headers.append("Authorization", `Bearer ${this.token}`);
      }

      return headers;
    },
  };

  listing = {
    read: async (id: string | null) => {
      if (!id) {
        throw new Error("Invalid listing ID");
      }

      const url = new URL(`${this.apiListingsPath}/${id}${this.apiListingsQueryParam}`);
      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, false),
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
        headers: this.util.setupHeaders(true, false),
        method: "GET",
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("Could not fetch listings");
    },
    bid: async (id: string | null, body: number) => {
      if (!id) {
        throw new Error("Could not find listing iD");
      }

      const url = new URL(`${this.apiListingsPath}${id}/bids`);
      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true),
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("Could not make bid. Please try again.");
    },
  };
}
