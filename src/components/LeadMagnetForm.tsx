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
      <div className="flex items-start gap-3 rounded-sm border border-ink/15 bg-haze p-5">
        <IconCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-red" />
        <p className="font-body text-sm leading-relaxed text-ink/80">
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
            className="w-full rounded-sm border border-ink/25 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink/60 focus:border-red"
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
            className="w-full rounded-sm border border-ink/25 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink/60 focus:border-red"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap rounded-sm bg-red px-7 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-red-dark disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Me the Chapter"}
      </button>
      {status === "error" && (
        <p className="font-body text-xs text-red sm:basis-full" role="alert">
          Something went wrong. Please try again in a moment.
        </p>
      )}
    </form>
  );
}
