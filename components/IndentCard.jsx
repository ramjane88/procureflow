"use client";
import Badge from "./Badge";
import StageRail from "./StageRail";
import { STAGE_COLORS, STAGES, VALIDATIONS } from "@/lib/constants";
export default function IndentCard({ indent, onAdvance, showRail = false }) {
  const { id, item, qty, unit, dept, vendor, po_number, remarks, stage, created_at } = indent;
  const c = STAGE_COLORS[stage];
  const idx = STAGES.indexOf(stage);
  const nextStage = idx < STAGES.length - 1 ? STAGES[idx + 1] : null;
  const validation = nextStage ? VALIDATIONS[nextStage] : null;
  const date = new Date(created_at).toLocaleDateString("en-IN");
  return (
    <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderLeft:`4px solid ${c}`,borderRadius:14,padding:"18px 20px",transition:"transform 0.15s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{item}</div>
          <div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-mono)",lineHeight:1.9}}>
            {id} · {dept} · {qty} {unit}<br/>
            Vendor: {vendor}
            {po_number && <span style={{color:"var(--cyan)"}}> · PO: {po_number}</span>}
            {remarks && <span style={{color:"var(--orange)"}}><br/>⚑ {remarks}</span>}
            <br/><span style={{color:"var(--border2)"}}>{date}</span>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,minWidth:160}}>
          <Badge stage={stage}/>
          {nextStage && onAdvance ? (
            <button onClick={()=>onAdvance(indent)} title={validation||""} style={{background:c+"18",border:`1px solid ${c}`,color:c,borderRadius:8,padding:"7px 14px",fontSize:11,fontFamily:"var(--font-mono)",fontWeight:700,transition:"all 0.2s"}}>
              {String.fromCharCode(8594)} {nextStage}
            </button>
          ) : stage==="Receipt" ? (
            <span style={{fontSize:11,color:"var(--green)",fontFamily:"var(--font-mono)"}}>&#10003; Complete</span>
          ) : null}
        </div>
      </div>
      {showRail && <StageRail stage={stage}/>}
      {validation && <div style={{marginTop:10,fontSize:10,color:"var(--muted)",fontFamily:"var(--font-mono)",borderTop:"1px solid var(--border)",paddingTop:8}}>&#128737; {validation}</div>}
    </div>
  );
}
