import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProdukProvider } from "./context/ProdukContext";
import PrivateRoute from "./components/PrivateRoute";
import TentangKami from "./pages/TentangKami";
import Beranda from "./pages/Beranda";
import Kambing from "./pages/Kambing";
import Ayam from "./pages/Ayam";
import Maggot from "./pages/Maggot";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import KelolaProduk from "./pages/admin/KelolaProduk";

export default function App() {
  return (
    <AuthProvider>
      <ProdukProvider>
        <BrowserRouter>
          <Routes>
            {/* Halaman publik */}
            <Route path="/" element={<Beranda />} />
            <Route path="/kambing" element={<Kambing />} />
            <Route path="/ayam" element={<Ayam />} />
            <Route path="/maggot" element={<Maggot />} />
            <Route path="/tentang" element={<TentangKami />} />

            {/* Auth admin */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Dashboard admin (terproteksi) */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/produk/:kategori"
              element={
                <PrivateRoute>
                  <KelolaProduk />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProdukProvider>
    </AuthProvider>
  );
}