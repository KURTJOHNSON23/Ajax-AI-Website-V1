import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { agentId } = await req.json();

  if (!agentId || agentId === "YOUR_AGENT_ID_HERE") {
    return NextResponse.json({ error: "Agent ID not configured" }, { status: 400 });
  }

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const res = await fetch("https://api.retellai.com/v2/create-web-call", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ agent_id: agentId }),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ access_token: data.access_token });
}
