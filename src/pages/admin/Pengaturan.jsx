import { useEffect, useState } from "react";
import {
  UserCircle,
  Mail,
  Lock,
  ShieldCheck,
  Save,
  Eye,
  EyeOff,
  LogOut,
  CheckCircle2,
  AlertCircle,
  KeyRound,
} from "lucide-react";

import AdminLayout from "../../components/AdminLayout";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";

export default function Pengaturan() {
  const { user, logout } = useAuth();

  // =========================
  // PROFIL
  // =========================

  const [nama, setNama] = useState("");

  // =========================
  // PASSWORD
  // =========================

  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

  const [showPasswordLama, setShowPasswordLama] = useState(false);
  const [showPasswordBaru, setShowPasswordBaru] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  // =========================
  // LOADING
  // =========================

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // =========================
  // MESSAGE
  // =========================

  const [profileMessage, setProfileMessage] = useState({
    type: "",
    text: "",
  });

  const [passwordMessage, setPasswordMessage] = useState({
    type: "",
    text: "",
  });

  // =========================
  // AMBIL NAMA USER
  // =========================

  useEffect(() => {
    setNama(user?.user_metadata?.nama || "");
  }, [user]);

  // =========================
  // SIMPAN PROFIL
  // =========================

  async function handleSaveProfile(e) {
    e.preventDefault();

    setProfileMessage({
      type: "",
      text: "",
    });

    if (!nama.trim()) {
      setProfileMessage({
        type: "error",
        text: "Nama admin tidak boleh kosong.",
      });

      return;
    }

    setSavingProfile(true);

    const { error } = await supabase.auth.updateUser({
      data: {
        nama: nama.trim(),
      },
    });

    setSavingProfile(false);

    if (error) {
      setProfileMessage({
        type: "error",
        text: error.message,
      });

      return;
    }

    setProfileMessage({
      type: "success",
      text: "Profil admin berhasil diperbarui.",
    });
  }

  // =========================
  // UBAH PASSWORD
  // =========================

  async function handleChangePassword(e) {
    e.preventDefault();

    setPasswordMessage({
      type: "",
      text: "",
    });

    if (!passwordLama) {
      setPasswordMessage({
        type: "error",
        text: "Password lama wajib diisi.",
      });

      return;
    }

    if (!passwordBaru) {
      setPasswordMessage({
        type: "error",
        text: "Password baru wajib diisi.",
      });

      return;
    }

    if (!konfirmasiPassword) {
      setPasswordMessage({
        type: "error",
        text: "Konfirmasi password wajib diisi.",
      });

      return;
    }

    if (passwordBaru.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "Password baru minimal 6 karakter.",
      });

      return;
    }

    if (passwordBaru !== konfirmasiPassword) {
      setPasswordMessage({
        type: "error",
        text: "Konfirmasi password tidak sama dengan password baru.",
      });

      return;
    }

    if (passwordLama === passwordBaru) {
      setPasswordMessage({
        type: "error",
        text: "Password baru harus berbeda dari password lama.",
      });

      return;
    }

    if (!user?.email) {
      setPasswordMessage({
        type: "error",
        text: "Email akun tidak ditemukan.",
      });

      return;
    }

    setSavingPassword(true);

    // Verifikasi password lama
    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email: user.email,
        password: passwordLama,
      });

    if (loginError) {
      setSavingPassword(false);

      setPasswordMessage({
        type: "error",
        text: "Password lama yang kamu masukkan salah.",
      });

      return;
    }

    // Update password baru
    const { error } = await supabase.auth.updateUser({
      password: passwordBaru,
    });

    setSavingPassword(false);

    if (error) {
      setPasswordMessage({
        type: "error",
        text: error.message,
      });

      return;
    }

    setPasswordLama("");
    setPasswordBaru("");
    setKonfirmasiPassword("");

    setPasswordMessage({
      type: "success",
      text: "Password berhasil diperbarui.",
    });
  }

  // =========================
  // LOGOUT
  // =========================

  async function handleLogout() {
    const yakin = window.confirm(
      "Apakah kamu yakin ingin keluar dari akun admin?"
    );

    if (!yakin) return;

    await logout();
  }

  // =========================
  // KOMPONEN INPUT PASSWORD
  // =========================

  function PasswordInput({
    label,
    value,
    onChange,
    placeholder,
    show,
    setShow,
  }) {
    return (
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#1F2933]">
          {label}
        </label>

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-[#E4E7E5] bg-white px-4 py-3 pr-12 text-sm text-[#1F2933] outline-none transition focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#68737D] transition hover:bg-[#F3F6F4] hover:text-[#087F5B]"
            aria-label={
              show ? "Sembunyikan password" : "Tampilkan password"
            }
          >
            {show ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // RENDER
  // =========================

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#F5F8FC] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* =========================
              HEADER
          ========================= */}

          <div className="mb-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="mb-1 text-sm font-medium text-[#087F5B]">
                  Sistem Admin
                </p>

                <h1 className="font-[Poppins] text-2xl font-bold text-[#1F2933] sm:text-3xl">
                  Pengaturan
                </h1>

                <p className="mt-1 text-sm text-[#68737D]">
                  Kelola profil dan keamanan akun admin.
                </p>
              </div>

              {/* User mini profile */}

              <div className="flex items-center gap-3 rounded-2xl border border-[#E4E7E5] bg-white px-4 py-3 shadow-sm">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5EF] text-[#087F5B]">
                  <UserCircle size={24} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#1F2933]">
                    {user?.user_metadata?.nama || "Admin"}
                  </p>

                  <p className="text-xs text-[#68737D]">
                    Administrator
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* =========================
              CONTENT
          ========================= */}

          <div className="grid gap-6 lg:grid-cols-3">

            {/* =====================================================
                PROFIL ADMIN
            ===================================================== */}

            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-[#E4E7E5] bg-white shadow-sm">

                {/* Header card */}

                <div className="border-b border-[#E4E7E5] px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EF] text-[#087F5B]">
                      <UserCircle size={21} />
                    </div>

                    <div>
                      <h2 className="font-[Poppins] text-base font-semibold text-[#1F2933]">
                        Profil Admin
                      </h2>

                      <p className="text-xs text-[#68737D]">
                        Informasi akun yang digunakan untuk
                        mengakses dashboard.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Form */}

                <form
                  onSubmit={handleSaveProfile}
                  className="space-y-5 p-6"
                >

                  {/* Nama */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-[#1F2933]">
                      Nama Admin
                    </label>

                    <div className="relative">

                      <UserCircle
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#68737D]"
                      />

                      <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Masukkan nama admin"
                        className="w-full rounded-xl border border-[#E4E7E5] bg-white py-3 pl-11 pr-4 text-sm text-[#1F2933] outline-none transition focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
                      />

                    </div>

                  </div>

                  {/* Email */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-[#1F2933]">
                      Email
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#68737D]"
                      />

                      <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-[#E4E7E5] bg-[#F5F8FC] py-3 pl-11 pr-4 text-sm text-[#68737D]"
                      />

                    </div>

                    <p className="mt-2 text-xs text-[#68737D]">
                      Email ini digunakan untuk login ke dashboard admin.
                    </p>

                  </div>

                  {/* Message */}

                  {profileMessage.text && (
                    <div
                      className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
                        profileMessage.type === "success"
                          ? "bg-[#E8F5EF] text-[#087F5B]"
                          : "bg-[#FDEBEC] text-[#D71920]"
                      }`}
                    >

                      {profileMessage.type === "success" ? (
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0"
                        />
                      ) : (
                        <AlertCircle
                          size={18}
                          className="mt-0.5 shrink-0"
                        />
                      )}

                      <span>{profileMessage.text}</span>

                    </div>
                  )}

                  {/* Save button */}

                  <div className="flex justify-end pt-1">

                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#087F5B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#056044] disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      <Save size={17} />

                      {savingProfile
                        ? "Menyimpan..."
                        : "Simpan Perubahan"}

                    </button>

                  </div>

                </form>

              </div>
            </div>

            {/* =====================================================
                STATUS AKUN
            ===================================================== */}

            <div className="space-y-6">

              <div className="rounded-2xl border border-[#E4E7E5] bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EF] text-[#087F5B]">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <h2 className="font-[Poppins] text-base font-semibold text-[#1F2933]">
                      Status Akun
                    </h2>

                    <p className="text-xs text-[#68737D]">
                      Kondisi akun saat ini.
                    </p>
                  </div>

                </div>

                <div className="space-y-3">

                  {/* Status */}

                  <div className="flex items-center justify-between rounded-xl bg-[#F5F8FC] px-4 py-3">

                    <span className="text-sm text-[#68737D]">
                      Status
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5EF] px-3 py-1 text-xs font-semibold text-[#087F5B]">

                      <span className="h-1.5 w-1.5 rounded-full bg-[#188A5B]" />

                      Aktif

                    </span>

                  </div>

                  {/* Role */}

                  <div className="flex items-center justify-between rounded-xl bg-[#F5F8FC] px-4 py-3">

                    <span className="text-sm text-[#68737D]">
                      Role
                    </span>

                    <span className="text-sm font-semibold text-[#1F2933]">
                      Administrator
                    </span>

                  </div>

                  {/* Authentication */}

                  <div className="flex items-center justify-between rounded-xl bg-[#F5F8FC] px-4 py-3">

                    <span className="text-sm text-[#68737D]">
                      Login
                    </span>

                    <span className="text-sm font-semibold text-[#087F5B]">
                      Supabase Auth
                    </span>

                  </div>

                </div>

              </div>

              {/* Security information */}

              <div className="rounded-2xl border border-[#E4E7E5] bg-white p-6 shadow-sm">

                <div className="flex gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FDEBEC] text-[#D71920]">
                    <KeyRound size={18} />
                  </div>

                  <div>

                    <h3 className="text-sm font-semibold text-[#1F2933]">
                      Keamanan akun
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#68737D]">
                      Gunakan password yang kuat dan jangan
                      membagikan informasi login kepada orang lain.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =====================================================
                UBAH PASSWORD
            ===================================================== */}

            <div className="lg:col-span-2">

              <div className="overflow-hidden rounded-2xl border border-[#E4E7E5] bg-white shadow-sm">

                {/* Header */}

                <div className="border-b border-[#E4E7E5] px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDEBEC] text-[#D71920]">
                      <Lock size={20} />
                    </div>

                    <div>
                      <h2 className="font-[Poppins] text-base font-semibold text-[#1F2933]">
                        Keamanan & Password
                      </h2>

                      <p className="text-xs text-[#68737D]">
                        Ubah password akun admin.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Form */}

                <form
                  onSubmit={handleChangePassword}
                  className="space-y-5 p-6"
                >

                  {/* Password lama */}

                  <PasswordInput
                    label="Password Lama"
                    value={passwordLama}
                    onChange={setPasswordLama}
                    placeholder="Masukkan password lama"
                    show={showPasswordLama}
                    setShow={setShowPasswordLama}
                  />

                  {/* Password baru */}

                  <div className="grid gap-5 md:grid-cols-2">

                    <PasswordInput
                      label="Password Baru"
                      value={passwordBaru}
                      onChange={setPasswordBaru}
                      placeholder="Minimal 6 karakter"
                      show={showPasswordBaru}
                      setShow={setShowPasswordBaru}
                    />

                    <PasswordInput
                      label="Konfirmasi Password"
                      value={konfirmasiPassword}
                      onChange={setKonfirmasiPassword}
                      placeholder="Ulangi password baru"
                      show={showKonfirmasi}
                      setShow={setShowKonfirmasi}
                    />

                  </div>

                  {/* Password message */}

                  {passwordMessage.text && (
                    <div
                      className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
                        passwordMessage.type === "success"
                          ? "bg-[#E8F5EF] text-[#087F5B]"
                          : "bg-[#FDEBEC] text-[#D71920]"
                      }`}
                    >

                      {passwordMessage.type === "success" ? (
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0"
                        />
                      ) : (
                        <AlertCircle
                          size={18}
                          className="mt-0.5 shrink-0"
                        />
                      )}

                      <span>{passwordMessage.text}</span>

                    </div>
                  )}

                  {/* Footer form */}

                  <div className="flex flex-col gap-3 border-t border-[#E4E7E5] pt-5 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-xs text-[#68737D]">
                      Password minimal 6 karakter.
                    </p>

                    <button
                      type="submit"
                      disabled={savingPassword}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D71920] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B9141A] disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      <Lock size={17} />

                      {savingPassword
                        ? "Memproses..."
                        : "Ubah Password"}

                    </button>

                  </div>

                </form>

              </div>

            </div>

            {/* =====================================================
                LOGOUT
            ===================================================== */}

            <div>

              <div className="rounded-2xl border border-[#E4E7E5] bg-white p-6 shadow-sm">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDEBEC] text-[#D71920]">
                  <LogOut size={20} />
                </div>

                <h2 className="font-[Poppins] text-base font-semibold text-[#1F2933]">
                  Keluar dari Akun
                </h2>

                <p className="mt-1 text-xs leading-5 text-[#68737D]">
                  Keluar dari dashboard admin pada perangkat ini.
                </p>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D71920] px-4 py-3 text-sm font-semibold text-[#D71920] transition hover:bg-[#FDEBEC]"
                >
                  <LogOut size={17} />
                  Keluar
                </button>

              </div>

            </div>

          </div>

          {/* =========================
              FOOTER
          ========================= */}

          <div className="py-8 text-center">

            <p className="text-xs text-[#68737D]">
              Pengaturan Admin • Juragan Kambing Sei Siak
            </p>

          </div>

        </div>
      </div>
    </AdminLayout>
  );
}