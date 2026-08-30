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
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="KIP Academy home">
          <Image
            src="/logo-mark.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-xl font-semibold tracking-tight text-ink">
              KIP <span className="text-red">Academy</span>
            </span>
            <span className="mt-1 font-body text-[0.6rem] font-semibold tracking-[0.22em] text-ink/50">
              KNOWLEDGE IS POWER
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-body text-sm font-medium transition-colors hover:text-red ${
                pathname === l.href ? "text-ink" : "text-ink/60"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/store/unshakeable"
            className="rounded-sm bg-red px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-red-dark"
          >
            Get Unshakeable
          </Link>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="flex flex-col gap-1 border-t border-ink/10 bg-white px-5 pb-8 pt-2 md:hidden"
          aria-label="Primary mobile"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-b border-ink/10 py-4 font-body text-base text-ink/80"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/store/unshakeable"
            className="mt-5 flex h-12 items-center justify-center rounded-sm bg-red font-body text-sm font-semibold text-white"
          >
            Get Unshakeable
          </Link>
        </nav>
      )}
    </header>
  );
}
