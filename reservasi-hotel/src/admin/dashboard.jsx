import React, { useState, useEffect } from 'react'; // Tambah useEffect
import { useNavigate } from 'react-router-dom'; // Tambah useNavigate untuk navigasi
import { 
  Building2, 
  BedDouble, 
  CalendarCheck, 
  History,
  Search,
  CheckCircle2,
  Filter,
  Plus,
  ArrowRight,
  TrendingUp,
  LogOut
} from 'lucide-react';
import Sidebar from '../components/admin/sidebar'; 

const Dashboard = () => {
  const navigate = useNavigate();

  // ==========================================
  // PENGAMANAN HALAMAN (ROUTE GUARD) & LOGOUT
  // ==========================================
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    // Jika token tidak ada ATAU role bukan admin, tendang kembali ke halaman login
    if (!token || role !== 'admin') {
      localStorage.clear(); // Bersihkan sisa data jika ada kontaminasi
      navigate('/login');
    }
  }, [navigate]);

  // Fungsi penanganan Log Out
  const handleLogout = () => {
    localStorage.clear(); // Hapus token dan data session
    navigate('/login'); // Alihkan ke halaman login
  };

  // State manajemen filter asli
  const [searchQuery, setSearchQuery] = useState('');
  const [checkInDate, setCheckInDate] = useState('07/18/2023');
  const [roomType, setRoomType] = useState('Tipe Kamar');
  const [statusFilter, setStatusFilter] = useState('Status');

  // Simulasi data asli
  const [reservations] = useState([
    { id: '#R001', guest: 'Ahmad Fauzi', room: 'TA2', checkIn: '18.11.2024', checkOut: '21.11.2024', status: 'Aktif' },
    { id: '#R002', guest: 'Siti Rahayu', room: 'TA1', checkIn: '19.11.2024', checkOut: '22.11.2024', status: 'Aktif' },
    { id: '#R003', guest: 'Budi Santoso', room: 'TA5', checkIn: '20.11.2024', checkOut: '23.11.2024', status: 'Pending' },
  ]);

  const [todayActivity] = useState([
    { id: '#R006', guest: 'Fitri H.', room: 'TA6', checkIn: '21.11.2024', checkOut: '24.11.2024', status: 'Done' },
    { id: '#R004', guest: 'Dewi L.', room: 'TA3', checkIn: '17.11.2024', checkOut: '20.11.2024', status: 'None' },
  ]);

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* PANGGIL SIDEBAR */}
      <Sidebar />

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER DASHBOARD */}
        <header className="bg-white border-b border-amber-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              Dashboard Reservasi
            </h2>
            <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
              Graha Nusantara v1.0 • overview
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 p-1.5 pr-4 rounded-full border border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-sm">
                AD
              </div>
              <span className="text-xs font-bold text-slate-700">Admin 1</span>
            </div>
            
            {/* AKSI LOGOUT DI SINI */}
            <button 
              onClick={handleLogout}
              className="p-2 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all" 
              title="Log Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* MAIN KONTEN */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8 animate-in fade-in duration-500">
          
          {/* FILTERS & ACTION ACTIONS */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari transaksi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider">Check-in</span>
              <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
                <input 
                  type="text" 
                  value={checkInDate} 
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="text-xs text-slate-700 font-bold w-24 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
              <select 
                value={roomType} 
                onChange={(e) => setRoomType(e.target.value)}
                className="text-xs text-slate-700 font-bold bg-transparent focus:outline-none cursor-pointer"
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
                <option>Selesai</option>
                <option>Dibatalkan</option>
              </select>
            </div>

            <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-bold text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition shadow-sm">
              <Filter size={14} />
              Filter
            </button>
            
            <a href="reservasi-A" className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full px-5 py-2 text-xs font-bold hover:opacity-90 transition shadow-sm flex items-center gap-1">
              <Plus size={14} /> Reservasi
            </a>
          </div>

          {/* GRID UTAMA DASHBOARD */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* KARTU STATISTIK */}
            <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Kamar</p>
                  <p className="text-3xl font-black text-slate-800">14</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-600 border border-slate-100">
                  <Building2 size={22} />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm border-l-4 border-l-emerald-500 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tersedia</p>
                  <p className="text-3xl font-black text-emerald-600">7</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                  <CheckCircle2 size={22} />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm border-l-4 border-l-amber-500 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dipesan</p>
                  <p className="text-3xl font-black text-amber-500">5</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                  <CalendarCheck size={22} />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm border-l-4 border-l-orange-500 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Digunakan</p>
                  <p className="text-3xl font-black text-orange-600">5</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                  <BedDouble size={22} />
                </div>
              </div>
            </div>

            {/* GRUP TABEL TENGAH */}
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
              
              {/* TABEL 1: RESERVASI TERBARU */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <CheckCircle2 size={16} className="text-orange-500" /> 
                    Reservasi Terbaru
                  </h3>
                  <a href="reservasi-admin.html" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                    Lihat semua <ArrowRight size={12} />
                  </a>
                </div>
                <div className="overflow-x-auto -mx-6">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wide border-y border-slate-100">
                        <th className="text-left px-6 py-3">ID</th>
                        <th className="text-left px-4 py-3">Nama Tamu</th>
                        <th className="text-left px-4 py-3">Kamar</th>
                        <th className="text-left px-4 py-3">Check-in</th>
                        <th className="text-left px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reservations.map((item) => (
                        <tr key={item.id} className="hover:bg-amber-50/20 transition">
                          <td className="px-6 py-3.5 text-slate-500 font-medium">{item.id}</td>
                          <td className="px-4 py-3.5 text-slate-800 font-bold">{item.guest}</td>
                          <td className="px-4 py-3.5">
                            <span className="bg-slate-50 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200">{item.room}</span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-600">{item.checkIn}</td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              item.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABEL 2: AKTIVITAS HARI INI */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <History size={16} className="text-orange-500" /> 
                    Check-in / Check-out Hari Ini
                  </h3>
                  <a href="tamu-admin.html" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                    Lihat tamu <ArrowRight size={12} />
                  </a>
                </div>
                <div className="overflow-x-auto -mx-6">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wide border-y border-slate-100">
                        <th className="text-left px-6 py-3">ID</th>
                        <th className="text-left px-4 py-3">Tamu</th>
                        <th className="text-left px-4 py-3">Kamar</th>
                        <th className="text-left px-4 py-3">Check-out</th>
                        <th className="text-center px-6 py-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {todayActivity.map((item) => (
                        <tr key={item.id} className="hover:bg-amber-50/20 transition">
                          <td className="px-6 py-3.5 text-slate-500 font-medium">{item.id}</td>
                          <td className="px-4 py-3.5 text-slate-800 font-bold">{item.guest}</td>
                          <td className="px-4 py-3.5">
                            <span className="bg-slate-50 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200">{item.room}</span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-600">{item.checkOut}</td>
                          <td className="px-6 py-3.5 text-center">
                            {item.status === 'Done' ? (
                              <span className="p-1 bg-emerald-50 text-emerald-600 rounded-full inline-block">
                                <CheckCircle2 size={14} />
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN: KETERSEDIAAN KAMAR */}
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-white rounded-[2rem] border border-amber-100 shadow-sm p-6 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider">Ketersediaan Kamar</h3>
                    <a href="kamar-admin.html" className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100 hover:text-amber-600">
                      Kelola →
                    </a>
                  </div>
                  
                  {/* Standar */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-slate-700">Standar</span>
                      <span className="text-[10px] font-bold text-slate-400">Total: 5</span>
                    </div>
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-600 mt-1">3 tersedia</p>
                  </div>

                  {/* Deluxe */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-slate-700">Deluxe</span>
                      <span className="text-[10px] font-bold text-slate-400">Total: 5</span>
                    </div>
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <p className="text-[10px] font-bold text-amber-600 mt-1">1 tersedia</p>
                  </div>

                  {/* Suite */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-slate-700">Suite</span>
                      <span className="text-[10px] font-bold text-slate-400">Total: 4</span>
                    </div>
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-600 mt-1">3 tersedia</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6">
                  <a href="laporan-admin.html" className="flex items-center justify-center gap-2 w-full py-2 bg-slate-50 hover:bg-amber-50 hover:text-amber-600 text-slate-700 text-xs font-bold rounded-xl transition border border-slate-200">
                    <TrendingUp size={14} />
                    Lihat Laporan Bisnis
                  </a>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;