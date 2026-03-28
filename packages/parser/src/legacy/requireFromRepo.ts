import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const requireCjs = createRequire(import.meta.url);

function findRepoRoot(startDir: string) {
  let current = startDir;

  // Walk up until we find a directory that contains `scripts/`.
  // This works in:
  // - Next dev: cwd is usually `.../apps/web`
  // - Parser tests/build: cwd is often `.../packages/parser`
  // - Node scripts: cwd may be repo root
  for (let i = 0; i < 10; i++) {
    if (existsSync(resolve(current, 'scripts'))) {
      return current;
    }
    const parent = resolve(current, '..');
    if (parent === current) {
      break;
    }
    current = parent;
  }

  // Fallback: derive from the current file location (dist/src) and walk up.
  current = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 15; i++) {
    if (existsSync(resolve(current, 'scripts'))) {
      return current;
    }
    const parent = resolve(current, '..');
    if (parent === current) {
      break;
    }
    current = parent;
  }

  throw new Error(
    'Could not locate repo root (missing scripts/). Try running from within the crate-stats repo.'
  );
}

export function requireFromRepo<T = unknown>(repoRelativePath: string): T {
  const repoRoot = findRepoRoot(process.cwd());
  const absPath = resolve(repoRoot, repoRelativePath);
  return requireCjs(absPath) as T;
}
