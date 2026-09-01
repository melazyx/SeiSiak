import api from "./axios";

export async function registerAdmin({ nama,email, password}) {
    const res = await api.post("/register", { nama, email, password });
    return res.data;
}

export async function loginAdmin({ email, password }) {
    const res = await api.post("/login", { email, password});
    return res.data;
}