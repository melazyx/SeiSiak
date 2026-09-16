import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProdukProvider } from "./context/ProdukContext";
import { LaporanProvider } from "./context/LaporanContext";
import { TernakProvider } from "./context/TernakContext";
import { PakanProvider } from "./context/PakanContext";
import { KegiatanProvider } from "./context/KegiatanContext";
import { GaleriProvider } from "./context/GaleriContext";
import { KategoriProvider } from "./context/KategoriContext";
import PrivateRoute from "./components/PrivateRoute";
import TentangKami from "./pages/TentangKami";
import Beranda from "./pages/Beranda";
import Kambing from "./pages/Kambing";
import Ayam from "./pages/Ayam";
import Maggot from "./pages/Maggot";
import LacakTernak from "./pages/LacakTernak";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import KelolaProduk from "./pages/admin/KelolaProduk";
import PantauProduksi from "./pages/admin/PantauProduksi";
import KelolaTernak from "./pages/admin/KelolaTernak";
import GudangPakan from "./pages/admin/GudangPakan";
import RiwayatAktivitas from "./pages/admin/RiwayatAktivitas";
import KelolaKegiatan from "./pages/admin/KelolaKegiatan";
import KelolaGaleri from "./pages/admin/KelolaGaleri";
import KelolaKategori from "./pages/admin/KelolaKategori";

export default function App() {
  return (
    <AuthProvider>
      <ProdukProvider>
        <LaporanProvider>
          <TernakProvider>
            <PakanProvider>
              <KegiatanProvider>
                <GaleriProvider>
                  <KategoriProvider>
                    <BrowserRouter>
                      <Routes>
                        {/* Halaman publik */}
                        <Route path="/" element={<Beranda />} />
                        <Route path="/kambing" element={<Kambing />} />
                        <Route path="/ayam" element={<Ayam />} />
                        <Route path="/maggot" element={<Maggot />} />
                        <Route path="/tentang" element={<TentangKami />} />
                        <Route path="/lacak-ternak" element={<LacakTernak />} />

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

                        <Route
                          path="/admin/produksi-penjualan"
                          element={
                            <PrivateRoute>
                              <PantauProduksi />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/admin/ternak/:kategori"
                          element={
                            <PrivateRoute>
                              <KelolaTernak />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/admin/gudang-pakan"
                          element={
                            <PrivateRoute>
                              <GudangPakan />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/admin/riwayat-aktivitas"
                          element={
                            <PrivateRoute>
                              <RiwayatAktivitas />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/admin/kegiatan"
                          element={
                            <PrivateRoute>
                              <KelolaKegiatan />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/admin/galeri"
                          element={
                            <PrivateRoute>
                              <KelolaGaleri />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/admin/kategori/:kategori"
                          element={
                            <PrivateRoute>
                              <KelolaKategori />
                            </PrivateRoute>
                          }
                        />
                      </Routes>
                    </BrowserRouter>
                  </KategoriProvider>
                </GaleriProvider>
              </KegiatanProvider>
            </PakanProvider>
          </TernakProvider>
        </LaporanProvider>
      </ProdukProvider>
    </AuthProvider>
  );
}