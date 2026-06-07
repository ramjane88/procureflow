import{getIndentById,updateIndentStage}from"@/lib/supabase";
import{STAGES}from"@/lib/constants";
export async function PATCH(req,{params}){
  try{
    const{id}=await params;
    if(!id)return Response.json({error:"ID required"},{status:400});
    const indent=await getIndentById(id);
    if(!indent)return Response.json({error:"Indent not found"},{status:404});
    const idx=STAGES.indexOf(indent.stage);
    if(idx===-1)return Response.json({error:"Invalid stage"},{status:400});
    if(idx===STAGES.length-1)return Response.json({error:"Already complete"},{status:400});
    const nextStage=STAGES[idx+1];
    const newHistory=[...(indent.stage_history||[]),{stage:nextStage,timestamp:new Date().toISOString()}];
    const updated=await updateIndentStage(id,nextStage,newHistory);
    return Response.json(updated);
  }catch(e){return Response.json({error:e.message},{status:500});}
}
