import api from "./http";

export const getAllRockets = () => api.get("/api/rockets")