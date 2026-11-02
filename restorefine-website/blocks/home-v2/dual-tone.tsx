/**
 * Sets the closing phrase of a heading in a quieter grey, as in the intro heading.
 * The text and its spacing are unchanged, so the heading reads the same to search
 * engines. `tail` is the phrase to grey; without a tail, or when this page's heading
 * does not end with it, the last ~40% of words (at least one) are greyed.
 */
export function DualTone({ text, tail, dark = false }: { text: string; tail?: string; dark?: boolean }) {
  const words = text.trim().split(/\s+/);
  let head: string;
  let rest: string;
  if (tail && text.endsWith(tail) && text.length > tail.length) {
    head = text.slice(0, text.length - tail.length).trimEnd();
    rest = tail;
  } else if (words.length > 1) {
    // No tail given, or this page's wording differs: grey the closing words
    const n = Math.max(1, Math.floor(words.length * 0.4));
    head = words.slice(0, -n).join(" ");
    rest = words.slice(-n).join(" ");
  } else {
    return <>{text}</>;
  }
  return (
    <>
      {head}{" "}
      <span className={dark ? "text-zinc-500" : "text-zinc-400"}>{rest}</span>
    </>
  );
}
