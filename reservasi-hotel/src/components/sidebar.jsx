import React from "react";
import { Link, useLocation } from "react-router-dom";
// Menggunakan Lucide React untuk ikon premium
import { 
  LayoutGrid, 
  CalendarDays, 
  ClipboardList, 
  Bell, 
  User, 
  LogOut 
} from "lucide-react";

// Mapping route path → activePage key
const ROUTE_MAP = {
  "/":           "beranda",
  "/beranda":    "beranda",
  "/reservasi":  "reservasi",
  "/riwayat":    "riwayat",
  "/notifikasi": "notifikasi",
  "/profil":     "profil",
};

export default function Sidebar({ unreadCount = 0 }) {
  const location = useLocation();
  const activePage = ROUTE_MAP[location.pathname] ?? "";

  return (
    <aside
      style={{ width: "224px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="bg-white border-r border-gray-100 flex flex-col shadow-sm h-screen"
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className="rounded-xl flex items-center justify-center shadow-inner group"
            style={{ width: 36, height: 36, background: "#0d1728" }}
          >
            {/* Efek Denyut Halus Pada Ikon Logo Utama */}
            <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold leading-tight" style={{ color: "#0d1728" }}>Hotel Graha</p>
            <p className="text-xs font-bold leading-tight" style={{ color: "#0d1728" }}>Nusantara</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full flex items-center justify-center text-xs font-bold shadow-sm"
            style={{ width: 36, height: 36, background: "#dde4f2", color: "#1e3155" }}
          >
            BS
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate" style={{ color: "#0d1728" }}>Budi Santoso</p>
            <p className="text-xs truncate" style={{ color: "#5f7fb8" }}>Pelanggan</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">

        <SidebarItem 
          to="/beranda" 
          active={activePage === "beranda"} 
          icon={<LayoutGrid size={16} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />}
        >
          Beranda
        </SidebarItem>

        <SidebarItem 
          to="/reservasi" 
          active={activePage === "reservasi"} 
          icon={<CalendarDays size={16} className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />}
        >
          Reservasi
        </SidebarItem>

        <SidebarItem 
          to="/riwayat" 
          active={activePage === "riwayat"} 
          icon={<ClipboardList size={16} className="transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-0.5" />}
        >
          Riwayat
        </SidebarItem>

        <SidebarItem 
          to="/notifikasi" 
          active={activePage === "notifikasi"} 
          badge={unreadCount > 0 ? unreadCount : null} 
          icon={<Bell size={16} className={`transition-transform duration-300 group-hover:scale-110 ${unreadCount > 0 ? 'animate-[wiggle_1s_ease-in-out_infinite]' : 'group-hover:rotate-12'}`} />}
        >
          Notifikasi
        </SidebarItem>

        <SidebarItem 
          to="/profil" 
          active={activePage === "profil"} 
          icon={<User size={16} className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />}
        >
          Profil Saya
        </SidebarItem>

        {/* Keluar */}
        <div className="border-t border-gray-100 pt-2 mt-2">
          <Link
            to="/login"
            className="group"
            style={{ 
              color: "#f87171", display: "flex", alignItems: "center", gap: 12,
              padding: "10px 12px", borderRadius: 8, fontSize: 14, fontWeight: 500,
              textDecoration: "none", transition: "all 0.18s ease" 
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(254,226,226,0.5)"; e.currentTarget.style.color = "#dc2626"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f87171"; }}
          >
            <LogOut size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            Keluar
          </Link>
        </div>
      </nav>
    </aside>
  );
}

// ─── SidebarItem menggunakan React Router <Link> ─────────────────────────────
function SidebarItem({ to, active, icon, children, badge }) {
  const baseStyle = {
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 12px", borderRadius: 8, fontSize: 14,
    textDecoration: "none", transition: "all 0.18s ease",
    fontWeight: active ? 600 : 500,
    color: active ? "#1e3155" : "#5f7fb8",
    background: active ? "rgba(30,49,85,0.12)" : "transparent",
    borderLeft: active ? "3px solid #1e3155" : "3px solid transparent",
  };

  return (
    <Link
      to={to}
      style={baseStyle}
      className="group" // Menambahkan class group agar ikon di dalamnya bisa mendeteksi hover
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = "rgba(30,49,85,0.07)";
          e.currentTarget.style.color = "#1e3155";
          e.currentTarget.style.transform = "translateX(2px)";
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#5f7fb8";
          e.currentTarget.style.transform = "translateX(0)";
        }
      }}
    >
      {icon}
      <span style={{ flex: 1 }}>{children}</span>
      {badge != null && (
        <span 
          className="animate-pulse" // Menambahkan efek berkedip halus pada badge notifikasi
          style={{
            background: "#ef4444", color: "white", fontSize: 11,
            fontWeight: 700, borderRadius: 20, minWidth: 16, height: 16,
            padding: "0 4px", display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}