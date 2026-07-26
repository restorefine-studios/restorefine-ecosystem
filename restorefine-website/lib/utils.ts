import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safe JSON-LD serialiser.
 *
 * Escaping only the literal `</script>` is not enough: the HTML tokeniser also
 * ends a script on `</script ` and `</script/`, so a stray tag in CMS copy could
 * still break out. Every `<` in JSON.stringify output sits inside a string
 * literal, so escaping it is always safe and JSON parsers decode it straight
 * back. U+2028/U+2029 are escaped too: they are valid JSON but terminate a line
 * in older JS parsers.
 */
export function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
