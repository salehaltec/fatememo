import{j as e,c as a}from"./client-Bh-W1TDz.js";const t={bg0:"#0f0c29",bg1:"#1a1a2e",bg2:"#16213e",surface:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)",text:"#f8fafc",muted:"#94a3b8",gold:"#f59e0b",goldLight:"#fbbf24",goldDeep:"#d97706",violet:"#8b5cf6",violetDeep:"#6366f1",violetLight:"#a78bfa",teal:"#2dd4bf",tealDeep:"#0d9488",tealLight:"#5eead4"},n="'Vazirmatn','Segoe UI',Tahoma,sans-serif",s=[{title:"Business Check",desc:"کسب و کارتان واقعا کجا ایستاده؟",href:"/business-check",accent:t.violet,accentDeep:t.violetDeep,accentLight:t.violetLight},{title:"Business Systemization",desc:"کسب و کاری که بدون شما کار کند",href:"/business-systemization",accent:t.teal,accentDeep:t.tealDeep,accentLight:t.tealLight},{title:"Business Consulting, Coaching & Mentoring",desc:"مشاور اشتباه، گران‌تر از نداشتن مشاور",href:"/business-consultant",accent:t.gold,accentDeep:t.goldDeep,accentLight:t.goldLight}];function l(){return e.jsxs("div",{style:i.page,children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .tool-row { transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease; }
        .tool-row:hover { transform: translateY(-4px); }
        .tool-row:hover .advisor-img { transform: translateY(-6px) scale(1.02); }
        a.tool-link { text-decoration: none; display: block; }

        .row-image { width: 180px; }

        .advisor-img {
          height: 250px;
          width: auto;
          max-width: none;
          object-fit: contain;
          margin-top: -90px;
          margin-bottom: -46px;
          filter: drop-shadow(0 14px 24px rgba(0,0,0,0.45));
          transition: transform .35s ease;
        }

        @media (max-width: 720px) {
          .tool-row {
            flex-direction: column;
            padding-top: 130px;
            padding-left: 24px;
            padding-right: 24px;
          }
          .row-content { align-items: center !important; max-width: 100% !important; text-align: center; }
          .row-title, .row-desc { text-align: center !important; direction: rtl !important; }
          .row-image {
            position: absolute !important;
            top: -55px !important;
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            width: auto !important;
          }
          .advisor-img {
            height: 150px !important;
            width: auto !important;
            max-width: none !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          .cta-pill { margin: 6px auto 0 !important; }
        }
      `}),e.jsx("div",{style:i.glowViolet}),e.jsx("div",{style:i.glowGold}),e.jsx("div",{style:i.container,children:s.map(r=>e.jsx("a",{href:r.href,className:"tool-link",children:e.jsxs("div",{className:"tool-row",style:{...i.row,borderColor:t.border},onMouseEnter:o=>{o.currentTarget.style.borderColor=r.accent+"66",o.currentTarget.style.boxShadow=`0 12px 36px ${r.accent}2e`},onMouseLeave:o=>{o.currentTarget.style.borderColor=t.border,o.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.2)"},children:[e.jsxs("div",{className:"row-content",style:i.rowContent,children:[e.jsx("div",{className:"row-title-glass",style:i.titleGlass,children:e.jsx("h2",{className:"row-title",style:{...i.title,background:`linear-gradient(90deg, ${r.accentLight}, ${r.accent} 55%, ${r.accentDeep})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:r.title})}),e.jsx("p",{className:"row-desc",style:i.desc,children:r.desc}),e.jsxs("div",{className:"cta-pill",style:{...i.cta,color:r.accent,borderColor:r.accent+"40"},children:["بیشتر بخوانید",e.jsx("span",{style:{fontSize:16},children:"‹"})]})]}),e.jsxs("div",{className:"row-image",style:i.rowImage,children:[e.jsx("img",{src:"/images/advisor.png",alt:"",className:"advisor-img",style:i.advisorImg}),e.jsx("div",{style:{...i.imageGlow,background:`radial-gradient(circle, ${r.accent}33, transparent 70%)`}})]})]})},r.href))})]})}const i={page:{minHeight:"100vh",width:"100%",background:`linear-gradient(135deg, ${t.bg0} 0%, ${t.bg1} 50%, ${t.bg2} 100%)`,fontFamily:n,color:t.text,direction:"rtl",position:"relative",overflow:"hidden",padding:"80px 0 100px"},glowViolet:{position:"absolute",top:-120,right:-100,width:420,height:420,borderRadius:"50%",background:"rgba(139,92,246,0.20)",filter:"blur(90px)",pointerEvents:"none"},glowGold:{position:"absolute",bottom:-140,left:-120,width:460,height:460,borderRadius:"50%",background:"rgba(245,158,11,0.14)",filter:"blur(100px)",pointerEvents:"none"},container:{position:"relative",maxWidth:980,margin:"0 auto",padding:"0 24px"},row:{position:"relative",display:"flex",alignItems:"center",justifyContent:"space-between",background:t.surface,border:`1px solid ${t.border}`,borderRadius:24,padding:"36px 48px",marginBottom:64,cursor:"pointer"},rowContent:{display:"flex",flexDirection:"column",alignItems:"flex-start",maxWidth:560,zIndex:2},titleGlass:{display:"inline-block",padding:"10px 20px",borderRadius:16,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.14)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",marginBottom:14},title:{fontFamily:"'Vazirmatn', sans-serif",fontSize:25,fontWeight:900,margin:0,textAlign:"right"},desc:{fontSize:14.5,lineHeight:1.9,color:t.muted,margin:"0 0 22px"},cta:{display:"inline-flex",alignItems:"center",gap:8,fontSize:14,fontWeight:700,padding:"11px 20px",borderRadius:999,border:`1px solid ${t.border}`},rowImage:{position:"relative",flexShrink:0,display:"flex",justifyContent:"center",zIndex:3},advisorImg:{position:"relative"},imageGlow:{position:"absolute",bottom:-20,width:160,height:60,borderRadius:"50%",filter:"blur(20px)",zIndex:-1}},d=document.getElementById("root");a.createRoot(d).render(e.jsx(l,{}));
