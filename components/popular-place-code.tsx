"use client";

import { useState, useCallback, useRef } from "react";
import { Copy, Check } from "lucide-react";

export function PopularPlaceCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      // Prevent the click from bubbling up to the parent Link card
      e.preventDefault();
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 1500);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 1500);
      }
    },
    [code],
  );

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group/zip relative inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 font-mono text-sm font-medium tabular-nums text-foreground transition-colors hover:border-foreground/30 hover:bg-muted/50"
      aria-label={copied ? "Copied to clipboard" : `Copy postal code ${code}`}
    >
      {copied ? (
        <Check className="size-3 text-emerald-600" />
      ) : (
        <Copy className="size-3 text-muted-foreground" />
      )}
      <span>{code}</span>

      {/* Tooltip / label */}
      <span
        aria-hidden={copied}
        className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.688rem] font-medium text-white shadow-sm transition-all duration-150 ${
          copied
            ? "bg-emerald-600 opacity-100"
            : "bg-foreground opacity-0 group-hover/zip:opacity-100"
        }`}
      >
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}