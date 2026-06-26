"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, MapPin, X } from "lucide-react";
import type { Place } from "@/lib/types";

type SearchState = "idle" | "typing" | "loading" | "results" | "no-results";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasFocus, setHasFocus] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const isDropdownVisible =
    hasFocus &&
    query.trim().length >= 2 &&
    (searchState === "loading" ||
      searchState === "results" ||
      searchState === "no-results");

  const fetchResults = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setSearchState(trimmed.length > 0 ? "typing" : "idle");
      return;
    }

    setSearchState("loading");
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(trimmed)}`,
      );
      const data: Place[] = await res.json();
      setResults(data);
      setSearchState(data.length > 0 ? "results" : "no-results");
    } catch {
      setResults([]);
      setSearchState("no-results");
    }
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) return;
    const timer = setTimeout(() => fetchResults(query), 200);
    return () => clearTimeout(timer);
  }, [query, fetchResults]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setHasFocus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function navigate(place: Place) {
    setHasFocus(false);
    setQuery("");
    setResults([]);
    setSearchState("idle");
    router.push(`/place/${place.slug}`);
  }

  function clearQuery() {
    setQuery("");
    setResults([]);
    setSearchState("idle");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setHasFocus(false);
      inputRef.current?.blur();
      return;
    }

    if (!isDropdownVisible || searchState !== "results") return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      navigate(results[activeIndex]);
    }
  }

  function formatSubtitle(place: Place): string {
    const parts: string[] = [];
    if (place.zone) parts.push(place.zone);
    parts.push(place.region);
    return parts.join(", ");
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search places, cities, or postal codes..."
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            setActiveIndex(-1);
            const trimmed = value.trim();
            if (trimmed.length < 2) {
              setResults([]);
              setSearchState(trimmed.length > 0 ? "typing" : "idle");
            } else {
              setSearchState("loading");
            }
          }}
          onFocus={() => setHasFocus(true)}
          onKeyDown={handleKeyDown}
          className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-10 text-base outline-none transition-all placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          aria-label="Search Ethiopian postal codes"
          aria-expanded={isDropdownVisible ? "true" : "false"}
          aria-controls="search-results"
          role="combobox"
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `search-result-${activeIndex}` : undefined
          }
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {searchState === "loading" && (
            <div className="size-4 animate-spin rounded-full border-2 border-muted-foreground/40 border-t-foreground" />
          )}
          {query.length > 0 && searchState !== "loading" && (
            <button
              type="button"
              onClick={clearQuery}
              className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Hint for short queries */}
      {hasFocus && searchState === "typing" && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 shadow-lg">
          <p className="text-sm text-muted-foreground">
            Keep typing... enter at least 2 characters to search.
          </p>
        </div>
      )}

      {/* Dropdown */}
      {isDropdownVisible && (
        <div
          id="search-results"
          className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-border bg-background shadow-lg"
        >
          {/* Loading skeleton */}
          {searchState === "loading" && (
            <div className="p-2" role="status" aria-label="Searching">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-3">
                  <div className="size-4 animate-pulse rounded bg-muted" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 w-2/5 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-3/5 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
              <p className="px-3 pb-2 text-center text-xs text-muted-foreground">
                Searching...
              </p>
            </div>
          )}

          {/* Results */}
          {searchState === "results" && (
            <>
              <p className="px-4 pb-1 pt-2.5 text-xs font-medium text-muted-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </p>
              <ul role="listbox" aria-label="Search results" className="max-h-80 overflow-y-auto p-1">
                {results.map((place, i) => (
                  <li
                    key={place.id}
                    id={`search-result-${i}`}
                    role="option"
                    aria-selected={i === activeIndex ? "true" : "false"}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                      i === activeIndex
                        ? "bg-muted"
                        : "hover:bg-muted/50"
                    }`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={() => navigate(place)}
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-medium">{place.name}</span>
                        <span className="shrink-0 text-xs text-muted-foreground capitalize">
                          {place.place_type}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {formatSubtitle(place)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* No results */}
          {searchState === "no-results" && (
            <div className="px-4 py-5">
              <p className="font-medium text-foreground">
                No results found for &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                This location may exist, but we currently don&apos;t have a
                verified postal code for it in our database.
              </p>
              <div className="mt-4 rounded-lg bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Try:</p>
                <ul className="mt-1 list-inside list-disc space-y-0.5">
                  <li>Checking your spelling</li>
                  <li>Using a shorter or more general name</li>
                  <li>Searching by region or zone instead</li>
                </ul>
              </div>
              <div className="mt-3 rounded-lg border border-dashed border-border px-3 py-2.5 text-sm text-muted-foreground">
                <p>
                  Some international services require a postal code even when
                  one is unavailable. In those cases, placeholder values such as{" "}
                  <span className="font-mono font-medium text-foreground">1000</span>{" "}
                  (Addis Ababa) are commonly used. These are{" "}
                  <strong>not official</strong> and may not be accepted by every
                  service.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
