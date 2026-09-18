'use client';

import { useEffect } from 'react';
import { trackGoogleAdsConversion } from '@/lib/tracking';

export default function ThanksTrigger() {
  useEffect(() => {
    const label = "_dGBCPv0mbkcEKuEk-dD";
    if (label) {
      trackGoogleAdsConversion(label);
    }
  }, []);

  return null;
}
