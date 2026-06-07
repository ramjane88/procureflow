"use client";
import Link from"next/link";
import{usePathname}from"next/navigation";
const links=[
  {href:"/",label:"📊 Dashboard"},
  {href:"/indent/new",label:"+ New Indent"},
  {href:"/tracker",label:"🔍 Tracker"},
];
export default function Nav({count=0}){
  const path=usePathname();
  return(
    <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(10,14,26,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",padding:"16px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
      <div>
        <div style={{fontSize:20,fontWeight:800,background:"linear-gradient(135deg,var(--gold),var(--cyan))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ProcureFlow</div>
        <div style={{fontSize:10,color:"var(--muted)",fontFamily:"var(--font-mono)",textTransform:"uppercase",letterSpacing:1,marginTop:2}}>
          by Sandeep Kumar Vattipally · {count} records
        </div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {links.map(({href,label})=>{
          const active=path===href;
          return(
            <Link key={href} href={href}>
              <button style={{padding:"8px 16px",borderRadius:8,border:"none",fontWeight:600,fontSize:12,fontFamily:"var(--font-mono)",background:active?"var(--gold)":"var(--border)",color:active?"#000":"var(--muted)",transition:"all 0.2s"}}>
                {label}
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
