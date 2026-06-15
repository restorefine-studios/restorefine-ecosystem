# Hero Brand Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the word "Brands" in the hero section red and italic to emphasize brand positioning.

**Architecture:** Update the `blocks/home/hero.tsx` component to wrap the word "Brands" in styled spans. Two changes: one for desktop (lines 110–117) and one for mobile (lines 63–70). Both apply red color and italic styling to Playfair Display.

**Tech Stack:** React, Tailwind CSS, inline styles for font-style

---

## File Structure

**Modified:**
- `blocks/home/hero.tsx` — Update two `<span>` wrappers around "Brands" to add red color and italic styling

---

### Task 1: Update Desktop "Brands" Styling

**Files:**
- Modify: `blocks/home/hero.tsx:110–117`

- [ ] **Step 1: Locate the desktop "Brands" text**

Open `blocks/home/hero.tsx` and find lines 110–117 (the `rr-l4` div inside the second `rr-line-wrap-large`).

Current code:
```jsx
<div className="rr-l4 text-zinc-950" style={{ fontSize: "clamp(3.5rem, 6.5vw, 7.5rem)", lineHeight: 0.9, letterSpacing: "-0.03em", fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
  Brands
  <span className="text-red-600" style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
    .
  </span>
</div>
```

- [ ] **Step 2: Wrap "Brands" in a styled span**

Replace the above with:
```jsx
<div className="rr-l4 text-zinc-950" style={{ fontSize: "clamp(3.5rem, 6.5vw, 7.5rem)", lineHeight: 0.9, letterSpacing: "-0.03em", fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
  <span className="text-red-600" style={{ fontStyle: "italic", fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
    Brands
  </span>
  <span className="text-red-600" style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
    .
  </span>
</div>
```

- [ ] **Step 3: Commit desktop change**

```bash
git add blocks/home/hero.tsx
git commit -m "style: make desktop 'Brands' red and italic in hero"
```

---

### Task 2: Update Mobile "Brands" Styling

**Files:**
- Modify: `blocks/home/hero.tsx:63–70`

- [ ] **Step 1: Locate the mobile "Brands" text**

Find lines 63–70 (the `rr-l3` div inside the second `rr-line-wrap-large` on mobile).

Current code:
```jsx
<div className="rr-l3 mt-2 text-zinc-950 whitespace-nowrap" style={{ fontSize: "clamp(1.9rem, 9.5vw, 3.8rem)", lineHeight: 0.95, letterSpacing: "-0.02em", fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
  We Build Brands
  <span className="text-red-600" style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
    .
  </span>
</div>
```

Wait — this contains both "We Build" and "Brands". Need to refactor to isolate "Brands".

- [ ] **Step 2: Refactor to separate "We Build" and "Brands"**

Replace with:
```jsx
<div className="rr-l3 mt-2 text-zinc-950 whitespace-nowrap" style={{ fontSize: "clamp(1.9rem, 9.5vw, 3.8rem)", lineHeight: 0.95, letterSpacing: "-0.02em", fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
  We Build{" "}
  <span className="text-red-600" style={{ fontStyle: "italic", fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
    Brands
  </span>
  <span className="text-red-600" style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
    .
  </span>
</div>
```

- [ ] **Step 3: Commit mobile change**

```bash
git add blocks/home/hero.tsx
git commit -m "style: make mobile 'Brands' red and italic in hero"
```

---

### Task 3: Verify Changes in Browser

**Files:**
- Test: `blocks/home/hero.tsx` (visual verification)

- [ ] **Step 1: Start the development server**

```bash
npm run dev
```

Expected output: Server running on `http://localhost:3000`

- [ ] **Step 2: Navigate to the home page**

Open `http://localhost:3000` in your browser.

- [ ] **Step 3: Verify desktop hero**

Resize browser to desktop width (≥1024px). Check:
- "We Don't Follow Trends" appears in regular serif (unchanged)
- "We Build" appears in bold serif (unchanged)
- "Brands" appears in **red**, **italic**, **bold** serif
- Red period follows "Brands"

- [ ] **Step 4: Verify mobile hero**

Resize browser to mobile width (<1024px). Check:
- "We Don't Follow Trends" appears in gray serif (unchanged)
- "We Build Brands" layout is maintained
- "Brands" appears in **red**, **italic**, **bold** serif
- Red period follows "Brands"

- [ ] **Step 5: Check animation and responsiveness**

- Verify text animates in with slide-up motion (unchanged)
- Resize browser window to test `clamp()` responsive behavior
- Verify italic rendering is sharp and legible at all breakpoints

---

### Task 4: Final Commit (if needed)

**Files:**
- Verify: `blocks/home/hero.tsx`

- [ ] **Step 1: Check git status**

```bash
git status
```

Expected: All changes should be committed from Tasks 1 and 2.

- [ ] **Step 2: Review commits**

```bash
git log --oneline -5
```

Verify two commits exist:
- "style: make desktop 'Brands' red and italic in hero"
- "style: make mobile 'Brands' red and italic in hero"

- [ ] **Step 3: Done**

All changes are committed and verified. The hero section now displays "Brands" in red italic styling.

---

## Testing Checklist

- [ ] Desktop: "Brands" is red, italic, and bold
- [ ] Mobile: "Brands" is red, italic, and bold
- [ ] Red period appears after "Brands" on both breakpoints
- [ ] Animations play smoothly
- [ ] Responsive sizing works with clamp()
- [ ] No console errors or warnings
- [ ] All commits created with clear messages
