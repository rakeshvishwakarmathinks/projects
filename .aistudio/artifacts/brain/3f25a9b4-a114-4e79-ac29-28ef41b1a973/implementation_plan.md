# Implementation Plan: Bebas Neue Display Typography & All-Caps Styling

In response to your preferences, this plan integrates the bold, condensed **Bebas Neue** display typography from `index.html` across the hero title, case study cards, section headers, and impact numbers, with all-caps styling, while preserving **DM Sans** for descriptive copy and maintaining all accessibility and screen reader safeguards.

---

## 1. User Alignment & Clarifications Summary
- **Elements Receiving Bebas Neue**:
  1. **Hero Main Headline**: `TURNING COMPLEX PROBLEMS INTO CLEAR DESIGN INTENT AND BUSINESS OUTCOMES.`
  2. **Section Headings**: `SHIPPED WORK` (portfolio index), `IMPACT AT A GLANCE`, and `ABOUT`.
  3. **Case Study Card Titles**: `OPC UA EXPLORER FOR INDUSTRIAL AUTOMATION`, `ONE-CLICK PLAYER REMOVAL FOR 140M+ USERS DURING LIVE MATCHES`, `AI DESIGN-TO-CODE PIPELINE CUTTING DELIVERY BY 70%`, `PRECISION MOTOR PARAMETER ESTIMATION FOR EV OEMS`, and `REVOLUTIONISING HARDWARE SENSOR INTEGRATION FOR 5M+ ENGINEERS`.
  4. **Impact Stat Numbers**: `225M+`, `500%+`, `70%`, `6YRS+`.
- **Casing**: All uppercase as demonstrated in the `index.html` reference design.
- **Body & Subtitle Preservation**: Refined **DM Sans** (weights 300 Light & 400 Regular) with airy `1.7`–`1.8` line-heights retained for all paragraphs, subtitles, and quote bodies.
- **Monospace Metadata**: **DM Mono** retained for eyebrows, kickers, dates, and tag chips with uppercase wide tracking (`0.06em` to `0.18em`).

---

## 2. Architecture & Design Specifications

### A. Font Stack Configuration
- `index.html`: Ensure Google Fonts imports load `Bebas Neue`, `DM Sans` (300, 400, 500, 700), and `DM Mono` (400, 500).
- `src/index.css`:
  - `--font-display`: `"Bebas Neue", sans-serif;`
  - `--font-body`: `"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;`
  - `--font-mono`: `"DM Mono", monospace;`
  - Heading utility classes:
    - `.hero-display-title`: `font-family: var(--font-display); font-size: clamp(3.25rem, 6.5vw, 6.5rem); letter-spacing: 0.02em; line-height: 0.88; text-transform: uppercase;`
    - `.section-display-title`: `font-family: var(--font-display); font-size: clamp(2.25rem, 3.5vw, 3.75rem); letter-spacing: 0.02em; line-height: 0.92; text-transform: uppercase;`
    - `.card-display-title`: `font-family: var(--font-display); font-size: clamp(1.4rem, 1.8vw, 1.85rem); letter-spacing: 0.02em; line-height: 0.95; text-transform: uppercase;`

### B. Accessibility & Screen Reader Compliance (WCAG AA/AAA)
1. **Semantic HTML Intact**: `<h1 className="hero-display-title">`, `<h2 className="section-display-title">`, `<h3 className="card-display-title">`. Screen readers announce semantic heading level regardless of CSS uppercase transform.
2. **Accessible Contrast Ratios**:
   - Hero & Card Titles: Crisp white (`#ffffff` / `#f5f5f7`) on dark surfaces (`#000000` / `#0a0a0d`), achieving a **21:1 contrast ratio** (well above WCAG AAA 7:1).
   - Light Section Titles (About): High-contrast `#111114` on `#ffffff`, achieving an **18:1 contrast ratio**.
   - Accent Moments: Burnt orange-red `#ff5b4f` used intentionally for emphasis.
3. **No Decorative Ghost Typography**: No faded watermarks or low-contrast background labels that confuse cognitive accessibility.
4. **Legibility & Optical Spacing**: Letter-spacing (`0.02em`) applied to Bebas Neue uppercase titles to prevent glyph collision, with `text-wrap: balance` to avoid isolated orphan words.

---

## 3. Step-by-Step Implementation Sequence

1. **CSS System Tuning (`src/index.css`)**:
   - Add specialized display utility classes (`.hero-display-title`, `.section-display-title`, `.card-display-title`) in `@layer utilities`.
   - Ensure clean baseline alignment and responsive clamp rules for Bebas Neue titles.

2. **Homepage Hero Headline (`src/components/HomePage.tsx`)**:
   - Update `<h1>` in hero from `font-sans` to `font-display uppercase tracking-[0.02em] leading-[0.88] clamp(3.25rem, 6.5vw, 6.5rem)`.
   - Ensure gradient/accent treatment for `"business outcomes"` matches the reference punchy contrast.

3. **Homepage Section Headings (`src/components/HomePage.tsx`)**:
   - Update `Shipped Work` heading (`<h2>`) to `font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.02em] leading-[0.92] text-white`.
   - Update `About` heading (`<h2>`) in light section to `font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.02em] leading-[0.92] text-zinc-900`.

4. **Case Study Card Titles (`src/components/HomePage.tsx`)**:
   - Update all 5 project card `<h3>` elements to `font-display uppercase tracking-[0.02em] leading-[0.95] text-white group-hover:text-accent transition-colors`.
   - Maintain `DM Sans` (`font-light text-zinc-300 leading-[1.7]`) on all card summary descriptions.

5. **Build & Lint Verification**:
   - Run `compile_applet` and `lint_applet` to ensure zero compilation or TypeScript errors.
   - Verify visually in the preview environment.
