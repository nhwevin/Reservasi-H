import { useState } from "react";
import Sidebar from "../components/sidebar";

// ─── Data awal ───────────────────────────────────────────────────────────────
const INITIAL_NOTIF = [
  {
    id: 1,
    dotColor: "#10b981",
    text: "Reservasi #001 berhasil dikonfirmasi. Kamar Deluxe TA2 siap untuk Anda pada 18 November 2024.",
    time: "2 jam yang lalu",
    dibaca: false,
  },
  {
    id: 2,
    dotColor: "#f59e0b",
    text: "Pengingat: Check-out Anda dijadwalkan besok, 21 November 2024 pukul 12.00 WIB. Harap siapkan barang bawaan Anda.",
    time: "5 jam yang lalu",
    dibaca: false,
  },
  {
    id: 3,
    dotColor: "#3b82f6",
    text: "Promo akhir tahun! Dapatkan diskon 20% untuk reservasi kamar Suite bulan Desember 2024. Berlaku hingga 31 Des.",
    time: "1 hari yang lalu",
    dibaca: false,
  },
  {
    id: 4,
    dotColor: "#8da5d0",
    text: "Reservasi #004 telah dibatalkan sesuai permintaan Anda. Tidak ada biaya pembatalan yang dikenakan.",
    time: "5 hari yang lalu",
    dibaca: true,
  },
];

