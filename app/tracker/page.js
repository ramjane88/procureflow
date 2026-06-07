"use client";
import{useState,useCallback,useEffect}from"react";
import Nav from"@/components/Nav";
import IndentCard from"@/components/IndentCard";
import Toast from"@/components/Toast";
import{STAGES,STAGE_COLORS}from"@/lib/constants";
export default function TrackerPage(){
  const[indents,setIndents]=useState([]);
  const[loading,setLoading]=useState(true);
  const[filter,setFilter]=useState("All");
  const[search,setSearch]=useState("");
  const[toast,setToast]=useState(null);
  const refresh=useCallback(async()=>{
    const res=await fetch("/api/indents");
    if(res.ok)setIndents(await res.json());
    setLoading(false);
  },[]);
  useEffect(()=>{refresh();},[]);
  const advance=async(indent)=>{
    const res=await fetch(`/api/indents/${indent.id}/advance`,{method:"PATCH"});
    const data=await res.json();
    if(!res.ok){setToast({msg:data.error,type:"error"});return;}
    await refresh();
    setToast({msg:`${indent.id} → ${data.stage}`,type:"success"});
  };
  const counts=STAGES.reduce((a,s)=>({...a,[s]:indents.filter(r=>r.stage===s).length}),{});
  const filtered=indents.filter(r=>{
    const ms=filter==="All"||r.stage===filter;
    const mq=!search||[r.id,r.item,r.vendor,r.dept].some(f=>f?.toLowerCase().includes(search.toLowerCase()));
    return ms&&mq;
  });
  return(
    <div>
      <Toast message={toast?.msg} type={toast?.type} onDone={()=>setToast(null)}/>
      <Nav count={indents.length}/>
      <div style={{padding:"28px",maxWidth:1140,margin:"0 auto"}}>
        <div style={{fontSize:18,fontWeight:800,color:"var(--cyan)",marginBottom:4}}>Indent Tracker</div>
        <div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-mono)",marginBottom:22}}>Live status — advance stages, track every record</div>
        <input placeholder="Search by ID, item, vendor, department..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:420,marginBottom:16}}/>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24}}>
          {["All",...STAGES].map(s=>{
            const active=filter===s;
            const cnt=s==="All"?indents.length:(counts[s]||0);
            const col=STAGE_COLORS[s]||"var(--gold)";
            return(<button key={s} onClick={()=>setFilter(s)} style={{padding:"6px 14px",borderRadius:999,border:"none",fontSize:11,fontFamily:"var(--font-mono)",fontWeight:600,background:active?col:"var(--border)",color:active?"#000":"var(--muted)",transition:"all 0.2s"}}>{s} ({cnt})</button>);
          })}
        </div>
        {loading?<div style={{textAlign:"center",padding:"60px",color:"var(--muted)",fontFamily:"v
cat > app/tracker/page.js << 'EOF'
"use client";
import{useState,useCallback,useEffect}from"react";
import Nav from"@/components/Nav";
import IndentCard from"@/components/IndentCard";
import Toast from"@/components/Toast";
import{STAGES,STAGE_COLORS}from"@/lib/constants";
export default function TrackerPage(){
  const[indents,setIndents]=useState([]);
  const[loading,setLoading]=useState(true);
  const[filter,setFilter]=useState("All");
  const[search,setSearch]=useState("");
  const[toast,setToast]=useState(null);
  const refresh=useCallback(async()=>{
    const res=await fetch("/api/indents");
    if(res.ok)setIndents(await res.json());
    setLoading(false);
  },[]);
  useEffect(()=>{refresh();},[]);
  const advance=async(indent)=>{
    const res=await fetch(`/api/indents/${indent.id}/advance`,{method:"PATCH"});
    const data=await res.json();
    if(!res.ok){setToast({msg:data.error,type:"error"});return;}
    await refresh();
    setToast({msg:`${indent.id} → ${data.stage}`,type:"success"});
  };
  const counts=STAGES.reduce((a,s)=>({...a,[s]:indents.filter(r=>r.stage===s).length}),{});
  const filtered=indents.filter(r=>{
    const ms=filter==="All"||r.stage===filter;
    const mq=!search||[r.id,r.item,r.vendor,r.dept].some(f=>f?.toLowerCase().includes(search.toLowerCase()));
    return ms&&mq;
  });
  return(
    <div>
      <Toast message={toast?.msg} type={toast?.type} onDone={()=>setToast(null)}/>
      <Nav count={indents.length}/>
      <div style={{padding:"28px",maxWidth:1140,margin:"0 auto"}}>
        <div style={{fontSize:18,fontWeight:800,color:"var(--cyan)",marginBottom:4}}>Indent Tracker</div>
        <div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-mono)",marginBottom:22}}>Live status — advance stages, track every record</div>
        <input placeholder="Search by ID, item, vendor, department..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:420,marginBottom:16}}/>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24}}>
          {["All",...STAGES].map(s=>{
            const active=filter===s;
            const cnt=s==="All"?indents.length:(counts[s]||0);
            const col=STAGE_COLORS[s]||"var(--gold)";
            return(<button key={s} onClick={()=>setFilter(s)} style={{padding:"6px 14px",borderRadius:999,border:"none",fontSize:11,fontFamily:"var(--font-mono)",fontWeight:600,background:active?col:"var(--border)",color:active?"#000":"var(--muted)",transition:"all 0.2s"}}>{s} ({cnt})</button>);
          })}
        </div>
        {loading?<div style={{textAlign:"center",padding:"60px",color:"var(--muted)",fontFamily:"var(--font-mono)"}}>Loading...</div>
        :filtered.length===0?<div style={{textAlign:"center",padding:"60px",color:"var(--border2)",fontFamily:"var(--font-mono)",fontSize:13}}>No records found</div>
        :<div style={{display:"flex",flexDirection:"column",gap:12}}>{filtered.map(r=><IndentCard key={r.id} indent={r} onAdvance={advance} showRail/>)}</div>}
      </div>
    </div>
  );
}
