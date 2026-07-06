"use client";

import { FormEvent, useState } from "react";
import { IconCheck } from "./icons";

type Status = "idle" | "loading" | "success" | "error";

export function LeadMagnetForm({ source = "homepage-lead-magnet" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-sm border border-gold/40 bg-navy-light/60 p-5">
        <IconCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
        <p className="font-body text-sm leading-relaxed text-offwhite/90">
          Check your inbox for your free chapter! If it doesn&rsquo;t arrive in a
          few minutes, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Your name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-sm border border-offwhite/25 bg-transparent px-4 py-3 font-body text-sm text-offwhite placeholder:text-offwhite/40 focus:border-gold"
          />
        </label>
        <label className="flex-1">
          <span className="sr-only">Your email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full rounded-sm border border-offwhite/25 bg-transparent px-4 py-3 font-body text-sm text-offwhite placeholder:text-offwhite/40 focus:border-gold"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap rounded-sm bg-gold px-7 py-3 font-heading text-sm font-bold text-navy transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Me the Chapter"}
      </button>
      {status === "error" && (
        <p className="font-body text-xs text-red-300 sm:basis-full" role="alert">
          Something went wrong. Please try again in a moment.
        </p>
      )}
    </form>
  );
}
