import { getIndents } from "@/lib/supabase";
import DashboardClient from "./DashboardClient";
export const dynamic="force-dynamic";
export default async function DashboardPage(){
  let indents=[];
  try{indents=await getIndents();}catch(e){console.error(e.message);}
  return <DashboardClient initialIndents={indents}/>;
}
