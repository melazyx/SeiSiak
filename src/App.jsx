import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* ============================================================
   CONTEXT
============================================================ */

import { AuthProvider } from "./context/AuthContext";
import { ProdukProvider } from "./context/ProdukContext";
import { LaporanProvider } from "./context/LaporanContext";
import { TernakProvider } from "./context/TernakContext";
import { PakanProvider } from "./context/PakanContext";
import { KegiatanProvider } from "./context/KegiatanContext";
import { GaleriProvider } from "./context/GaleriContext";
import { KategoriProvider } from "./context/KategoriContext";

/* ============================================================
   COMPONENTS
============================================================ */

import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./components/AdminLayout";

/* ============================================================
   PUBLIC PAGES
============================================================ */

import Beranda from "./pages/Beranda";
import Katalog from "./pages/Katalog";
import DetailProduk from "./pages/DetailProduk";
import TitipTernak from "./pages/TitipTernak";
import LacakTernak from "./pages/LacakTernak";
import TentangKami from "./pages/TentangKami";

import Login from "./pages/Login";

/* ============================================================
   ADMIN PAGES
============================================================ */

import Dashboard from "./pages/admin/Dashboard";
import KelolaProduk from "./pages/admin/KelolaProduk";
import PantauProduksi from "./pages/admin/PantauProduksi";
import KelolaTernak from "./pages/admin/KelolaTernak";
import GudangPakan from "./pages/admin/GudangPakan";
import RiwayatAktivitas from "./pages/admin/RiwayatAktivitas";
import KelolaKegiatan from "./pages/admin/KelolaKegiatan";
import KelolaGaleri from "./pages/admin/KelolaGaleri";
import KelolaKategori from "./pages/admin/KelolaKategori";
import Pengaturan from "./pages/admin/Pengaturan";


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

                        {/* ==================================================
                            PUBLIC WEBSITE
                        ================================================== */}

                        <Route
                          path="/"
                          element={<Beranda />}
                        />

                        <Route
                          path="/katalog"
                          element={<Katalog />}
                        />

                        <Route
                          path="/produk/:id"
                          element={<DetailProduk />}
                        />

                        <Route
                          path="/titip-ternak"
                          element={<TitipTernak />}
                        />

                        <Route
                          path="/lacak-ternak"
                          element={<LacakTernak />}
                        />

                        <Route
                          path="/tentang"
                          element={<TentangKami />}
                        />


                        {/* ==================================================
                            URL LAMA
                            
                            Tetap diarahkan ke katalog agar link lama
                            tidak menghasilkan halaman 404.
                        ================================================== */}

                        <Route
                          path="/kambing"
                          element={
                            <Navigate
                              to="/katalog"
                              replace
                            />
                          }
                        />

                        <Route
                          path="/ayam"
                          element={
                            <Navigate
                              to="/katalog"
                              replace
                            />
                          }
                        />

                        <Route
                          path="/maggot"
                          element={
                            <Navigate
                              to="/katalog"
                              replace
                            />
                          }
                        />


                        {/* ==================================================
                            AUTH
                        ================================================== */}

                        <Route
                          path="/register"
                          element={
                            <Navigate
                              to="/login"
                              replace
                            />
                          }
                        />

                        <Route
                          path="/login"
                          element={<Login />}
                        />


                        {/* ==================================================
                            ADMIN
                        ================================================== */}

                        {/* Dashboard */}

                        <Route
                          path="/admin"
                          element={
                            <Navigate
                              to="/admin/dashboard"
                              replace
                            />
                          }
                        />

                        <Route
                          path="/admin/dashboard"
                          element={
                            <PrivateRoute>
                              <AdminLayout>
                                <Dashboard />
                              </AdminLayout>
                            </PrivateRoute>
                          }
                        />


                        {/* Produk */}

                        <Route
                          path="/admin/produk/:kategori"
                          element={
                            <PrivateRoute>
                              <KelolaProduk />
                            </PrivateRoute>
                          }
                        />


                        {/* Produksi & Penjualan */}

                        <Route
                          path="/admin/produksi-penjualan"
                          element={
                            <PrivateRoute>
                              <PantauProduksi />
                            </PrivateRoute>
                          }
                        />


                        {/* Ternak */}

                        <Route
                          path="/admin/ternak/:kategori"
                          element={
                            <PrivateRoute>
                              <KelolaTernak />
                            </PrivateRoute>
                          }
                        />


                        {/* Gudang Pakan */}

                        <Route
                          path="/admin/gudang-pakan"
                          element={
                            <PrivateRoute>
                              <GudangPakan />
                            </PrivateRoute>
                          }
                        />


                        {/* Riwayat Aktivitas */}

                        <Route
                          path="/admin/riwayat-aktivitas"
                          element={
                            <PrivateRoute>
                              <RiwayatAktivitas />
                            </PrivateRoute>
                          }
                        />


                        {/* Kegiatan */}

                        <Route
                          path="/admin/kegiatan"
                          element={
                            <PrivateRoute>
                              <KelolaKegiatan />
                            </PrivateRoute>
                          }
                        />


                        {/* Galeri */}

                        <Route
                          path="/admin/galeri"
                          element={
                            <PrivateRoute>
                              <KelolaGaleri />
                            </PrivateRoute>
                          }
                        />


                        {/* Kategori */}

                        <Route
                          path="/admin/kategori/:kategori"
                          element={
                            <PrivateRoute>
                              <KelolaKategori />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/admin/pengaturan"
                          element={
                            <PrivateRoute>
                              <Pengaturan />
                            </PrivateRoute>
                          }
                        />


                        {/* ==================================================
                            FALLBACK
                        ================================================== */}

                        <Route
                          path="*"
                          element={
                            <Navigate
                              to="/"
                              replace
                            />
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