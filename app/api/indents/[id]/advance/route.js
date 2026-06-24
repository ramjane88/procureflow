import{getIndentById,updateIndentStage}from"@/lib/supabase";
import{STAGES}from"@/lib/constants";
const BASE=process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY=process.env.SUPABASE_SERVICE_KEY;
const h=()=>({"Content-Type":"application/json","apikey":KEY,"Authorization":`Bearer ${KEY}`,"Prefer":"return=representation"});
async function deductStock(itemName,qty){
  const res=await fetch(`${BASE}/rest/v1/items?name=eq.${encodeURIComponent(itemName)}&select=*`,{headers:h(),cache:"no-store"});
  if(!res.ok)return;
  const items=await res.json();
  if(!items.length)return;
  const item=items[0];
  const newStock=Math.max(0,item.current_stock-qty);
  await fetch(`${BASE}/rest/v1/items?id=eq.${item.id}`,{method:"PATCH",headers:h(),body:JSON.stringify({current_stock:newStock})});
}
export async function PATCH(req,{params}){
  try{
    const{id}=await params;
    const indent=await getIndentById(id);
    if(!indent)return Response.json({error:"Indent not found"},{status:404});
    const idx=STAGES.indexOf(indent.stage);
    if(idx===STAGES.length-1)return Response.json({error:"Already complete"},{status:400});
    const nextStage=STAGES[idx+1];
    if(nextStage==="PO Check"&&!indent.po_number)return Response.json({error:"V1 Failed: No PO number attached. Add PO before advancing."},{status:400});
    if(nextStage==="Invoice"){
      const BASE2=process.env.NEXT_PUBLIC_SUPABASE_URL;
      const res=await fetch(`${BASE2}/rest/v1/indents?select=*&order=created_at.desc`,{headers:h(),cache:"no-store"});
      const all=await res.json();
      const dupe=all.find(r=>r.id!==id&&r.vendor===indent.vendor&&r.qty===indent.qty&&r.stage==="Receipt");
      if(dupe)return Response.json({error:"V5 Failed: Duplicate invoice detected."},{status:400});
    }
    if(nextStage==="Location Assignment"){
      await deductStock(indent.item,indent.qty);
    }
    const newHistory=[...(indent.stage_history||[]),{stage:nextStage,timestamp:new Date().toISOString(),by:"system"}];
    const updated=await updateIndentStage(id,nextStage,newHistory);
    return Response.json(updated);
  }catch(e){return Response.json({error:e.message},{status:500});}
}
