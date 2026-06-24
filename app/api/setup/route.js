const BASE=process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY=process.env.SUPABASE_SERVICE_KEY;
const h=()=>({"Content-Type":"application/json","apikey":KEY,"Authorization":`Bearer ${KEY}`,"Prefer":"return=minimal"});
export async function GET(){
  try{
    const vendors=[
      {id:"VEN-001",name:"Sri Balaji Traders",contact_person:"Balaji Reddy",phone:"9849123456"},
      {id:"VEN-002",name:"Hyderabad Supplies Co",contact_person:"Ravi Kumar",phone:"9848234567"},
      {id:"VEN-003",name:"Krishna Enterprises",contact_person:"Krishna Rao",phone:"9847345678"},
      {id:"VEN-004",name:"Lakshmi Traders",contact_person:"Lakshmi Devi",phone:"9846456789"},
      {id:"VEN-005",name:"Vijaya Stores",contact_person:"Vijay Kumar",phone:"9845567890"},
      {id:"VEN-006",name:"Saravana Wholesale",contact_person:"Saravana",phone:"9844678901"},
      {id:"VEN-007",name:"Ravi Kumar & Sons",contact_person:"Ravi Kumar",phone:"9843789012"},
      {id:"VEN-008",name:"Andhra Provisions",contact_person:"Suresh Babu",phone:"9842890123"},
      {id:"VEN-009",name:"Srinivas General Store",contact_person:"Srinivas",phone:"9841901234"},
      {id:"VEN-010",name:"Metro Cash & Carry",contact_person:"Manager",phone:"9840012345"},
      {id:"VEN-011",name:"Reliance Smart",contact_person:"Store Manager",phone:"9839123456"},
      {id:"VEN-012",name:"DMart Wholesale",contact_person:"Procurement Head",phone:"9838234567"},
      {id:"VEN-013",name:"Apna Bazaar",contact_person:"Ramesh",phone:"9837345678"},
      {id:"VEN-014",name:"Rythu Bazaar Vendors",contact_person:"Coordinator",phone:"9836456789"},
      {id:"VEN-015",name:"Sudha Dairy Supplies",contact_person:"Sudha Rao",phone:"9835567890"},
    ];
    const res=await fetch(`${BASE}/rest/v1/vendors`,{method:"POST",headers:h(),body:JSON.stringify(vendors)});
    return Response.json({status:res.status,message:res.status===201?"Vendors seeded":"Check table"});
  }catch(e){return Response.json({error:e.message},{status:500});}
}
