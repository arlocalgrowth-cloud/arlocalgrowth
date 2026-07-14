"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = "G-HHZSPBKS2C";
export const CONSENT_KEY = "cookie-consent";

// Consent Mode v2 — default denied, updated when user accepts cookies.
// This approach satisfies DSGVO/GDPR and lets Google detect the tag.
const CONSENT_DEFAULT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
`;

function updateConsent(granted: boolean) {
  if (typeof window !== "undefined" && typeof (window as Window & { gtag?: (...args: unknown[]) => void }).gtag === "function") {
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    // Apply existing consent on mount
    updateConsent(localStorage.getItem(CONSENT_KEY) === "all");

    // React to banner interactions
    const handler = () =>
      updateConsent(localStorage.getItem(CONSENT_KEY) === "all");
    window.addEventListener("cookie-consent-changed", handler);
    return () => window.removeEventListener("cookie-consent-changed", handler);
  }, []);

  return (
    <>
      {/* Must run before gtag.js to set default denied state */}
      <Script id="consent-init" strategy="beforeInteractive">
        {CONSENT_DEFAULT}
      </Script>

      {/* Tag always loads — Google can detect it; data flows only after consent */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
