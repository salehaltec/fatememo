import { useEffect, useState } from 'react';
import { api } from './leadApi';

export default function SharedContactForm({ source, service = '', dark = false, onSuccess }) {
  const [f,setF]=useState({name:'',email:'',business_name:'',service,message:''});
  const [busy,setBusy]=useState(false),[done,setDone]=useState(false),[error,setError]=useState('');
  useEffect(()=>{ api('/api/contact-profile').then(r=>{if(r.data)setF(x=>({name:r.data.name||'',email:r.data.email||'',business_name:r.data.business_name||'',service:service||r.data.service||'',message:r.data.message||''}))}).catch(()=>{}); },[service]);
  const change=k=>e=>setF({...f,[k]:e.target.value});
  const submit=async()=>{setBusy(true);setError('');try{await api('/api/contact-requests',{method:'POST',body:JSON.stringify({...f,source})});localStorage.setItem('lead_profile',JSON.stringify(f));setDone(true);onSuccess?.(f)}catch(e){setError(e.message)}finally{setBusy(false)}};
  const fg=dark?'#f8fafc':'#172033', bg=dark?'#161b2d':'#fff'; const input={width:'100%',boxSizing:'border-box',padding:'12px',borderRadius:9,border:'1px solid #94a3b866',background:dark?'#0f1424':'#fff',color:fg,margin:'6px 0 14px',fontFamily:'inherit'};
  if(done)return <div style={{textAlign:'center',padding:30,color:fg}}><div style={{fontSize:42}}>✅</div><h3>درخواست شما ثبت شد</h3><p>در اولین فرصت با شما تماس گرفته می‌شود.</p></div>;
  return <div style={{background:bg,color:fg,border:'1px solid #94a3b844',borderRadius:16,padding:22}}><h3 style={{marginTop:0}}>درخواست تماس</h3><p style={{fontSize:13,color:'#94a3b8'}}>اگر قبلاً اطلاعات خود را ثبت کرده باشید، این فرم خودکار تکمیل می‌شود.</p>
    <label>نام و نام خانوادگی *</label><input style={input} value={f.name} onChange={change('name')}/>
    <label>ایمیل</label><input style={input} value={f.email} onChange={change('email')} dir="ltr"/>
    <label>نام کسب‌وکار</label><input style={input} value={f.business_name} onChange={change('business_name')}/>
    <label>خدمت مورد نظر</label><input style={input} value={f.service} onChange={change('service')}/>
    <label>توضیحات / چالش اصلی</label><textarea style={{...input,minHeight:90}} value={f.message} onChange={change('message')}/>
    {error&&<p style={{color:'#ef4444'}}>{error}</p>}<button onClick={submit} disabled={!f.name||busy} style={{width:'100%',border:0,borderRadius:10,padding:13,background:'#2563eb',color:'#fff',fontWeight:800,opacity:!f.name||busy ? .5 : 1}}>{busy?'در حال ثبت…':'ثبت درخواست تماس'}</button>
  </div>;
}
