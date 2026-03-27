import { removeEmptyKeyLegacy } from '../shared/removeEmptyKeyLegacy';

export type SeratoCsvRow = Record<string, string | undefined>;

// Serato exports in this repo are quoted CSV with a first line containing playlist metadata.
// We keep parsing minimal and deterministic (no locale date parsing here).
export function parseSeratoCsvText(csvText: string): SeratoCsvRow[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // Each line is a CSV row with quotes; values can contain commas.
  // Implement a small CSV parser that handles quotes.
  const rows = lines.map(parseCsvLine);

  // Serato fixtures in this repo use a header row like:
  // "name","key","bpm","start time","end time","playtime","deck","","song","#","artist"
  // We'll read header -> index mapping and output keys that legacy helpers expect.
  const header = rows[0] ?? [];
  const headerIndex = new Map<string, number>();
  for (let i = 0; i < header.length; i++) {
    headerIndex.set((header[i] ?? '').trim().toLowerCase(), i);
  }

  const idx = (key: string) => headerIndex.get(key) ?? -1;
  const col = (cols: string[], key: string) => {
    const i = idx(key);
    return i >= 0 ? cols[i] : undefined;
  };

  const mapped: SeratoCsvRow[] = rows.slice(1).map((cols, rowIdx) => {
    // Row 0 after header is the playlist metadata row in these exports.
    if (rowIdx === 0) {
      return {
        name: col(cols, 'name'),
        artist: col(cols, 'artist'),
        'start time': col(cols, 'start time'),
        'end time': col(cols, 'end time'),
        playtime: col(cols, 'playtime'),
      };
    }

    return {
      name: col(cols, 'song') ?? col(cols, 'name'),
      artist: col(cols, 'artist'),
      'start time': col(cols, 'start time'),
      'end time': col(cols, 'end time'),
      playtime: col(cols, 'playtime'),
      deck: col(cols, 'deck'),
      bpm: col(cols, 'bpm'),
      key: col(cols, 'key'),
      song: col(cols, 'song'),
      '#': col(cols, '#'),
      field8: col(cols, '')
    };
  });

  // Match legacy behavior: remove any empty-string keys recursively.
  return removeEmptyKeyLegacy(mapped) as SeratoCsvRow[];
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        // Escaped quote
        current += '"';
        i++;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }

    if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
      continue;
    }

    current += ch;
  }

  result.push(current);
  return result;
}
