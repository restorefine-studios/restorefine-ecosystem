"use client";

import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookieConsent } from "./cookie-consent-provider";

const GA_ID = "G-87QRBLHJXR";
const CLARITY_ID = "x8w68zirez";

export function AnalyticsScripts() {
  const { consent } = useCookieConsent();

  if (consent !== "accepted") return null;

  return (
    <>
      <Script id="clarity-script" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");`}
      </Script>
      <GoogleAnalytics gaId={GA_ID} />
    </>
  );
}
