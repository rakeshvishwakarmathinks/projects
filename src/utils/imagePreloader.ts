// Utility to preload and cache project images without blocking the initial page load

const preloadedUrls = new Set<string>();

export const OPC_UA_IMAGES = [
  '/opcuacasestudy/assets/product/workspace-overview.webp',
  '/opcuacasestudy/assets/product/opcua-concept.webp',
  '/opcuacasestudy/assets/product/entry-apps-gallery.webp',
  '/opcuacasestudy/assets/product/empty-workspace.webp',
  '/opcuacasestudy/assets/product/add-server.webp',
  '/opcuacasestudy/assets/product/configure.webp',
  '/opcuacasestudy/assets/product/connect-dialog.webp',
  '/opcuacasestudy/assets/product/connected-tree.webp',
  '/opcuacasestudy/assets/product/add-to-table.webp',
  '/opcuacasestudy/assets/product/read-current.webp',
  '/opcuacasestudy/assets/product/read-historical.webp',
  '/opcuacasestudy/assets/product/read-historical-result.webp',
  '/opcuacasestudy/assets/product/write.webp',
  '/opcuacasestudy/assets/product/live-plot.webp',
  '/opcuacasestudy/assets/product/generated-script.webp',
  '/opcuacasestudy/assets/product/activity-log.webp',
  '/opcuacasestudy/assets/product/node-info.webp',
];

/**
 * Preloads an array of image URLs concurrently in the background.
 * Uses native Image preloading and browser cache.
 */
export function preloadImages(urls: string[], priority: 'high' | 'auto' | 'low' = 'auto'): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  const promises = urls.map((src) => {
    if (!src || preloadedUrls.has(src)) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      if ('fetchPriority' in img) {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = priority;
      }
      img.onload = () => {
        preloadedUrls.add(src);
        resolve();
      };
      img.onerror = () => {
        preloadedUrls.add(src);
        resolve();
      };
      img.src = src;
    });
  });

  return Promise.all(promises).then(() => undefined);
}

export const DREAM11_IMAGES = [
  '/assets/dream11_page_04.webp',
  '/assets/dream11_page_08.webp',
];

/**
 * Prefetch images for a specific project/case study.
 * Can be called on card hover/pointerenter or on project page landing.
 */
export function prefetchCaseStudy(caseId: string, priority: 'high' | 'auto' | 'low' = 'auto') {
  if (caseId === 'opc-ua-explorer') {
    preloadImages(OPC_UA_IMAGES, priority);
  } else if (caseId === 'dream11') {
    preloadImages(DREAM11_IMAGES, priority);
  }
}
