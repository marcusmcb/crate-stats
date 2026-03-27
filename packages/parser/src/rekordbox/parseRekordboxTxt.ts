import { removeEmptyKeyLegacy } from '../shared/removeEmptyKeyLegacy';

export type RekordboxRow = Record<string, string | undefined>;

// Rekordbox TXT exports in this repo are tab-separated with a header row.
// Example header includes an odd "□□#" column which legacy code maps via replaceHash.
export function parseRekordboxTxtText(txt: string): RekordboxRow[] {
  const lines = txt.split(/\r?\n/).map((l) => l.trimEnd());

  const nonEmpty = lines.filter((l) => l.length > 0);
  if (nonEmpty.length === 0) return [];

  const headerRaw = nonEmpty[0].split('\t');
  const header = headerRaw.map((h) => {
    const trimmed = h.trim();
    if (trimmed === '□□#') return 'index';
    if (trimmed === 'index') return 'index';
    return trimmed;
  });

  const rows: RekordboxRow[] = [];
  for (const line of nonEmpty.slice(1)) {
    const cols = line.split('\t');
    const obj: RekordboxRow = {};
    for (let i = 0; i < header.length; i++) {
      const key = header[i];
      // Preserve whitespace inside fields to match legacy convertToCSV behavior.
      obj[key] = cols[i] ?? '';
    }
    // Match legacy behavior:
    // - cleanPlaylistArray() deletes `index`
    // - some older fixtures/tooling expose this as `#` which legacy never keeps
    delete obj.index;
    delete obj['#'];
    rows.push(obj);
  }

  // Legacy convertToCSV/JSON parse yields an extra trailing empty record for many exports.
  // Downstream legacy code slices off the last row; add a sentinel so our wrapper matches counts.
  rows.push({});

  return removeEmptyKeyLegacy(rows) as RekordboxRow[];
}

export function decodeRekordboxText(input: string | Uint8Array): string {
  if (typeof input === 'string') return input;

  // Many Rekordbox exports are UTF-16LE with BOM (0xFF 0xFE).
  const hasUtf16LeBom = input.length >= 2 && input[0] === 0xff && input[1] === 0xfe;
  if (hasUtf16LeBom) {
    return Buffer.from(input).toString('utf16le');
  }

  return Buffer.from(input).toString('utf8');
}
