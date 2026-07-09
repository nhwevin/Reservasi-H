import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Search,
  Plus,
  LogOut,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
// Import komponen Sidebar yang sudah dibuat sebelumnya
import Sidebar from '../components/admin/sidebar'; // Sesuaikan kembali path/jalur foldernya jika berbeda

const Reservasi_A = () => {
  // State Manajemen Data Utama
  const [reservations, setReservations] = useState([
    { id: '#R001', guest: 'Ahmad Fauzi', room: 'TA2', type: 'Deluxe', checkIn: '18.11.2024', checkOut: '21.11.2024', amount: 'Rp 1.950.000', status: 'Aktif' },
    { id: '#R002', guest: 'Siti Rahayu', room: 'TA1', type: 'Standar', checkIn: '19.11.2024', checkOut: '22.11.2024', amount: 'Rp 1.200.000', status: 'Aktif' },
    { id: '#R003', guest: 'Budi Santoso', room: 'TA5', type: 'Suite', checkIn: '20.11.2024', checkOut: '23.11.2024', amount: 'Rp 3.500.000', status: 'Pending' },
    { id: '#R004', guest: 'Dewi Lestari', room: 'TA3', type: 'Standar', checkIn: '17.11.2024', checkOut: '20.11.2024', amount: 'Rp 1.200.000', status: 'Selesai' },
    { id: '#R005', guest: 'Eko Prasetyo', room: 'TA4', type: 'Deluxe', checkIn: '15.11.2024', checkOut: '18.11.2024', amount: 'Rp 1.950.000', status: 'Dibatalkan' },
  ]);

  // State Manajemen Filter & Modal
  const [searchQuery, setSearchQuery] = useState('');
  const [roomTypeFilter, setRoomTypeFilter] = useState('Tipe Kamar');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter Data Logika
  const filteredReservations = reservations.filter(item => {
    const matchesSearch = item.guest.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = roomTypeFilter === 'Tipe Kamar' || item.type === roomTypeFilter;
    const matchesStatus = statusFilter === 'Status' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* SEKARANG MEMANGGIL KOMPONEN SIDEBAR YANG SAMA */}
      <Sidebar />

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER RESERVASI - Selaras dengan Dashboard */}
        <header className="bg-white border-b border-amber-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              Manajemen Reservasi
            </h2>
            <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
              Graha Nusantara v1.0 • list transaksi
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
          
          {/* BARIS PANEL KONTROL (SEARCH, FILTERS, & ACTION) */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari nama tamu atau ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
              <select 
                value={roomTypeFilter} 
                onChange={(e) => setRoomTypeFilter(e.target.value)}
                className="text-xs text-slate-7700 font-bold bg-transparent focus:outline-none cursor-pointer"
              >
                <option>Tipe Kamar</option>
                <option>Standar</option>
                <option>Deluxe</option>
                <option>Suite</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs text-slate-700 font-bold bg-transparent focus:outline-none cursor-pointer"
              >
                <option>Status</option>
                <option>Aktif</option>
                <option>Pending</option>
                <option>Selesai</option>
                <option>Dibatalkan</option>
              </select>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full px-5 py-2 text-xs font-bold hover:opacity-90 transition shadow-sm flex items-center gap-1 ml-auto"
            >
              <Plus size={14} /> Tambah Reservasi
            </button>
          </div>

          {/* TABEL INDUK RESERVASI */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wide border-b border-slate-200">
                    <th className="text-left px-6 py-4">ID</th>
                    <th className="text-left px-4 py-4">Nama Tamu</th>
                    <th className="text-left px-4 py-4">Kamar</th>
                    <th className="text-left px-4 py-4">Tipe</th>
                    <th className="text-left px-4 py-4">Check-In</th>
                    <th className="text-left px-4 py-4">Check-Out</th>
                    <th className="text-left px-4 py-4">Total Biaya</th>
                    <th className="text-left px-4 py-4">Status</th>
                    <th className="text-center px-6 py-4">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReservations.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/20 transition">
                      <td className="px-6 py-4 text-slate-500 font-medium">{item.id}</td>
                      <td className="px-4 py-4 text-slate-800 font-bold">{item.guest}</td>
                      <td className="px-4 py-4">
                        <span className="bg-slate-50 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200">{item.room}</span>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{item.type}</td>
                      <td className="px-4 py-4 text-slate-600">{item.checkIn}</td>
                      <td className="px-4 py-4 text-slate-600">{item.checkOut}</td>
                      <td className="px-4 py-4 font-bold text-slate-700">{item.amount}</td>
                      <td className="px-4 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          item.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700' :
                          item.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                          item.status === 'Selesai' ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button className="p-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all" title="Ubah Data">
                          <Pencil size={12} />
                        </button>
                        <button className="p-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all" title="Hapus Data">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredReservations.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-10 text-slate-400 font-medium">Data reservasi tidak ditemukan</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* STRUKTUR PAGINATION */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
              <p className="text-[11px] font-bold text-slate-400">
                Menampilkan {filteredReservations.length} data reservasi
              </p>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 text-[11px] font-bold border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 flex items-center gap-1">
                  <ChevronLeft size={12} /> Prev
                </button>
                <button className="w-7 h-7 flex items-center justify-center text-[11px] font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full shadow-sm">1</button>
                <button className="w-7 h-7 flex items-center justify-center text-[11px] font-bold border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50">2</button>
                <button className="px-3 py-1.5 text-[11px] font-bold border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 flex items-center gap-1">
                  Next <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* POP-UP MODAL: FORM TAMBAH RESERVASI */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg mx-4 overflow-hidden border border-amber-100 animate-in zoom-in-95 duration-150">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <CalendarCheck size={16} className="text-orange-500" />
                Tambah Reservasi Baru
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-rose-600 transition shadow-sm"
              >
                <X size={14} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nama Lengkap Tamu</label>
                <input type="text" placeholder="Masukkan nama tamu" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tipe Kamar</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all cursor-pointer">
                    <option>Standar</option>
                    <option>Deluxe</option>
                    <option>Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Pilih Nomor Kamar</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all cursor-pointer">
                    <option>TA1</option>
                    <option>TA2</option>
                    <option>TA3</option>
                    <option>TA4</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tanggal Check-In</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tanggal Check-Out</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex gap-2 justify-end bg-slate-50/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-100 transition"
              >
                Batalkan
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full px-5 py-2 text-xs font-bold hover:opacity-90 transition shadow-md"
              >
                Simpan Transaksi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Reservasi_A;