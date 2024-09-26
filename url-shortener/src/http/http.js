const BASE_URL = "http://localhost:4000";

const HTTP = {
  post: async (payload = {}, endpoint = "") => {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  },
  get: async (endpoint = "") => {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "GET",
    });

    return await res.json();
  },
  delete: async (shortUrlId) => {
    const res = await fetch(`${BASE_URL}/url?shortUrlId=${shortUrlId}`, {
      method: "DELETE",
    });

    return await res.json();
  },
};

export default HTTP;
