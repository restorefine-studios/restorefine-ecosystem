import { NotFoundScreen } from "@/components/not-found-screen";

export default function NotFound() {
  return (
    <NotFoundScreen
      headingLead="This Project"
      headingAccent="Went Missing"
      body="We couldn't find that case study. It may have moved, or the link you followed might be out of date."
      ctaLabel="Back to Portfolio"
      ctaHref="/portfolio"
    />
  );
}
