import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Form } from 'react-router-dom';

// Import komponen halaman utama/pelanggan
import Beranda from './pelanggan/beranda.jsx';
import Reservasi from './pelanggan/reservasi.jsx';
import Riwayat from './pelanggan/riwayat.jsx'; 
import Notifikasi from './pelanggan/notifikasi.jsx';
import Profil from './pelanggan/profil.jsx';

// 1. IMPORT KOMPONEN LOGIN KAMU DI SINI (Sesuaikan dengan lokasi filenya)
import Login from './auth/login.jsx'
import Register from './auth/register.jsx';

import Dashboard from './admin/dashboard.jsx';
import Reservasi_A from './admin/reservasi-A.jsx';
import Kamar from './admin/kamar.jsx';
import Tamu from './admin/tamu.jsx';
import Laporan from './admin/laporan.jsx';
import Pengaturan from './admin/pengaturan.jsx';



function App() {
  return (
    <Router>
      <Routes>
        {/* 2. UBAH navigasi utama dari "/beranda" menjadi "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 3. DAFTARKAN rute baru untuk halaman login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

        {/* 4. Untuk Admin */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/reservasi-A" element={<Reservasi_A/>} />
        <Route path="/kamar" element={<Kamar/>} />
        <Route path="/tamu" element={<Tamu/>} />
        <Route path="/laporan" element={<Laporan/>} />
        <Route path="/pengaturan" element={<Pengaturan/>} />
        
        
        
        
        {/* Pendaftaran rute halaman lainnya tetap sama */}
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/reservasi" element={<Reservasi />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/notifikasi" element={<Notifikasi />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;