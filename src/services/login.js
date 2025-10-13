import api from "./http"; // axios instance (baseURL + withCredentials + interceptor)

export async function login({ email, username, password }) {
  // api.* already returns res.data (because of the interceptor)
  return api.post("/auth/login", { email, username, password });
}

export async function me() {
  return api.get("/auth/me");
}

export async function logout() {
  return api.post("/auth/logout");
}
