'use client';

import { useMemo, useState } from 'react';

type Platform = 'serato' | 'traktor' | 'rekordbox';

type AnalyzeResponse = unknown;

type FileReadState =
  | { status: 'idle' }
  | { status: 'reading' }
  | { status: 'ready'; fileName: string; text: string }
  | { status: 'error'; message: string };

export default function AnalyzePage() {
  const [platform, setPlatform] = useState<Platform>('serato');
  const [fileState, setFileState] = useState<FileReadState>({ status: 'idle' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => fileState.status === 'ready' && !isSubmitting,
    [fileState.status, isSubmitting],
  );

  async function onPickFile(file: File | null) {
    setResult(null);
    setError(null);

    if (!file) {
      setFileState({ status: 'idle' });
      return;
    }

    setFileState({ status: 'reading' });
    try {
      const text = await file.text();
      setFileState({ status: 'ready', fileName: file.name, text });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to read file';
      setFileState({ status: 'error', message });
    }
  }

  async function onAnalyze() {
    if (fileState.status !== 'ready') return;

    setIsSubmitting(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          platform,
          fileName: fileState.fileName,
          text: fileState.text,
        }),
      });

      const json = (await res.json()) as any;
      if (!res.ok) {
        throw new Error(json?.error ?? `Request failed (${res.status})`);
      }
      setResult(json);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analyze failed';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">CrateStats (Revamp) — Analyze</h1>
      <p className="mt-2 text-sm text-gray-600">
        MVP smoke test: upload a Serato/Traktor/Rekordbox export and view the raw report JSON.
      </p>

      <div className="mt-6 grid gap-4 rounded-lg border p-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Platform</span>
          <select
            className="h-10 rounded-md border px-3"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
          >
            <option value="serato">Serato</option>
            <option value="traktor">Traktor</option>
            <option value="rekordbox">Rekordbox</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">File</span>
          <input
            type="file"
            className="block w-full text-sm"
            accept=".csv,.txt,text/plain,text/csv"
            onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
          />
          <div className="text-xs text-gray-600">
            Status:{' '}
            {fileState.status === 'idle'
              ? 'No file selected'
              : fileState.status === 'reading'
                ? 'Reading…'
                : fileState.status === 'ready'
                  ? `Ready (${fileState.fileName}, ${fileState.text.length.toLocaleString()} chars)`
                  : `Error (${fileState.message})`}
          </div>
        </label>

        <button
          className="h-10 rounded-md bg-black px-4 text-sm font-medium text-white disabled:opacity-50"
          onClick={onAnalyze}
          disabled={!canSubmit}
        >
          {isSubmitting ? 'Analyzing…' : 'Analyze'}
        </button>

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {result ? (
          <pre className="max-h-[60vh] overflow-auto rounded-md bg-gray-950 p-4 text-xs text-gray-100">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : null}
      </div>
    </main>
  );
}
