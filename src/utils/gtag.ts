/**
 * Google Analytics 4、Google Ads、Microsoft Clarity トラッキングユーティリティ
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
export const GOOGLE_ADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    clarity?: (...args: any[]) => void;
  }
}

/**
 * GA4 ページビュー送信
 */
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

/**
 * GA4およびGoogle Adsイベント送信
 * 1) event('event_name', { key: 'value' })
 * 2) event({ action: 'event_name', ...params })
 */
export function event(action: string, params?: Record<string, any>): void;
export function event(options: { action: string; [key: string]: any }): void;
export function event(
  actionOrOptions: string | { action: string; [key: string]: any },
  params?: Record<string, any>
): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  if (typeof actionOrOptions === 'string') {
    window.gtag('event', actionOrOptions, params);
  } else if (actionOrOptions && typeof actionOrOptions === 'object') {
    const { action, ...rest } = actionOrOptions;
    window.gtag('event', action, rest);
  }
}

/**
 * Google Ads コンバージョン(conversion)レポート送信
 * @param label コンバージョンラベル（省略時は環境変数 NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL を使用）
 * @param params 追加パラメータ（value, currency など）
 */
export const reportAdsConversion = (
  label?: string,
  params?: Record<string, any>
) => {
  const adsId = GOOGLE_ADS_ID;
  const targetLabel = label || GOOGLE_ADS_CONVERSION_LABEL;

  if (typeof window !== 'undefined' && window.gtag && adsId && targetLabel) {
    window.gtag('event', 'conversion', {
      send_to: `${adsId}/${targetLabel}`,
      ...params,
    });
  }
};

/**
 * 主要コンバージョン（Lead）イベントの同時送信関数
 * - GA4イベント: 'generate_lead' 送信
 * - Google Adsイベント: 'conversion' 送信
 */
export const trackLeadConversion = (params?: {
  label?: string;
  value?: number;
  currency?: string;
  [key: string]: any;
}) => {
  // 1. GA4 コンバージョンイベント
  event('generate_lead', {
    currency: params?.currency || 'JPY',
    value: params?.value,
    ...params,
  });

  // 2. Google Ads コンバージョンイベント
  reportAdsConversion(params?.label, params);
};
