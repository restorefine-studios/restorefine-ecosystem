import type { Metadata } from "next";
import { NotFoundScreen } from "@/components/not-found-screen";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <NotFoundScreen
      headingLead="This Page"
      headingAccent="Walked Out"
      body="Looks like this page doesn't exist, or it moved somewhere new. Let's get you back on track."
      ctaLabel="Back to Home"
      ctaHref="/"
    />
  );
}
