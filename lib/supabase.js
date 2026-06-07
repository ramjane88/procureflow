const BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY  = process.env.SUPABASE_SERVICE_KEY;

const headers = () => ({
  "Content-Type":  "application/json",
  "apikey":        KEY,
  "Authorization": `Bearer ${KEY}`,
});

export async function getIndents() {
  const res = await fetch(
    `${BASE}/rest/v1/indents?select=*&order=created_at.desc`,
    { headers: headers(), cache: "no-store" }
  );
  if (!res.ok) throw new Error(`getIndents failed: ${res.status}`);
  return res.json();
}

export async function getIndentById(id) {
  const res = await fetch(
    `${BASE}/rest/v1/indents?id=eq.${id}&select=*`,
    { headers: headers(), cache: "no-store" }
  );
  if (!res.ok) throw new Error(`getIndentById failed: ${res.status}`);
  const data = await res.json();
  return data[0] || null;
}

export async function createIndent(payload) {
  const res = await fetch(`${BASE}/rest/v1/indents`, {
    method:  "POST",
    headers: { ...headers(), "Prefer": "return=representation" },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`createIndent failed: ${res.status}`);
  const data = await res.json();
  return data[0];
}

export async function updateIndentStage(id, stage, stageHistory) {
  const res = await fetch(`${BASE}/rest/v1/indents?id=eq.${id}`, {
    method:  "PATCH",
    headers: { ...headers(), "Prefer": "return=representation" },
    body:    JSON.stringify({ stage, stage_history: stageHistory }),
  });
  if (!res.ok) throw new Error(`updateIndentStage failed: ${res.status}`);
  const data = await res.json();
  return data[0];
}
