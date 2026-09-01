import { createContext, useContext, useState } from "react";
import { registerAdmin, loginAdmin } from "../api/auth";

const AuthContext = createContext(null);

const DEMO_USERS_KEY = "jk_demo_users";
const TOKEN_KEY = "jk_token";
const USER_KEY = "jk_user";

// ===============================
// AKUN ADMIN TETAP — buat demo/sidang
// Ganti email & password sesuai keinginan kamu
// ===============================
const FIXED_ADMIN = {
  nama: "Admin Juragan Kambing",
  email: "admin@juragankambing.com",
  password: "admin123",
};

function readDemoUsers() {
  try {
    return JSON.parse(localStorage.getItem(DEMO_USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  });

  function persistSession(user, token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setUser(user);
  }

  async function register({ nama, email, password }) {
    try {
      const { user, token } = await registerAdmin({ nama, email, password });
      persistSession(user, token);
      return { ok: true };
    } catch {
      const users = readDemoUsers();
      if (email === FIXED_ADMIN.email || users.some((u) => u.email === email)) {
        return { ok: false, message: "Email sudah terdaftar." };
      }
      users.push({ nama, email, password });
      localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
      return { ok: true };
    }
  }

  async function login({ email, password }) {
    // Cek akun tetap dulu — selalu tersedia di browser/device manapun
    if (email === FIXED_ADMIN.email && password === FIXED_ADMIN.password) {
      persistSession(
        { nama: FIXED_ADMIN.nama, email: FIXED_ADMIN.email },
        "demo-token-fixed"
      );
      return { ok: true };
    }

    try {
      const { user, token } = await loginAdmin({ email, password });
      persistSession(user, token);
      return { ok: true };
    } catch {
      const users = readDemoUsers();
      const found = users.find((u) => u.email === email && u.password === password);
      if (!found) return { ok: false, message: "Email atau password salah." };
      persistSession({ nama: found.nama, email: found.email }, "demo-token");
      return { ok: true };
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}