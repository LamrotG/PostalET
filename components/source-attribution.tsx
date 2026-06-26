"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import {
  PRIMARY_SOURCE,
  SUPPORTING_SOURCES,
  type DataSource,
} from "@/lib/sources";

export function SourceAttribution() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/50"
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls="source-panel"
      >
        <span>Data References</span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div id="source-panel" className="border-t border-border px-4 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Primary Source
            </p>
            <SourceRow source={PRIMARY_SOURCE} />
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Supporting References
            </p>
            {SUPPORTING_SOURCES.map((source) => (
              <SourceRow key={source.url} source={source} />
            ))}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            The supporting references above contain information that is largely
            consistent with our primary source and are provided for transparency
            and additional verification.
          </p>
        </div>
      )}
    </div>
  );
}

function SourceRow({ source }: { source: DataSource }) {
  return (
    <div className="mt-2">
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm font-medium hover:text-foreground"
      >
        {source.name}
        <ExternalLink className="size-3 text-muted-foreground group-hover:text-foreground" />
      </a>
      <p className="text-xs text-muted-foreground">{source.description}</p>
    </div>
  );
}
