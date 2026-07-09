import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  LogOut, 
  TrendingUp, 
  DollarSign, 
  BedDouble, 
  Calendar, 
  Clock,
  ChevronRight
} from 'lucide-react';
// Import komponen Sidebar yang sudah dibuat sebelumnya
import Sidebar from '../components/admin/sidebar'; // Sesuaikan kembali path foldernya

const Laporan = () => {
  // State filter dropdown bulan laporan
  const [selectedMonth, setSelectedMonth] = useState('November 2024');

  // Data Mock untuk Grafik Pendapatan Bulanan (Bar Chart)
  const weeklyRevenue = [
    { label: 'Mgg 1', value: '8,2 Jt', percentage: '55%' },
    { label: 'Mgg 2', value: '12,4 Jt', percentage: '78%' },
    { label: 'Mgg 3', value: '15,8 Jt', percentage: '100%' },
    { label: 'Mgg 4', value: '12,3 Jt', percentage: '77%' },
  ];

  // Data Mock untuk Distribusi Tipe Kamar (Donut Chart)
  const roomDistribution = [
    { type: 'Standar', count: 17, ratio: '35%', color: 'stroke-slate-800', bgColor: 'bg-slate-800' },
    { type: 'Deluxe', count: 19, ratio: '40%', color: 'stroke-amber-500', bgColor: 'bg-amber-500' },
    { type: 'Suite', count: 12, ratio: '25%', color: 'stroke-orange-400', bgColor: 'bg-orange-400' },
  ];

  // Data Mock untuk Top 3 Kamar Terlaris
  const topRooms = [
    { rank: 1, name: 'Deluxe TA2', count: 12, rankColor: 'bg-amber-100 text-amber-700' },
    { rank: 2, name: 'Suite TA5', count: 9, rankColor: 'bg-slate-100 text-slate-700' },
    { rank: 3, name: 'Standar TA1', count: 8, rankColor: 'bg-slate-100 text-slate-700' },
  ];

  // Data Mock untuk Tabel Distribusi Kontribusi Finansial
  const reportTableData = [
    { type: 'Standar', qty: 17, nights: 42, avgPrice: 'Rp 350.000', total: 'Rp 14.700.000', share: '30%', progressColor: 'bg-slate-400' },
    { type: 'Deluxe', qty: 19, nights: 51, avgPrice: 'Rp 600.000', total: 'Rp 30.600.000', share: '63%', progressColor: 'bg-amber-500' },
    { type: 'Suite', qty: 12, nights: 3, avgPrice: 'Rp 1.200.000', total: 'Rp 3.600.000', share: '7%', progressColor: 'bg-orange-400' },
  ];

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* SIDEBAR COMPONENT */}
      <Sidebar />

      {/* AREA UTAMA / HUB KONTEN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER - Brand Premium Hotel Graha Nusantara */}
        <header className="bg-white border-b border-amber-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight flex items-center gap-2">
              Laporan & Statistik
            </h2>
            <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
              Graha Nusantara v1.0 • Rekapitulasi Finansial & Okupansi
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Filter Dropdown */}
            <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm flex items-center">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="text-xs text-slate-700 font-bold bg-transparent focus:outline-none cursor-pointer"
              >
                <option>November 2024</option>
                <option>Oktober 2024</option>
                <option>September 2024</option>
              </select>
            </div>

            {/* Tombol Export Utama */}
            <button className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:opacity-95 transition-all shadow-sm">
              <Download size={14} />
              Export PDF
            </button>

            {/* Profil Admin */}
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-full border border-slate-200/80 pr-3 pl-1 ml-1">
              <div className="w-7 h-7 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-white text-[10px]">
                AD
              </div>
              <span className="text-xs font-bold text-slate-600">Admin 1</span>
            </div>

            <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all" title="Keluar">
              <LogOut size={14} />
            </button>
          </div>
        </header>

        {/* CONTAINER UTAMA LAPORAN */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6 animate-in fade-in duration-500">

          {/* BARIS KARTU KPI STATISTIK */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI Pendapatan */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pendapatan</p>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                  <DollarSign size={16} />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">Rp 48,7 Jt</p>
              <p className="text-[11px] text-emerald-500 font-bold mt-1 flex items-center gap-0.5">
                <TrendingUp size={12} /> ↑ 18% vs bulan lalu
              </p>
            </div>

            {/* KPI Tingkat Hunian */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tingkat Hunian</p>
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100">
                  <BedDouble size={16} />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">74%</p>
              <p className="text-[11px] text-emerald-500 font-bold mt-1 flex items-center gap-0.5">
                <TrendingUp size={12} /> ↑ 6% vs bulan lalu
              </p>
            </div>

            {/* KPI Total Reservasi */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reservasi</p>
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/60">
                  <Calendar size={16} />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">48</p>
              <p className="text-[11px] text-emerald-500 font-bold mt-1 flex items-center gap-0.5">
                <TrendingUp size={12} /> ↑ 12% vs bulan lalu
              </p>
            </div>

            {/* KPI Rata-rata Menginap */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rata-rata Menginap</p>
                <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-200/60">
                  <Clock size={16} />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">2,8</p>
              <p className="text-[11px] text-slate-400 font-semibold mt-1">malam per reservasi</p>
            </div>
          </div>

          {/* BARIS VISUALISASI DATA (CHARTS ROW) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* BAGIAN KIRI: Grafik Batang Pendapatan Bulanan */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Pendapatan Bulanan</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{selectedMonth}</p>
                </div>
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                  <button className="text-[10px] px-3 py-1 bg-white shadow-xs text-slate-800 font-bold rounded-lg">Per Minggu</button>
                  <button className="text-[10px] px-3 py-1 text-slate-500 font-medium rounded-lg hover:text-slate-800 transition">Per Bulan</button>
                </div>
              </div>

              {/* Batang Histogram Kreatif Terintegrasi */}
              <div className="flex items-end justify-between gap-4 h-48 px-2 pt-4">
                {weeklyRevenue.map((rev, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
                    <span className="text-[11px] text-slate-700 font-bold bg-slate-50 border border-slate-200/60 px-1.5 py-0.5 rounded-md opacity-90 group-hover:bg-amber-50 group-hover:border-amber-200 transition-all">
                      {rev.value}
                    </span>
                    <div className="w-full relative rounded-t-xl overflow-hidden bg-slate-100 h-44 flex items-end">
                      <div 
                        className={`w-full rounded-t-xl transition-all duration-700 ${
                          index === 2 
                            ? 'bg-gradient-to-t from-orange-500 to-amber-500' 
                            : 'bg-gradient-to-t from-slate-700 to-slate-800'
                        }`} 
                        style={{ height: rev.percentage }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-400 font-bold tracking-tight">{rev.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BAGIAN KANAN: Visual Donut Tipe Kamar & Kamar Terlaris */}
            <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
              
              {/* Box 1: Visual Donut Sederhana */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 flex flex-col justify-center flex-1">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">Distribusi Tipe Kamar</h3>
                
                <div className="flex items-center gap-5">
                  {/* Lingkaran Donut SVG Dinamis */}
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="4"/>
                      <circle cx="18" cy="18" r="14" fill="none" strokeWidth="4" className="stroke-slate-800" strokeDasharray="35 65" strokeDashoffset="0"/>
                      <circle cx="18" cy="18" r="14" fill="none" strokeWidth="4" className="stroke-amber-500" strokeDasharray="40 60" strokeDashoffset="-35"/>
                      <circle cx="18" cy="18" r="14" fill="none" strokeWidth="4" className="stroke-orange-400" strokeDasharray="25 75" strokeDashoffset="-75"/>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-black text-slate-800">48</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Kamar</span>
                    </div>
                  </div>

                  {/* Legenda/Keterangan Donut */}
                  <div className="flex-1 space-y-2">
                    {roomDistribution.map((room, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-50 pb-1 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-sm ${room.bgColor} flex-shrink-0`}></span>
                          <span className="text-slate-500 font-medium">{room.type}</span>
                        </div>
                        <span className="font-bold text-slate-800">{room.count} <span className="text-slate-400 text-[10px]">({room.ratio})</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Box 2: Rangking Kamar Terlaris */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 flex flex-col justify-center flex-1">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">Top 3 Kamar Terlaris</h3>
                <div className="space-y-2">
                  {topRooms.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-slate-50/50 p-2 rounded-xl border border-slate-100 hover:border-amber-200 transition-all">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-lg text-[10px] font-extrabold flex items-center justify-center shadow-xs ${item.rankColor}`}>
                          {item.rank}
                        </span>
                        <span className="font-bold text-slate-800">{item.name}</span>
                      </div>
                      <span className="text-slate-500 text-[11px] font-semibold flex items-center gap-1">
                        {item.count} reservasi <ChevronRight size={12} className="text-slate-300" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* TABEL DETAIL: LAPORAN PENDAPATAN PER KATEGORI KAMAR */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Laporan Pendapatan Per Tipe</h3>
              <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 border border-slate-200 bg-white px-3 py-2 rounded-xl hover:bg-slate-50 transition-all shadow-xs">
                <FileText size={14} className="text-emerald-500" />
                Export Excel
              </button>
            </div>

            {/* Area Grid Konten Tabel */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                
                {/* Header Grid */}
                <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <div className="col-span-3">Tipe Kamar</div>
                  <div className="col-span-1.5 text-center">Jml Reservasi</div>
                  <div className="col-span-2 text-center">Total Durasi</div>
                  <div className="col-span-2 text-right">Rata-rata/Malam</div>
                  <div className="col-span-2 text-right">Total Pendapatan</div>
                  <div className="col-span-1.5 text-right pr-2">% Kontribusi</div>
                </div>

                {/* Body Baris Data */}
                <div className="divide-y divide-slate-100 text-xs text-slate-700">
                  {reportTableData.map((row, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 px-6 py-4 items-center hover:bg-slate-50/50 transition">
                      <div className="col-span-3 font-bold text-slate-800 text-sm tracking-tight">{row.type}</div>
                      <div className="col-span-1.5 text-center text-slate-600 font-semibold">{row.qty}</div>
                      <div className="col-span-2 text-center text-slate-600 font-medium">{row.nights} malam</div>
                      <div className="col-span-2 text-right text-slate-500 font-mono">{row.avgPrice}</div>
                      <div className="col-span-2 text-right font-bold text-slate-800 font-mono">{row.total}</div>
                      <div className="col-span-1.5 flex items-center justify-end gap-2 pr-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block border border-slate-200/40">
                          <div className={`h-full rounded-full ${row.progressColor}`} style={{ width: row.share }}></div>
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 w-8 text-right">{row.share}</span>
                      </div>
                    </div>
                  ))}

                  {/* Baris Total Akumulatif Finansial */}
                  <div className="grid grid-cols-12 gap-2 px-6 py-4 items-center bg-amber-50/30 font-bold border-t border-slate-200 text-slate-800">
                    <div className="col-span-3 text-sm font-extrabold uppercase tracking-wide">Total Keseluruhan</div>
                    <div className="col-span-1.5 text-center text-sm font-extrabold">48</div>
                    <div className="col-span-2 text-center font-bold">96 malam</div>
                    <div className="col-span-2 text-right text-slate-400">—</div>
                    <div className="col-span-2 text-right font-black text-amber-600 text-sm font-mono bg-amber-100/60 px-2 py-1 rounded-lg border border-amber-200 inline-block ml-auto">
                      Rp 48.900.000
                    </div>
                    <div className="col-span-1.5 text-right font-extrabold pr-2 text-slate-800">100%</div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
};

export default Laporan;