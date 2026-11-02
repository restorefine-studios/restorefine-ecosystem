/**
 * Renders `text`, setting the first occurrence of `accent` in the Holiday
 * script face. Falls back to plain text when the accent is missing.
 */
export function AccentText({ text, accent, className = "text-red-600" }: { text: string; accent?: string; className?: string }) {
  const index = accent ? text.indexOf(accent) : -1;
  if (!accent || index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className={`font-normal normal-case tracking-normal ${className}`} style={{ fontFamily: "var(--font-holiday), serif" }}>
        {accent}
      </span>
      {text.slice(index + accent.length)}
    </>
  );
}
