import { NotFoundScreen } from "@/components/not-found-screen";

export default function NotFound() {
  return (
    <NotFoundScreen
      headingLead="This Article"
      headingAccent="Moved On"
      body="We couldn't find that post. It may have been renamed, or the link you followed might be out of date."
      ctaLabel="Back to Resources"
      ctaHref="/resources"
    />
  );
}
