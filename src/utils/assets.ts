/**
 * Safely resolves public assets relative to the current base path,
 * preventing 404s when hosted on GitHub Pages subpaths or root.
 * Never alters already-resolved URLs (http/https/data/blob or relative ./ paths).
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';

  // If already an absolute web URL, data URI, or blob URI, return as-is
  if (/^(https?:|data:|blob:|\/\/)/i.test(path)) {
    return path;
  }

  // If already a relative path explicitly handled by Vite bundler (e.g. starts with './' or '../')
  if (path.startsWith('./') || path.startsWith('../')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || './';

  // If base is set to a subpath (e.g. '/portfolio/') and path already includes it, return as-is
  if (base !== './' && base !== '/' && path.startsWith(base)) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (base.endsWith('/')) {
    return `${base}${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
}
