"use client";
import{useState}from"react";
import{useRouter}from"next/navigation";
import Nav from"@/components/Nav";
import Toast from"@/components/Toast";
import{DEPARTMENTS,UNITS}from"@/lib/constants";
export default function NewIndentPage(){
  const router=useRouter();
  const[form,setForm]=useState({item:"",qty:"",unit:"Nos",dept:"Production",vendor:"",poNumber:"",remarks:""});
  const[errors,setErrors]=useState({});
  const[loading,setLoading]=useState(false);
  const[toast,setToast]=useState(null);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const submit=async()=>{
    const e={};
    if(!form.item.trim())e.item="Item name is required";
    if(!form.qty||Number(form.qty)<=0)e.qty="Valid quantity required";
    if(!form.vendor.trim())e.vendor="Vendor name is required";
    setErrors(e);
    if(Object.keys(e).length)return;
    setLoading(true);
    try{
      const res=await fetch("/api/indents",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data=await res.json();
      if(!res.ok){setToast({msg:data.error,type:"error"});return;}
      setToast({msg:`${data.id} raised successfully`,type:"success"});
      setTimeout(()=>router.push("/"),1200);
    }finally{setLoading(false);}
  };
  const lbl=(text,opt=false)=>(<label style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-mono)",textTransform:"uppercase",letterSpacing:1,marginBottom:6,display:"block"}}>{text}{opt&&<span style={{color:"var(--border2)"}}> (optional)</span>}</label>);
  const err=(k)=>errors[k]&&<div style={{fontSize:11,color:"var(--red)",fontFamily:"var(--font-mono)",marginTop:5}}>⚠ {errors[k]}</div>;
  const ok=(show,text)=>show&&<div style={{fontSize:11,color:"var(--green)",fontFamily:"var(--font-mono)",marginTop:5}}>✓ {text}</div>;
  return(
    <div>
      <Toast message={toast?.msg} type={toast?.type} onDone={()=>setToast(null)}/>
      <Nav/>
      <div style={{padding:"28px",maxWidth:560,margin:"0 auto"}}>
        <div style={{fontSize:18,fontWeight:800,color:"var(--gold)",marginBottom:4}}>Raise New Indent</div>
        <div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-mono)",marginBottom:24}}>Digital replacement for paper indent form</div>
        <div style={{background:"rgba(239,68,68,0.06)",border:"1px dashed rgba(239,68,68,0.35)",borderRadius:10,padding:"12px 16px",marginBottom:24}}>
          <div style={{fontSize:10,color:"var(--red)",fontFamily:"var(--font-mono)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Active Validations</div>
          <div style={{fontSize:11,color:"#94a3b8",fontFamily:"var(--font-mono)",lineHeight:1.9}}>V1 · Item + Qty mandatory<br/>V2 · Vendor mandatory<br/>V3 · PO captured at GRN</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:18}}>
          <div>{lbl("Item Name *")}<input value={form.item} onChange={e=>set("item",e.target.value)} className={errors.item?"err":""} placeholder="e.g. Hydraulic Oil"/>{err("item")}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>{lbl("Quantity *")}<input value={form.qty} onChange={e=>set("qty",e.target.value)} className={errors.qty?"err":""} type="number" min="1" placeholder="0"/>{err("qty")}</div>
            <div>{lbl("Unit")}<select value={form.unit} onChange={e=>set("unit",e.target.value)}>{UNITS.map(u=><option key={u}>{u}</option>)}</select></div>
          </div>
          <div>{lbl("Department")}<select value={form.dept} onChange={e=>set("dept",e.target.value)}>{DEPARTMENTS.map(d=><option key={d}>{d}</option>)}</select></div>
          <div>{lbl("Vendor Name *")}<input value={form.vendor} onChange={e=>set("vendor",e.target.value)} className={errors.vendor?"err":""} placeholder="e.g. PetroSupplies Ltd"/>{err("vendor")}{ok(form.vendor.length>2&&!errors.vendor,"Vendor accepted")}</div>
          <div>{lbl("PO Number",true)}<input value={form.poNumber} onChange={e=>set("poNumber",e.target.value)} placeholder="PO-2024-XXX"/>{ok(form.poNumber.length>0,"PO reference captured")}</div>
          <div>{lbl("Remarks",true)}<input value={form.remarks} onChange={e=>set("remarks",e.target.value)} placeholder="Urgent / Critical"/></div>
          <button onClick={submit} disabled={loading} style={{background:"linear-gradient(135deg,var(--gold),#d97706)",color:"#000",border:"none",borderRadius:10,padding:"14px",fontWeight:800,fontSize:14,fontFamily:"var(--font-mono)",opacity:loading?0.7:1,marginTop:8}}>{loading?"RAISING...":"RAISE INDENT →"}</button>
        </div>
      </div>
    </div>
  );
}
