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

export const MOTOR_IMAGES = [
  getAssetUrl('/assets/motor_parameter_hero.webp'),
  getAssetUrl('/assets/motor_page_01.webp'),
  getAssetUrl('/assets/motor_page_02.webp'),
  getAssetUrl('/assets/motor_page_03.webp'),
  getAssetUrl('/assets/motor_page_06.webp'),
  getAssetUrl('/assets/motor_page_07.webp'),
  getAssetUrl('/assets/motor_page_08.webp'),
  getAssetUrl('/assets/motor_page_10.webp'),
  getAssetUrl('/assets/motor_page_12.webp'),
  getAssetUrl('/assets/motor_page_13.webp'),
  getAssetUrl('/assets/motor_page_16.webp'),
  getAssetUrl('/assets/motor_page_17.webp'),
  getAssetUrl('/assets/motor_page_18.webp'),
  getAssetUrl('/assets/motor_page_19.webp'),
  getAssetUrl('/assets/motor_page_20.webp'),
  getAssetUrl('/assets/motor_stator_precision.webp'),
  getAssetUrl('/assets/motor_page_22.webp'),
];

export const IO_DEVICE_IMAGES = [
  getAssetUrl('/assets/iodevice/hero_io_builder_window.webp'),
  getAssetUrl('/assets/iodevice/toolstrip_integration.webp'),
  getAssetUrl('/assets/iodevice/block_parameters_dialog.webp'),
  getAssetUrl('/assets/iodevice/source_folder_selection.webp'),
  getAssetUrl('/assets/iodevice/cpp_source_selection.webp'),
  getAssetUrl('/assets/iodevice/outputs_dialog.webp'),
  getAssetUrl('/assets/iodevice/inputs_dialog.webp'),
  getAssetUrl('/assets/iodevice/persona_aneesh.webp'),
  getAssetUrl('/assets/iodevice/persona_sam.webp'),
  getAssetUrl('/assets/iodevice/persona_meghna.webp'),
  getAssetUrl('/assets/iodevice/team_collaboration.webp'),
  getAssetUrl('/assets/iodevice/challenge_wire_tangle.webp'),
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
  } else if (caseId === 'motor-parameter') {
    preloadImages(MOTOR_IMAGES, priority);
  } else if (caseId === 'io-device-builder') {
    preloadImages(IO_DEVICE_IMAGES, priority);
  }
}
