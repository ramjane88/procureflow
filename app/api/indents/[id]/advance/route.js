import{getIndentById,updateIndentStage,getIndents}from"@/lib/supabase";
import{STAGES}from"@/lib/constants";
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
      const all=await getIndents();
      const dupe=all.find(r=>r.id!==id&&r.vendor===indent.vendor&&r.qty===indent.qty&&r.stage==="Receipt");
      if(dupe)return Response.json({error:"V5 Failed: Duplicate invoice detected for this vendor and quantity."},{status:400});
    }
    const newHistory=[...(indent.stage_history||[]),{stage:nextStage,timestamp:new Date().toISOString(),by:"system"}];
    const updated=await updateIndentStage(id,nextStage,newHistory);
    return Response.json(updated);
  }catch(e){return Response.json({error:e.message},{status:500});}
}
