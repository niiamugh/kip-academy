"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { FB_PIXEL_ID } from "@/lib/config";

/**
 * Meta (Facebook) Pixel — base code + PageView on every route change.
 *
 * Next.js App Router navigations don't reload the page, so a plain
 * <script> snippet only ever fires ONE PageView per hard load. This
 * component re-fires PageView each time the pathname changes, so Meta
 * sees every page a visitor browses.
 *
 * Renders nothing unless NEXT_PUBLIC_FB_PIXEL_ID is set (see
 * .env.local.example), so the site works fine without it.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Safe wrapper — no-ops when the pixel isn't loaded (e.g. ad blocker). */
export function fbqTrack(
  event: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (options?.eventID) {
    window.fbq("track", event, params ?? {}, options);
  } else {
    window.fbq("track", event, params ?? {});
  }
}

export function MetaPixel() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!FB_PIXEL_ID) return;
    // The init snippet below already fires the first PageView; only
    // fire again on subsequent client-side route changes.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fbqTrack("PageView");
  }, [pathname]);

  if (!FB_PIXEL_ID) return null;

  return (
    <Script id="fb-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${FB_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
