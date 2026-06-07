"use client";
import{useState,useCallback}from"react";
import Nav from"@/components/Nav";
import StatCard from"@/components/StatCard";
import IndentCard from"@/components/IndentCard";
import Toast from"@/components/Toast";
import{STAGES,STAGE_COLORS}from"@/lib/constants";
export default function DashboardClient({initialIndents}){
  const[indents,setIndents]=useState(initialIndents||[]);
  const[toast,setToast]=useState(null);
  const refresh=useCallback(async()=>{
    const res=await fetch("/api/indents");
    if(res.ok)setIndents(await res.json());
  },[]);
  const advance=async(indent)=>{
    const res=await fetch("/api/indents/"+indent.id+"/advance",{method:"PATCH"});
    const data=await res.json();
    if(!res.ok){setToast({msg:data.error,type:"error"});return;}
    await refresh();
    setToast({msg:indent.id+" moved to "+data.stage,type:"success"});
  };
  const counts=STAGES.reduce((a,s)=>({...a,[s]:indents.filter(r=>r.stage===s).length}),{});
  const completed=indents.filter(r=>r.stage==="Receipt").length;
  return(
    <div>
      <Toast message={toast&&toast.msg} type={toast&&toast.type} onDone={()=>setToast(null)}/>
      <Nav count={indents.length}/>
      <div style={{padding:"28px",maxWidth:1140,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:14,marginBottom:28}}>
          <StatCard label="Total" value={indents.length} color="var(--cyan)"/>
          <StatCard label="In Progress" value={indents.length-completed} color="var(--gold)"/>
          <StatCard label="Completed" value={completed} color="var(--green)"/>
          <StatCard label="GRN Pending" value={counts["GRN / Inward"]||0} color="var(--purple)"/>
          <StatCard label="At Invoice" value={counts["Invoice"]||0} color="var(--blue)"/>
        </div>
        <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:20,marginBottom:28}}>
          <div style={{fontSize:10,color:"var(--muted)",fontFamily:"var(--font-mono)",textTransform:"uppercase",letterSpacing:1,marginBottom:16}}>Pipeline Overview</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {STAGES.map(s=>(
              <div key={s} style={{flex:1,minWidth:72,background:"var(--card)",border:"1px solid "+STAGE_COLORS[s]+"33",borderTop:"3px solid "+STAGE_COLORS[s],borderRadius:10,padding:"12px 8px",textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:800,color:STAGE_COLORS[s]}}>{counts[s]||0}</div>
                <div style={{fontSize:8,color:"var(--muted)",fontFamily:"var(--font-mono)",textTransform:"uppercase",marginTop:4}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-mono)",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>Recent Indents</div>
        {indents.length===0&&(
          <div style={{textAlign:"center",padding:"60px",color:"var(--border2)",fontFamily:"var(--font-mono)",fontSize:13}}>
            No indents yet. <a href="/indent/new" style={{color:"var(--gold)"}}>Raise the first one</a>
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {indents.slice(0,8).map(r=><IndentCard key={r.id} indent={r} onAdvance={advance}/>)}
        </div>
        <div style={{marginTop:40,textAlign:"center",fontSize:11,color:"var(--border2)",fontFamily:"var(--font-mono)",borderTop:"1px solid var(--border)",paddingTop:20}}>
          PROCUREFLOW · Created by Sandeep Kumar Vattipally · Paperwork to Digital
        </div>
      </div>
    </div>
  );
}
