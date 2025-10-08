import api from "./http";

export const historicalEvents = () => api.get("/history");
export const getLaunchById = (id) => api.get(`/launches/${id}`);
export const getRocketById = (id) => api.get(`/rockets/${id}`);