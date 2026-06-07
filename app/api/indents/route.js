import{getIndents,createIndent}from"@/lib/supabase";
import{STAGES}from"@/lib/constants";
function genId(count){return`IND-${String(count+1).padStart(4,"0")}`;}
export async function GET(){
  try{const data=await getIndents();return Response.json(data);}
  catch(e){return Response.json({error:e.message},{status:500});}
}
export async function POST(req){
  try{
    const body=await req.json();
    if(!body.item?.trim())return Response.json({error:"Item name is required"},{status:400});
    if(!body.qty||Number(body.qty)<=0)return Response.json({error:"Valid quantity required"},{status:400});
    if(!body.vendor?.trim())return Response.json({error:"Vendor name is required"},{status:400});
    const existing=await getIndents();
    const id=genId(existing.length);
    const payload={id,item:body.item.trim(),qty:Number(body.qty),unit:body.unit||"Nos",dept:body.dept||"Production",vendor:body.vendor.trim(),po_number:body.poNumber?.trim()||null,remarks:body.remarks?.trim()||null,stage:STAGES[0],stage_history:[{stage:STAGES[0],timestamp:new Date().toISOString()}]};
    const result=await createIndent(payload);
    return Response.json(result,{status:201});
  }catch(e){return Response.json({error:e.message},{status:500});}
}
