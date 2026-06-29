"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

const GA_ID = "G-JTS9F28JER";
export const CONSENT_KEY = "cookie-consent";

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    setHasConsent(localStorage.getItem(CONSENT_KEY) === "all");

    const handler = () => {
      setHasConsent(localStorage.getItem(CONSENT_KEY) === "all");
    };
    window.addEventListener("cookie-consent-changed", handler);
    return () => window.removeEventListener("cookie-consent-changed", handler);
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
