import { useState } from "react";
import { login } from "../services/authServices"; // Sesuaikan path sesuai struktur foldermu

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap');

  .login-body {
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
  .fade-up4 { animation: fadeUp 0.55s 0.3s ease both; }
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

  .btn-submit {
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
    cursor: pointer;
    border: none;
  }
  .btn-submit:hover  { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.25); }
  .btn-submit:active { transform: translateY(0px); }

  .tab-indicator {
    position: absolute;
    top: 4px; bottom: 4px; left: 4px;
    width: calc(50% - 4px);
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), background-color 0.3s ease;
  }

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

export default function Login() {
  const [activeTab, setActiveTab] = useState("admin");
  
  // State Admin
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const [adminShowPw, setAdminShowPw] = useState(false);
  const [adminRemember, setAdminRemember] = useState(false);
  const [adminErrors, setAdminErrors] = useState({});
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminSuccess, setAdminSuccess] = useState(false);

  // State Pelanggan
  const [pelEmail, setPelEmail] = useState("");
  const [pelPw, setPelPw] = useState("");
  const [pelShowPw, setPelShowPw] = useState(false);
  const [pelRemember, setPelRemember] = useState(false);
  const [pelErrors, setPelErrors] = useState({});
  const [pelLoading, setPelLoading] = useState(false);
  const [pelSuccess, setPelSuccess] = useState(false);

  // Handler Login Admin
  async function handleAdminSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!adminEmail.trim()) errs.email = true;
    if (!adminPw.trim()) errs.pw = true;
    setAdminErrors(errs);
    if (Object.keys(errs).length) return;

    setAdminLoading(true);
    
    try {
      // Memanggil fungsi dari authService
      const data = await login(adminEmail, adminPw, "admin");
      
      setAdminSuccess(true);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", "admin");
      
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      console.error("Gagal login admin:", error);
      alert(error.message || "Terjadi kesalahan pada server.");
    } finally {
      setAdminLoading(false);
    }
  }

  // Handler Login Pelanggan
  async function handlePelSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!pelEmail.trim()) errs.email = true;
    if (!pelPw.trim()) errs.pw = true;
    setPelErrors(errs);
    if (Object.keys(errs).length) return;

    setPelLoading(true);

    try {
      // Memanggil fungsi dari authService
      const data = await login(pelEmail.trim(), pelPw, "pelanggan".trim());
      
      setPelSuccess(true);
      localStorage.setItem("token", data.token);  
      localStorage.setItem("userRole", "pelanggan");
      
      setTimeout(() => {
        window.location.href = "/beranda";
      }, 1500);
    } catch (error) {
      console.error("Gagal login Pelanggan:", error);
      alert(error.message || "Terjadi kesalahan pada server.");
    } finally {
      setPelLoading(false);
    }
  }

  // Ikon SVG Komponen Pendukung
  const EyeIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/>
    </svg>
  );

  const SpinIcon = () => (
    <svg className="w-4 h-4 spin-anim" fill="none" viewBox="0 0 24 24">
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
      <div className="login-body">
        {/* Dekorasi Latar Belakang */}
        <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-128,left:-128,width:384,height:384,borderRadius:'50%',opacity:0.1,background:'radial-gradient(circle, #3d5fa0 0%, transparent 70%)'}}/>
          <div style={{position:'absolute',bottom:-128,right:-128,width:320,height:320,borderRadius:'50%',opacity:0.1,background:'radial-gradient(circle, #1e3155 0%, transparent 70%)'}}/>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:600,borderRadius:'50%',opacity:0.05,border:'1px solid white'}}/>
        </div>

        <div style={{position:'relative',zIndex:10,width:'100%',maxWidth:896,display:'flex',borderRadius:'1.5rem',overflow:'hidden',boxShadow:'0 32px 80px rgba(0,0,0,0.5)',minHeight:580}}>

          {/* PANEL KIRI (Informasi Hotel) */}
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

            {/* Ilustrasi Tengah */}
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',flex:1,margin:'2rem 0'}}>
              <div className="float-anim" style={{width:112,height:112,borderRadius:'50%',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:24}}>
                <div style={{width:80,height:80,borderRadius:'50%',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg style={{width:40,height:40,color:'rgba(255,255,255,0.7)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
              </div>

              <h2 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:'1.875rem',color:'white',textAlign:'center',lineHeight:1.35,marginBottom:12}}>
                Sistem Reservasi<br/><em>Hotel</em>
              </h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'0.875rem',textAlign:'center',lineHeight:1.6,maxWidth:192}}>
                Kelola reservasi kamar dengan mudah, cepat, dan terpercaya
              </p>

              <div style={{display:'flex',gap:24,marginTop:32}}>
                <div style={{textAlign:'center'}}>
                  <p style={{color:'white',fontWeight:700,fontSize:'1.25rem'}}>50+</p>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'0.75rem',marginTop:2}}>Kamar</p>
                </div>
                <div style={{width:1,background:'rgba(255,255,255,0.1)'}}/>
                <div style={{textAlign:'center'}}>
                  <p style={{color:'white',fontWeight:700,fontSize:'1.25rem'}}>3</p>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'0.75rem',marginTop:2}}>Tipe Kamar</p>
                </div>
                <div style={{width:1,background:'rgba(255,255,255,0.1)'}}/>
                <div style={{textAlign:'center'}}>
                  <p style={{color:'white',fontWeight:700,fontSize:'1.25rem'}}>24/7</p>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'0.75rem',marginTop:2}}>Layanan</p>
                </div>
              </div>
            </div>

            <p style={{position:'relative',color:'rgba(255,255,255,0.3)',fontSize:'0.75rem'}}>© 2024 Hotel Graha Nusantara</p>
          </div>

          {/* PANEL KANAN (Form Glassmorphism) */}
          <div className="glass-card" style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'2.5rem'}}>

            {/* Heading */}
            <div className="fade-up" style={{marginBottom:'1.75rem'}}>
              <h1 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:'1.875rem',color:'#1e3155',marginBottom:4}}>Selamat Datang</h1>
              <p style={{color:'#6b7280',fontSize:'0.875rem'}}>Masuk ke sistem reservasi Anda</p>
            </div>

            {/* Tab Switcher */}
            <div className="fade-up2" style={{marginBottom:'1.5rem'}}>
              <div style={{position:'relative',display:'flex',background:'#f3f4f6',borderRadius:'0.75rem',padding:4,gap:4}}>
                <div
                  className="tab-indicator"
                  style={{
                    background: activeTab === 'admin' ? '#1e3155' : '#2563a8',
                    transform: activeTab === 'admin' ? 'translateX(0)' : 'translateX(100%)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  style={{
                    position:'relative',zIndex:10,flex:1,display:'flex',alignItems:'center',justifyContent:'center',
                    gap:8,padding:'0.625rem 0',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:600,
                    color: activeTab === 'admin' ? 'white' : '#6b7280',
                    background:'none',border:'none',cursor:'pointer',transition:'color 0.3s',fontFamily:'inherit'
                  }}
                >
                  <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('pelanggan')}
                  style={{
                    position:'relative',zIndex:10,flex:1,display:'flex',alignItems:'center',justifyContent:'center',
                    gap:8,padding:'0.625rem 0',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:600,
                    color: activeTab === 'pelanggan' ? 'white' : '#6b7280',
                    background:'none',border:'none',cursor:'pointer',transition:'color 0.3s',fontFamily:'inherit'
                  }}
                >
                  <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Pelanggan
                </button>
              </div>
            </div>

            {/* FORM ADMIN */}
            {activeTab === 'admin' && (
              <form className="fade-up3" onSubmit={handleAdminSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                <div>
                  <label style={{display:'block',fontSize:'0.75rem',fontWeight:600,color:'#4b5563',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Email Admin</label>
                  <div style={{position:'relative'}}>
                    <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#9ca3af',pointerEvents:'none',display:'flex'}}>
                      <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="admin@grahanusantara.com"
                      value={adminEmail}
                      onChange={e => { setAdminEmail(e.target.value); setAdminErrors(p => ({...p,email:false})); }}
                      className={`input-field${adminErrors.email ? ' error' : ''}`}
                    />
                  </div>
                  {adminErrors.email && <ErrorMsg msg="Email tidak boleh kosong" />}
                </div>

                <div>
                  <label style={{display:'block',fontSize:'0.75rem',fontWeight:600,color:'#4b5563',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Password</label>
                  <div style={{position:'relative'}}>
                    <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#9ca3af',pointerEvents:'none',display:'flex'}}>
                      <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                    </span>
                    <input
                      type={adminShowPw ? 'text' : 'password'}
                      placeholder="Masukkan password"
                      value={adminPw}
                      onChange={e => { setAdminPw(e.target.value); setAdminErrors(p => ({...p,pw:false})); }}
                      className={`input-field${adminErrors.pw ? ' error' : ''}`}
                      style={{paddingRight:'2.5rem'}}
                    />
                    <button type="button" className="pw-toggle" onClick={() => setAdminShowPw(v => !v)}
                      style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)'}}>
                      {adminShowPw ? <EyeOffIcon/> : <EyeIcon/>}
                    </button>
                  </div>
                  {adminErrors.pw && <ErrorMsg msg="Password tidak boleh kosong" />}
                </div>

                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',userSelect:'none'}}>
                    <input type="checkbox" className="checkbox-custom" checked={adminRemember} onChange={e => setAdminRemember(e.target.checked)}/>
                    <span style={{fontSize:'0.875rem',color:'#6b7280'}}>Ingat saya</span>
                  </label>
                  <a href="#" style={{fontSize:'0.875rem',color:'#2d4a87',fontWeight:500,textDecoration:'none'}}>Lupa password?</a>
                </div>

                <button type="submit" className="btn-submit" disabled={adminLoading}
                  style={{width:'100%',padding:'0.875rem',background:'#1e3155',color:'white',borderRadius:'0.75rem',fontWeight:600,fontSize:'0.875rem',letterSpacing:'0.025em',fontFamily:'inherit'}}>
                  <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                    {adminLoading ? <><SpinIcon/> Memproses...</> : (
                      <><svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg> Masuk sebagai Admin</>
                    )}
                  </span>
                </button>

                {adminSuccess && (
                  <div style={{display:'flex',alignItems:'center',gap:12,padding:'0.875rem',background:'#ecfdf5',border:'1px solid #a7f3d0',borderRadius:'0.75rem',fontSize:'0.875rem',color:'#065f46'}}>
                    <svg style={{width:16,height:16,color:'#10b981',flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Login berhasil! Mengalihkan ke dashboard admin...</span>
                  </div>
                )}
              </form>
            )}

            {/* FORM PELANGGAN */}
            {activeTab === 'pelanggan' && (
              <form className="fade-up3" onSubmit={handlePelSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                <div>
                  <label style={{display:'block',fontSize:'0.75rem',fontWeight:600,color:'#4b5563',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Email Pelanggan</label>
                  <div style={{position:'relative'}}>
                    <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#9ca3af',pointerEvents:'none',display:'flex'}}>
                      <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="contoh@email.com"
                      value={pelEmail}
                      onChange={e => { setPelEmail(e.target.value); setPelErrors(p => ({...p,email:false})); }}
                      className={`input-field${pelErrors.email ? ' error' : ''}`}
                    />
                  </div>
                  {pelErrors.email && <ErrorMsg msg="Email tidak boleh kosong" />}
                </div>

                <div>
                  <label style={{display:'block',fontSize:'0.75rem',fontWeight:600,color:'#4b5563',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Password</label>
                  <div style={{position:'relative'}}>
                    <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#9ca3af',pointerEvents:'none',display:'flex'}}>
                      <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                    </span>
                    <input
                      type={pelShowPw ? 'text' : 'password'}
                      placeholder="Masukkan password"
                      value={pelPw}
                      onChange={e => { setPelPw(e.target.value); setPelErrors(p => ({...p,pw:false})); }}
                      className={`input-field${pelErrors.pw ? ' error' : ''}`}
                      style={{paddingRight:'2.5rem'}}
                    />
                    <button type="button" className="pw-toggle" onClick={() => setPelShowPw(v => !v)}
                      style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)'}}>
                      {pelShowPw ? <EyeOffIcon/> : <EyeIcon/>}
                    </button>
                  </div>
                  {pelErrors.pw && <ErrorMsg msg="Password tidak boleh kosong" />}
                </div>

                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',userSelect:'none'}}>
                    <input type="checkbox" className="checkbox-custom" checked={pelRemember} onChange={e => setPelRemember(e.target.checked)}/>
                    <span style={{fontSize:'0.875rem',color:'#6b7280'}}>Ingat saya</span>
                  </label>
                  <a href="#" style={{fontSize:'0.875rem',color:'#2563eb',fontWeight:500,textDecoration:'none'}}>Lupa password?</a>
                </div>

                <button type="submit" className="btn-submit" disabled={pelLoading}
                  style={{width:'100%',padding:'0.875rem',background:'#2563a8',color:'white',borderRadius:'0.75rem',fontWeight:600,fontSize:'0.875rem',letterSpacing:'0.025em',fontFamily:'inherit'}}>
                  <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                    {pelLoading ? <><SpinIcon/> Memproses...</> : (
                      <><svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                      </svg> Masuk sebagai Pelanggan</>
                    )}
                  </span>
                </button>

                {pelSuccess && (
                  <div style={{display:'flex',alignItems:'center',gap:12,padding:'0.875rem',background:'#ecfdf5',border:'1px solid #a7f3d0',borderRadius:'0.75rem',fontSize:'0.875rem',color:'#065f46'}}>
                    <svg style={{width:16,height:16,color:'#10b981',flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Login berhasil! Mengalihkan ke beranda pelanggan...</span>
                  </div>
                )}

                <div style={{textAlign:'center',paddingTop:4}}>
                  <p style={{fontSize:'0.875rem',color:'#6b7280'}}>
                    Belum punya akun?{' '}
                    <a href="/register" style={{fontWeight:600,color:'#2563eb',textDecoration:'none'}}>Daftar sekarang →</a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}