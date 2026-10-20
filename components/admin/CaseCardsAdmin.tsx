"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2, X } from "lucide-react";
import CaseCard from "@/components/casestudies/CaseCard";
import { DataPanel, EmptyState, ErrorState, LoadingSkeleton, SectionHeader } from "./dashboard/AdminUi";

/** A CaseCard row as the API returns it. */
type Card = {
  id: string;
  number: string;
  position: number;
  title: string;
  summary: string;
  org: string;
  industry: string;
  tags: string[];
  searchText: string;
  slug: string | null;
  fullCaseStudy: boolean;
  workInProgress: boolean;
  art: string;
  published: boolean;
};

type Draft = Omit<Card, "id" | "tags" | "slug"> & { id?: string; tags: string; slug: string };

const inputCls =
  "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent bg-white text-sm";
const labelCls = "block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 mb-1.5";

const toDraft = (c: Card): Draft => ({ ...c, tags: c.tags.join(", "), slug: c.slug ?? "" });

/**
 * The cards on /case-studies and in the related-case lists of the service and industry pages
 * (the CaseCard table). Changes show on the site as soon as they are saved.
 */
export default function CaseCardsAdmin() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setError("");
    try {
      const res = await fetch("/api/admin/case-cards", { cache: "no-store" });
      if (!res.ok) throw new Error(res.status === 401 ? "Your session has expired. Log in again." : "The cards could not be loaded.");
      setCards(await res.json());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const add = () => {
    const used = new Set(cards.map((c) => +c.number));
    let n = cards.length + 1;
    while (used.has(n)) n++;
    setErrors([]);
    setDraft({
      number: String(n).padStart(2, "0"),
      position: cards.length + 1,
      title: "",
      summary: "",
      org: "",
      industry: "",
      tags: "",
      searchText: "",
      slug: "",
      fullCaseStudy: false,
      workInProgress: false,
      art: "",
      published: true,
    });
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    setErrors([]);
    const body = { ...draft, tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean) };
    try {
      const res = await fetch(draft.id ? `/api/admin/case-cards/${draft.id}` : "/api/admin/case-cards", {
        method: draft.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setErrors(data.errors ?? [data.error ?? "The card could not be saved."]);
      setDraft(null);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c: Card) => {
    if (!window.confirm(`Delete card ${c.number}, "${c.title}"? To hide it but keep it, untick "Published" instead.`)) return;
    const res = await fetch(`/api/admin/case-cards/${c.id}`, { method: "DELETE" });
    if (!res.ok) return setError("The card could not be deleted.");
    if (draft?.id === c.id) setDraft(null);
    await load();
  };

  const move = async (i: number, by: -1 | 1) => {
    const j = i + by;
    if (j < 0 || j >= cards.length) return;
    const next = [...cards];
    [next[i], next[j]] = [next[j], next[i]];
    setCards(next.map((c, k) => ({ ...c, position: k + 1 })));
    const res = await fetch("/api/admin/case-cards/order", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: next.map((c) => c.id) }),
    });
    if (!res.ok) setError("The order could not be saved.");
    await load();
  };

  // The card as the site will show it, from the form.
  const preview = useMemo(
    () =>
      draft && {
        n: draft.number,
        route: draft.slug ? `/case-studies/${draft.slug}` : null,
        title: draft.title || "Title",
        summary: draft.summary || "Summary",
        org: draft.org || "Organisation",
        industry: draft.industry || "Industry",
        tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean),
        fullCaseStudy: draft.fullCaseStudy,
        workInProgress: draft.workInProgress,
        search: "",
        art: /^\s*<svg[\s>]/i.test(draft.art) ? draft.art : "",
      },
    [draft],
  );

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => (d ? { ...d, [k]: v } : d));

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      {draft && preview && (
        <DataPanel>
          <div className="p-5">
            <SectionHeader
              eyebrow={draft.id ? `Card ${draft.number}` : "New card"}
              title={draft.id ? "Edit case card" : "Add a case card"}
              description="The preview shows the card as it will appear on the site. Changes go live when you save."
              action={
                <button onClick={() => setDraft(null)} className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <X className="h-4 w-4" /> Close
                </button>
              }
            />
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={labelCls}>Card number</span>
                  <input className={inputCls} value={draft.number} onChange={(e) => set("number", e.target.value)} />
                </label>
                <label>
                  <span className={labelCls}>Position on /case-studies</span>
                  <input className={inputCls} type="number" min={1} value={draft.position} onChange={(e) => set("position", Number(e.target.value))} />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelCls}>Title</span>
                  <input className={inputCls} value={draft.title} onChange={(e) => set("title", e.target.value)} />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelCls}>Summary</span>
                  <textarea className={`${inputCls} min-h-24`} value={draft.summary} onChange={(e) => set("summary", e.target.value)} />
                </label>
                <label>
                  <span className={labelCls}>Organisation</span>
                  <input className={inputCls} value={draft.org} onChange={(e) => set("org", e.target.value)} />
                </label>
                <label>
                  <span className={labelCls}>Industry label</span>
                  <input className={inputCls} value={draft.industry} onChange={(e) => set("industry", e.target.value)} />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelCls}>Tags (comma-separated)</span>
                  <input className={inputCls} value={draft.tags} onChange={(e) => set("tags", e.target.value)} />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelCls}>Page slug (/case-studies/…); empty links to the listing</span>
                  <input className={inputCls} value={draft.slug} onChange={(e) => set("slug", e.target.value)} />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelCls}>Search text (what the Case Studies search matches; empty fills it from the card)</span>
                  <textarea className={`${inputCls} min-h-20`} value={draft.searchText} onChange={(e) => set("searchText", e.target.value)} />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelCls}>Drawing (SVG)</span>
                  <textarea className={`${inputCls} min-h-32 font-mono text-xs`} value={draft.art} onChange={(e) => set("art", e.target.value)} placeholder="<svg viewBox=…>…</svg>" />
                </label>
                <div className="flex flex-wrap gap-5 sm:col-span-2 text-sm text-slate-700">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={draft.fullCaseStudy} onChange={(e) => set("fullCaseStudy", e.target.checked)} /> Full case study tab
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={draft.workInProgress} onChange={(e) => set("workInProgress", e.target.checked)} /> Work in progress tab
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={draft.published} onChange={(e) => set("published", e.target.checked)} /> Published
                  </label>
                </div>
                {errors.length > 0 && (
                  <ul className="sm:col-span-2 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 list-disc pl-8" role="alert">
                    {errors.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                )}
                <div className="sm:col-span-2">
                  <button onClick={save} disabled={saving} className="rounded-md bg-[#17599d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f3f70] disabled:opacity-60">
                    {saving ? "Saving…" : draft.id ? "Save changes" : "Save new card"}
                  </button>
                </div>
              </div>
              <div>
                <span className={labelCls}>Preview</span>
                {/* pi-page: the site's own styles for the card (app/site.css) */}
                <div className="pi-page" style={{ background: "#F3F3F3", padding: 16 }} onClickCapture={(e) => e.preventDefault()}>
                  <CaseCard card={preview} />
                </div>
              </div>
            </div>
          </div>
        </DataPanel>
      )}

      <DataPanel>
        <div className="p-5">
          <SectionHeader
            eyebrow="Website"
            title="Case study cards"
            description="The cards on /case-studies, in this order, and the related cards on the service and industry pages. Use the arrows to reorder."
            action={
              <button onClick={add} className="inline-flex items-center gap-2 rounded-md bg-[#17599d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f3f70]">
                <Plus className="h-4 w-4" /> Add card
              </button>
            }
          />
        </div>
        {error && (
          <div className="p-5 pt-0">
            <ErrorState title="Case cards" description={error} />
          </div>
        )}
        {cards.length === 0 ? (
          <div className="p-5 pt-0">
            <EmptyState title="No cards yet" description="The site shows the cards built into the code until the first card is added." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-3 py-3">No.</th>
                  <th className="px-3 py-3">Card</th>
                  <th className="px-3 py-3">Shows</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cards.map((c, i) => (
                  <tr key={c.id} className={c.published ? "" : "bg-slate-50 text-slate-400"}>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className="inline-block w-6 tabular-nums">{c.position}</span>
                      <button aria-label={`Move card ${c.number} up`} disabled={i === 0} onClick={() => move(i, -1)} className="p-1 text-slate-500 hover:text-[#17599d] disabled:opacity-30">
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button aria-label={`Move card ${c.number} down`} disabled={i === cards.length - 1} onClick={() => move(i, 1)} className="p-1 text-slate-500 hover:text-[#17599d] disabled:opacity-30">
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="px-3 py-3 tabular-nums">{c.number}</td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-slate-900">{c.title}</div>
                      <div className="text-xs text-slate-500">
                        {c.org} · {c.slug ? `/case-studies/${c.slug}` : "no page"}
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs">
                      {c.fullCaseStudy && <span className="mr-1 rounded bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800">Full case study</span>}
                      {c.workInProgress && <span className="mr-1 rounded bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">Work in progress</span>}
                      {!c.published && <span className="rounded bg-slate-200 px-2 py-0.5 font-semibold text-slate-600">Hidden</span>}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() => {
                          setErrors([]);
                          setDraft(toDraft(c));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[#17599d] hover:bg-blue-50"
                      >
                        <Pencil className="h-4 w-4" /> Edit
                      </button>
                      <button onClick={() => remove(c)} className="ml-1 inline-flex items-center gap-1 rounded-md px-2 py-1 text-rose-700 hover:bg-rose-50">
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DataPanel>
    </div>
  );
}
