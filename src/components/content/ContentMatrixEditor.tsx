"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  entriesToCsv,
  getTopicOptions,
  getVariantLabel,
  type ContentEntry,
  type ContentFieldType,
} from "@/lib/content-matrix";

const STORAGE_KEY = "myfuture-content-edits-v1";

type VariantFilter = "all" | "default" | "interest" | "learning" | "campus";
type FieldFilter = "all" | ContentFieldType;

interface ContentMatrixEditorProps {
  entries: ContentEntry[];
}

export function ContentMatrixEditor({ entries }: ContentMatrixEditorProps) {
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState<string | "all">("all");
  const [variantFilter, setVariantFilter] = useState<VariantFilter>("all");
  const [fieldFilter, setFieldFilter] = useState<FieldFilter>("all");
  const [showChangedOnly, setShowChangedOnly] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(
    new Set(["Shared · Opening", "Path · Protect the planet"]),
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setEdits(JSON.parse(saved) as Record<string, string>);
    } catch {
      // ignore invalid storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
  }, [edits]);

  const topicOptions = useMemo(() => getTopicOptions(entries), [entries]);

  const changedCount = useMemo(
    () =>
      entries.filter((entry) => {
        const proposed = edits[entry.id];
        return proposed !== undefined && proposed !== entry.value;
      }).length,
    [entries, edits],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return entries.filter((entry) => {
      const proposed = edits[entry.id] ?? entry.value;
      const isChanged = proposed !== entry.value;

      if (showChangedOnly && !isChanged) return false;
      if (topicFilter !== "all" && entry.topic !== topicFilter) return false;
      if (fieldFilter !== "all" && entry.fieldType !== fieldFilter) return false;

      if (variantFilter !== "all") {
        if (variantFilter === "default" && entry.variant !== "default") return false;
        if (variantFilter !== "default" && !entry.variant.startsWith(`${variantFilter}:`)) {
          return false;
        }
      }

      if (!q) return true;

      return [
        entry.topic,
        entry.contentBlock,
        entry.sceneName,
        entry.variant,
        entry.value,
        proposed,
        entry.sourceFile,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [entries, edits, query, topicFilter, variantFilter, fieldFilter, showChangedOnly]);

  const grouped = useMemo(() => {
    const map = new Map<string, ContentEntry[]>();
    for (const entry of filtered) {
      const list = map.get(entry.topic) ?? [];
      list.push(entry);
      map.set(entry.topic, list);
    }
    return [...map.entries()].sort(([, aEntries], [, bEntries]) => {
      const aOrder = aEntries[0]?.topicOrder ?? 0;
      const bOrder = bEntries[0]?.topicOrder ?? 0;
      return aOrder - bOrder;
    });
  }, [filtered]);

  function updateEntry(id: string, value: string) {
    setEdits((current) => {
      const entry = entries.find((item) => item.id === id);
      if (!entry) return current;
      if (value === entry.value) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: value };
    });
  }

  function resetEntry(id: string) {
    setEdits((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function resetAll() {
    setEdits({});
  }

  function downloadCsv() {
    const csv = entriesToCsv(entries, edits);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `myfuture-content-matrix-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function toggleTopic(topic: string) {
    setExpandedTopics((current) => {
      const next = new Set(current);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <header className="mb-8 border-b border-black/10 pb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
          <Link href="/" className="font-medium text-[#8c1d40] underline-offset-2 hover:underline">
            ← Back to experience
          </Link>
          <span className="text-black/30">·</span>
          <span className="text-black/50">{entries.length} content fields</span>
          {changedCount > 0 && (
            <>
              <span className="text-black/30">·</span>
              <span className="rounded-full bg-[#ffc627]/40 px-2.5 py-0.5 font-medium text-[#5c4a00]">
                {changedCount} edited
              </span>
            </>
          )}
        </div>

        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Content Matrix
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-black/65">
          Every headline, stat, quote, and label in the experience — pulled live from the codebase.
          For content review, use the Excel workbook (one tab per topic). Edit here or in the sheet,
          then export for dev handoff. Draft edits save automatically in this browser.
        </p>
        <p className="mt-3">
          <a
            href="/content-matrix.xlsx"
            download
            className="inline-flex items-center rounded-lg bg-[#8c1d40] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6d1732]"
          >
            Download Excel workbook (one tab per topic)
          </a>
        </p>
      </header>

      <div className="sticky top-0 z-20 -mx-4 mb-8 border-b border-black/10 bg-[#f7f6f3]/95 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <label className="flex-1">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-black/45">
              Search
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search copy, scene, field, variant…"
              className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-[#8c1d40]/20 focus:ring-2"
            />
          </label>

          <label className="min-w-[220px] flex-[1.4]">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-black/45">
              Topic
            </span>
            <select
              value={topicFilter}
              onChange={(event) => setTopicFilter(event.target.value)}
              className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-[#8c1d40]/20 focus:ring-2"
            >
              <option value="all">All topics</option>
              {topicOptions.map((topic) => (
                <option key={topic.topic} value={topic.topic}>
                  {topic.topic} ({topic.count})
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-black/45">
              Variant
            </span>
            <select
              value={variantFilter}
              onChange={(event) => setVariantFilter(event.target.value as VariantFilter)}
              className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-[#8c1d40]/20 focus:ring-2"
            >
              <option value="all">All variants</option>
              <option value="default">Default only</option>
              <option value="interest">Interest paths</option>
              <option value="learning">Learning styles</option>
              <option value="campus">Campus choices</option>
            </select>
          </label>

          <label>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-black/45">
              Type
            </span>
            <select
              value={fieldFilter}
              onChange={(event) => setFieldFilter(event.target.value as FieldFilter)}
              className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-[#8c1d40]/20 focus:ring-2"
            >
              <option value="all">All types</option>
              <option value="copy">Copy only</option>
              <option value="image">Images only</option>
              <option value="meta">Meta / links</option>
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-black/70">
            <input
              type="checkbox"
              checked={showChangedOnly}
              onChange={(event) => setShowChangedOnly(event.target.checked)}
              className="rounded border-black/20"
            />
            Show edited only
          </label>

          <button
            type="button"
            onClick={downloadCsv}
            className="rounded-lg bg-[#8c1d40] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6d1732]"
          >
            Export CSV
          </button>

          {changedCount > 0 && (
            <button
              type="button"
              onClick={resetAll}
              className="rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black/70 hover:bg-black/[0.03]"
            >
              Reset all edits
            </button>
          )}

          <span className="text-sm text-black/45">
            Showing {filtered.length} of {entries.length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {grouped.map(([topic, topicEntries]) => {
          const isOpen = expandedTopics.has(topic);
          const topicChanged = topicEntries.some((entry) => {
            const proposed = edits[entry.id];
            return proposed !== undefined && proposed !== entry.value;
          });

          return (
            <section
              key={topic}
              className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleTopic(topic)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-black/[0.02]"
              >
                <div>
                  <h2 className="font-display text-xl font-semibold">{topic}</h2>
                  <p className="mt-1 text-sm text-black/45">
                    {topicEntries.length} fields across{" "}
                    {new Set(topicEntries.map((entry) => entry.sceneOrder)).size} scenes
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {topicChanged && (
                    <span className="rounded-full bg-[#ffc627]/35 px-2 py-0.5 text-xs font-medium text-[#5c4a00]">
                      Edited
                    </span>
                  )}
                  <span className="text-black/35">{isOpen ? "▾" : "▸"}</span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-black/8">
                  {topicEntries.map((entry) => {
                    const proposed = edits[entry.id] ?? entry.value;
                    const isChanged = proposed !== entry.value;

                    return (
                      <article
                        key={entry.id}
                        className={`border-b border-black/6 px-5 py-4 last:border-b-0 ${
                          isChanged ? "bg-[#fff9e6]" : ""
                        }`}
                      >
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-black/[0.05] px-2 py-0.5 text-xs font-medium text-black/65">
                            Scene {entry.sceneOrder} · {entry.sceneName}
                          </span>
                          <span className="rounded-md bg-[#8c1d40]/8 px-2 py-0.5 text-xs font-medium text-[#8c1d40]">
                            {entry.contentBlock}
                          </span>
                          <span className="rounded-md bg-black/[0.04] px-2 py-0.5 text-xs text-black/45">
                            {getVariantLabel(entry.variant)}
                          </span>
                          {entry.fieldType !== "copy" && (
                            <span className="rounded-md bg-black/[0.04] px-2 py-0.5 text-xs uppercase tracking-wide text-black/45">
                              {entry.fieldType}
                            </span>
                          )}
                        </div>

                        <textarea
                          value={proposed}
                          onChange={(event) => updateEntry(entry.id, event.target.value)}
                          rows={Math.min(8, Math.max(2, Math.ceil(proposed.length / 72)))}
                          className="w-full resize-y rounded-lg border border-black/12 bg-white px-3 py-2 font-mono text-sm leading-relaxed outline-none ring-[#8c1d40]/15 focus:ring-2"
                        />

                        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-black/45">
                          <code>{entry.sourceFile}</code>
                          <div className="flex items-center gap-3">
                            <span>{proposed.length} chars</span>
                            {isChanged && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => resetEntry(entry.id)}
                                  className="font-medium text-[#8c1d40] hover:underline"
                                >
                                  Reset
                                </button>
                                <details className="text-black/55">
                                  <summary className="cursor-pointer hover:text-black/75">
                                    Original
                                  </summary>
                                  <p className="mt-1 max-w-xl whitespace-pre-wrap rounded bg-black/[0.04] p-2">
                                    {entry.value}
                                  </p>
                                </details>
                              </>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-black/15 bg-white px-6 py-12 text-center text-black/55">
          No content matches your filters.
        </div>
      )}
    </div>
  );
}
