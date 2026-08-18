"use client";

import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookieConsent } from "./cookie-consent-provider";

const GA_ID = "G-R5N8ZE5RDE";
const CLARITY_ID = "x8w68zirez";

export function AnalyticsScripts() {
  const { consent } = useCookieConsent();

  return (
    <>
      {/* GA4 always loads so Google's installation checker detects it; Consent Mode
          (see app/layout.tsx) keeps analytics_storage denied until consent is granted. */}
      <GoogleAnalytics gaId={GA_ID} />
      {consent === "accepted" && (
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      )}
    </>
  );
}
