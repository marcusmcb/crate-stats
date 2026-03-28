import { removeEmptyKeyLegacy } from '../shared/removeEmptyKeyLegacy.js';

export type TraktorRow = Record<string, string | undefined>;

// Traktor history exports in this repo are tab-separated with a header row.
export function parseTraktorTxtText(txt: string): TraktorRow[] {
  const lines = txt.split(/\r?\n/).map((l) => l.trimEnd());
  const nonEmpty = lines.filter((l) => l.length > 0);
  if (nonEmpty.length === 0) return [];

  const headerRaw = nonEmpty[0].split('\t');
  const header = headerRaw.map((h) => {
    const trimmed = h.trim();
    if (trimmed === 'index') return 'index';
    if (trimmed === '□□#') return 'index';
    return trimmed;
  });

  const rows: TraktorRow[] = [];
  for (const line of nonEmpty.slice(1)) {
    const cols = line.split('\t');
    const obj: TraktorRow = {};
    for (let i = 0; i < header.length; i++) {
      const key = header[i];
      obj[key] = cols[i] ?? '';
    }

    // Align with legacy cleanPlaylistArray() which deletes index and artwork.
    delete obj.index;
    delete obj.Artwork;
    delete obj['#'];

    rows.push(obj);
  }

  // Legacy convertToCSV/JSON parse yields an extra trailing empty record for many exports.
  rows.push({});

  return removeEmptyKeyLegacy(rows) as TraktorRow[];
}

export function decodeTraktorText(input: string | Uint8Array): string {
  if (typeof input === 'string') return input;

  const hasUtf16LeBom = input.length >= 2 && input[0] === 0xff && input[1] === 0xfe;
  if (hasUtf16LeBom) {
    return Buffer.from(input).toString('utf16le');
  }

  return Buffer.from(input).toString('utf8');
}
