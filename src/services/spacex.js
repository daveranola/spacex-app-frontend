import api from "./http";

export const listUpcomingLaunches = () => api.get("/launches/upcoming");
export const getLaunchById = (id) => api.get(`/launches/${id}`);
export const getRocketById = (id) => api.get(`/rockets/${id}`);