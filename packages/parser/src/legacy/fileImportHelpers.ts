export function arrayCount<T>(arr: T[]) {
  const counts: Record<string, number> = {};
  for (const item of arr) {
    const key = String(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

export function sortObjectByValuesDesc(obj: Record<string, number>) {
  return Object.fromEntries(
    Object.entries(obj).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0)),
  );
}

export function getUniqueStrings(arr: Array<string | undefined | null>) {
  const set = new Set<string>();
  for (const v of arr) {
    const s = (v ?? '').toString().trim();
    if (s) set.add(s);
  }
  return Array.from(set);
}

export function toNumberOrUndefined(v: unknown): number | undefined {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return Number.isFinite(v) ? v : undefined;
  const s = String(v).trim();
  if (!s) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}
