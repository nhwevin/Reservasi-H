import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Plus, 
  LogOut, 
  UserPlus, 
  TrendingUp, 
  Award, 
  Users, 
  X, 
  Pencil, 
  ChevronLeft, 
  ChevronRight,
  MapPin
} from 'lucide-react';
// Import komponen Sidebar yang sudah dibuat sebelumnya
import Sidebar from '../components/admin/sidebar'; // Sesuaikan kembali path foldernya

const Tamu = () => {
  // State Utama Data Tamu
  const [tamuData, setTamuData] = useState([
    { id: '#T001', nama: 'Ahmad Fauzi', ktp: '3271xxxxxxxxxxxx', telp: '+62 812-1111-2222', email: 'ahmad@email.com', reservasi: 5, status: 'aktif', kota: 'Jakarta' },
    { id: '#T002', nama: 'Siti Rahayu', ktp: '3271xxxxxxxxxxxx', telp: '+62 813-2222-3333', email: 'siti@email.com', reservasi: 3, status: 'aktif', kota: 'Bandung' },
    { id: '#T003', nama: 'Budi Santoso', ktp: '3171xxxxxxxxxxxx', telp: '+62 812-3456-7890', email: 'budi@email.com', reservasi: 8, status: 'vip', kota: 'Medan' },
    { id: '#T004', nama: 'Dewi Lestari', ktp: '3271xxxxxxxxxxxx', telp: '+62 811-4444-5555', email: 'dewi@email.com', reservasi: 2, status: 'baru', kota: 'Surabaya' },
    { id: '#T005', nama: 'Eko Prasetyo', ktp: '3374xxxxxxxxxxxx', telp: '+62 821-5555-6666', email: 'eko@email.com', reservasi: 7, status: 'vip', kota: 'Semarang' },
    { id: '#T006', nama: 'Fitri Handayani', ktp: '3578xxxxxxxxxxxx', telp: '+62 822-6666-7777', email: 'fitri@email.com', reservasi: 1, status: 'baru', kota: 'Yogyakarta' },
    { id: '#T007', nama: 'Gunawan Wibowo', ktp: '3173xxxxxxxxxxxx', telp: '+62 815-7777-8888', email: 'gunawan@email.com', reservasi: 4, status: '', kota: 'Bekasi' },
    { id: '#T008', nama: 'Hani Putri', ktp: '3272xxxxxxxxxxxx', telp: '+62 819-8888-9999', email: 'hani@email.com', reservasi: 11, status: 'vip', kota: 'Depok' },
  ]);

  // State Kontrol UI / Pencarian / Modals
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Kalkulasi Badge Statistik Secara Dinamis
  const totalTamu = 124; // Contoh data agregat sesuai template HTML Anda
  const checkInHariIni = tamuData.filter(t => t.status === 'aktif').length;
  const tamuVipCount = tamuData.filter(t => t.status === 'vip').length;
  const tamuBaruCount = tamuData.filter(t => t.status === 'baru').length;

  // Logika Filter Data Real-time
  const filteredTamu = tamuData.filter(t => {
    const matchesStatus = !statusFilter || t.status === statusFilter;
    const matchesSearch = t.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.ktp.includes(searchQuery) || 
                          t.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pemetaan Gaya Desain Tag Status (Konsisten dengan Kamar & Reservasi)
  const statusStyles = {
    aktif: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    vip: 'bg-amber-50 text-amber-700 border-amber-100',
    baru: 'bg-blue-50 text-blue-700 border-blue-100',
    default: 'bg-slate-50 text-slate-500 border-slate-100'
  };

  const statusLabels = {
    aktif: 'Menginap',
    vip: 'VIP',
    baru: 'Baru'
  };

  // Fungsi Helper: Membuat Inisial Nama untuk Avatar Bulat
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* SIDEBAR COMPONENT */}
      <Sidebar />

      {/* AREA UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER - Konsisten Premium Brand */}
        <header className="bg-white border-b border-amber-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight flex items-center gap-2">
              Manajemen Tamu
            </h2>
            <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
              Graha Nusantara v1.0 • Database Pelanggan & VIP
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 p-1.5 pr-4 rounded-full border border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-sm">
                AD
              </div>
              <span className="text-xs font-bold text-slate-700">Admin 1</span>
            </div>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all" title="Keluar Sistem">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* UTAMA / MAIN CONTAINER */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6 animate-in fade-in duration-500">
          
          {/* BARIS STATISTIK RINGKAS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-50 text-slate-600"><Users size={20} /></div>
              <div>
                <p className="text-xl font-bold text-slate-800 leading-tight">{totalTamu}</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Tamu</p>
                <p className="text-[10px] text-emerald-500 font-medium mt-0.5"><TrendingUp size={10} className="inline mr-0.5"/> 8 bulan ini</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600"><UserPlus size={20} /></div>
              <div>
                <p className="text-xl font-bold text-emerald-600 leading-tight">{checkInHariIni}</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Check-in Hari Ini</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-50 text-amber-600"><Award size={20} /></div>
              <div>
                <p className="text-xl font-bold text-amber-500 leading-tight">{tamuVipCount}</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tamu VIP</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600"><History size={20} /></div>
              <div>
                <p className="text-xl font-bold text-blue-700 leading-tight">{tamuBaruCount}</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tamu Baru</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Bulan ini</p>
              </div>
            </div>
          </div>

          {/* BARIS PENCARIAN & KONTROL FILTER */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3 bg-slate-50/40">
              <div className="flex gap-3 items-center flex-1 sm:flex-initial">
                {/* Search Field */}
                <div className="relative flex-1 sm:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Cari nama / KTP / email..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>
                {/* Status Dropdown */}
                <div className="bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm flex items-center">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-xs text-slate-700 font-bold bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="">Semua Kategori</option>
                    <option value="aktif">Sedang Menginap</option>
                    <option value="vip">VIP</option>
                    <option value="baru">Tamu Baru</option>
                  </select>
                </div>
              </div>

              {/* Tombol Tambah Tamu */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full px-5 py-2 text-xs font-bold hover:opacity-90 transition shadow-sm flex items-center gap-1.5"
              >
                <Plus size={14} /> Tambah Tamu
              </button>
            </div>

            {/* STRUKTUR TABEL DATA UTAMA */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="px-6 py-4 w-20">ID</th>
                    <th className="px-6 py-4">Nama Lengkap & Kota</th>
                    <th className="px-4 py-4">No. KTP</th>
                    <th className="px-4 py-4">No. Telepon</th>
                    <th className="px-4 py-4">Alamat Email</th>
                    <th className="px-4 py-4 text-center">Frekuensi</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {filteredTamu.map((t) => (
                    <tr key={t.id} className="hover:bg-amber-50/20 transition duration-150">
                      <td className="px-6 py-4 font-bold text-slate-400">{t.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar Bulat Menggunakan Inisial Huruf */}
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 flex items-center justify-center border border-slate-200/60 shadow-inner flex-shrink-0">
                            {getInitials(t.nama)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm tracking-tight">{t.nama}</p>
                            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5 mt-0.5">
                              <MapPin size={10} className="text-slate-300" /> {t.kota}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-mono text-slate-500">{t.ktp}</td>
                      <td className="px-4 py-4 text-slate-600 font-medium">{t.telp}</td>
                      <td className="px-4 py-4 text-slate-500 font-medium">{t.email}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-[10px] font-extrabold text-slate-700 bg-slate-100 px-2 py-1 rounded-md border border-slate-200/50">
                          {t.reservasi}x
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {t.status ? (
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[t.status]}`}>
                            {statusLabels[t.status]}
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium px-2 py-0.5 text-slate-300 italic">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all inline-flex" title="Ubah Data">
                          <Pencil size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINASI TABEL */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/20">
              <p className="text-[11px] font-medium text-slate-400">
                Menampilkan {filteredTamu.length} dari {tamuData.length} entri data
              </p>
              <div className="flex gap-1">
                <button className="p-1.5 border border-slate-200 rounded-full text-slate-400 hover:bg-slate-50 transition">
                  <ChevronLeft size={14} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full text-xs shadow-sm">
                  1
                </button>
                <button className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-500 font-bold rounded-full text-xs hover:bg-slate-50 transition">
                  2
                </button>
                <button className="p-1.5 border border-slate-200 rounded-full text-slate-400 hover:bg-slate-50 transition">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* DIALOG BOX MODAL: TAMBAH TAMU BARU */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg mx-4 overflow-hidden border border-amber-100 animate-in zoom-in-95 duration-150">
            
            {/* Modal Head */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <UserPlus size={16} className="text-orange-500" />
                Registrasi Tamu Baru
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-rose-600 transition shadow-sm"
              >
                <X size={14} />
              </button>
            </div>
            
            {/* Modal Form Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                  <input type="text" placeholder="Nama lengkap sesuai KTP" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">No. Identitas (KTP / Passport)</label>
                  <input type="text" placeholder="16 digit angka KTP" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">No. Telepon / WhatsApp</label>
                  <input type="text" placeholder="+62 8xx..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Alamat Email</label>
                  <input type="email" placeholder="contoh@email.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Alamat Domisili Tetap</label>
                <textarea rows="2" placeholder="Tuliskan alamat jalan, RT/RW, Kecamatan..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all resize-none"></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Kota Asal</label>
                  <input type="text" placeholder="Misal: Jakarta Selatan" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Kategori Klasifikasi</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all cursor-pointer">
                    <option>Reguler</option>
                    <option>VIP</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
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
                Simpan Tamu
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Tamu;