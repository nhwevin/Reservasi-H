import React, { useState } from 'react';
import { 
  BedDouble, 
  Search, 
  Plus, 
  LogOut, 
  Grid, 
  List, 
  Layout, 
  SlidersHorizontal,
  X,
  Pencil,
  Eye,
  CheckCircle2,
  AlertTriangle,
  DoorOpen
} from 'lucide-react';
// Import komponen Sidebar yang sudah dibuat sebelumnya
import Sidebar from '../components/admin/sidebar'; // Sesuaikan kembali path foldernya

const Kamar = () => {
  // State Manajemen Data Utama Kamar
  const [kamarData, setKamarData] = useState([
    { no: 'TA1', tipe: 'Standar', lantai: 1, luas: '24m²', harga: 'Rp 350.000', status: 'terisi', fasilitas: ['AC', 'WiFi'], tamu: 'Ahmad F.' },
    { no: 'TA2', tipe: 'Deluxe', lantai: 2, luas: '36m²', harga: 'Rp 600.000', status: 'terisi', fasilitas: ['AC', 'WiFi', 'TV'], tamu: 'Siti R.' },
    { no: 'TA3', tipe: 'Standar', lantai: 1, luas: '24m²', harga: 'Rp 350.000', status: 'tersedia', fasilitas: ['AC', 'WiFi'], tamu: null },
    { no: 'TA4', tipe: 'Deluxe', lantai: 2, luas: '36m²', harga: 'Rp 600.000', status: 'tersedia', fasilitas: ['AC', 'WiFi', 'TV'], tamu: null },
    { no: 'TA5', tipe: 'Suite', lantai: 3, luas: '60m²', harga: 'Rp 1.200.000', status: 'terisi', fasilitas: ['AC', 'WiFi', 'TV', 'Bathtub', 'Mini Bar'], tamu: 'Budi S.' },
    { no: 'TA6', tipe: 'Standar', lantai: 1, luas: '24m²', harga: 'Rp 350.000', status: 'maintenance', fasilitas: ['AC', 'WiFi'], tamu: null },
    { no: 'TA7', tipe: 'Deluxe', lantai: 2, luas: '36m²', harga: 'Rp 600.000', status: 'tersedia', fasilitas: ['AC', 'WiFi', 'TV', 'Balkon'], tamu: null },
    { no: 'TA8', tipe: 'Standar', lantai: 1, luas: '24m²', harga: 'Rp 350.000', status: 'tersedia', fasilitas: ['AC', 'WiFi'], tamu: null },
    { no: 'TA9', tipe: 'Suite', lantai: 3, luas: '60m²', harga: 'Rp 1.200.000', status: 'terisi', fasilitas: ['AC', 'WiFi', 'TV', 'Bathtub', 'Mini Bar', 'Balkon'], tamu: 'Hani P.' },
    { no: 'TA10', tipe: 'Deluxe', lantai: 2, luas: '36m²', harga: 'Rp 600.000', status: 'tersedia', fasilitas: ['AC', 'WiFi', 'TV'], tamu: null },
    { no: 'TA11', tipe: 'Standar', lantai: 1, luas: '24m²', harga: 'Rp 350.000', status: 'tersedia', fasilitas: ['AC', 'WiFi'], tamu: null },
    { no: 'TA12', tipe: 'Suite', lantai: 3, luas: '60m²', harga: 'Rp 1.200.000', status: 'tersedia', fasilitas: ['AC', 'WiFi', 'TV', 'Bathtub', 'Mini Bar', 'Balkon'], tamu: null },
    { no: 'TA13', tipe: 'Standar', lantai: 1, luas: '24m²', harga: 'Rp 350.000', status: 'terisi', fasilitas: ['AC', 'WiFi'], tamu: 'Dewi L.' },
    { no: 'TA14', tipe: 'Deluxe', lantai: 2, luas: '36m²', harga: 'Rp 600.000', status: 'maintenance', fasilitas: ['AC', 'WiFi', 'TV'], tamu: null },
  ]);

  // State Manajemen UI / Filter / Modals
  const [viewMode, setViewMode] = useState('grid'); // 'grid' atau 'list'
  const [tipeFilter, setTipeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Kalkulasi Statistik Real-time
  const totalKamar = kamarData.length;
  const tersediaKamar = kamarData.filter(k => k.status === 'tersedia').length;
  const terisiKamar = kamarData.filter(k => k.status === 'terisi').length;
  const maintenanceKamar = kamarData.filter(k => k.status === 'maintenance').length;

  // Logika Pemfilteran Data Kamar
  const filteredKamar = kamarData.filter(k => {
    const matchesTipe = !tipeFilter || k.tipe === tipeFilter;
    const matchesStatus = !statusFilter || k.status === statusFilter;
    const matchesSearch = k.no.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (k.tamu && k.tamu.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTipe && matchesStatus && matchesSearch;
  });

  // Pemetaan Gaya Desain Berdasarkan Status Kamar (Tema Amber-Orange Premium)
  const statusStyles = {
    tersedia: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'Tersedia' },
    terisi: { bg: 'bg-blue-50 text-blue-700 border-blue-200', text: 'Terisi' },
    maintenance: { bg: 'bg-rose-50 text-rose-700 border-rose-200', text: 'Maintenance' }
  };

  const tipeStyles = {
    Standar: 'bg-slate-100 text-slate-700 border-slate-200',
    Deluxe: 'bg-amber-50 text-amber-700 border-amber-200',
    Suite: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-transparent'
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER MANAGEMENT - Selaras Dengan Tema Utama */}
        <header className="bg-white border-b border-amber-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              Manajemen Kamar
            </h2>
            <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
              Graha Nusantara v1.0 • Status Real-Time Kamar
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 p-1.5 pr-4 rounded-full border border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-sm">
                AD
              </div>
              <span className="text-xs font-bold text-slate-700">Admin 1</span>
            </div>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all" title="Log Out">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* MAIN KONTEN */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6 animate-in fade-in duration-500">
          
          {/* BARIS SUMMARY STATS BADGES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-50 text-slate-600"><Layout size={20} /></div>
              <div>
                <p className="text-xl font-bold text-slate-800 leading-tight">{totalKamar}</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Kamar</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600"><CheckCircle2 size={20} /></div>
              <div>
                <p className="text-xl font-bold text-emerald-600 leading-tight">{tersediaKamar}</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tersedia</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600"><DoorOpen size={20} /></div>
              <div>
                <p className="text-xl font-bold text-blue-600 leading-tight">{terisiKamar}</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Terisi</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-rose-50 text-rose-600"><AlertTriangle size={20} /></div>
              <div>
                <p className="text-xl font-bold text-rose-600 leading-tight">{maintenanceKamar}</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Maintenance</p>
              </div>
            </div>
          </div>

          {/* BARIS FILTER & PANEL KONTROL */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Input Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari nomor kamar atau nama tamu..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
              />
            </div>

            {/* Dropdown Tipe */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
              <select 
                value={tipeFilter}
                onChange={(e) => setTipeFilter(e.target.value)}
                className="text-xs text-slate-700 font-bold bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="">Semua Tipe</option>
                <option value="Standar">Standar</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>

            {/* Dropdown Status */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs text-slate-700 font-bold bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="">Semua Status</option>
                <option value="tersedia">Tersedia</option>
                <option value="terisi">Terisi</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* View Mode Toggle Switch */}
            <div className="flex bg-slate-100 border border-slate-200 rounded-full p-1 shadow-inner items-center gap-0.5">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                title="Grid View"
              >
                <Grid size={15} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                title="List View"
              >
                <List size={15} />
              </button>
            </div>
            
            {/* Tombol Tambah Kamar */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full px-5 py-2 text-xs font-bold hover:opacity-90 transition shadow-sm flex items-center gap-1 ml-auto"
            >
              <Plus size={14} /> Tambah Kamar
            </button>
          </div>

          {/* RENDERING DATA KAMAR (GRID VS LIST) */}
          {viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredKamar.map((k) => (
                <div key={k.no} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  {/* Card Banner Background */}
                  <div className="h-20 relative flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
                    <BedDouble className="w-8 h-8 text-white/10 absolute left-4 bottom-2" />
                    <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[k.status].bg}`}>
                      {statusStyles[k.status].text}
                    </span>
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${tipeStyles[k.tipe]}`}>
                      {k.tipe}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-extrabold text-slate-800 text-lg tracking-tight">Kamar {k.no}</h3>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Lantai {k.lantai}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 font-medium mb-3">
                      Luas: {k.luas} &bull; {k.fasilitas.join(', ')}
                    </p>

                    <div className="mb-4 mt-auto">
                      <p className="text-xs text-slate-400 font-medium">Harga per malam:</p>
                      <p className="text-base font-black text-slate-700">{k.harga}</p>
                    </div>

                    {/* Jika Kamar Terisi Tamu */}
                    {k.tamu && (
                      <div className="flex items-center gap-2 text-[11px] font-bold text-blue-700 bg-blue-50/70 border border-blue-100 px-3 py-1.5 rounded-xl mb-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span>Tamu: {k.tamu}</span>
                      </div>
                    )}

                    {/* Action Cards Buttons */}
                    <div className="flex gap-2 border-t border-slate-100 pt-3">
                      <button className="flex-1 py-1.5 text-[11px] font-bold border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition flex items-center justify-center gap-1">
                        <Pencil size={11} /> Edit
                      </button>
                      <button className="flex-1 py-1.5 text-[11px] font-bold border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition flex items-center justify-center gap-1">
                        <Eye size={11} /> Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* LIST VIEW (TABEL) */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wide border-b border-slate-200">
                      <th className="text-left px-6 py-4">No. Kamar</th>
                      <th className="text-left px-4 py-4">Tipe</th>
                      <th className="text-left px-4 py-4">Lantai</th>
                      <th className="text-left px-4 py-4">Luas</th>
                      <th className="text-left px-4 py-4">Fasilitas</th>
                      <th className="text-left px-4 py-4">Harga / Malam</th>
                      <th className="text-left px-4 py-4">Status</th>
                      <th className="text-center px-6 py-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredKamar.map((k) => (
                      <tr key={k.no} className="hover:bg-amber-50/20 transition">
                        <td className="px-6 py-4 font-bold text-slate-800 text-sm">{k.no}</td>
                        <td className="px-4 py-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${tipeStyles[k.tipe]}`}>
                            {k.tipe}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-600 font-medium">Lantai {k.lantai}</td>
                        <td className="px-4 py-4 text-slate-600 font-medium">{k.luas}</td>
                        <td className="px-4 py-4 text-slate-400 font-medium">{k.fasilitas.join(' · ')}</td>
                        <td className="px-4 py-4 font-bold text-slate-700">{k.harga}</td>
                        <td className="px-4 py-4">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[k.status].bg}`}>
                            {statusStyles[k.status].text}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center flex justify-center gap-2">
                          <button className="p-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all" title="Edit Data">
                            <Pencil size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DATA KOSONG HANDLER */}
          {filteredKamar.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 font-medium">
              Data kamar tidak ditemukan dengan pencarian tersebut.
            </div>
          )}

        </main>
      </div>

      {/* POP-UP MODAL: FORM TAMBAH KAMAR */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md mx-4 overflow-hidden border border-amber-100 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <BedDouble size={16} className="text-orange-500" />
                Tambah Kamar Baru
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-rose-600 transition shadow-sm"
              >
                <X size={14} />
              </button>
            </div>
            
            {/* Modal Body Forms */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">No. Kamar</label>
                  <input type="text" placeholder="TA10" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Lantai</label>
                  <input type="number" placeholder="1" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tipe Kamar</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all cursor-pointer">
                  <option>Standar</option>
                  <option>Deluxe</option>
                  <option>Suite</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Harga per Malam</label>
                <input type="text" placeholder="Rp 350.000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Fasilitas</label>
                <div className="grid grid-cols-3 gap-3">
                  {['AC', 'WiFi', 'TV', 'Bathtub', 'Mini Bar', 'Balkon'].map((fas) => (
                    <label key={fas} className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                      <input type="checkbox" className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-3.5 h-3.5 accent-amber-500" />
                      {fas}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Status Awal</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all cursor-pointer">
                  <option>Tersedia</option>
                  <option>Maintenance</option>
                </select>
              </div>
            </div>

            {/* Modal Footer Buttons */}
            <div className="px-6 py-4 border-t border-slate-100 flex gap-2 justify-end bg-slate-50/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-100 transition"
              >
                Batal
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full px-5 py-2 text-xs font-bold hover:opacity-90 transition shadow-md"
              >
                Simpan Kamar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Kamar;