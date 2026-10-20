/**
 * Safely resolves public assets relative to the current base path,
 * preventing 404s when hosted on GitHub Pages subpaths or root.
 */
export function getAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || './';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (base.endsWith('/')) {
    return `${base}${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
}
