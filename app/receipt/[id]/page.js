"use client";
import{useEffect,useState}from"react";
import{useParams}from"next/navigation";
import Nav from"@/components/Nav";
export default function ReceiptPage(){
  const{id}=useParams();
  const[indent,setIndent]=useState(null);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    fetch("/api/indents/"+id).then(r=>r.json()).then(d=>{setIndent(d);setLoading(false);});
  },[id]);
  if(loading)return<div style={{minHeight:"100vh",background:"#0a0e1a",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontFamily:"monospace"}}>Loading...</div>;
  if(!indent||indent.error)return<div style={{minHeight:"100vh",background:"#0a0e1a",display:"flex",alignItems:"center",justifyContent:"center",color:"#ef4444",fontFamily:"monospace"}}>Indent not found</div>;
  const stages=indent.stage_history||[];
  const raised=stages[0]?.timestamp?new Date(stages[0].timestamp).toLocaleString("en-IN"):"N/A";
  const completed=stages[stages.length-1]?.timestamp?new Date(stages[stages.length-1].timestamp).toLocaleString("en-IN"):"N/A";
  return(
    <div style={{background:"#0a0e1a",minHeight:"100vh"}}>
      <Nav/>
      <div style={{padding:"28px",maxWidth:640,margin:"0 auto"}}>
        <div style={{background:"#0f172a",border:"1px solid #10b981",borderRadius:16,overflow:"hidden"}}>
          <div style={{background:"linear-gradient(135deg,#064e3b,#065f46)",padding:"28px 28px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
              <div>
                <div style={{fontSize:11,color:"#6ee7b7",fontFamily:"monospace",textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>ProcureFlow Receipt</div>
                <div style={{fontSize:26,fontWeight:800,color:"#fff"}}>{indent.item}</div>
                <div style={{fontSize:13,color:"#a7f3d0",marginTop:4}}>by Sandeep Kumar Vattipally</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{background:"#10b981",color:"#fff",borderRadius:999,padding:"6px 16px",fontSize:12,fontWeight:700,fontFamily:"monospace"}}>✓ COMPLETE</div>
                <div style={{fontSize:11,color:"#6ee7b7",fontFamily:"monospace",marginTop:8}}>{indent.id}</div>
              </div>
            </div>
          </div>
          <div style={{padding:"24px 28px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
              {[
                ["Item",indent.item],
                ["Quantity",`${indent.qty} ${indent.unit}`],
                ["Department",indent.dept],
                ["Vendor",indent.vendor],
                ["PO Number",indent.po_number||"N/A"],
                ["Remarks",indent.remarks||"None"],
                ["Raised On",raised],
                ["Completed On",completed],
              ].map(([k,v])=>(
                <div key={k} style={{background:"#111827",borderRadius:10,padding:"12px 14px"}}>
                  <div style={{fontSize:10,color:"#64748b",fontFamily:"monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{k}</div>
                  <div style={{fontSize:13,fontWeight:600,color:"#e2e8f0",wordBreak:"break-word"}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{marginBottom:24}}>
              <div style={{fontSize:11,color:"#64748b",fontFamily:"monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Audit Trail</div>
              <div style={{display:"flex",flexDirection:"column",gap:0}}>
                {stages.map((s,i)=>(
                  <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                      <div style={{width:10,height:10,borderRadius:"50%",background:"#10b981",marginTop:4,flexShrink:0}}/>
                      {i<stages.length-1&&<div style={{width:2,height:32,background:"#1e293b",marginTop:2}}/>}
                    </div>
                    <div style={{paddingBottom:i<stages.length-1?16:0}}>
                      <div style={{fontSize:12,fontWeight:700,color:"#e2e8f0"}}>{s.stage}</div>
                      <div style={{fontSize:10,color:"#64748b",fontFamily:"monospace"}}>{s.timestamp?new Date(s.timestamp).toLocaleString("en-IN"):"N/A"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <button onClick={()=>window.print()} style={{flex:1,background:"#10b981",color:"#fff",border:"none",borderRadius:10,padding:"12px",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"monospace"}}>🖨 Print Receipt</button>
              <a href="/tracker" style={{flex:1}}>
                <button style={{width:"100%",background:"#1e293b",color:"#94a3b8",border:"1px solid #334155",borderRadius:10,padding:"12px",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"monospace"}}>← Back to Tracker</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
