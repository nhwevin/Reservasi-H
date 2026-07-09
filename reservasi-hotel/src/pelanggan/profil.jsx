import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Receipt, 
  ClipboardList, 
  CheckCircle2, 
  ShieldAlert 
} from "lucide-react";
import Sidebar from "../components/sidebar";

export default function Profil() {
  // Form profil
  const [form, setForm] = useState({
    namaDepan:    "Budi",
    namaBelakang: "Santoso",
    email:        "budi.santoso@email.com",
    telepon:      "+62 812-3456-7890",
    kota:         "Medan, Sumut",
    alamat:       "Jl. Gatot Subroto No. 12, Medan Baru, Medan",
  });

  // Form password
  const [pw, setPw] = useState({ lama: "", baru: "", konfirmasi: "" });

  // Status tombol
  const [saveStatus, setSaveStatus] = useState("idle");   // idle | saving | saved
  const [pwStatus,   setPwStatus]   = useState("idle");   // idle | processing | done

  const handleForm = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));
  const handlePw   = (key) => (e) => setPw(prev => ({ ...prev, [key]: e.target.value }));

  const simpanProfil = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1000);
  };

  const gantiPassword = () => {
    setPwStatus("processing");
    setTimeout(() => {
      setPwStatus("done");
      setTimeout(() => {
        setPwStatus("idle");
        setPw({ lama: "", baru: "", konfirmasi: "" });
      }, 2500);
    }, 1200);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f3fa] font-['Plus_Jakarta_Sans',sans-serif]">

      <Sidebar activePage="profil" />

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-[#dde4f2] px-7 py-4 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
          <div>
            <h1 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#152340] m-0">
              Profil Saya
            </h1>
            <p className="text-xs text-[#5f7fb8] mt-0.5 m-0">Kelola informasi akun Anda</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              to="/notifikasi" 
              className="group relative w-9 h-9 rounded-full border border-[#dde4f2] flex items-center justify-center text-[#3d5fa0] no-underline"
            >
              <Bell className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#dde4f2] flex items-center justify-center text-xs font-bold text-[#1e3155] shadow-inner">
                BS
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#152340] leading-none m-0">Budi Santoso</p>
                <p className="text-xs text-[#5f7fb8] mt-0.5 m-0">Pelanggan</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-7 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 items-start">

            {/* ── Kolom Kiri: Kartu Profil ── */}
            <div className="flex flex-col gap-4 animate-[fadeUp_0.45s_ease_both]">

              {/* Kartu utama */}
              <div className="bg-white rounded-2xl border border-[#dde4f2] shadow-sm overflow-hidden">
                {/* Header gelap */}
                <div className="bg-[#152340] p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-[#dde4f2] flex items-center justify-center text-2xl font-bold text-[#152340] mb-3 border-4 border-[#24375a] shadow-inner">
                    BS
                  </div>
                  <p className="font-bold text-white text-lg m-0">Budi Santoso</p>
                  <p className="text-[#8da5d0] text-sm mt-0.5 m-0">{form.email}</p>
                  <span className="mt-3.5 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full tracking-wide">
                    Pelanggan Aktif
                  </span>
                </div>

                {/* Info rows */}
                <div className="p-5 flex flex-col gap-3">
                  {[
                    { label: "Telepon", value: form.telepon, icon: Phone },
                    { label: "Kota", value: form.kota, icon: MapPin },
                    { label: "Bergabung", value: "Jan 2024", icon: Calendar },
                    { label: "Total Reservasi", value: "5", icon: Receipt },
                  ].map((row, i, arr) => {
                    const RowIcon = row.icon;
                    return (
                      <div key={i} className={`flex justify-between items-center text-sm py-2 ${i < arr.length - 1 ? "border-b border-[#f0f3fa]" : ""}`}>
                        <span className="text-[#8da5d0] flex items-center gap-2">
                          {RowIcon && <RowIcon className="w-3.5 h-3.5 text-[#5f7fb8]" />}
                          {row.label}
                        </span>
                        <span className={`text-[#152340] ${i === arr.length - 1 ? "font-bold" : "font-semibold"}`}>
                          {row.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stat mini */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-4 border border-[#dde4f2] shadow-sm text-center">
                  <p className="text-xl font-bold text-emerald-500 m-0">1</p>
                  <p className="text-xs text-[#8da5d0] mt-1 m-0">Aktif</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#dde4f2] shadow-sm text-center">
                  <p className="text-xl font-bold text-blue-500 m-0">3</p>
                  <p className="text-xs text-[#8da5d0] mt-1 m-0">Selesai</p>
                </div>
              </div>

              {/* Tombol riwayat */}
              <Link
                to="/riwayat"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-[#b9c8e5] bg-white rounded-xl text-xs font-bold text-[#2d4a87] hover:bg-[#f0f3fa] hover:text-[#152340] transition-all no-underline shadow-sm"
              >
                <ClipboardList className="w-4 h-4" />
                Lihat Riwayat Saya
              </Link>
            </div>

            {/* ── Kolom Kanan: Form ── */}
            <div className="flex flex-col gap-5 animate-[fadeUp_0.45s_0.1s_ease_both]">

              {/* Edit Profil */}
              <div className="bg-white rounded-2xl border border-[#dde4f2] shadow-sm p-6">
                <h3 className="text-sm font-bold text-[#152340] m-0 mb-5 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#3d5fa0]" />
                  Edit Informasi Profil
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Field label="Nama Depan" value={form.namaDepan} onChange={handleForm("namaDepan")} />
                  <Field label="Nama Belakang" value={form.namaBelakang} onChange={handleForm("namaBelakang")} />
                </div>
                <div className="mb-4">
                  <Field label="Email" type="email" value={form.email} onChange={handleForm("email")} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Field label="No. Telepon" value={form.telepon} onChange={handleForm("telepon")} />
                  <Field label="Kota" value={form.kota} onChange={handleForm("kota")} />
                </div>
                <div className="mb-5">
                  <label className="block text-[11px] font-bold text-[#8da5d0] uppercase tracking-wider mb-1.5">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows={2}
                    value={form.alamat}
                    onChange={handleForm("alamat")}
                    className="w-full border border-[#b9c8e5] rounded-xl p-3 text-sm text-[#152340] bg-[#f0f3fa]/30 focus:outline-none focus:border-[#152340] focus:ring-4 focus:ring-[#152340]/5 transition-all resize-none font-['Plus_Jakarta_Sans',sans-serif]"
                  />
                </div>

                {/* Pesan sukses */}
                {saveStatus === "saved" && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-medium mb-4 animate-[fadeUp_0.3s_ease]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Perubahan berhasil disimpan!
                  </div>
                )}

                <button
                  onClick={simpanProfil}
                  disabled={saveStatus === "saving"}
                  className="px-5 py-2.5 bg-[#152340] hover:bg-[#24375a] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-[#152340]/10"
                >
                  {saveStatus === "saving" ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>

              {/* Ganti Password */}
              <div className="bg-white rounded-2xl border border-[#dde4f2] shadow-sm p-6">
                <h3 className="text-sm font-bold text-[#152340] m-0 mb-5 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#3d5fa0]" />
                  Ganti Password
                </h3>

                <div className="flex flex-col gap-4 mb-4">
                  <Field label="Password Lama" type="password" value={pw.lama} onChange={handlePw("lama")} placeholder="Masukkan password lama" />
                  <Field label="Password Baru" type="password" value={pw.baru} onChange={handlePw("baru")} placeholder="Min. 8 karakter" />
                  <Field label="Konfirmasi Password Baru" type="password" value={pw.konfirmasi} onChange={handlePw("konfirmasi")} placeholder="Ulangi password baru" />
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-800 mb-4">
                  Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka.
                </div>

                <button
                  onClick={gantiPassword}
                  disabled={pwStatus === "processing"}
                  className={`px-5 py-2.5 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 shadow-md ${
                    pwStatus === "done" 
                      ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10" 
                      : "bg-[#152340] hover:bg-[#24375a] shadow-[#152340]/10"
                  }`}
                >
                  {pwStatus === "processing" ? "Memproses..." : pwStatus === "done" ? "✓ Password Diperbarui!" : "Ganti Password"}
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Sub-component Field ──────────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, placeholder, readOnly }) {
  return (
    <div className="w-full">
      <label className="block text-[11px] font-bold text-[#8da5d0] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full border border-[#b9c8e5] rounded-xl px-3 py-2 text-sm text-[#152340] bg-[#f0f3fa]/30 placeholder-[#8da5d0] focus:outline-none focus:border-[#152340] focus:ring-4 focus:ring-[#152340]/5 transition-all font-['Plus_Jakarta_Sans',sans-serif]"
      />
    </div>
  );
}