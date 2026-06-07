import{getIndentById,updateIndentStage}from"@/lib/supabase";
const BASE=process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY=process.env.SUPABASE_SERVICE_KEY;
const headers=()=>({"Content-Type":"application/json","apikey":KEY,"Authorization":`Bearer ${KEY}`,"Prefer":"return=representation"});
export async function GET(req,{params}){
  try{
    const{id}=await params;
    const indent=await getIndentById(id);
    if(!indent)return Response.json({error:"Not found"},{status:404});
    return Response.json(indent);
  }catch(e){return Response.json({error:e.message},{status:500});}
}
export async function PATCH(req,{params}){
  try{
    const{id}=await params;
    const body=await req.json();
    const res=await fetch(`${BASE}/rest/v1/indents?id=eq.${id}`,{method:"PATCH",headers:headers(),body:JSON.stringify(body)});
    if(!res.ok)throw new Error(`Update failed: ${res.status}`);
    const data=await res.json();
    return Response.json(data[0]);
  }catch(e){return Response.json({error:e.message},{status:500});}
}
