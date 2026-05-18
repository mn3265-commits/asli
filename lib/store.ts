"use client";

// Client-side persistence layer. Same API shape as a future DB-backed version.
// Tips, pre-orders, and onboarded farmers all live here for the demo.

export type Tip = {
  id: string;
  slug: string;
  amount: number;
  ts: number;
};

export type Preorder = {
  id: string;
  slug: string;
  ts: number;
};

export type OnboardedFarmer = {
  slug: string;
  name: string;
  village: string;
  region: string;
  commodity: string;
  hectares: number;
  lat?: number;
  lng?: number;
  dpid: string;
  orgName: string;
  ts: number;
};

const TIPS_KEY = "asli.tips.v1";
const PREORDERS_KEY = "asli.preorders.v1";
const ONBOARDED_KEY = "asli.onboarded.v1";
const RECENT_KEY = "asli.recent.v1";

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, items: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(items));
  // Notify any listeners
  window.dispatchEvent(new CustomEvent("asli.store.changed"));
}

const uid = () => Math.random().toString(36).slice(2, 10);

// ─── Tips ──────────────────────────────────────────────────────

export function listTips(): Tip[] {
  return read<Tip>(TIPS_KEY).sort((a, b) => b.ts - a.ts);
}

export function tipsForFarmer(slug: string): Tip[] {
  return listTips().filter((t) => t.slug === slug);
}

export function totalTipsForFarmer(slug: string): number {
  return tipsForFarmer(slug).reduce((s, t) => s + t.amount, 0);
}

export function totalTippedAcrossAll(): number {
  return listTips().reduce((s, t) => s + t.amount, 0);
}

export function addTip(slug: string, amount: number): Tip {
  const tip: Tip = { id: uid(), slug, amount, ts: Date.now() };
  const all = read<Tip>(TIPS_KEY);
  all.unshift(tip);
  write(TIPS_KEY, all);
  return tip;
}

// ─── Pre-orders ────────────────────────────────────────────────

export function listPreorders(): Preorder[] {
  return read<Preorder>(PREORDERS_KEY).sort((a, b) => b.ts - a.ts);
}

export function preordersForFarmer(slug: string): Preorder[] {
  return listPreorders().filter((p) => p.slug === slug);
}

export function hasPreorder(slug: string): boolean {
  return preordersForFarmer(slug).length > 0;
}

export function addPreorder(slug: string): Preorder {
  const p: Preorder = { id: uid(), slug, ts: Date.now() };
  const all = read<Preorder>(PREORDERS_KEY);
  all.unshift(p);
  write(PREORDERS_KEY, all);
  return p;
}

export function cancelPreorder(slug: string) {
  const all = read<Preorder>(PREORDERS_KEY).filter((p) => p.slug !== slug);
  write(PREORDERS_KEY, all);
}

// ─── Onboarded farmers (from /onboard wizard) ──────────────────

export function listOnboarded(): OnboardedFarmer[] {
  return read<OnboardedFarmer>(ONBOARDED_KEY).sort((a, b) => b.ts - a.ts);
}

export function addOnboarded(f: Omit<OnboardedFarmer, "ts">): OnboardedFarmer {
  const farmer: OnboardedFarmer = { ...f, ts: Date.now() };
  const all = read<OnboardedFarmer>(ONBOARDED_KEY);
  all.unshift(farmer);
  write(ONBOARDED_KEY, all);
  return farmer;
}

// ─── Recently viewed ────────────────────────────────────────────

export function trackRecentView(slug: string) {
  if (typeof window === "undefined") return;
  const all = read<string>(RECENT_KEY).filter((s) => s !== slug);
  all.unshift(slug);
  write(RECENT_KEY, all.slice(0, 12));
}

export function listRecent(): string[] {
  return read<string>(RECENT_KEY);
}

// ─── Clear all (demo reset) ────────────────────────────────────

export function clearAll() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TIPS_KEY);
  window.localStorage.removeItem(PREORDERS_KEY);
  window.localStorage.removeItem(ONBOARDED_KEY);
  window.localStorage.removeItem(RECENT_KEY);
  window.dispatchEvent(new CustomEvent("asli.store.changed"));
}

// ─── Subscribe to changes ──────────────────────────────────────

export function onChange(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("asli.store.changed", cb);
  return () => window.removeEventListener("asli.store.changed", cb);
}
