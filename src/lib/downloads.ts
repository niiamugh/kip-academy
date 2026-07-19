import path from "path";
import fs from "fs";

/**
 * Server-only map of product id → PDF file delivered after purchase.
 *
 * The PDFs live in `private/downloads/` at the project root — OUTSIDE
 * `public/`, so they can never be fetched directly by URL. The only way
 * to get one is through /api/download, which re-verifies the buyer's
 * Paystack reference on every request.
 *
 * The folder is gitignored (the repo is public!). Upload the PDF to the
 * VPS by hand, e.g.:
 *   scp "Unshakeable.pdf" root@153.92.208.82:/var/www/kip-academy/private/downloads/unshakeable.pdf
 */
const DOWNLOAD_FILES: Record<string, string> = {
  unshakeable: "unshakeable.pdf",
  // Add new guides here as they launch, e.g.:
  // "side-hustle-blueprint": "side-hustle-blueprint.pdf",
};

const DOWNLOADS_DIR = path.join(process.cwd(), "private", "downloads");

/** Absolute path to the product's PDF, or null if not mapped / not uploaded. */
export function getDownloadPath(productId: string): string | null {
  const fileName = DOWNLOAD_FILES[productId];
  if (!fileName) return null;
  const filePath = path.join(DOWNLOADS_DIR, fileName);
  return fs.existsSync(filePath) ? filePath : null;
}

export function hasDownload(productId: string): boolean {
  return getDownloadPath(productId) !== null;
}
