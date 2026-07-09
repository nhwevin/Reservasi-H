import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Hotel, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Calendar, 
  User, 
  IdCard, 
  FileText, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import Sidebar from '../components/sidebar';

// ── Constants ─────────────────────────────────────────────────────────────────
const KAMAR_OPTIONS = {
  standar: ['TA1', 'TA3', 'TA6', 'TA8'],
  deluxe:  ['TA2', 'TA4', 'TA7'],
  suite:   ['TA5', 'TA9'],
};

const HARGA_PER_MALAM = {
  standar: 350000,
  deluxe:  600000,
  suite:   1200000,
};

const LABELS_KAMAR = {
  standar: 'Kamar Standar',
  deluxe:  'Kamar Deluxe',
  suite:   'Kamar Suite',
};

// ── Tipe kamar config ─────────────────────────────────────────────────────────
const TIPE_CARDS = [
  { id: 'standar', label: 'Standar', sub: '1 bed · 24m²',      harga: 'Rp 350rb/mlm', badge: null,      Icon: Hotel },
  { id: 'deluxe',  label: 'Deluxe',  sub: 'King bed · 36m²',   harga: 'Rp 600rb/mlm', badge: 'Populer', Icon: Sparkles  },
  { id: 'suite',   label: 'Suite',   sub: '2 bed · 60m²',       harga: 'Rp 1,2 Jt/mlm',badge: null,    Icon: Star     },
];

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputStyle = (hasError = false) => ({
  width: '100%',
  border: `1px solid ${hasError ? '#fca5a5' : '#dde4f2'}`,
  borderRadius: 12,
  padding: '11px 14px',
  fontSize: 13,
  color: '#152340',
  background: hasError ? '#fff5f5' : 'rgba(240,243,250,0.4)',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
});

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 11,
  fontWeight: 600,
  color: '#5f7fb8',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 6,
};

const panelStyle = {
  background: '#fff',
  borderRadius: 20,
  border: '1px solid #dde4f2',
  boxShadow: '0 4px 20px rgba(21,35,64,0.02), 0 1px 2px rgba(21,35,64,0.02)',
  overflow: 'hidden',
};

