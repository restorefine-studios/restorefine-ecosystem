import { ExpandingCta } from "@/blocks/portfolio/expanding-cta";

function Cta() {
  return (
    <ExpandingCta
      heading={
        <>
          <span className="block">Let&apos;s Discuss With</span>
          <span
            className="block normal-case text-zinc-950 font-light leading-none"
            style={{
              fontFamily: "var(--font-holiday), serif",
              fontSize: "clamp(3.2rem, 5.5vw, 5.6rem)",
              marginTop: "-0.6rem",
            }}
          >
            Our Team
          </span>
        </>
      }
      body="Giving You The Best Price And Coverage For Your Property Needs."
    />
  );
}

export default Cta;
