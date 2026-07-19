import { useState } from 'react';
import { api } from './leadApi';

export default function PhoneVerification({ assessment, onVerified, accent = '#2563eb', dark = false }) {
  const [phone, setPhone] = useState(localStorage.getItem('verified_phone') || '');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fg = dark ? '#f8fafc' : '#172033', muted = dark ? '#a8b3c7' : '#64748b';
  const glass = dark ? 'rgba(20,25,45,.72)' : 'rgba(255,255,255,.72)';
  const input = {width:'100%',boxSizing:'border-box',padding:'14px 16px',borderRadius:12,border:`1px solid ${dark?'rgba(255,255,255,.14)':'rgba(30,64,175,.16)'}`,background:dark?'rgba(7,11,24,.7)':'rgba(255,255,255,.68)',boxShadow:'inset 0 1px 0 rgba(255,255,255,.08)',color:fg,fontSize:16,margin:'8px 0',direction:'ltr',fontFamily:'Roboto, sans-serif',outline:'none'};

  const send = async () => { setBusy(true); setError(''); try { await api('/api/otp/send',{method:'POST',body:JSON.stringify({phone})}); setSent(true); } catch(e){setError(e.message)} finally{setBusy(false)} };
  const verify = async () => { setBusy(true); setError(''); try {
    await api('/api/otp/verify',{method:'POST',body:JSON.stringify({phone,code})});
    await api('/api/assessments',{method:'POST',body:JSON.stringify(assessment)});
    localStorage.setItem('verified_phone', phone); onVerified(phone);
  } catch(e){setError(e.message)} finally{setBusy(false)} };

  return <div style={{width:'100%',minHeight:'calc(100dvh - 5rem)',display:'grid',placeItems:'center',padding:'20px 0',boxSizing:'border-box'}}><div style={{position:'relative',width:'100%',maxWidth:540,margin:'0 auto',padding:'1px',borderRadius:24,background:`linear-gradient(135deg,${accent}aa,rgba(255,255,255,.18),${accent}35)`,boxShadow:`0 24px 80px ${accent}20,0 14px 44px rgba(0,0,0,.2)`,fontFamily:'Vazirmatn, sans-serif',overflow:'hidden'}}>
    <div style={{position:'absolute',width:210,height:210,borderRadius:'50%',background:accent,filter:'blur(90px)',opacity:.18,top:-110,right:-60,pointerEvents:'none'}} />
    <div style={{position:'relative',background:glass,backdropFilter:'blur(22px)',WebkitBackdropFilter:'blur(22px)',color:fg,borderRadius:23,padding:'clamp(22px,5vw,34px)',border:'1px solid rgba(255,255,255,.08)'}}>
    <div style={{width:56,height:56,display:'grid',placeItems:'center',fontSize:25,marginBottom:18,borderRadius:16,background:`linear-gradient(135deg,${accent}30,${accent}12)`,border:`1px solid ${accent}55`,boxShadow:`0 8px 26px ${accent}18`}}>✦</div>
    <div style={{display:'inline-flex',alignItems:'center',gap:7,color:accent,fontWeight:800,fontSize:12,letterSpacing:'.02em',marginBottom:8}}><span style={{width:7,height:7,borderRadius:'50%',background:accent,boxShadow:`0 0 12px ${accent}`}}/>  تحلیل کسب و کار شما انجام شد!</div>
    <h2 style={{margin:'0 0 9px',fontSize:'clamp(20px,4vw,27px)',lineHeight:1.5}}>تایید شماره همراه</h2>
    <p style={{color:muted,lineHeight:1.9,fontSize:14,margin:'0 0 18px'}}>برای حفظ محرمانگی اطلاعات و مشاهده تحلیل اختصاصی، شماره موبایل خود را با کد یک‌بارمصرف تایید کنید.</p>
    <input style={input} value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,'').slice(0,11))} placeholder="09xxxxxxxxx" inputMode="tel" disabled={sent}/>
    {sent && <input style={input} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="کد ۶ رقمی" inputMode="numeric" autoFocus/>}
    {error && <p style={{color:'#ef4444',fontSize:13}}>{error}</p>}
    <button disabled={busy || (sent ? code.length!==6 : !/^09\d{9}$/.test(phone))} onClick={sent?verify:send} style={{width:'100%',padding:14,border:`1px solid ${accent}`,borderRadius:12,background:`linear-gradient(135deg,${accent},${accent}cc)`,boxShadow:`0 10px 28px ${accent}35`,color:'#fff',fontWeight:800,fontSize:15,cursor:'pointer',fontFamily:'Vazirmatn, sans-serif',opacity:busy ? .6 : 1}}>{busy?'لطفاً صبر کنید…':sent?'تایید و مشاهده نتیجه ←':'ارسال کد ←'}</button>
    {sent && <button onClick={()=>{setSent(false);setCode('')}} style={{width:'100%',marginTop:10,padding:8,background:'transparent',border:0,color:muted,cursor:'pointer',fontFamily:'Vazirmatn, sans-serif'}}>اصلاح شماره / ارسال مجدد</button>}
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:7,color:muted,fontSize:11,marginTop:15}}><span>🔒</span> شماره شما محرمانه باقی می‌ماند</div>
    </div>
  </div></div>;
}
