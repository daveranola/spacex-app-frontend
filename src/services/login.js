import axios from "axios";
import api from "./http"; // axios instance with baseURL + withCredentials

export async function login({ email, username, password }) {
  const { data } = await api.post("/auth/login", { email, username, password });
  return data; // e.g., { userId, name }
}

export async function me() {
  const { data } = await api.get("/auth/me");
  return data; // { userId, name }
}

export async function logout() {
  await api.post("/auth/logout");
}