const panelHeaderStyle = {
  padding: '18px 24px',
  borderBottom: '1px solid #f0f3fa',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Reservasi() {
  const [selectedTipe, setSelectedTipe] = useState('deluxe');
  const [noKamar,      setNoKamar]      = useState('');
  const [checkin,      setCheckin]      = useState('');
  const [checkout,     setCheckout]     = useState('');
  const [namaTamu,     setNamaTamu]     = useState('Budi Santoso');
  const [ktp,          setKtp]          = useState('');
  const [catatan,      setCatatan]      = useState('');
  const [errors,       setErrors]       = useState({ checkin: false, checkout: false });
  const [formError,    setFormError]    = useState(false);
  const [isSuccess,    setIsSuccess]    = useState(false);
  const [biaya,        setBiaya]        = useState({ diffMalam: 0, subtotal: 0, pajak: 0, total: 0 });

  const handleTipeChange = (tipe) => { setSelectedTipe(tipe); setNoKamar(''); };

  useEffect(() => {
    if (!selectedTipe || !noKamar || !checkin || !checkout) {
      setBiaya({ diffMalam: 0, subtotal: 0, pajak: 0, total: 0 });
      return;
    }
    const diffMalam = (new Date(checkout) - new Date(checkin)) / 86400000;
    if (diffMalam <= 0) { setBiaya({ diffMalam: 0, subtotal: 0, pajak: 0, total: 0 }); return; }
    const subtotal = HARGA_PER_MALAM[selectedTipe] * diffMalam;
    const pajak    = subtotal * 0.1;
    setBiaya({ diffMalam, subtotal, pajak, total: subtotal + pajak });
  }, [selectedTipe, noKamar, checkin, checkout]);

  const handleKonfirmasi = () => {
    const e = { checkin: !checkin, checkout: !checkout };
    setErrors(e);
    if (!noKamar || !checkin || !checkout || biaya.diffMalam <= 0) { setFormError(true); return; }
    setFormError(false);
    setIsSuccess(true);
  };

  const fmt = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');
  const isStep1Done = !!(noKamar && checkin && checkout && biaya.diffMalam > 0);

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: '#f4f6fa',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        
        /* Premium Focus & Transitions */
        input:focus, select:focus, textarea:focus {
          border-color: #3d5fa0 !important;
          background: #fff !important;
          box-shadow: 0 0 0 4px rgba(61,95,160,0.12) !important;
        }
        
        /* Card & Icon Animations */
        .tipe-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .tipe-card:hover { 
          box-shadow: 0 12px 24px rgba(21,35,64,0.06); 
          transform: translateY(-2px); 
          border-color: #3d5fa0 !important;
        }
        .tipe-card:hover .icon-container {
          transform: scale(1.1) rotate(3deg);
          background: #152340 !important;
          color: #fff !important;
        }
        .tipe-card:hover .icon-container svg {
          stroke: #fff !important;
        }
        
        /* Buttons Effect */
        .btn-back:hover { background: #f0f3fa !important; transform: translateX(-2px); }
        .btn-konfirm:hover:not(:disabled) { 
          background: #1e3155 !important; 
          box-shadow: 0 10px 25px rgba(21,35,64,0.2) !important; 
          transform: translateY(-1px); 
        }
        .btn-primary:hover { 
          background: #1e3155 !important; 
          box-shadow: 0 10px 25px rgba(21,35,64,0.2) !important; 
          transform: translateY(-1px); 
        }
        
        /* Micro-interactions */
        .bell-btn:hover { background: #f0f3fa !important; transform: scale(1.05); }
        .bell-btn:hover svg { animation: ring 0.5s ease-in-out; }
        .profile-avatar:hover { background: #3d5fa0 !important; color: #fff !important; transform: scale(1.05); }
        
        /* Success Badge Pulse */
        .success-pulse { animation: scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        
        /* Keyframes */
        @keyframes ring {
          0% { transform: rotate(0); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-15deg); }
          60% { transform: rotate(10deg); }
          80% { transform: rotate(-10deg); }
          100% { transform: rotate(0); }
        }
        @keyframes scaleUp {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        
        .notif-badge-pulse { animation: pulseDot 2s infinite; }
        .step-dot { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .step-line { transition: all 0.5s ease; }
      `}</style>

      {/* SIDEBAR */}
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <header style={{
          background: '#fff', borderBottom: '1px solid #dde4f2',
          padding: '14px 28px',
          display: 'flex', alignItems: 'center', justifyBetween: 'space-between',
          justifyContent: 'space-between',
          flexShrink: 0, boxShadow: '0 2px 10px rgba(21,35,64,0.02)', zIndex: 10,
        }}>
          <div>
            <h1 style={{
              margin: 0, fontSize: 22, fontWeight: 700, color: '#152340',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              letterSpacing: '-0.01em'
            }}>
              Reservasi Baru
            </h1>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#5f7fb8' }}>
              Pesan kamar untuk menginap Anda
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Bell */}
            <Link to="/notifikasi" className="bell-btn" style={{
              position: 'relative', width: 38, height: 38, borderRadius: '50%',
              border: '1px solid #dde4f2', background: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#3d5fa0', transition: 'all 0.2s',
            }}>
              <Bell size={18} strokeWidth={2} />
              <span className="notif-badge-pulse" style={{
                position: 'absolute', top: 8, right: 9,
                width: 6, height: 6,
                background: '#ef4444', borderRadius: '50%',
                border: '1px solid #fff',
              }} />
            </Link>

            {/* Profile */}
            <Link to="/profil" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div className="profile-avatar" style={{
                width: 34, height: 34, borderRadius: '50%',
                background: '#dde4f2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#1e3155',
                cursor: 'pointer', transition: 'all 0.3s',
              }}>BS</div>
              <div className="hidden sm:block" style={{ lineHeight: 1.2 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#152340' }}>
                  Budi Santoso
                </p>
                <p style={{ margin: '1px 0 0', fontSize: 11, color: '#5f7fb8' }}>Pelanggan</p>
              </div>
            </Link>
          </div>
        </header>

        {/* ── MAIN ───────────────────────────────────────────────────────── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28, background: '#fff', padding: '14px 24px', borderRadius: 16, border: '1px solid #dde4f2' }}>
            {[
              { num: 1, label: 'Pilih Kamar',      done: true,       accent: '#152340' },
              { num: 2, label: 'Tanggal & Detail', done: isStep1Done, accent: '#152340' },
              { num: 3, label: 'Konfirmasi',        done: isSuccess,  accent: '#10b981' },
            ].map((step, i) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : undefined }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="step-dot" style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: step.done ? step.accent : '#dde4f2',
                    color: step.done ? '#fff' : '#3d5fa0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, flexShrink: 0,
                    boxShadow: step.done ? '0 4px 10px rgba(21,35,64,0.15)' : 'none'
                  }}>{step.num}</div>
                  <span style={{
                    fontSize: 13, whiteSpace: 'nowrap',
                    fontWeight: step.done ? 600 : 500,
                    color: step.done ? (step.num === 3 ? '#059669' : '#152340') : '#7a97c7',
                  }}>{step.label}</span>
                </div>
                {i < 2 && (
                  <div className="step-line" style={{
                    flex: 1, height: 2, margin: '0 16px',
                    background: (i === 0 && isStep1Done) || (i === 1 && isSuccess) ? '#1e3155' : '#dde4f2',
                    borderRadius: 1,
                  }} />
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>

            {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Panel 1: Pilih Kamar */}
              <div style={panelStyle}>
                <div style={panelHeaderStyle}>
                  <StepBadge num={1} done />
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#152340' }}>
                    Pilih Tipe &amp; Nomor Kamar
                  </h3>
                </div>
                <div style={{ padding: 24 }}>
                  {/* Tipe cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
                    {TIPE_CARDS.map(({ id, label, sub, harga, badge, Icon }) => {
                      const isSelected = selectedTipe === id;
                      return (
                        <button key={id} className="tipe-card"
                          onClick={() => handleTipeChange(id)}
                          style={{
                            position: 'relative',
                            border: `2px solid ${isSelected ? '#152340' : '#dde4f2'}`,
                            borderRadius: 16, padding: '16px 14px',
                            textAlign: 'left',
                            background: isSelected ? 'rgba(240,243,250,0.7)' : '#fff',
                            cursor: 'pointer',
                          }}>
                          {badge && (
                            <span style={{
                              position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                              fontSize: 10, fontWeight: 700,
                              background: '#fef3c7', color: '#92400e',
                              padding: '2px 10px', borderRadius: 99,
                              border: '1px solid #fde68a', whiteSpace: 'nowrap',
                              letterSpacing: '0.02em', boxShadow: '0 2px 6px rgba(146,64,14,0.08)'
                            }}>{badge}</span>
                          )}
                          <div className="icon-container" style={{
                            width: 36, height: 36, borderRadius: 12,
                            background: isSelected ? '#152340' : '#f0f3fa',
                            color: isSelected ? '#fff' : '#3d5fa0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: 12, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}>
                            <Icon size={18} strokeWidth={2} />
                          </div>
                          <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 700, color: '#152340' }}>{label}</p>
                          <p style={{ margin: '0 0 8px', fontSize: 11, color: '#5f7fb8' }}>{sub}</p>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#1e3155' }}>{harga}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Nomor kamar */}
                  <div>
                    <label style={labelStyle}>
                      <Hotel size={13} strokeWidth={2.5} color="#5f7fb8" /> Nomor Kamar
                    </label>
                    <select value={noKamar} onChange={(e) => setNoKamar(e.target.value)}
                      style={{ ...inputStyle(), appearance: 'auto', cursor: 'pointer' }}>
                      <option value="">-- Pilih nomor kamar tersedia --</option>
                      {KAMAR_OPTIONS[selectedTipe].map((k) => {
                        const n = parseInt(k.replace('TA', ''), 10);
                        const lantai = n > 5 ? 4 : n > 3 ? 3 : 2;
                        return <option key={k} value={k}>{k} — Lantai {lantai}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* Panel 2: Tanggal & Tamu */}
              <div style={panelStyle}>
                <div style={panelHeaderStyle}>
                  <StepBadge num={2} done={isStep1Done} />
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#152340' }}>
                    Tanggal &amp; Informasi Tamu
                  </h3>
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Check-in / Check-out */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {[
                      { label: 'Tanggal Check-in',  key: 'checkin',  val: checkin,  set: setCheckin  },
                      { label: 'Tanggal Check-out', key: 'checkout', val: checkout, set: setCheckout },
                    ].map((f) => (
                      <div key={f.key}>
                        <label style={labelStyle}>
                          <Calendar size={13} strokeWidth={2.5} color="#5f7fb8" /> {f.label}
                        </label>
                        <input type="date" value={f.val}
                          onChange={(e) => f.set(e.target.value)}
                          style={inputStyle(errors[f.key])} />
                        {errors[f.key] && (
                          <p style={{ margin: '5px 0 0', fontSize: 11, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <AlertCircle size={12} /> Wajib diisi
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Nama tamu */}
                  <div>
                    <label style={labelStyle}>
                      <User size={13} strokeWidth={2.5} color="#5f7fb8" /> Nama Tamu
                    </label>
                    <input type="text" value={namaTamu}
                      onChange={(e) => setNamaTamu(e.target.value)}
                      style={inputStyle()} />
                  </div>

                  {/* KTP */}
                  <div>
                    <label style={labelStyle}>
                      <IdCard size={13} strokeWidth={2.5} color="#5f7fb8" /> No. KTP / Identitas
                    </label>
                    <input type="text" placeholder="3271xxxxxxxxxxxxx" value={ktp}
                      onChange={(e) => setKtp(e.target.value)}
                      style={inputStyle()} />
                  </div>

                  {/* Catatan */}
                  <div>
                    <label style={labelStyle}>
                      <FileText size={13} strokeWidth={2.5} color="#5f7fb8" />
                      Catatan Khusus{' '}
                      <span style={{ textTransform: 'none', fontWeight: 400, color: '#b9c8e5', marginLeft: 2 }}>(opsional)</span>
                    </label>
                    <textarea rows={3}
                      placeholder="Permintaan khusus, alergi, preferensi lantai, dll..."
                      value={catatan} onChange={(e) => setCatatan(e.target.value)}
                      style={{ ...inputStyle(), resize: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Error banner */}
              {formError && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 18px', background: '#fef2f2',
                  border: '1px solid #fecaca', borderRadius: 14,
                  fontSize: 13, color: '#dc2626',
                  boxShadow: '0 4px 12px rgba(220,38,38,0.03)'
                }}>
                  <AlertCircle size={18} strokeWidth={2.3} style={{ flexShrink: 0 }} />
                  <span>Mohon lengkapi seluruh kolom wajib dan pastikan tanggal check-out setelah check-in.</span>
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 14 }}>
                <Link to="/beranda" className="btn-back" style={{
                  flex: 1, padding: '13px', textAlign: 'center',
                  border: '1px solid #dde4f2', borderRadius: 14,
                  background: '#fff', color: '#1e3155',
                  fontSize: 13, fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.25s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 6
                }}>
                  <ArrowLeft size={14} strokeWidth={2.5} /> Kembali
                </Link>

                <button className="btn-konfirm"
                  onClick={handleKonfirmasi} disabled={isSuccess}
                  style={{
                    flex: 1, padding: '13px', border: 'none', borderRadius: 14,
                    background: isSuccess ? '#9ca3af' : '#152340',
                    color: '#fff', fontSize: 13, fontWeight: 600,
                    cursor: isSuccess ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: isSuccess ? 'none' : '0 4px 14px rgba(21,35,64,0.15)',
                  }}>
                  Konfirmasi Reservasi
                </button>
              </div>
            </div>

            {/* ── RIGHT PANEL: Ringkasan ───────────────────────────────────── */}
            <div style={{ position: 'sticky', top: 24 }}>
              <div style={panelStyle}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f3fa' }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#152340' }}>Ringkasan Biaya</h3>
                </div>
                <div style={{ padding: 24 }}>

                  {/* State 1: empty */}
                  {!isSuccess && biaya.diffMalam === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px 0' }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: '50%',
                        background: '#f0f3fa', margin: '0 auto 14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#8da5d0'
                      }}>
                        <Calendar size={22} strokeWidth={1.8} />
                      </div>
                      <p style={{ margin: 0, fontSize: 13, color: '#5f7fb8', lineHeight: 1.6 }}>
                        Pilih tipe kamar dan tanggal untuk melihat estimasi biaya lengkap
                      </p>
                    </div>
                  )}

                  {/* State 2: kalkulasi */}
                  {!isSuccess && biaya.diffMalam > 0 && (
                    <div>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        background: '#f0f3fa', borderRadius: 14, padding: '14px 16px', marginBottom: 18,
                      }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: '#b9c8e5', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#1e3155'
                        }}>
                          <Hotel size={18} strokeWidth={2} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#152340' }}>
                            {LABELS_KAMAR[selectedTipe]}
                          </p>
                          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#5f7fb8', fontWeight: 600 }}>Nomor {noKamar}</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
                        {[
                          { label: LABELS_KAMAR[selectedTipe], val: `${fmt(HARGA_PER_MALAM[selectedTipe])}/malam` },
                          { label: `Durasi (${biaya.diffMalam} malam)`, val: fmt(biaya.subtotal) },
                          { label: 'Pajak & Layanan (10%)', val: fmt(biaya.pajak) },
                        ].map((row, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                            <span style={{ color: '#5f7fb8' }}>{row.label}</span>
                            <span style={{ fontWeight: 600, color: '#152340' }}>{row.val}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ borderTop: '1px solid #dde4f2', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <span style={{ fontWeight: 700, color: '#152340', fontSize: 14 }}>Total Biaya</span>
                        <span style={{ fontWeight: 700, color: '#152340', fontSize: 22, letterSpacing: '-0.02em' }}>{fmt(biaya.total)}</span>
                      </div>

                      <div style={{ padding: '12px 14px', background: '#eff6ff', borderRadius: 12, border: '1px solid #bfdbfe' }}>
                        <p style={{ margin: 0, fontSize: 12, color: '#1d4ed8', fontWeight: 500, lineHeight: 1.5 }}>
                          Pembayaran aman dapat dilakukan saat check-in di resepsionis hotel.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* State 3: sukses */}
                  {isSuccess && (
                    <div className="success-pulse" style={{ textAlign: 'center', padding: '12px 0' }}>
                      <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: '#f0fdf4', border: '2px solid #bbf7d0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        color: '#10b981',
                        boxShadow: '0 8px 20px rgba(16,185,129,0.15)'
                      }}>
                        <CheckCircle2 size={32} strokeWidth={2} />
                      </div>
                      <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#152340' }}>
                        Reservasi Dikonfirmasi!
                      </p>
                      <p style={{ margin: '0 0 6px', fontSize: 12, color: '#10b981', fontWeight: 700, letterSpacing: '0.05em' }}>ID: #006</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#5f7fb8', lineHeight: 1.5 }}>
                        Email rincian konfirmasi telah dikirim ke <strong style={{ color: '#152340' }}>budi.santoso@email.com</strong>
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
                        <Link to="/riwayat" className="btn-primary" style={{
                          display: 'block', width: '100%', padding: '11px',
                          background: '#152340', color: '#fff',
                          border: 'none', borderRadius: 12,
                          fontSize: 13, fontWeight: 600,
                          textDecoration: 'none', textAlign: 'center',
                          transition: 'all 0.3s',
                          boxShadow: '0 4px 12px rgba(21,35,64,0.15)'
                        }}>Lihat Riwayat →</Link>
                        <Link to="/beranda" className="btn-back" style={{
                          display: 'block', width: '100%', padding: '11px',
                          background: '#fff', color: '#1e3155',
                          border: '1px solid #dde4f2', borderRadius: 12,
                          fontSize: 13, fontWeight: 600,
                          textDecoration: 'none', textAlign: 'center',
                          transition: 'all 0.2s',
                        }}>Kembali ke Beranda</Link>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// ── Helper: step badge ────────────────────────────────────────────────────────
function StepBadge({ num, done }) {
  return (
    <div className="step-dot" style={{
      width: 26, height: 26, borderRadius: '50%',
      background: done ? '#152340' : '#dde4f2',
      color: done ? '#fff' : '#3d5fa0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700, flexShrink: 0,
    }}>{num}</div>
  );
}