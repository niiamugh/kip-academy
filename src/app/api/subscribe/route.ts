import { NextRequest, NextResponse } from "next/server";
import { N8N_WEBHOOK_URL } from "@/lib/config";

/**
 * Receives the lead-magnet form submission from the client and forwards it
 * to the n8n webhook configured in src/lib/config.ts. Keeping this on the
 * server means the webhook URL never has to be exposed to the browser and
 * we avoid any CORS issues talking to n8n directly from the client.
 */
export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; source?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, source } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  try {
    const webhookRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, source: source || "unknown" }),
    });

    if (!webhookRes.ok) {
      console.error("n8n webhook responded with", webhookRes.status);
      return NextResponse.json({ error: "Webhook rejected the request" }, { status: 502 });
    }
  } catch (err) {
    console.error("Failed to reach n8n webhook", err);
    return NextResponse.json({ error: "Could not reach webhook" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
