import{getIndentById}from"@/lib/supabase";
export async function GET(req,{params}){
  try{
    const{id}=await params;
    const indent=await getIndentById(id);
    if(!indent)return Response.json({error:"Not found"},{status:404});
    return Response.json(indent);
  }catch(e){return Response.json({error:e.message},{status:500});}
}
