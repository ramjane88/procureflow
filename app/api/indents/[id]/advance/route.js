import{getIndentById,updateIndentStage}from"@/lib/supabase";
import{STAGES}from"@/lib/constants";
export async function PATCH(req,{params}){
  try{
    const indent=await getIndentById(params.id);
    if(!indent)return Response.json({error:"Indent not found"},{status:404});
    const idx=STAGES.indexOf(indent.stage);
    if(idx===-1)return Response.json({error:"Invalid stage"},{status:400});
    if(idx===STAGES.length-1)return Response.json({error:"Already at final stage"},{status:400});
    const nextStage=STAGES[idx+1];
    const newHistory=[...(indent.stage_history||[]),{stage:nextStage,timestamp:new Date().toISOString()}];
    const updated=await updateIndentStage(params.id,nextStage,newHistory);
    return Response.json(updated);
  }catch(e){return Response.json({error:e.message},{status:500});}
}
