import { useState } from "react";
import { registerCustomer } from "../services/authServices"; // Sesuaikan path folder service Anda

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap');

  .register-body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #0d1728;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
      radial-gradient(circle at 20% 50%, rgba(61,95,160,0.25) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(30,49,85,0.4) 0%, transparent 40%);
    background-size: 60px 60px, 60px 60px, auto, auto;
  }

  @keyframes fadeUp {
    0%   { opacity: 0; transform: translateY(18px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .fade-up  { animation: fadeUp 0.55s ease both; }
  .fade-up2 { animation: fadeUp 0.55s 0.1s ease both; }
  .fade-up3 { animation: fadeUp 0.55s 0.2s ease both; }
  .float-anim { animation: float 4s ease-in-out infinite; }
  .spin-anim  { animation: spin 1s linear infinite; }

  .glass-card {
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(20px);
  }

  .input-field {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    color: #1f2937;
    background-color: rgba(249,250,251,0.6);
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
    outline: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .input-field::placeholder { color: #9ca3af; }
  .input-field:focus {
    border-color: #3d5fa0;
    box-shadow: 0 0 0 3px rgba(61,95,160,0.15);
    background-color: #fff;
  }
  .input-field.error {
    border-color: #e24b4a;
    box-shadow: 0 0 0 3px rgba(226,75,74,0.12);
  }

  .input-no-icon {
    padding-left: 1rem;
  }

  .btn-submit {
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
    cursor: pointer;
    border: none;
  }
  .btn-submit:hover  { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.25); }
  .btn-submit:active { transform: translateY(0px); }

  .pw-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    transition: color 0.15s;
    padding: 0;
    display: flex;
    align-items: center;
  }
  .pw-toggle:hover { color: #1e3155; }

  .checkbox-custom {
    accent-color: #1e3155;
    width: 14px;
    height: 14px;
  }
`;

export default function Register() {
  const [form, setForm] = useState({
    nama: '', email: '', noHp: '', password: '', konfirmasi: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function setField(key, val) {
    setForm(p => ({ ...p, [key]: val }));
    setErrors(p => ({ ...p, [key]: false, server: false }));
  }

  function validate() {
    const errs = {};
    if (!form.nama.trim())        errs.nama = 'Nama lengkap tidak boleh kosong';
    if (!form.email.trim())       errs.email = 'Email tidak boleh kosong';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Format email tidak valid';
    if (!form.noHp.trim())        errs.noHp = 'Nomor HP tidak boleh kosong';
    if (!form.password.trim())    errs.password = 'Password tidak boleh kosong';
    else if (form.password.length < 8) errs.password = 'Password minimal 8 karakter';
    if (!form.konfirmasi.trim()) errs.konfirmasi = 'Konfirmasi password tidak boleh kosong';
    else if (form.password !== form.konfirmasi) errs.konfirmasi = 'Password tidak cocok';
    if (!agree)                  errs.agree = 'Anda harus menyetujui syarat & ketentuan';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setSuccess(false);

  try {
    // Panggil langsung nilainya secara terpisah (tanpa dibungkus kurung kurawal {})
    await registerCustomer(
      form.nama,
      form.email,
      form.noHp,
      form.password
    );

    setSuccess(true);
    setForm({ nama: '', email: '', noHp: '', password: '', konfirmasi: '' });
    setAgree(false);
    } catch (error) {
      // Menangkap pesan error dari throw Error di service atau kendala jaringan
      setErrors({ server: error.message || 'Gagal terhubung ke server backend.' });
    } finally {
      setLoading(false);
    }
  }

  const EyeIcon = () => (
    <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/>
    </svg>
  );

  const SpinIcon = () => (
    <svg className="spin-anim" style={{width:16,height:16}} fill="none" viewBox="0 0 24 24">
      <circle style={{opacity:0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path style={{opacity:0.75}} fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
    </svg>
  );

  const ErrorMsg = ({ msg }) => (
    <p style={{display:'flex',alignItems:'center',gap:4,color:'#ef4444',fontSize:'0.75rem',marginTop:'0.375rem'}}>
      <svg style={{width:12,height:12,flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {msg}
    </p>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="register-body">

        {/* Decorative blobs */}
        <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-128,left:-128,width:384,height:384,borderRadius:'50%',opacity:0.1,background:'radial-gradient(circle, #3d5fa0 0%, transparent 70%)'}}/>
          <div style={{position:'absolute',bottom:-128,right:-128,width:320,height:320,borderRadius:'50%',opacity:0.1,background:'radial-gradient(circle, #1e3155 0%, transparent 70%)'}}/>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:600,borderRadius:'50%',opacity:0.05,border:'1px solid white'}}/>
        </div>

        <div style={{position:'relative',zIndex:10,width:'100%',maxWidth:896,display:'flex',borderRadius:'1.5rem',overflow:'hidden',boxShadow:'0 32px 80px rgba(0,0,0,0.5)'}}>

          {/* LEFT PANEL */}
          <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'41.666%',background:'#152340',padding:'2.5rem',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,opacity:0.1,backgroundImage:'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',backgroundSize:'24px 24px'}}/>
            <div style={{position:'absolute',bottom:0,right:0,width:256,height:256,opacity:0.05,borderRadius:'50%',border:'2px solid white',transform:'translate(64px,64px)'}}/>
            <div style={{position:'absolute',top:'25%',left:-32,width:160,height:160,opacity:0.05,borderRadius:'50%',border:'1px solid white'}}/>

            {/* Logo */}
            <div className="fade-up" style={{position:'relative'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <div style={{width:40,height:40,borderRadius:'0.75rem',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg style={{width:20,height:20,color:'white'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div>
                  <p style={{color:'white',fontWeight:600,fontSize:'0.875rem',lineHeight:1.25}}>Hotel Graha</p>
                  <p style={{color:'white',fontWeight:600,fontSize:'0.875rem',lineHeight:1.25}}>Nusantara</p>
                </div>
              </div>
            </div>

            {/* Center illustration */}
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',flex:1,margin:'2rem 0'}}>
              <div className="float-anim" style={{width:112,height:112,borderRadius:'50%',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:24}}>
                <div style={{width:80,height:80,borderRadius:'50%',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg style={{width:40,height:40,color:'rgba(255,255,255,0.7)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  </svg>
                </div>
              </div>

              <h2 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:'1.875rem',color:'white',textAlign:'center',lineHeight:1.35,marginBottom:12}}>
                Daftar Akun<br/><em>Pelanggan</em>
              </h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'0.875rem',textAlign:'center',lineHeight:1.6,maxWidth:192}}>
                Buat akun dan nikmati kemudahan reservasi kamar hotel kami
              </p>

              {/* Steps */}
              <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:28,width:'100%'}}>
                {[
                  { n:'1', label:'Isi data diri Anda' },
                  { n:'2', label:'Verifikasi email' },
                  { n:'3', label:'Mulai reservasi!' },
                ].map(s => (
                  <div key={s.n} style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:24,height:24,borderRadius:'50%',background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <span style={{color:'white',fontSize:'0.7rem',fontWeight:700}}>{s.n}</span>
                    </div>
                    <span style={{color:'rgba(255,255,255,0.55)',fontSize:'0.8rem'}}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <p style={{position:'relative',color:'rgba(255,255,255,0.3)',fontSize:'0.75rem'}}>© 2024 Hotel Graha Nusantara</p>
          </div>

          {/* RIGHT PANEL */}
          <div className="glass-card" style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'2.5rem',overflowY:'auto'}}>

            {/* Heading */}
            <div className="fade-up" style={{marginBottom:'1.5rem'}}>
              <h1 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:'1.875rem',color:'#1e3155',marginBottom:4}}>Buat Akun Baru</h1>
              <p style={{color:'#6b7280',fontSize:'0.875rem'}}>Daftar sebagai pelanggan Hotel Graha Nusantara</p>
            </div>

            <form className="fade-up2" onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>

              {/* Nama */}
              <div>
                <label style={{display:'block',fontSize:'0.75rem',fontWeight:600,color:'#4b5563',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Nama Lengkap</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#9ca3af',pointerEvents:'none',display:'flex'}}>
                    <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Nama lengkap Anda"
                    value={form.nama}
                    onChange={e => setField('nama', e.target.value)}
                    className={`input-field${errors.nama ? ' error' : ''}`}
                  />
                </div>
                {errors.nama && <ErrorMsg msg={errors.nama} />}
              </div>

              {/* Email */}
              <div>
                <label style={{display:'block',fontSize:'0.75rem',fontWeight:600,color:'#4b5563',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Email</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#9ca3af',pointerEvents:'none',display:'flex'}}>
                    <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="contoh@email.com"
                    value={form.email}
                    onChange={e => setField('email', e.target.value)}
                    className={`input-field${errors.email ? ' error' : ''}`}
                  />
                </div>
                {errors.email && <ErrorMsg msg={errors.email} />}
              </div>

              {/* No HP */}
              <div>
                <label style={{display:'block',fontSize:'0.75rem',fontWeight:600,color:'#4b5563',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Nomor HP</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#9ca3af',pointerEvents:'none',display:'flex'}}>
                    <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </span>
                  <input
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={form.noHp}
                    onChange={e => setField('noHp', e.target.value)}
                    className={`input-field${errors.noHp ? ' error' : ''}`}
                  />
                </div>
                {errors.noHp && <ErrorMsg msg={errors.noHp} />}
              </div>

              {/* Password */}
              <div>
                <label style={{display:'block',fontSize:'0.75rem',fontWeight:600,color:'#4b5563',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Password</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#9ca3af',pointerEvents:'none',display:'flex'}}>
                    <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  </span>
                  <input
                    type={showPw ? 'text' : 'password'}
                    placeholder="Minimal 8 karakter"
                    value={form.password}
                    onChange={e => setField('password', e.target.value)}
                    className={`input-field${errors.password ? ' error' : ''}`}
                    style={{paddingRight:'2.5rem'}}
                  />
                  <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)}
                    style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)'}}>
                    {showPw ? <EyeOffIcon/> : <EyeIcon/>}
                  </button>
                </div>
                {errors.password && <ErrorMsg msg={errors.password} />}
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label style={{display:'block',fontSize:'0.75rem',fontWeight:600,color:'#4b5563',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Konfirmasi Password</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#9ca3af',pointerEvents:'none',display:'flex'}}>
                    <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </span>
                  <input
                    type={showKonfirmasi ? 'text' : 'password'}
                    placeholder="Ulangi password Anda"
                    value={form.konfirmasi}
                    onChange={e => setField('konfirmasi', e.target.value)}
                    className={`input-field${errors.konfirmasi ? ' error' : ''}`}
                    style={{paddingRight:'2.5rem'}}
                  />
                  <button type="button" className="pw-toggle" onClick={() => setShowKonfirmasi(v => !v)}
                    style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)'}}>
                    {showKonfirmasi ? <EyeOffIcon/> : <EyeIcon/>}
                  </button>
                </div>
                {errors.konfirmasi && <ErrorMsg msg={errors.konfirmasi} />}
              </div>

              {/* Syarat & Ketentuan */}
              <div>
                <label style={{display:'flex',alignItems:'flex-start',gap:8,cursor:'pointer',userSelect:'none'}}>
                  <input type="checkbox" className="checkbox-custom" checked={agree} onChange={e => { setAgree(e.target.checked); setErrors(p => ({...p,agree:false})); }} style={{marginTop:2}}/>
                  <span style={{fontSize:'0.875rem',color:'#6b7280',lineHeight:1.5}}>
                    Saya menyetujui{' '}
                    <a href="#" style={{color:'#2563eb',fontWeight:500,textDecoration:'none'}}>Syarat & Ketentuan</a>
                    {' '}dan{' '}
                    <a href="#" style={{color:'#2563eb',fontWeight:500,textDecoration:'none'}}>Kebijakan Privasi</a>
                    {' '}Hotel Graha Nusantara
                  </span>
                </label>
                {errors.agree && <ErrorMsg msg={errors.agree} />}
              </div>

              {/* Error dari Server Backend */}
              {errors.server && (
                <div style={{display:'flex',alignItems:'center',gap:12,padding:'0.875rem',background:'#fef2f2',border:'1px solid #fee2e2',borderRadius:'0.75rem',fontSize:'0.875rem',color:'#991b1b'}}>
                  <svg style={{width:16,height:16,color:'#ef4444',flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {errors.server}
                </div>
              )}

              <button type="submit" className="btn-submit" disabled={loading}
                style={{width:'100%',padding:'0.875rem',background:'#2563a8',color:'white',borderRadius:'0.75rem',fontWeight:600,fontSize:'0.875rem',letterSpacing:'0.025em',fontFamily:'inherit',marginTop:4,opacity:loading ? 0.7 : 1}}>
                <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                  {loading ? <><SpinIcon/> Memproses...</> : (
                    <><svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                    </svg> Daftar Sekarang</>
                  )}
                </span>
              </button>

              {success && (
                <div style={{display:'flex',alignItems:'center',gap:12,padding:'0.875rem',background:'#ecfdf5',border:'1px solid #a7f3d0',borderRadius:'0.75rem',fontSize:'0.875rem',color:'#065f46'}}>
                  <svg style={{width:16,height:16,color:'#10b981',flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  Registrasi berhasil! Akun pelanggan Anda telah aktif.
                </div>
              )}

              <div style={{textAlign:'center',paddingTop:4}}>
                <p style={{fontSize:'0.875rem',color:'#6b7280'}}>
                  Sudah punya akun?{' '}
                  <a href="/login" style={{fontWeight:600,color:'#2563eb',textDecoration:'none'}}>Masuk di sini →</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}