"use client";
import{useState}from"react";
import Badge from"./Badge";
import StageRail from"./StageRail";
import{STAGE_COLORS,STAGES,VALIDATIONS}from"@/lib/constants";
export default function IndentCard({indent,onAdvance,onUpdate,showRail=false}){
  const{id,item,qty,unit,dept,vendor,po_number,remarks,stage,created_at}=indent;
  const c=STAGE_COLORS[stage];
  const idx=STAGES.indexOf(stage);
  const nextStage=idx<STAGES.length-1?STAGES[idx+1]:null;
  const validation=nextStage?VALIDATIONS[nextStage]:null;
  const date=new Date(created_at).toLocaleDateString("en-IN");
  const[editPO,setEditPO]=useState(false);
  const[poVal,setPoVal]=useState(po_number||"");
  const[saving,setSaving]=useState(false);
  const savePO=async()=>{
    setSaving(true);
    try{
      const res=await fetch("/api/indents/"+id,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({po_number:poVal})});
      if(res.ok&&onUpdate)onUpdate();
      setEditPO(false);
    }finally{setSaving(false);}
  };
  return(
    <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderLeft:"4px solid "+c,borderRadius:14,padding:"18px 20px",transition:"transform 0.15s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{item}</div>
          <div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-mono)",lineHeight:1.9}}>
            {id} · {dept} · {qty} {unit}<br/>
            Vendor: {vendor}
            {remarks&&<span style={{color:"var(--orange)"}}><br/>⚑ {remarks}</span>}
            <br/><span style={{color:"var(--border2)"}}>{date}</span>
          </div>
          <div style={{marginTop:8,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            {editPO?(
              <>
                <input value={poVal} onChange={e=>setPoVal(e.target.value)} placeholder="PO-2024-XXX" style={{width:140,padding:"4px 8px",fontSize:11,fontFamily:"var(--font-mono)",background:"var(--card)",border:"1px solid var(--cyan)",borderRadius:6,color:"var(--text)"}}/>
                <button onClick={savePO} disabled={saving} style={{background:"var(--green)",color:"#000",border:"none",borderRadius:6,padding:"4px 10px",fontSize:11,fontFamily:"var(--font-mono)",fontWeight:700,cursor:"pointer"}}>{saving?"...":"Save"}</button>
                <button onClick={()=>setEditPO(false)} style={{background:"var(--border)",color:"var(--muted)",border:"none",borderRadius:6,padding:"4px 10px",fontSize:11,fontFamily:"var(--font-mono)",cursor:"pointer"}}>Cancel</button>
              </>
            ):(
              <div style={{fontSize:11,fontFamily:"var(--font-mono)",display:"flex",alignItems:"center",gap:6}}>
                {po_number?<span style={{color:"var(--cyan)"}}>PO: {po_number}</span>:<span style={{color:"var(--muted)"}}>No PO</span>}
                {stage!=="Receipt"&&<button onClick={()=>setEditPO(true)} style={{background:"none",border:"1px solid var(--border)",color:"var(--muted)",borderRadius:4,padding:"2px 6px",fontSize:10,cursor:"pointer",fontFamily:"var(--font-mono)"}}>edit</button>}
              </div>
            )}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,minWidth:160}}>
          <Badge stage={stage}/>
          {nextStage&&onAdvance?(
            <button onClick={()=>onAdvance(indent)} title={validation||""} style={{background:c+"18",border:"1px solid "+c,color:c,borderRadius:8,padding:"7px 14px",fontSize:11,fontFamily:"var(--font-mono)",fontWeight:700,transition:"all 0.2s"}}>
              &#8594; {nextStage}
            </button>
          ):stage==="Receipt"?(
            <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
              <span style={{fontSize:11,color:"var(--green)",fontFamily:"var(--font-mono)"}}>&#10003; Complete</span>
              <a href={"/receipt/"+id}>
                <button style={{background:"var(--green)22",border:"1px solid var(--green)",color:"var(--green)",borderRadius:8,padding:"6px 12px",fontSize:10,fontFamily:"var(--font-mono)",fontWeight:700,cursor:"pointer"}}>View Receipt</button>
              </a>
            </div>
          ):null}
        </div>
      </div>
      {showRail&&<StageRail stage={stage}/>}
      {validation&&<div style={{marginTop:10,fontSize:10,color:"var(--muted)",fontFamily:"var(--font-mono)",borderTop:"1px solid var(--border)",paddingTop:8}}>&#128737; {validation}</div>}
    </div>
  );
}
