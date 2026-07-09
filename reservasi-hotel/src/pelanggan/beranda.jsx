import React, { useEffect } from 'react'; // Tambah useEffect
import { Link, useNavigate } from 'react-router-dom'; // Tambah useNavigate
import { 
  Bell, 
  ClipboardList, 
  CheckCircle2, 
  Check, 
  DollarSign, 
  Building2, 
  Sparkles, 
  Star, 
  Plus 
} from 'lucide-react';
import Sidebar from '../components/sidebar'; 

export default function Beranda() {
  const navigate = useNavigate();

  // ==========================================
  // PENGAMANAN HALAMAN (ROUTE GUARD)
  // ==========================================
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    // Jika token tidak ada ATAU role bukan pelanggan, tendang ke halaman login
    if (!token || role !== 'pelanggan') {
      localStorage.clear(); // Bersihkan data session yang tidak valid
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f3fa] font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar / Header */}
        <header className="bg-white border-b border-[#dde4f2] px-7 py-4 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
          <div>
            <h1 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#152340]">Beranda</h1>
            <p className="text-xs text-[#5f7fb8] mt-0.5">Selamat datang kembali, Budi · Senin, 06 April 2026</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Bell with micro-interaction */}
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
        <main className="flex-1 overflow-y-auto px-7 py-6 space-y-5">

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-[fadeUp_0.45s_ease_both]">
            
            {/* Card 1 */}
            <div className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(30,49,85,0.08)] bg-white rounded-2xl p-5 border border-[#dde4f2] shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0f3fa] flex items-center justify-center group-hover:bg-[#3d5fa0] transition-all duration-300">
                  <ClipboardList className="w-5 h-5 text-[#3d5fa0] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <p className="text-xs font-semibold text-[#5f7fb8] uppercase tracking-wide mb-1">Total Reservasi</p>
              <p className="text-3xl font-bold text-[#152340]">5</p>
              <p className="text-xs text-[#b9c8e5] mt-1">Sepanjang waktu</p>
            </div>

            {/* Card 2 */}
            <div className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(16,185,129,0.08)] bg-white rounded-2xl p-5 border border-[#dde4f2] shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <p className="text-xs font-semibold text-[#5f7fb8] uppercase tracking-wide mb-1">Aktif Sekarang</p>
              <p className="text-3xl font-bold text-emerald-500">1</p>
              <p className="text-xs text-[#b9c8e5] mt-1">Check-in hari ini</p>
            </div>

            {/* Card 3 */}
            <div className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(61,95,160,0.08)] bg-white rounded-2xl p-5 border border-[#dde4f2] shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#3d5fa0] transition-all duration-300">
                  <Check className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <p className="text-xs font-semibold text-[#5f7fb8] uppercase tracking-wide mb-1">Sudah Selesai</p>
              <p className="text-3xl font-bold text-[#3d5fa0]">3</p>
              <p className="text-xs text-[#b9c8e5] mt-1">Reservasi selesai</p>
            </div>

            {/* Card 4 */}
            <div className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.08)] bg-white rounded-2xl p-5 border border-[#dde4f2] shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300">
                  <DollarSign className="w-5 h-5 text-amber-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <p className="text-xs font-semibold text-[#5f7fb8] uppercase tracking-wide mb-1">Total Tagihan</p>
              <p className="text-2xl font-bold text-[#152340]">Rp 2,4 Jt</p>
              <p className="text-xs text-[#b9c8e5] mt-1">Semua reservasi</p>
            </div>
          </div>

          {/* Grid Utama */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* Kolom Kiri: Reservasi Aktif & Riwayat */}
            <div className="lg:col-span-3 space-y-5 animate-[fadeUp_0.45s_0.08s_ease_both]">
              
              {/* Reservasi aktif */}
              <div className="bg-white rounded-2xl border border-[#dde4f2] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#dde4f2] flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#152340]">Reservasi Hack</h2>
                  <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                    Aktif
                  </span>
                </div>
                <div className="p-5">
                  <div className="group flex gap-4 items-center bg-[#f0f3fa] rounded-xl p-4 mb-4 hover:bg-[#e4ebf7] transition-colors duration-300">
                    <div className="w-14 h-14 rounded-xl bg-[#dde4f2] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <Building2 className="w-7 h-7 text-[#2d4a87]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#152340]">Kamar Deluxe — TA2</p>
                      <p className="text-sm text-[#5f7fb8] mt-0.5">Check-in: 18 Nov 2024</p>
                      <p className="text-sm text-[#5f7fb8]">Check-out: 21 Nov 2024 <span className="ml-1 text-xs text-[#b9c8e5]">(3 malam)</span></p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#152340]">Rp 900.000</p>
                      <p className="text-xs text-[#b9c8e5] mt-0.5">sudah dibayar</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-[#f0f3fa] rounded-xl hover:shadow-inner transition-all">
                      <p className="text-xs text-[#b9c8e5] mb-1">No. Kamar</p>
                      <p className="font-bold text-[#1e3155] text-sm">TA2</p>
                    </div>
                    <div className="text-center p-3 bg-[#f0f3fa] rounded-xl hover:shadow-inner transition-all">
                      <p className="text-xs text-[#b9c8e5] mb-1">Lantai</p>
                      <p className="font-bold text-[#1e3155] text-sm">2</p>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-xl hover:shadow-inner transition-all">
                      <p className="text-xs text-emerald-500 mb-1">Status</p>
                      <p className="font-bold text-emerald-600 text-sm">Check-in</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Riwayat terakhir */}
              <div className="bg-white rounded-2xl border border-[#dde4f2] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#dde4f2] flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#152340]">Reservasi Terakhir</h2>
                  <Link to="/riwayat" className="text-xs font-semibold text-[#5f7fb8] hover:text-[#1e3155] flex items-center gap-0.5 group transition-colors">
                    Lihat semua 
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                </div>
                <div className="divide-y divide-[#f0f3fa]">
                  {/* Item 1 */}
                  <div className="flex items-center px-6 py-3.5 hover:bg-[#f0f3fa]/50 transition duration-200">
                    <span className="text-xs text-[#b9c8e5] w-10 font-mono">#002</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1e3155]">Kamar Standar · TA1</p>
                      <p className="text-xs text-[#b9c8e5]">01 Okt – 05 Okt 2024</p>
                    </div>
                    <span className="text-sm font-semibold text-[#1e3155] mr-4">Rp 1.400.000</span>
                    <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">Selesai</span>
                  </div>
                  {/* Item 2 */}
                  <div className="flex items-center px-6 py-3.5 hover:bg-[#f0f3fa]/50 transition duration-200">
                    <span className="text-xs text-[#b9c8e5] w-10 font-mono">#003</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1e3155]">Kamar Suite · TA5</p>
                      <p className="text-xs text-[#b9c8e5]">12 Agt – 14 Agt 2024</p>
                    </div>
                    <span className="text-sm font-semibold text-[#1e3155] mr-4">Rp 2.400.000</span>
                    <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">Selesai</span>
                  </div>
                  {/* Item 3 */}
                  <div className="flex items-center px-6 py-3.5 hover:bg-[#f0f3fa]/50 transition duration-200">
                    <span className="text-xs text-[#b9c8e5] w-10 font-mono">#004</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1e3155]">Kamar Standar · TA3</p>
                      <p className="text-xs text-[#b9c8e5]">30 Jun – 02 Jul 2024</p>
                    </div>
                    <span className="text-sm font-semibold text-[#1e3155] mr-4">Rp 700.000</span>
                    <span className="text-xs font-semibold bg-red-50 text-red-600 px-2.5 py-1 rounded-full">Batal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Kamar Tersedia */}
            <div className="lg:col-span-2 animate-[fadeUp_0.45s_0.16s_ease_both]">
              <div className="bg-white rounded-2xl border border-[#dde4f2] shadow-sm overflow-hidden h-full flex flex-col">
                <div className="px-5 py-4 border-b border-[#dde4f2]">
                  <h2 className="text-base font-bold text-[#152340]">Kamar Tersedia</h2>
                  <p className="text-xs text-[#5f7fb8] mt-0.5">Pilih dan pesan sekarang</p>
                </div>
                
                <div className="divide-y divide-[#f0f3fa] flex-1">
                  
                  {/* Kamar 1 */}
                  <div className="flex items-center gap-3 px-5 py-4 hover:bg-[#f0f3fa]/40 transition-all duration-200 cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-[#dde4f2] group-hover:bg-[#152340] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <Building2 className="w-5 h-5 text-[#2d4a87] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#152340] group-hover:text-[#3d5fa0] transition-colors">Standar</p>
                      <p className="text-xs text-[#5f7fb8]">1 bed · 24m² · AC · WiFi</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1e3155]">Rp 350rb</p>
                      <p className="text-xs text-[#5f7fb8]">/malam</p>
                    </div>
                  </div>

                  {/* Kamar 2 (Terpopuler) */}
                  <div className="flex items-center gap-3 px-5 py-4 bg-[#f0f3fa]/40 hover:bg-[#dde4f2]/60 transition-all duration-200 cursor-pointer group relative overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-[#b9c8e5] group-hover:bg-[#152340] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <Sparkles className="w-5 h-5 text-[#1e3155] group-hover:text-white transition-colors duration-300 animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#152340] group-hover:text-[#3d5fa0] transition-colors">Deluxe</p>
                      <p className="text-xs text-[#5f7fb8]">King bed · 36m² · AC · TV</p>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded mt-1 inline-flex items-center gap-0.5 border border-amber-200/50">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Terpopuler
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1e3155]">Rp 600rb</p>
                      <p className="text-xs text-[#5f7fb8]">/malam</p>
                    </div>
                  </div>

                  {/* Kamar 3 */}
                  <div className="flex items-center gap-3 px-5 py-4 hover:bg-[#f0f3fa]/40 transition-all duration-200 cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-[#dde4f2] group-hover:bg-[#152340] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <Star className="w-5 h-5 text-[#2d4a87] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#152340] group-hover:text-[#3d5fa0] transition-colors">Suite</p>
                      <p className="text-xs text-[#5f7fb8]">2 bed · 60m² · Full amenities</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1e3155]">Rp 1,2 Jt</p>
                      <p className="text-xs text-[#5f7fb8]">/malam</p>
                    </div>
                  </div>

                </div>

                {/* Button Action */}
                <div className="p-4 border-t border-[#f0f3fa]">
                  <Link to="/reservasi" className="group w-full py-3 bg-[#152340] hover:bg-[#1e3155] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(21,35,64,0.25)] active:translate-y-0">
                    <Plus className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-300" />
                    Buat Reservasi Baru
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}