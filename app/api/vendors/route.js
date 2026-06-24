const BASE=process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY=process.env.SUPABASE_SERVICE_KEY;
const h=()=>({"Content-Type":"application/json","apikey":KEY,"Authorization":`Bearer ${KEY}`});
export async function GET(){
  try{
    const res=await fetch(`${BASE}/rest/v1/vendors?select=*&active=eq.true&order=name.asc`,{headers:h(),cache:"no-store"});
    if(!res.ok)throw new Error(`Failed: ${res.status}`);
    const data=await res.json();
    return Response.json(data.map(v=>v.name));
  }catch(e){return Response.json([],{status:500});}
}
