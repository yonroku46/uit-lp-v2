/**
 * Tracking utility for Japanese LP (UIT-Fukuoka)
 * Handles Meta Pixel and Google Tag Manager events.
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18201494059';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track page views (usually handled automatically by base scripts, 
 * but useful for manual triggers if needed)
 */
export const pageview = (url: string) => {
  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track custom events (e.g., button clicks, form submissions)
 */
export const event = ({ action, category, label, value }: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  // GTM Event
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track Meta Pixel Standard Events
 * @see https://developers.facebook.com/docs/meta-pixel/reference#standard-events
 */
export const trackMetaEvent = (eventName: string, params?: object) => {
  if (window.fbq) {
    window.fbq('track', eventName, params);
  }
};

/**
 * Specifically track Lead conversion for Meta Pixel
 */
export const trackLead = () => {
  trackMetaEvent('Lead');
};

/**
 * Track Contact event (e.g., clicking CTA button to reach form)
 */
export const trackContact = () => {
  trackMetaEvent('Contact');
};

/**
 * Track ViewContent event (e.g., viewing counselor details)
 */
export const trackViewContent = (contentName: string) => {
  trackMetaEvent('ViewContent', { content_name: contentName });
};

/**
 * Specifically track Google Ads Conversion Event
 */
export const trackGoogleAdsConversion = (label: string) => {
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
    });
  }
};
