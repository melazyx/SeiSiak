import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!nama || !email || !password || !confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sesuai.");
      return;
    }

    setLoading(true);

    const res = await register({
      nama,
      email,
      password,
    });

    setLoading(false);

    if (!res.ok) {
      setError(res.message || "Pendaftaran gagal.");
      return;
    }

    // Setelah berhasil daftar,
    // arahkan ke halaman login.
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#f3f6fa] flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-5xl">

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          <div className="grid lg:grid-cols-2">


            {/* ================================================= */}
            {/* LEFT BRANDING */}
            {/* ================================================= */}

            <div className="hidden lg:flex relative bg-[#0072bc] min-h-[680px] overflow-hidden">

              {/* DECORATION */}

              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ed1c24] rounded-full" />

              <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-[#7ac143] rounded-full" />

              <div className="absolute bottom-20 right-10 w-32 h-32 border-[20px] border-white/10 rounded-full" />


              <div className="relative z-10 p-12 flex flex-col justify-between w-full">


                {/* BRAND */}

                <div>

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">

                      <div className="relative w-8 h-8">

                        <div className="absolute left-0 top-3 w-7 h-4 bg-[#0072bc] -skew-x-12 rounded-sm" />

                        <div className="absolute right-0 top-0 w-5 h-4 bg-[#ed1c24] -skew-x-12 rounded-sm" />

                        <div className="absolute right-0 bottom-0 w-5 h-4 bg-[#7ac143] -skew-x-12 rounded-sm" />

                      </div>

                    </div>

                    <div>

                      <p className="text-white font-extrabold text-xl">
                        PERTAMINA
                      </p>

                      <p className="text-white font-bold text-sm tracking-wide">
                        PATRA NIAGA
                      </p>

                    </div>

                  </div>

                </div>


                {/* CONTENT */}

                <div>

                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold mb-6">

                    <Building2 size={15} />

                    FUEL TERMINAL SEI SIAK

                  </div>


                  <h1 className="text-4xl font-extrabold text-white leading-tight">

                    Kelola Website
                    <br />

                    <span className="text-[#9bdc4b]">
                      Lebih Mudah
                    </span>

                  </h1>


                  <p className="text-white/75 mt-5 max-w-md leading-relaxed">

                    Buat akun administrator untuk mengelola
                    produk, gambar, harga, dan informasi
                    Juragan Kambing Sei Siak.

                  </p>


                  {/* FEATURES */}

                  <div className="mt-8 space-y-3">

                    <div className="flex items-center gap-3 text-white/90 text-sm">

                      <CheckCircle2
                        size={18}
                        className="text-[#9bdc4b]"
                      />

                      Kelola produk kambing

                    </div>


                    <div className="flex items-center gap-3 text-white/90 text-sm">

                      <CheckCircle2
                        size={18}
                        className="text-[#9bdc4b]"
                      />

                      Kelola produk ayam & maggot

                    </div>


                    <div className="flex items-center gap-3 text-white/90 text-sm">

                      <CheckCircle2
                        size={18}
                        className="text-[#9bdc4b]"
                      />

                      Kelola gambar dan informasi produk

                    </div>

                  </div>

                </div>


                {/* FOOTER */}

                <div>

                  <div className="w-16 h-1 bg-white/80 rounded-full mb-4" />

                  <p className="text-white/60 text-xs">
                    UMKM Binaan Pertamina Patra Niaga
                  </p>

                  <p className="text-white/50 text-xs mt-1">
                    Fuel Terminal Sei Siak
                  </p>

                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* REGISTER FORM */}
            {/* ================================================= */}

            <div className="p-7 sm:p-10 lg:p-12 flex items-center">

              <div className="w-full max-w-md mx-auto">


                {/* MOBILE BRAND */}

                <div className="lg:hidden mb-8">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-[#0072bc] flex items-center justify-center">

                      <span className="text-white font-black text-sm">
                        PN
                      </span>

                    </div>

                    <div>

                      <p className="font-extrabold text-slate-900">
                        PERTAMINA PATRA NIAGA
                      </p>

                      <p className="text-xs text-slate-500">
                        Fuel Terminal Sei Siak
                      </p>

                    </div>

                  </div>

                </div>


                {/* HEADER */}

                <div className="mb-7">

                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">

                    <ShieldCheck
                      size={25}
                      className="text-[#0072bc]"
                    />

                  </div>


                  <p className="text-xs font-bold uppercase tracking-widest text-[#0072bc] mb-2">
                    Admin Panel
                  </p>


                  <h2 className="text-3xl font-extrabold text-slate-900">
                    Buat Akun Admin
                  </h2>


                  <p className="text-sm text-slate-500 mt-2">
                    Daftarkan akun untuk mengakses panel administrasi.
                  </p>

                </div>


                {/* ERROR */}

                {error && (

                  <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                    <p className="text-sm text-red-700">
                      {error}
                    </p>

                  </div>

                )}


                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >


                  {/* NAMA */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nama Admin
                    </label>

                    <div className="relative">

                      <UserRound
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        value={nama}
                        onChange={(e) =>
                          setNama(e.target.value)
                        }
                        placeholder="Masukkan nama admin"
                        className="
                          w-full
                          h-12
                          pl-11
                          pr-4
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          text-sm
                          outline-none
                          focus:bg-white
                          focus:border-[#0072bc]
                          focus:ring-4
                          focus:ring-blue-100
                        "
                      />

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        placeholder="admin@email.com"
                        className="
                          w-full
                          h-12
                          pl-11
                          pr-4
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          text-sm
                          outline-none
                          focus:bg-white
                          focus:border-[#0072bc]
                          focus:ring-4
                          focus:ring-blue-100
                        "
                      />

                    </div>

                  </div>


                  {/* PASSWORD */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>

                    <div className="relative">

                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        placeholder="Minimal 6 karakter"
                        className="
                          w-full
                          h-12
                          pl-11
                          pr-12
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          text-sm
                          outline-none
                          focus:bg-white
                          focus:border-[#0072bc]
                          focus:ring-4
                          focus:ring-blue-100
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      >

                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>


                  {/* CONFIRM PASSWORD */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Konfirmasi Password
                    </label>

                    <div className="relative">

                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        placeholder="Ulangi password"
                        className="
                          w-full
                          h-12
                          pl-11
                          pr-12
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          text-sm
                          outline-none
                          focus:bg-white
                          focus:border-[#0072bc]
                          focus:ring-4
                          focus:ring-blue-100
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      >

                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>


                  {/* BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      h-12
                      mt-2
                      rounded-xl
                      bg-[#ed1c24]
                      hover:bg-[#d71920]
                      text-white
                      font-bold
                      text-sm
                      flex
                      items-center
                      justify-center
                      gap-2
                      shadow-lg
                      shadow-red-200
                      transition-all
                      hover:-translate-y-0.5
                      disabled:opacity-60
                    "
                  >

                    {loading ? (
                      "Membuat akun..."
                    ) : (
                      <>
                        Buat Akun Admin
                        <ArrowRight size={17} />
                      </>
                    )}

                  </button>

                </form>


                {/* LOGIN */}

                <div className="mt-7 text-center">

                  <p className="text-sm text-slate-500">

                    Sudah memiliki akun?{" "}

                    <Link
                      to="/login"
                      className="font-bold text-[#0072bc] hover:text-[#005a94]"
                    >
                      Masuk di sini
                    </Link>

                  </p>

                </div>


                {/* FOOTER */}

                <div className="mt-7 pt-6 border-t border-slate-100">

                  <p className="text-center text-xs text-slate-400">
                    Sistem Administrasi • Juragan Kambing Sei Siak
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}