import api from "./http";

export async function signup({ email, username, password }) {
    const { data } = await api.post("/user/addUser", { name: username, email, password });
    return data; // e.g., { userId, name }
}