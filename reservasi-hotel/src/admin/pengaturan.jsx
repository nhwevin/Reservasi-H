import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  DollarSign, 
  Bell, 
  ShieldCheck, 
  LogOut, 
  Save, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  UserPlus
} from 'lucide-react';
// Import komponen Sidebar Anda
import Sidebar from '../components/admin/sidebar'; 

export default function Pengaturan() {
  const [activeTab, setActiveTab] = useState('profil');
  const [savedAlert, setSavedAlert] = useState({ profil: false, harga: false });

  const handleSimpan = (key) => {
    setSavedAlert((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setSavedAlert((prev) => ({ ...prev, [key]: false }));
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* AREA UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER MANAGEMENT */}
        <header className="bg-white border-b border-amber-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              Pengaturan Sistem
            </h2>
            <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
              Graha Nusantara v1.0 • Konfigurasi & Hak Akses
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 p-1.5 pr-4 rounded-full border border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-sm">
                AD
              </div>
              <span className="text-xs font-bold text-slate-700">Admin 1</span>
            </div>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* INNER CONTENT SPLIT */}
        <div className="flex flex-1 overflow-hidden">

          {/* SUB TABS NAVIGATION - Tema Terang Premium */}
          <div className="w-60 bg-white border-r border-amber-100 flex-shrink-0 py-6 px-4 space-y-1">
            {[
              { id: 'profil', label: 'Profil Hotel', icon: <Building2 size={16} /> },
              { id: 'akun', label: 'Manajemen Akun', icon: <User size={16} /> },
              { id: 'harga', label: 'Harga & Tarif', icon: <DollarSign size={16} /> },
              { id: 'notif', label: 'Notifikasi', icon: <Bell size={16} /> },
              { id: 'keamanan', label: 'Keamanan', icon: <ShieldCheck size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/10'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* MAIN CONFIGURATION INTERFACE */}
          <main className="flex-1 overflow-y-auto p-8 bg-[#fcfcfc]">

            {/* TAB: PROFIL HOTEL */}
            {activeTab === 'profil' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5">Informasi Dasar Hotel</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nama Hotel</label>
                      <input type="text" defaultValue="Hotel Graha Nusantara" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Bintang Hotel</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all cursor-pointer">
                        <option>★★★★ 4 Bintang</option>
                        <option>★★★★★ 5 Bintang</option>
                        <option>★★★ 3 Bintang</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Hotel</label>
                      <input type="email" defaultValue="info@grahanusantara.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">No. Telepon</label>
                      <input type="text" defaultValue="+62 21 5555-7890" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                      <textarea rows="2" defaultValue="Jl. Sudirman No. 88, Jakarta Pusat, DKI Jakarta 10220" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all resize-none"></textarea>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 tracking-wider mb-1.5 uppercase">Jam Check-in</label>
                      <input type="time" defaultValue="14:00" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 tracking-wider mb-1.5 uppercase">Jam Check-out</label>
                      <input type="time" defaultValue="12:00" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Website URL</label>
                      <input type="url" defaultValue="https://www.grahanusantara.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">NPWP Hotel</label>
                      <input type="text" defaultValue="12.345.678.9-012.345" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                    </div>
                  </div>

                  {savedAlert.profil && (
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 size={14} /> Perubahan konfigurasi profil berhasil disimpan!
                    </div>
                  )}

                  <div className="flex justify-end mt-6">
                    <button onClick={() => handleSimpan('profil')} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full px-6 py-2.5 text-xs font-bold hover:opacity-90 transition shadow-sm flex items-center gap-1.5">
                      <Save size={14} /> Simpan Perubahan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MANAJEMEN AKUN */}
            {activeTab === 'akun' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Daftar Operator Sistem</h3>
                    <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full px-4 py-2 text-xs font-bold hover:opacity-90 transition shadow-sm flex items-center gap-1">
                      <UserPlus size={14} /> Tambah Admin
                    </button>
                  </div>
                  
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">A1</div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm tracking-tight">Admin 1</p>
                          <p className="text-[11px] font-medium text-slate-400">admin1@grahanusantara.com &bull; <span className="text-amber-600 font-bold bg-amber-50 px-1 py-0.5 rounded">Super Admin</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full">Active Staff</span>
                        <button className="py-1 px-3 text-[11px] font-bold border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition">Edit</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xs shadow-sm">A2</div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm tracking-tight">Admin 2</p>
                          <p className="text-[11px] font-medium text-slate-400">admin2@grahanusantara.com &bull; Desk Clerk</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full">Active Staff</span>
                        <button className="py-1 px-3 text-[11px] font-bold border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition">Edit</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">A3</div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm tracking-tight">Admin 3</p>
                          <p className="text-[11px] font-medium text-slate-400">admin3@grahanusantara.com &bull; Auditor</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-400 border border-slate-200 px-2.5 py-0.5 rounded-full">Suspended</span>
                        <button className="py-1 px-3 text-[11px] font-bold border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Ubah Password Keamanan */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Lock size={15} className="text-amber-500" /> Kredensial & Sandi Akses
                  </h3>
                  <div className="grid grid-cols-1 gap-4 max-w-md">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password Lama</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password Baru</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Konfirmasi Password Baru</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
                    </div>
                  </div>
                  <button className="mt-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full px-5 py-2.5 text-xs font-bold hover:opacity-90 transition shadow-sm">
                    Perbarui Kata Sandi
                  </button>
                </div>
              </div>
            )}

            {/* TAB: HARGA & TARIF */}
            {activeTab === 'harga' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5">Manajemen Kategori Tarif Kamar</h3>
                  <div className="space-y-4">
                    {[
                      { tipe: 'Standar', detail: '1 Single Bed &bull; Luas 24m² &bull; AC &bull; WiFi Gratis', harga: '350.000' },
                      { tipe: 'Deluxe', detail: '1 King-Size Bed &bull; Luas 36m² &bull; Smart TV &bull; Premium Space', harga: '600.000' },
                      { tipe: 'Suite', detail: '2 Double Bed &bull; Luas 60m² &bull; Full Luxury Amenities &bull; Mini Bar & Bathtub', harga: '1.200.000' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-amber-200 transition-all">
                        <div>
                          <p className="font-extrabold text-slate-800 text-sm">{item.tipe}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5" dangerouslySetInnerHTML={{ __html: item.detail }} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-700">Rp</span>
                          <input type="text" defaultValue={item.harga} className="w-32 text-right bg-white border border-slate-200 focus:ring-2 focus:ring-amber-500 rounded-xl px-3 py-2 text-xs font-black text-slate-700 outline-none transition-all" />
                          <span className="text-[11px] text-slate-400 font-medium">/ malam</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
                    <p className="text-xs font-bold text-amber-800 mb-3 uppercase tracking-wide">Pajak Tambahan & Surcharge Otomatis</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-amber-700 mb-1">Pajak Layanan (PB1)</label>
                        <input type="text" defaultValue="10%" className="w-full border border-amber-200 focus:ring-2 focus:ring-amber-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 bg-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-amber-700 mb-1">Biaya Pembatalan</label>
                        <input type="text" defaultValue="0%" className="w-full border border-amber-200 focus:ring-2 focus:ring-amber-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 bg-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-amber-700 mb-1">Jaminan Deposit Check-in</label>
                        <input type="text" defaultValue="50%" className="w-full border border-amber-200 focus:ring-2 focus:ring-amber-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 bg-white outline-none" />
                      </div>
                    </div>
                  </div>

                  {savedAlert.harga && (
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 size={14} /> Daftar penyesuaian tarif kamar berhasil diperbarui!
                    </div>
                  )}

                  <button onClick={() => handleSimpan('harga')} className="mt-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full px-6 py-2.5 text-xs font-bold hover:opacity-90 transition shadow-sm">
                    Simpan Perubahan Tarif
                  </button>
                </div>
              </div>
            )}

            {/* TAB: NOTIFIKASI SYSTEM SWITCH */}
            {activeTab === 'notif' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5">Pusat Manajemen Notifikasi</h3>
                  <div className="space-y-1">
                    {[
                      { t: 'Reservasi baru masuk', d: 'Notifikasi waktu-nyata saat ada reservasi baru sukses dibuat oleh tamu', c: true },
                      { t: 'Pengingat check-in kamar', d: 'Kirim alert otomatis kepada sistem H-1 dari jadwal check-in tamu resmi', c: true },
                      { t: 'Pengingat batas check-out', d: 'Notifikasi pop-up pada sistem tepat di jam jadwal check-out harian', c: true },
                      { t: 'Pembatalan & Void Reservasi', d: 'Notifikasi instan saat pesanan kamar dibatalkan pihak administrasi/tamu', c: true },
                      { t: 'Laporan harian otomatis', d: 'Kirim rekapitulasi keuangan dan total hunian malam ke email manajer', c: false },
                      { t: 'Integrasi Saluran WhatsApp', d: 'Hubungkan API eksternal untuk modul pesan WhatsApp Business resmi hotel', c: false }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
                        <div>
                          <p className="text-xs font-extrabold text-slate-700">{item.t}</p>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">{item.d}</p>
                        </div>
                        {/* Custom Switch Toggle Berwarna Orange/Amber khas Proyek Anda */}
                        <label className="relative inline-block w-10 h-6 flex-shrink-0 cursor-pointer select-none">
                          <input type="checkbox" defaultChecked={item.c} className="sr-only peer" />
                          <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500 shadow-inner"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: KEAMANAN SIBER */}
            {activeTab === 'keamanan' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5">Sistem Keamanan & Enkripsi Data</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between py-3.5 border-b border-slate-100">
                      <div>
                        <p className="text-xs font-extrabold text-slate-700">Autentikasi Dua Faktor (2FA Akses)</p>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">Wajibkan kode OTP tambahan saat administrator mencoba login jarak jauh</p>
                      </div>
                      <label className="relative inline-block w-10 h-6 flex-shrink-0 cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3.5 border-b border-slate-100">
                      <div>
                        <p className="text-xs font-extrabold text-slate-700">Batas Durasi Sesi Idle Akses</p>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">Otomatis putuskan sesi login jika terminal admin ditinggalkan tanpa aktivitas</p>
                      </div>
                      <select className="border border-slate-200 text-[11px] font-bold rounded-xl px-3 py-1.5 text-slate-700 bg-white outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer">
                        <option>30 menit</option>
                        <option>1 jam</option>
                        <option>4 jam</option>
                        <option>8 jam</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between py-3.5 border-b border-slate-100">
                      <div>
                        <p className="text-xs font-extrabold text-slate-700">Audit Trail / Log Aktivitas Admin</p>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">Pantau dan rekam jejak digital riwayat manipulasi data dalam sistem</p>
                      </div>
                      <label className="relative inline-block w-10 h-6 flex-shrink-0 cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3.5">
                      <div>
                        <p className="text-xs font-extrabold text-slate-700">Pencadangan Basis Data Otomatis</p>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">Simpan salinan cadangan berkas transaksi secara periodik dalam cloud</p>
                      </div>
                      <select className="border border-slate-200 text-[11px] font-bold rounded-xl px-3 py-1.5 text-slate-700 bg-white outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer">
                        <option>Setiap hari</option>
                        <option>Setiap minggu</option>
                        <option>Setiap bulan</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* CRITICAL ACTION: DANGER ZONE */}
                <div className="bg-rose-50/70 border border-rose-200 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-rose-800 flex items-center gap-1.5 uppercase tracking-wide">
                      <AlertTriangle size={16} /> Zona Bahaya Sistem (Danger Zone)
                    </h4>
                    <p className="text-[11px] text-rose-600 font-medium mt-1">
                      Tindakan penghapusan/restorasi bersifat mutlak dan tidak bisa dibatalkan dari pangkalan data.
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="px-4 py-2 bg-white border border-rose-300 text-rose-600 text-xs font-bold rounded-full hover:bg-rose-100/50 transition">
                      Reset Semua Data
                    </button>
                    <button className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-full hover:opacity-90 transition shadow-sm">
                      Hapus Akun Hotel
                    </button>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}