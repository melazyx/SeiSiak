import axios from "axios";

// Ganti VITE_API_URL di file .env sesuai alamat backend kamu, contoh:
// VITE_API_URL=http://localhost:4000/api
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
})

// Setiap request otomatis membawa token login (kalau ada)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jk_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default api;