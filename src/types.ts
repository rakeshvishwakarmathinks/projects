/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'home' | 'dream11' | 'motor-parameter' | 'io-device-builder' | 'ai-design-to-code' | 'opc-ua-explorer';

export interface StatItem {
  value: string;
  countVal: number;
  suffix: string;
  label: string;
}

export interface CaseStudyMetadata {
  id: string;
  numberStr: string;
  company: string;
  year: string;
  period: string;
  title: string;
  summary: string;
  role: string;
  teamSize: string;
  tags: string[];
  stats: StatItem[];
  colorTheme: string;
}
