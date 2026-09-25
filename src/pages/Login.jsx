import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    const res = await login({
      email,
      password,
    });

    setLoading(false);

    if (!res.ok) {
      setError(res.message || "Email atau password salah.");
      return;
    }

    navigate("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#f3f9f5] flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-5xl">

        {/* CARD UTAMA */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* ================================================= */}
            {/* BAGIAN KIRI - BRANDING */}
            {/* ================================================= */}

            <div className="hidden lg:flex relative bg-[#1A5D3A] min-h-[620px] overflow-hidden">

              {/* Background decoration */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#0F4229] rounded-full opacity-95" />

              <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-[#8DC63F] rounded-full opacity-90" />

              <div className="absolute top-1/2 -right-24 w-44 h-44 border-[28px] border-white/10 rounded-full" />

              <div className="relative z-10 p-12 flex flex-col justify-between w-full">

                {/* BRAND */}
                <div>

                  <div className="flex items-center gap-4">

                    {/* Logo sederhana */}
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">

                      <div className="relative w-8 h-8">

                        <div className="absolute left-0 top-3 w-7 h-4 bg-[#1A5D3A] -skew-x-12 rounded-sm" />

                        <div className="absolute right-0 top-0 w-5 h-4 bg-[#2F704A] -skew-x-12 rounded-sm" />

                        <div className="absolute right-0 bottom-0 w-5 h-4 bg-[#8DC63F] -skew-x-12 rounded-sm" />

                      </div>

                    </div>

                    <div>
                      <p className="text-white font-extrabold text-xl tracking-tight">
                        JURAGAN KAMBING
                      </p>

                      <p className="text-white font-bold text-sm tracking-wide">
                        SEI SIAK
                      </p>
                    </div>

                  </div>

                </div>


                {/* CENTER CONTENT */}
                <div>

                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm">

                    <Building2 size={15} />

                    UMKM BINAAN FUEL TERMINAL SEI SIAK

                  </div>

                  <h1 className="text-4xl font-extrabold text-white leading-tight">

                    Sistem Informasi
                    <br />

                    <span className="text-[#C4E88A]">
                      Juragan Kambing
                    </span>

                  </h1>

                  <p className="text-white/75 mt-5 max-w-md leading-relaxed">

                    Selamat datang di halaman administrator
                    Juragan Kambing Sei Siak. Kelola informasi
                    produk dengan mudah dan terstruktur.

                  </p>

                </div>


                {/* FOOTER */}
                <div>

                  <div className="w-16 h-1 bg-white/80 rounded-full mb-4" />

                  <p className="text-white/60 text-xs">
                    Didukung oleh Pertamina Patra Niaga
                  </p>

                  <p className="text-white/50 text-xs mt-1">
                    Fuel Terminal Sei Siak
                  </p>

                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* BAGIAN KANAN - LOGIN */}
            {/* ================================================= */}

            <div className="p-7 sm:p-10 lg:p-12 flex items-center">

              <div className="w-full max-w-md mx-auto">

                {/* MOBILE BRANDING */}
                <div className="lg:hidden mb-8">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-[#1A5D3A] flex items-center justify-center">

                      <span className="text-white font-black text-sm">
                        JK
                      </span>

                    </div>

                    <div>

                      <p className="font-extrabold text-[#1e293b]">
                        JURAGAN KAMBING SEI SIAK
                      </p>

                      <p className="text-xs text-slate-500">
                        Fuel Terminal Sei Siak
                      </p>

                    </div>

                  </div>

                </div>


                {/* HEADER LOGIN */}
                <div className="mb-8">

                  <div className="w-12 h-12 rounded-2xl bg-[#E5F0EA] flex items-center justify-center mb-5">

                    <ShieldCheck
                      size={25}
                      className="text-[#1A5D3A]"
                    />

                  </div>

                  <p className="text-xs font-bold uppercase tracking-widest text-[#1A5D3A] mb-2">
                    Admin Panel
                  </p>

                  <h2 className="text-3xl font-extrabold text-slate-900">
                    Selamat Datang
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    Masuk untuk mengelola website Juragan Kambing Sei Siak.
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
                  className="space-y-5"
                >

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
                          text-slate-900
                          outline-none
                          transition
                          focus:bg-white
                          focus:border-[#1A5D3A]
                          focus:ring-4
                          focus:ring-[#E5F0EA]
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
                        placeholder="Masukkan password"
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
                          text-slate-900
                          outline-none
                          transition
                          focus:bg-white
                          focus:border-[#1A5D3A]
                          focus:ring-4
                          focus:ring-[#E5F0EA]
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
                          w-9
                          h-9
                          flex
                          items-center
                          justify-center
                          text-slate-400
                          hover:text-slate-700
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


                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      h-12
                      rounded-xl
                      bg-[#1A5D3A]
                      hover:bg-[#0F4229]
                      text-white
                      font-bold
                      text-sm
                      flex
                      items-center
                      justify-center
                      gap-2
                      shadow-lg
                      shadow-[#1A5D3A]/20
                      transition-all
                      hover:-translate-y-0.5
                      disabled:opacity-60
                      disabled:hover:translate-y-0
                    "
                  >

                    {loading ? (
                      "Memproses..."
                    ) : (
                      <>
                        Masuk ke Admin
                        <ArrowRight size={17} />
                      </>
                    )}

                  </button>

                </form>

                {/* INFO */}
                <div className="mt-8 pt-6 border-t border-slate-100">

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