// ─── Fonts inject (sekali) ────────────────────────────────────────────────────
if (!document.getElementById("ghn-fonts")) {
  const link = document.createElement("link");
  link.id = "ghn-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap";
  document.head.appendChild(link);
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-fade-up  { animation: fadeUp 0.45s ease both; }
  .anim-fade-up2 { animation: fadeUp 0.45s 0.1s ease both; }
  .notif-row { transition: background 0.15s; cursor: pointer; }
  .notif-row:hover { background: rgba(240,243,250,0.7); }
  .tab-btn   { transition: color 0.15s, border-color 0.15s; }
  .btn-navy  { transition: transform 0.15s, box-shadow 0.15s; }
  .btn-navy:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(30,49,85,0.28); }
  .input-field { transition: border-color 0.2s, box-shadow 0.2s; }
  .input-field:focus { outline: none; border-color: #1e3155; box-shadow: 0 0 0 3px rgba(30,49,85,0.12); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #b9c8e5; border-radius: 4px; }
`;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Notifikasi() {
  const [notifList, setNotifList] = useState(INITIAL_NOTIF);
  const [activeTab, setActiveTab] = useState("notifikasi");
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved
  const [pwStatus, setPwStatus]   = useState("idle"); // idle | processing | done

  const unreadCount = notifList.filter((n) => !n.dibaca).length;

  const bacaNotif = (id) =>
    setNotifList((prev) => prev.map((n) => (n.id === id ? { ...n, dibaca: true } : n)));

  const tandaiSemua = () =>
    setNotifList((prev) => prev.map((n) => ({ ...n, dibaca: true })));

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
      setTimeout(() => setPwStatus("idle"), 2500);
    }, 1200);
  };

  const headings = {
    notifikasi: { title: "Notifikasi",  sub: "Pesan dan pembaruan terbaru untuk Anda" },
    profil:     { title: "Profil Saya", sub: "Kelola informasi akun Anda" },
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f0f3fa" }}>

        {/* SIDEBAR */}
        <Sidebar activePage="notifikasi" unreadCount={unreadCount} />

        {/* MAIN */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Topbar */}
          <header style={{ background: "white", borderBottom: "1px solid #dde4f2", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#0d1728", margin: 0 }}>
                {headings[activeTab].title}
              </h1>
              <p style={{ fontSize: 12, color: "#5f7fb8", marginTop: 2 }}>{headings[activeTab].sub}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", border: "1px solid #dde4f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#5f7fb8" }}>
                <BellIcon />
                {unreadCount > 0 && (
                  <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: "#ef4444", borderRadius: "50%", display: "block" }} />
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#dde4f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#1e3155" }}>BS</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#0d1728", lineHeight: 1 }}>Budi Santoso</p>
                  <p style={{ fontSize: 12, color: "#5f7fb8", marginTop: 2 }}>Pelanggan</p>
                </div>
              </div>
            </div>
          </header>

          {/* Tab Switcher */}
          <div style={{ background: "white", borderBottom: "1px solid #dde4f2", padding: "0 28px" }}>
            <div style={{ display: "flex" }}>
              <TabBtn label="Notifikasi" active={activeTab === "notifikasi"} badge={unreadCount > 0 ? unreadCount : null}
                onClick={() => setActiveTab("notifikasi")} />
              <TabBtn label="Profil Saya" active={activeTab === "profil"} onClick={() => setActiveTab("profil")} />
            </div>
          </div>

          {/* Content */}
          <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

            {/* ── TAB NOTIFIKASI ── */}
            {activeTab === "notifikasi" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Aksi atas */}
                <div className="anim-fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: 14, color: "#5f7fb8" }}>
                    <span style={{ fontWeight: 600, color: "#0d1728" }}>{unreadCount}</span> notifikasi belum dibaca
                  </p>
                  <button
                    onClick={tandaiSemua}
                    style={{ fontSize: 14, fontWeight: 600, color: "#2d4a87", border: "1px solid #b9c8e5", borderRadius: 10, padding: "6px 16px", background: "transparent", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f0f3fa"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    Tandai semua dibaca
                  </button>
                </div>

                {/* List */}
                <div className="anim-fade-up2" style={{ background: "white", borderRadius: 16, border: "1px solid #dde4f2", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
                  {notifList.map((n, i) => (
                    <div
                      key={n.id}
                      className="notif-row"
                      onClick={() => bacaNotif(n.id)}
                      style={{
                        display: "flex", gap: 16, padding: "16px 24px",
                        borderBottom: i < notifList.length - 1 ? "1px solid #f0f3fa" : "none",
                        opacity: n.dibaca ? 0.55 : 1,
                        background: i % 2 === 1 ? "rgba(240,243,250,0.3)" : "transparent",
                      }}
                    >
                      {/* Dot kiri */}
                      <div style={{ flexShrink: 0, marginTop: 4 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: n.dotColor, opacity: n.dibaca ? 0.4 : 1 }} />
                      </div>
                      {/* Teks */}
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, color: n.dibaca ? "#8da5d0" : "#0d1728", fontWeight: n.dibaca ? 400 : 500, lineHeight: 1.6, margin: 0 }}>
                          {n.text}
                        </p>
                        <p style={{ fontSize: 12, color: "#8da5d0", marginTop: 6 }}>
                          {n.time}{n.dibaca ? " · Sudah dibaca" : ""}
                        </p>
                      </div>
                      {/* Dot kanan biru (unread) */}
                      {!n.dibaca && (
                        <div style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", marginTop: 8 }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB PROFIL ── */}
            {activeTab === "profil" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>

                {/* Kartu profil */}
                <div className="anim-fade-up" style={{ background: "white", borderRadius: 16, border: "1px solid #dde4f2", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
                  <div style={{ background: "#0d1728", padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#dde4f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#0d1728", marginBottom: 12, border: "4px solid #1e3155" }}>BS</div>
                    <p style={{ fontWeight: 700, color: "white", fontSize: 18, margin: 0 }}>Budi Santoso</p>
                    <p style={{ color: "#8da5d0", fontSize: 14, marginTop: 4 }}>budi.santoso@email.com</p>
                    <span style={{ marginTop: 12, fontSize: 12, fontWeight: 600, background: "rgba(16,185,129,0.2)", color: "#6ee7b7", padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(16,185,129,0.3)" }}>Pelanggan Aktif</span>
                  </div>
                  <div style={{ padding: "20px 20px 0" }}>
                    {[
                      { label: "No. Telepon", value: "+62 812-3456-7890" },
                      { label: "Alamat", value: "Medan, Sumut" },
                      { label: "Bergabung", value: "Januari 2024" },
                      { label: "Total Reservasi", value: "5" },
                    ].map((row, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "8px 0", borderBottom: i < 3 ? "1px solid #f0f3fa" : "none" }}>
                        <span style={{ color: "#8da5d0" }}>{row.label}</span>
                        <span style={{ fontWeight: 600, color: "#0d1728" }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "16px 20px 20px" }}>
                    <a href="riwayat.html" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", border: "1px solid #b9c8e5", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#2d4a87", textDecoration: "none" }}>
                      Lihat Riwayat Saya
                    </a>
                  </div>
                </div>

                {/* Edit profil + ganti password */}
                <div className="anim-fade-up2" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                  {/* Edit Profil */}
                  <div style={{ background: "white", borderRadius: 16, border: "1px solid #dde4f2", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0d1728", marginBottom: 20, marginTop: 0 }}>Edit Informasi Profil</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <Field label="Nama Depan" defaultValue="Budi" />
                      <Field label="Nama Belakang" defaultValue="Santoso" />
                    </div>
                    <Field label="Email" type="email" defaultValue="budi.santoso@email.com" style={{ marginBottom: 16 }} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <Field label="No. Telepon" defaultValue="+62 812-3456-7890" />
                      <Field label="Kota" defaultValue="Medan, Sumut" />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>Alamat Lengkap</label>
                      <textarea rows={2} defaultValue="Jl. Gatot Subroto No. 12, Medan Baru, Medan, Sumatera Utara"
                        className="input-field"
                        style={{ ...inputStyle, resize: "none", width: "100%", boxSizing: "border-box" }} />
                    </div>
                    {saveStatus === "saved" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 12, fontSize: 14, color: "#065f46", marginBottom: 12 }}>
                        <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Perubahan berhasil disimpan!
                      </div>
                    )}
                    <button
                      className="btn-navy"
                      onClick={simpanProfil}
                      disabled={saveStatus === "saving"}
                      style={{ padding: "10px 24px", background: "#0d1728", color: "white", borderRadius: 12, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}
                    >
                      {saveStatus === "saving" ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                  </div>

                  {/* Ganti Password */}
                  <div style={{ background: "white", borderRadius: 16, border: "1px solid #dde4f2", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0d1728", marginBottom: 20, marginTop: 0 }}>Ganti Password</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
                      <Field label="Password Lama" type="password" placeholder="Masukkan password lama" />
                      <Field label="Password Baru" type="password" placeholder="Min. 8 karakter" />
                      <Field label="Konfirmasi Password Baru" type="password" placeholder="Ulangi password baru" />
                    </div>
                    <div style={{ padding: 12, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, fontSize: 12, color: "#92400e", marginBottom: 16 }}>
                      Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka.
                    </div>
                    <button
                      className="btn-navy"
                      onClick={gantiPassword}
                      disabled={pwStatus === "processing"}
                      style={{ padding: "10px 24px", background: pwStatus === "done" ? "#059669" : "#0d1728", color: "white", borderRadius: 12, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", transition: "background 0.3s" }}
                    >
                      {pwStatus === "processing" ? "Memproses..." : pwStatus === "done" ? "✓ Password Diperbarui!" : "Ganti Password"}
                    </button>
                  </div>

                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const labelStyle = { display: "block", fontSize: 11, fontWeight: 600, color: "#8da5d0", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 };
const inputStyle  = { border: "1px solid #b9c8e5", borderRadius: 12, padding: "10px 12px", fontSize: 14, color: "#0d1728", background: "rgba(240,243,250,0.4)" };

function Field({ label, type = "text", defaultValue, placeholder, style }) {
  return (
    <div style={style}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input-field"
        style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }}
      />
    </div>
  );
}

function TabBtn({ label, active, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className="tab-btn"
      style={{
        padding: "14px 20px", fontSize: 14, fontWeight: active ? 600 : 500,
        color: active ? "#0d1728" : "#5f7fb8",
        borderBottom: active ? "2px solid #0d1728" : "2px solid transparent",
        background: "transparent", border: "none", borderBottom: active ? "2px solid #0d1728" : "2px solid transparent",
        cursor: "pointer",
      }}
    >
      {label}
      {badge != null && (
        <span style={{ marginLeft: 6, background: "#ef4444", color: "white", fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "2px 6px" }}>
          {badge}
        </span>
      )}
    </button>
  );
}

function BellIcon() {
  return (
    <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}