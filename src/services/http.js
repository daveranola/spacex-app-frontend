import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080/api", //springboot host
  timeout: 8000,
});

api.interceptors.response.use((res) => res.data, (err) => Promise.reject(err)); //unwrap data from axios response into json

export default api;