"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconClose, IconMenu } from "./icons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-navy text-offwhite shadow-[0_1px_0_0_rgba(201,162,62,0.25)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="KIP Academy home">
          <Image src="/logo.png" alt="" width={44} height={54} className="h-11 w-auto" priority />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-extrabold tracking-wide">
              KIP <span className="text-gold">ACADEMY</span>
            </span>
            <span className="mt-1 font-heading text-[0.6rem] font-bold tracking-[0.25em] text-gold/80">
              KNOWLEDGE IS POWER
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-sm font-medium text-offwhite/85 transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/store/unshakeable"
            className="rounded-sm bg-gold px-5 py-2.5 font-heading text-sm font-bold text-navy transition-colors hover:bg-gold-light"
          >
            Get Unshakeable
          </Link>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center text-offwhite md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="flex flex-col gap-1 border-t border-gold/15 bg-navy px-5 pb-8 pt-2 md:hidden"
          aria-label="Primary mobile"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-b border-offwhite/10 py-4 font-body text-base text-offwhite/90"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/store/unshakeable"
            className="mt-5 flex h-12 items-center justify-center rounded-sm bg-gold font-heading text-sm font-bold text-navy"
          >
            Get Unshakeable
          </Link>
        </nav>
      )}
    </header>
  );
}
