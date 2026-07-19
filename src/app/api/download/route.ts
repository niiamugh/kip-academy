import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getPaystackSecretKey, verifyTransaction } from "@/lib/paystack";
import { getDownloadPath } from "@/lib/downloads";

export const runtime = "nodejs";

/**
 * GET ?reference=xxx → the purchased PDF.
 *
 * The PDF lives in private/downloads/ (outside public/), so this route is
 * the ONLY way to get it — and it re-verifies the Paystack reference on
 * every request. A paid reference keeps working, so the buyer can
 * re-download from the same thank-you link later; an unpaid or made-up
 * reference gets a 403.
 */
export async function GET(request: Request) {
  if (!getPaystackSecretKey()) {
    return NextResponse.json({ error: "checkout_not_configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference")?.trim();
  if (!reference) {
    return NextResponse.json({ error: "missing_reference" }, { status: 400 });
  }

  let tx;
  try {
    tx = await verifyTransaction(reference);
  } catch (err) {
    console.error("[download]", err);
    return NextResponse.json({ error: "verify_failed" }, { status: 502 });
  }

  if (!tx.success || !tx.productId) {
    return NextResponse.json({ error: "payment_not_verified" }, { status: 403 });
  }

  const filePath = getDownloadPath(tx.productId);
  if (!filePath) {
    // Paid but the PDF isn't on the server (yet) — tell the buyer to
    // contact support rather than silently failing.
    return NextResponse.json({ error: "file_not_available" }, { status: 404 });
  }

  const file = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": String(file.byteLength),
      "Cache-Control": "no-store",
    },
  });
}
