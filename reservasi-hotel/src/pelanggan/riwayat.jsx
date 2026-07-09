import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  Search, 
  ClipboardX, 
  Plus, 
  CalendarDays, 
  Layers, 
  History, 
  CircleDot 
} from "lucide-react";
import Sidebar from "../components/sidebar";

// ─── Data ─────────────────────────────────────────────────────────────────────
const RIWAYAT_DATA = [
  { id: "#001", kamar: "Kamar Deluxe · TA2",   checkin: "18 Nov 2024", checkout: "21 Nov 2024", total: "Rp 900.000",   status: "aktif"   },
  { id: "#002", kamar: "Kamar Standar · TA1",  checkin: "01 Okt 2024", checkout: "05 Okt 2024", total: "Rp 1.400.000", status: "selesai" },
  { id: "#003", kamar: "Kamar Suite · TA5",    checkin: "12 Agt 2024", checkout: "14 Agt 2024", total: "Rp 2.400.000", status: "selesai" },
  { id: "#004", kamar: "Kamar Standar · TA3",  checkin: "30 Jun 2024", checkout: "02 Jul 2024", total: "Rp 700.000",   status: "batal"   },
  { id: "#005", kamar: "Kamar Deluxe · TA4",   checkin: "10 Mei 2024", checkout: "13 Mei 2024", total: "Rp 1.800.000", status: "selesai" },
];

const STATUS_STYLE = {
  aktif:   "bg-emerald-50 text-emerald-700 border-emerald-100",
  selesai: "bg-blue-50 text-blue-700 border-blue-100",
  batal:   "bg-red-50 text-red-600 border-red-100",
};

const STATUS_LABEL = {
  aktif:   "Aktif",
  selesai: "Selesai",
  batal:   "Dibatalkan",
};

