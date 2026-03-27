// Port of scripts/shared/fileImportHelpers.js removeEmptyKey
export function removeEmptyKeyLegacy(obj: unknown): unknown {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = removeEmptyKeyLegacy(obj[i]);
    }
    return obj;
  }

  const rec = obj as Record<string, unknown>;
  for (const key of Object.keys(rec)) {
    if (key === '') {
      delete rec[key];
      continue;
    }
    if (typeof rec[key] === 'object') {
      rec[key] = removeEmptyKeyLegacy(rec[key]);
    }
  }
  return rec;
}
