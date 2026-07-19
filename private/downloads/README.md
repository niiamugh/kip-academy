# Paid PDF downloads

The PDFs customers buy live in THIS folder — outside `public/`, so they
can never be fetched by URL. The only way to get one is
`/api/download?reference=...`, which re-verifies the buyer's Paystack
payment on every request.

**Everything in this folder except this README is gitignored** because
the repo is public. Upload PDFs straight to the VPS instead:

```bash
scp "Unshakeable.pdf" root@153.92.208.82:/var/www/kip-academy/private/downloads/unshakeable.pdf
```

The product-id → filename mapping is in `src/lib/downloads.ts`. Add a
line there whenever a new guide launches.
