'use client';

import { useEffect } from 'react';
import { trackLeadConversion } from '@/lib/tracking';

export default function ThanksTrigger() {
  useEffect(() => {
    // フォーム送信完了 / サンクスページ到達時のコンバージョンイベント発火
    // GA4: 'generate_lead', Google Ads: 'conversion'
    trackLeadConversion({
      page_title: 'Thanks',
      page_location: window.location.href,
    });
  }, []);

  return null;
}
