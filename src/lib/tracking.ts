/**
 * Tracking utility for Japanese LP (UIT-Fukuoka)
 * Integrates Google Analytics (GA4), Google Ads, Microsoft Clarity, and Meta Pixel.
 */

import {
  GA_TRACKING_ID,
  GOOGLE_ADS_ID,
  GOOGLE_ADS_CONVERSION_LABEL,
  CLARITY_ID,
  pageview as gtagPageView,
  event as gtagEvent,
  reportAdsConversion as gtagReportAdsConversion,
  trackLeadConversion as gtagTrackLeadConversion,
} from '@/utils/gtag';

export {
  GA_TRACKING_ID,
  GOOGLE_ADS_ID,
  GOOGLE_ADS_CONVERSION_LABEL,
  CLARITY_ID,
  gtagTrackLeadConversion as trackLeadConversion,
};

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
    clarity?: (...args: any[]) => void;
  }
}

/**
 * Track page views across GA4 and Meta Pixel
 */
export const pageview = (url: string) => {
  gtagPageView(url);
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track custom events
 */
export const event = gtagEvent;

/**
 * Track Meta Pixel Standard Events
 */
export const trackMetaEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

/**
 * Google Ads Conversion Helper
 */
export const reportAdsConversion = gtagReportAdsConversion;
export const trackGoogleAdsConversion = (label?: string, params?: Record<string, any>) => {
  gtagReportAdsConversion(label, params);
};

/**
 * Lead Conversion Tracking
 * Triggers:
 * 1. Meta Pixel: 'Lead'
 * 2. GA4: 'generate_lead'
 * 3. Google Ads: 'conversion'
 */
export const trackLead = (params?: Record<string, any>) => {
  trackMetaEvent('Lead', params);
  gtagTrackLeadConversion(params);
};

/**
 * Track Contact intent (e.g., clicking CTA button to reach form)
 */
export const trackContact = (params?: Record<string, any>) => {
  trackMetaEvent('Contact', params);
  gtagEvent('contact_click', {
    event_category: 'engagement',
    event_label: 'Consultation CTA',
    ...params,
  });
};

/**
 * Track ViewContent event (e.g., viewing counselor details)
 */
export const trackViewContent = (contentName: string) => {
  trackMetaEvent('ViewContent', { content_name: contentName });
  gtagEvent('view_content', { content_name: contentName });
};
