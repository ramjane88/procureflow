const BASE=process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY=process.env.SUPABASE_SERVICE_KEY;
const h=()=>({"Content-Type":"application/json","apikey":KEY,"Authorization":`Bearer ${KEY}`});
export async function GET(){
  try{
    const res=await fetch(`${BASE}/rest/v1/items?select=*&order=name.asc`,{headers:h(),cache:"no-store"});
    if(!res.ok)throw new Error(`Failed: ${res.status}`);
    return Response.json(await res.json());
  }catch(e){return Response.json({error:e.message},{status:500});}
}
