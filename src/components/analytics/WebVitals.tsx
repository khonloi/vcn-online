'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Development debugging when flag is set in session
    if (process.env.NODE_ENV === 'development') {
      if (typeof window !== 'undefined' && window.sessionStorage?.getItem('debug_vitals')) {
        console.debug('[Web Vital]', metric.name, metric.value, metric.rating);
      }
    }

    // Telemetry transmission if configured
    const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
    if (endpoint && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const payload = JSON.stringify({
        id: metric.id,
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        navigationType: metric.navigationType,
        timestamp: Date.now(),
      });
      navigator.sendBeacon(endpoint, payload);
    }
  });

  return null;
}
