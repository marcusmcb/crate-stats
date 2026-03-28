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
  const isRecord = (value: unknown): value is Record<string, unknown> =>
    !!value && typeof value === 'object' && !Array.isArray(value);

  const asString = (value: unknown): string | undefined =>
    typeof value === 'string' ? value : undefined;

  const asNumber = (value: unknown): number | undefined =>
    typeof value === 'number' && Number.isFinite(value) ? value : undefined;

  const asArray = (value: unknown): unknown[] | undefined =>
    Array.isArray(value) ? value : undefined;

  const get = (obj: unknown, key: string): unknown => (isRecord(obj) ? obj[key] : undefined);

  const getErrorFromJson = (value: unknown): string | undefined => {
    if (!isRecord(value)) return undefined;
    return asString(value.error);
  };

  const formatPercent = (value: unknown): string | undefined => {
    const s = asString(value);
    if (s) return `${s}%`;
    const n = asNumber(value);
    if (typeof n === 'number') return `${n.toFixed(1)}%`;
    return undefined;
  };

  const SectionCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="rounded-lg border bg-white p-4">
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      <div className="mt-3 grid gap-2 text-sm text-gray-800">{children}</div>
    </section>
  );

  const KV = ({ label, value }: { label: string; value?: React.ReactNode }) => (
    <div className="grid grid-cols-[160px_1fr] gap-3">
      <div className="text-gray-600">{label}</div>
      <div className="min-w-0 break-words">{value ?? <span className="text-gray-400">—</span>}</div>
    </div>
  );

  const InlineList = ({ items }: { items: unknown }) => {
    const arr = asArray(items);
    if (!arr?.length) return <span className="text-gray-400">—</span>;
    const cleaned = arr
      .map((x) => (typeof x === 'string' ? x : typeof x === 'number' ? String(x) : null))
      .filter((x): x is string => !!x);
    if (!cleaned.length) return <span className="text-gray-400">—</span>;
    return <span>{cleaned.join(', ')}</span>;
  };

  const [platform, setPlatform] = useState<Platform>('serato');
  const [fileState, setFileState] = useState<FileReadState>({ status: 'idle' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => fileState.status === 'ready' && !isSubmitting,
    [fileState.status, isSubmitting],
  );

  const onPickFile = async (file: File | null) => {
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
  };

  const onAnalyze = async () => {
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

      const json: unknown = await res.json();

      if (!res.ok) {
        throw new Error(getErrorFromJson(json) ?? `Request failed (${res.status})`);
      }
      setResult(json);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analyze failed';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const report = result;
  const trackData = get(report, 'track_data');
  const bpmData = get(report, 'bpm_data');
  const genreData = get(report, 'genre_data');
  const keyData = get(report, 'key_data');
  const ratingData = get(report, 'rating_data');
  const masterTrackLog = get(report, 'master_track_log');

  const totalTracksPlayed =
    asNumber(get(trackData, 'total_tracks_played')) ??
    (asArray(masterTrackLog)?.length ?? undefined);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">CrateStats (Revamp) — Analyze</h1>
      <p className="mt-2 text-sm text-gray-600">
        MVP: upload a Serato/Traktor/Rekordbox export and view the core report sections.
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
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <SectionCard title="Summary">
                <KV label="Platform" value={asString(get(report, 'platform')) ?? platform} />
                <KV label="Tracks played" value={totalTracksPlayed != null ? String(totalTracksPlayed) : undefined} />
                <KV
                  label="Avg track length"
                  value={asString(get(trackData, 'average_track_length')) ?? undefined}
                />
                <KV
                  label="Unique tracks"
                  value={
                    asNumber(get(trackData, 'unique_tracks_played')) != null
                      ? String(asNumber(get(trackData, 'unique_tracks_played')))
                      : undefined
                  }
                />
              </SectionCard>

              {isRecord(trackData) ? (
                <SectionCard title="Tracks">
                  <KV
                    label="Average"
                    value={asString(get(trackData, 'average_track_length')) ?? undefined}
                  />
                  <KV
                    label="Longest"
                    value={(() => {
                      const longest = get(trackData, 'longest_track') ?? get(trackData, 'longest_track_played');
                      if (!isRecord(longest)) return undefined;
                      const title = asString(get(longest, 'title')) ?? asString(get(longest, 'name'));
                      const artist = asString(get(longest, 'artist'));
                      const length = asString(get(longest, 'length')) ?? asString(get(longest, 'play_time'));
                      if (!title && !artist) return undefined;
                      return `${title ?? 'Unknown'}${artist ? ` — ${artist}` : ''}${length ? ` (${length})` : ''}`;
                    })()}
                  />
                  <KV
                    label="Shortest"
                    value={(() => {
                      const shortest =
                        get(trackData, 'shortest_track') ?? get(trackData, 'shortest_track_played');
                      if (!isRecord(shortest)) return undefined;
                      const title = asString(get(shortest, 'title')) ?? asString(get(shortest, 'name'));
                      const artist = asString(get(shortest, 'artist'));
                      const length = asString(get(shortest, 'length')) ?? asString(get(shortest, 'play_time'));
                      if (!title && !artist) return undefined;
                      return `${title ?? 'Unknown'}${artist ? ` — ${artist}` : ''}${length ? ` (${length})` : ''}`;
                    })()}
                  />
                </SectionCard>
              ) : null}
            </div>

            {isRecord(bpmData) || isRecord(genreData) || isRecord(keyData) || isRecord(ratingData) ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {isRecord(bpmData) ? (
                  <SectionCard title="BPM">
                    <KV label="Average" value={asString(get(bpmData, 'average_bpm')) ?? undefined} />
                    <KV
                      label="Range"
                      value={(() => {
                        const range = get(bpmData, 'bpm_range');
                        if (!isRecord(range)) return undefined;

                        const min =
                          asNumber(get(range, 'minBPM')) ??
                          asNumber(get(range, 'minimum')) ??
                          (typeof get(range, 'minBPM') === 'string'
                            ? Number.parseFloat(get(range, 'minBPM') as string)
                            : undefined);
                        const max =
                          asNumber(get(range, 'maxBPM')) ??
                          asNumber(get(range, 'maximum')) ??
                          (typeof get(range, 'maxBPM') === 'string'
                            ? Number.parseFloat(get(range, 'maxBPM') as string)
                            : undefined);

                        if (min == null || max == null) return undefined;
                        return `${min} – ${max}`;
                      })()}
                    />
                    <KV
                      label="Most common"
                      value={(() => {
                        const mc = get(bpmData, 'most_common_bpm');
                        if (!isRecord(mc)) return undefined;
                        const value = get(mc, 'value');
                        const times = get(mc, 'times_played');
                        const valueStr =
                          typeof value === 'number'
                            ? String(value)
                            : typeof value === 'string'
                              ? value
                              : undefined;
                        const timesStr =
                          typeof times === 'number'
                            ? String(times)
                            : typeof times === 'string'
                              ? times
                              : undefined;
                        if (!valueStr) return undefined;
                        return `${valueStr}${timesStr ? ` (${timesStr}x)` : ''}`;
                      })()}
                    />
                    <KV
                      label="Tag health"
                      value={(() => {
                        const th = get(bpmData, 'tag_health');
                        if (!isRecord(th)) return undefined;
                        const pct = formatPercent(get(th, 'percentage_with_bpm_tags'));
                        const empty = get(th, 'empty_bpm_tags');
                        const emptyStr =
                          typeof empty === 'number'
                            ? String(empty)
                            : typeof empty === 'string'
                              ? empty
                              : undefined;
                        if (!pct && !emptyStr) return undefined;
                        return `${pct ?? '—'} tagged${emptyStr ? `, ${emptyStr} empty` : ''}`;
                      })()}
                    />
                  </SectionCard>
                ) : null}

                {isRecord(genreData) ? (
                  <SectionCard title="Genres">
                    <KV
                      label="Unique"
                      value={
                        asNumber(get(genreData, 'unique_genres_played')) != null
                          ? String(asNumber(get(genreData, 'unique_genres_played')))
                          : undefined
                      }
                    />
                    <KV label="Top 3" value={<InlineList items={get(genreData, 'top_three_genres')} />} />
                    <KV
                      label="Tag health"
                      value={(() => {
                        const th = get(genreData, 'tag_health');
                        if (!isRecord(th)) return undefined;
                        const pct = formatPercent(get(th, 'percentage_with_genre_tags'));
                        const empty = get(th, 'empty_genre_tags');
                        const emptyStr =
                          typeof empty === 'number'
                            ? String(empty)
                            : typeof empty === 'string'
                              ? empty
                              : undefined;
                        if (!pct && !emptyStr) return undefined;
                        return `${pct ?? '—'} tagged${emptyStr ? `, ${emptyStr} empty` : ''}`;
                      })()}
                    />
                  </SectionCard>
                ) : null}

                {isRecord(keyData) ? (
                  <SectionCard title="Keys">
                    <KV
                      label="Most common"
                      value={(() => {
                        const mc = get(keyData, 'most_common_key');
                        if (!isRecord(mc)) return undefined;
                        const k = asString(get(mc, 'key'));
                        const times = get(mc, 'times_played');
                        const timesStr =
                          typeof times === 'number'
                            ? String(times)
                            : typeof times === 'string'
                              ? times
                              : undefined;
                        return k ? `${k}${timesStr ? ` (${timesStr}x)` : ''}` : undefined;
                      })()}
                    />
                    <KV
                      label="Least common"
                      value={(() => {
                        const lc = get(keyData, 'least_common_key');
                        if (!isRecord(lc)) return undefined;
                        const k = asString(get(lc, 'key'));
                        const times = get(lc, 'times_played');
                        const timesStr =
                          typeof times === 'number'
                            ? String(times)
                            : typeof times === 'string'
                              ? times
                              : undefined;
                        return k ? `${k}${timesStr ? ` (${timesStr}x)` : ''}` : undefined;
                      })()}
                    />
                    <KV
                      label="Tag health"
                      value={(() => {
                        const th = get(keyData, 'tag_health');
                        if (!isRecord(th)) return undefined;
                        const pct = formatPercent(get(th, 'percentage_with_key_tags'));
                        const empty = get(th, 'empty_key_tags');
                        const emptyStr =
                          typeof empty === 'number'
                            ? String(empty)
                            : typeof empty === 'string'
                              ? empty
                              : undefined;
                        if (!pct && !emptyStr) return undefined;
                        return `${pct ?? '—'} tagged${emptyStr ? `, ${emptyStr} empty` : ''}`;
                      })()}
                    />
                  </SectionCard>
                ) : null}

                {isRecord(ratingData) ? (
                  <SectionCard title="Ratings">
                    <KV
                      label="Five star tracks"
                      value={(() => {
                        const fiveStar = get(ratingData, 'five_star_tracks');
                        const arr = asArray(fiveStar);
                        if (!arr) return undefined;
                        return String(arr.length);
                      })()}
                    />
                    <KV
                      label="Tag health"
                      value={(() => {
                        const th = get(ratingData, 'tag_health');
                        if (!isRecord(th)) return undefined;
                        const pct = formatPercent(get(th, 'percentage_with_ratings'));
                        const pct5 = formatPercent(get(th, 'percentage_with_five_star_ratings'));
                        if (!pct && !pct5) return undefined;
                        return `${pct ?? '—'} rated${pct5 ? `, ${pct5} 5★` : ''}`;
                      })()}
                    />
                  </SectionCard>
                ) : null}
              </div>
            ) : null}

            <details className="rounded-lg border bg-gray-50 p-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-900">Raw JSON</summary>
              <pre className="mt-3 max-h-[60vh] overflow-auto rounded-md bg-gray-950 p-4 text-xs text-gray-100">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        ) : null}
      </div>
    </main>
  );
}
