import React from 'react';
import { NavLink } from 'react-router-dom'; // Pastikan paket ini terinstall
import { 
  Building2, 
  BedDouble, 
  CalendarCheck, 
  History, 
  BarChart3, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  // Mengatur style dinamis berdasarkan status keaktifan menu
  const navStyle = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
      isActive 
        ? "bg-white/10 text-white font-semibold border-l-4 border-amber-500" 
        : "text-slate-400 hover:text-white hover:bg-white/5 font-medium"
    }`;

  return (
    <aside className="w-60 bg-[#0f172a] flex flex-col flex-shrink-0 shadow-xl z-10">
      {/* Brand/Logo Header */}
      <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-3 bg-[#090d16]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Hotel Graha</p>
          <p className="text-sm font-bold text-white tracking-wide mt-1">Nusantara</p>
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <NavLink to="/dashboard" className={navStyle}>
          {({ isActive }) => (
            <>
              <Building2 size={16} className={isActive ? "text-amber-400" : ""} />
              Dashboard
            </>
          )}
        </NavLink>

        <NavLink to="/reservasi-A" className={navStyle}>
          {({ isActive }) => (
            <>
              <CalendarCheck size={16} className={isActive ? "text-amber-400" : ""} />
              Reservasi
            </>
          )}
        </NavLink>

        <NavLink to="/kamar" className={navStyle}>
          {({ isActive }) => (
            <>
              <BedDouble size={16} className={isActive ? "text-amber-400" : ""} />
              Kamar
            </>
          )}
        </NavLink>

        <NavLink to="/tamu" className={navStyle}>
          {({ isActive }) => (
            <>
              <History size={16} className={isActive ? "text-amber-400" : ""} />
              Tamu
            </>
          )}
        </NavLink>

        <NavLink to="/laporan" className={navStyle}>
          {({ isActive }) => (
            <>
              <BarChart3 size={16} className={isActive ? "text-amber-400" : ""} />
              Laporan
            </>
          )}
        </NavLink>

        <NavLink to="/pengaturan" className={navStyle}>
          {({ isActive }) => (
            <>
              <Settings size={16} className={isActive ? "text-amber-400" : ""} />
              Pengaturan
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;