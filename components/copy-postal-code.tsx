"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

export function CopyPostalCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group inline-flex items-center gap-2 rounded-lg transition-colors"
      aria-label={copied ? "Copied to clipboard" : `Copy postal code ${code}`}
    >
      <span className="text-3xl font-semibold tabular-nums tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
        {code}
      </span>
      <span className="flex items-center gap-1 rounded-md border border-transparent px-2 py-1 text-xs font-medium transition-all group-hover:border-border group-hover:bg-muted">
        {copied ? (
          <>
            <Check className="size-3 text-emerald-600" />
            <span className="text-emerald-600">Copied</span>
          </>
        ) : (
          <>
            <Copy className="size-3 text-muted-foreground" />
            <span className="text-muted-foreground">Copy</span>
          </>
        )}
      </span>
    </button>
  );
}
