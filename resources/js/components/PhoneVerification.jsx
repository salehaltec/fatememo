import { useState } from 'react';
import { api } from './leadApi';

export default function PhoneVerification({ assessment, onVerified, accent = '#2563eb', dark = false }) {
  const [phone, setPhone] = useState(localStorage.getItem('verified_phone') || '');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fg = dark ? '#f8fafc' : '#172033', muted = dark ? '#94a3b8' : '#64748b', surface = dark ? '#161b2d' : '#fff';
  const input = {width:'100%',boxSizing:'border-box',padding:'12px 14px',borderRadius:10,border:'1px solid #94a3b866',background:dark?'#0f1424':'#fff',color:fg,fontSize:16,margin:'8px 0',direction:'ltr'};

  const send = async () => { setBusy(true); setError(''); try { await api('/api/otp/send',{method:'POST',body:JSON.stringify({phone})}); setSent(true); } catch(e){setError(e.message)} finally{setBusy(false)} };
  const verify = async () => { setBusy(true); setError(''); try {
    await api('/api/otp/verify',{method:'POST',body:JSON.stringify({phone,code})});
    await api('/api/assessments',{method:'POST',body:JSON.stringify(assessment)});
    localStorage.setItem('verified_phone', phone); onVerified(phone);
  } catch(e){setError(e.message)} finally{setBusy(false)} };

  return <div style={{maxWidth:520,margin:'32px auto',background:surface,color:fg,border:'1px solid #94a3b844',borderRadius:18,padding:'24px',boxShadow:'0 14px 40px #0002',fontFamily:'Vazirmatn, sans-serif'}}>
    <div style={{fontSize:28,marginBottom:8}}>🔐</div><h2 style={{margin:'0 0 8px'}}>مشاهده نتیجه با تأیید شماره موبایل</h2>
    <p style={{color:muted,lineHeight:1.8,fontSize:14}}>تحلیل شما آماده است. برای حفظ اطلاعات و نمایش نتیجه، شماره موبایل خود را تأیید کنید.</p>
    <input style={input} value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,'').slice(0,11))} placeholder="09xxxxxxxxx" inputMode="tel" disabled={sent}/>
    {sent && <input style={input} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="کد ۶ رقمی" inputMode="numeric" autoFocus/>}
    {error && <p style={{color:'#ef4444',fontSize:13}}>{error}</p>}
    <button disabled={busy || (sent ? code.length!==6 : !/^09\d{9}$/.test(phone))} onClick={sent?verify:send} style={{width:'100%',padding:13,border:0,borderRadius:10,background:accent,color:'#fff',fontWeight:800,fontSize:15,cursor:'pointer',opacity:busy ? .6 : 1}}>{busy?'لطفاً صبر کنید…':sent?'تأیید و مشاهده نتیجه':'ارسال کد تأیید'}</button>
    {sent && <button onClick={()=>{setSent(false);setCode('')}} style={{width:'100%',marginTop:8,background:'transparent',border:0,color:muted,cursor:'pointer'}}>اصلاح شماره / ارسال مجدد</button>}
  </div>;
}
