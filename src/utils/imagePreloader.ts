// Utility to preload and cache project images without blocking the initial page load

import { getAssetUrl } from './assets';

const preloadedUrls = new Set<string>();

export const OPC_UA_IMAGES = [
  getAssetUrl('/opcuacasestudy/assets/product/workspace-overview.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/opcua-concept.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/entry-apps-gallery.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/empty-workspace.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/add-server.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/configure.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/connect-dialog.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/connected-tree.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/add-to-table.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/read-current.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/read-historical.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/read-historical-result.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/write.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/live-plot.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/generated-script.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/activity-log.webp'),
  getAssetUrl('/opcuacasestudy/assets/product/node-info.webp'),
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
  getAssetUrl('/assets/dream11_page_04.webp'),
  getAssetUrl('/assets/dream11_page_08.webp'),
];

export const AI_CODE_IMAGES = [
  getAssetUrl('/assets/ai_code_graphic.webp'),
  getAssetUrl('/assets/ai_code_page_01.webp'),
  getAssetUrl('/assets/ai_code_page_02.webp'),
  getAssetUrl('/assets/ai_code_page_03.webp'),
  getAssetUrl('/assets/ai_code_page_04.webp'),
  getAssetUrl('/assets/ai_code_page_05.webp'),
  getAssetUrl('/assets/ai_code_page_06.webp'),
  getAssetUrl('/assets/ai_code_page_07.webp'),
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
  } else if (caseId === 'ai-design-to-code') {
    preloadImages(AI_CODE_IMAGES, priority);
  }
}
