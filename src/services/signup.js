import api from "./http";

export async function signup({ name, email, password }) {
    const { data } = await api.post("/user/addUser", { name, email, password });
    return data; // e.g., { userId, name }
}