export default function Riwayat() {
  const [filter, setFilter] = useState("semua");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let items = filter === "semua" ? RIWAYAT_DATA : RIWAYAT_DATA.filter(r => r.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(r => r.kamar.toLowerCase().includes(q) || r.id.includes(q));
    }
    return items;
  }, [filter, search]);

  const summary = {
    total:   RIWAYAT_DATA.length,
    aktif:   RIWAYAT_DATA.filter(r => r.status === "aktif").length,
    selesai: RIWAYAT_DATA.filter(r => r.status === "selesai").length,
    batal:   RIWAYAT_DATA.filter(r => r.status === "batal").length,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f3fa] font-['Plus_Jakarta_Sans',sans-serif]">

      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-[#dde4f2] px-7 py-4 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
          <div>
            <h1 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#152340]">
              Riwayat Reservasi
            </h1>
            <p className="text-xs text-[#5f7fb8] mt-0.5">Semua transaksi reservasi Anda</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/notifikasi" className="group relative w-9 h-9 rounded-full border border-[#dde4f2] flex items-center justify-center text-[#3d5fa0] hover:bg-[#f0f3fa] transition-all duration-300">
              <Bell className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </Link>
            
            <Link to="/profil" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-[#dde4f2] flex items-center justify-center text-xs font-bold text-[#1e3155] group-hover:bg-[#3d5fa0] group-hover:text-white transition-all duration-300 shadow-inner">
                BS
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#152340] leading-none group-hover:text-[#3d5fa0] transition-colors duration-200">Budi Santoso</p>
                <p className="text-xs text-[#5f7fb8] mt-0.5">Pelanggan</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-5">

          {/* ── Ringkasan (Cards) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-[fadeUp_0.45s_ease_both]">
            {[
              { label: "Total",       value: summary.total,   color: "text-[#152340]", hoverShadow: "hover:shadow-[0_12px_30px_rgba(30,49,85,0.06)]", icon: History, bgIcon: "bg-[#f0f3fa]", iconColor: "text-[#3d5fa0]" },
              { label: "Aktif",       value: summary.aktif,   color: "text-emerald-500", hoverShadow: "hover:shadow-[0_12px_30px_rgba(16,185,129,0.06)]", icon: CircleDot, bgIcon: "bg-emerald-50", iconColor: "text-emerald-500" },
              { label: "Selesai",     value: summary.selesai, color: "text-blue-500", hoverShadow: "hover:shadow-[0_12px_30px_rgba(61,95,160,0.06)]", icon: CalendarDays, bgIcon: "bg-blue-50", iconColor: "text-blue-500" },
              { label: "Dibatalkan",  value: summary.batal,   color: "text-red-500", hoverShadow: "hover:shadow-[0_12px_30px_rgba(239,68,68,0.06)]", icon: Layers, bgIcon: "bg-red-50", iconColor: "text-red-500" },
            ].map(card => {
              const IconComponent = card.icon;
              return (
                <div key={card.label} className={`group bg-white rounded-2xl p-5 border border-[#dde4f2] shadow-sm transition-all duration-300 hover:-translate-y-1 ${card.hoverShadow}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                    <div className={`w-8 h-8 rounded-lg ${card.bgIcon} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <IconComponent className={`w-4 h-4 ${card.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-[#8da5d0] uppercase tracking-wide">{card.label}</p>
                </div>
              );
            })}
          </div>

          {/* ── Tabel Wadah Utama ── */}
          <div className="bg-white rounded-2xl border border-[#dde4f2] shadow-sm overflow-hidden flex flex-col animate-[fadeUp_0.45s_0.1s_ease_both]">

            {/* Filter + Search */}
            <div className="px-6 py-4 border-b border-[#dde4f2] flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2 flex-wrap">
                {["semua", "aktif", "selesai", "batal"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                      filter === f
                        ? "bg-[#152340] text-white shadow-md shadow-[#152340]/10"
                        : "bg-[#f0f3fa] text-[#2d4a87] hover:bg-[#dde4f2]"
                    }`}
                  >
                    {{ semua: "Semua", aktif: "Aktif", selesai: "Selesai", batal: "Dibatalkan" }[f]}
                  </button>
                ))}
              </div>
              
              {/* Search Input Custom Custom */}
              <div className="relative min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8da5d0]" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Cari reservasi..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-[#b9c8e5] rounded-xl text-[#1e3155] placeholder-[#8da5d0] focus:outline-none focus:border-[#152340] focus:ring-4 focus:ring-[#152340]/5 transition-all duration-200"
                />
              </div>
            </div>

            {/* Konten Table / List */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                
                {/* Table Header */}
                <div className="grid grid-cols-[1fr_3fr_2fr_2fr_2fr_1.5fr] gap-4 px-6 py-3 bg-[#f0f3fa] border-b border-[#dde4f2]">
                  {["ID", "Kamar", "Check-in", "Check-out", "Total", "Status"].map((h, i) => (
                    <div 
                      key={i} 
                      className={`text-[11px] font-bold text-[#8da5d0] uppercase tracking-wider ${
                        i === 5 ? "text-right" : "text-left"
                      }`}
                    >
                      {h}
                    </div>
                  ))}
                </div>

                {/* Rows Area */}
                {filtered.length === 0 ? (
                  <div className="text-center py-14 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#f0f3fa] flex items-center justify-center mb-3 text-[#b9c8e5]">
                      <ClipboardX className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-[#8da5d0]">Tidak ada reservasi ditemukan</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#f0f3fa]">
                    {filtered.map((r) => (
                      <div
                        key={r.id}
                        className="grid grid-cols-[1fr_3fr_2fr_2fr_2fr_1.5fr] gap-4 px-6 py-4 items-center hover:bg-[#f0f3fa]/50 transition-colors duration-150 group"
                      >
                        <div className="text-sm font-mono font-medium text-[#8da5d0]">{r.id}</div>
                        <div className="text-sm font-semibold text-[#152340] group-hover:text-[#3d5fa0] transition-colors">{r.kamar}</div>
                        <div className="text-sm text-[#5f7fb8]">{r.checkin}</div>
                        <div className="text-sm text-[#5f7fb8]">{r.checkout}</div>
                        <div className="text-sm font-semibold text-[#1e3155]">{r.total}</div>
                        <div className="flex justify-end">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 ${STATUS_STYLE[r.status]}`}>
                            {r.status === "aktif" && (
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            )}
                            {STATUS_LABEL[r.status]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-[#dde4f2] flex items-center justify-between bg-white">
              <p className="text-xs font-medium text-[#8da5d0]">
                {filtered.length === 0
                  ? "Tidak ada hasil"
                  : `Menampilkan ${filtered.length} dari ${RIWAYAT_DATA.length} reservasi`}
              </p>
              
              <Link 
                to="/reservasi" 
                className="group text-xs font-bold text-[#2d4a87] hover:text-[#152340] flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 transform group-hover:rotate-90 transition-transform duration-300" />
                Buat Reservasi Baru
              </Link>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}