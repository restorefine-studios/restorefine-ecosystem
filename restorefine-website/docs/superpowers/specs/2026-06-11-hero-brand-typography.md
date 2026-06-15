Be Brief.

# Hero Brand Typography Update

**Date:** 2026-06-11  
**Scope:** Hero section only (`blocks/home/hero.tsx`)

## Overview

Update the hero section to style the word "Brands" in the main headline as red and italic, emphasizing the brand-focused positioning.

## Changes

### Desktop & Mobile Hero

**Current state:**

- "We Build Brands" appears with "Brands" in bold black text
- A red period follows "Brands" as visual punctuation

**Updated state:**

- "Brands" becomes red (`text-red-600`), italic, and bold
- Red period remains for visual continuity

### Technical Details

**Desktop version (lines 110–117 in hero.tsx):**

- Wrap the word "Brands" in a `<span>` with:
  - `className="text-red-600"`
  - `style={{ fontStyle: "italic", fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}`
- Keep the existing red period span

**Mobile version (lines 63–70 in hero.tsx):**

- Apply the same styling to "Brands" on mobile
- Maintain responsive typography scale with `clamp()`

## Typography Stack

- **Font:** Playfair Display (already imported and configured in `app/layout.tsx`)
- **Style:** Italic
- **Weight:** 700 (bold)
- **Color:** Red (`text-red-600` / `#dc2626`)

## No Breaking Changes

- Playfair Display is already in use; no font replacement needed
- Only visual styling changes; no layout impact
- Works alongside existing animation classes (`rr-l3`, `rr-l4`)

## Testing

- Verify italic rendering on both desktop and mobile
- Confirm red color matches brand palette
- Check animation timing is unaffected
- Test responsive behavior with `clamp()` sizing
