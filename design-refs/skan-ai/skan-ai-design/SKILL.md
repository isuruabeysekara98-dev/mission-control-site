---
name: skan-ai-design
description: Design system skill for skan-ai. Activate when building UI components, pages, or any visual elements. Provides exact color tokens, typography scale, spacing grid, component patterns, and craft rules. Read references/DESIGN.md before writing any CSS or JSX. Includes ultra-mode visual journey: read references/ANIMATIONS.md, references/LAYOUT.md, references/COMPONENTS.md, and references/INTERACTIONS.md for full motion and layout details.
---

# skan-ai Design System

You are building UI for **skan-ai**. Light-themed, cool palette, sans-serif typography (messinaSans), compact density on a 4px grid, expressive motion.

## Visual Reference

**IMPORTANT**: Study ALL screenshots below before writing any UI. Match colors, typography, spacing, layout, and motion exactly as shown.

### Homepage

![skan-ai Homepage](screenshots/homepage.png)

### Scroll Journey (Cinematic Visual States)

> These screenshots capture the website at different scroll depths. The design changes dramatically as you scroll — each frame shows a different cinematic state. Replicate these exact visual transitions.

#### 0% — Hero / Above the fold

![Scroll 0%](screens/scroll/scroll-000.png)

#### 17% — Mid-page at 17% scroll

![Scroll 17%](screens/scroll/scroll-017.png)

#### 33% — Mid-page at 33% scroll

![Scroll 33%](screens/scroll/scroll-033.png)

#### 50% — Mid-page at 50% scroll

![Scroll 50%](screens/scroll/scroll-050.png)

#### 67% — Mid-page at 67% scroll

![Scroll 67%](screens/scroll/scroll-067.png)

#### 83% — Mid-page at 83% scroll

![Scroll 83%](screens/scroll/scroll-083.png)

#### 100% — Footer / End of page

![Scroll 100%](screens/scroll/scroll-100.png)

### Video Backgrounds (First Frames)

![Video 1 (background)](screens/scroll/video-1-frame.png)

> Read `references/DESIGN.md` for full token details. Read `references/ANIMATIONS.md` for motion specs. Read `references/LAYOUT.md` for layout structure. Read `references/COMPONENTS.md` for component patterns.

## Ultra Reference Files

This package includes extended documentation. **Read these files before implementing:**

| File | Contents |
|------|----------|
| `references/DESIGN.md` | Full design system tokens, colors, typography, spacing |
| `references/VISUAL_GUIDE.md` | **START HERE** — Master visual guide with all screenshots embedded |
| `references/ANIMATIONS.md` | CSS keyframes, scroll triggers, motion library stack, video specs |
| `references/LAYOUT.md` | Flex/grid containers, page structure, spacing relationships |
| `references/COMPONENTS.md` | DOM component patterns, HTML structure, class fingerprints |
| `references/INTERACTIONS.md` | Hover/focus states with before/after style diffs |
| `screens/scroll/` | 7 scroll journey screenshots showing cinematic states |

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Type pairing** — messinaSans for body/UI text, everett for headings/display. Never introduce a third typeface.
- **compact density** — 4px base grid. Every dimension is a multiple of 4.
- **cool palette** — the color temperature runs cool, matching the sans-serif typography.
- **Restrained accent** — `#007aff` is the only pop of color. Used exclusively for CTAs, links, focus rings, and active states.
- **Expressive motion** — animations are an integral part of the experience. Use spring physics and layout animations.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Background | `--background` | `#fafafa` | Page/app background |
| Surface | `--surface` | `#e5f8ff` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#1b1c17` | Headings, body text |
| Text Muted | `--text-muted` | `#4a4b44` | Captions, placeholders |
| Accent | `--accent` | `#007aff` | CTAs, links, focus rings |
| Border | `--border` | `#252622` | Dividers, card borders |

### Status Colors

| Status | Hex | Use |
|--------|-----|-----|
| Danger | `#ff5a5a` | Errors, destructive actions |

### Extended Palette

- `#c3c6bb`
- `#9677ff`
- **color-black:** `#000000` — Deep background layer or shadow color
- `#6c6c66`
- `#81837a`
- `#e0e3de` — Light surface or highlight color
- `#d8dad1`
- `#97c8ff`

### CSS Variable Tokens

```css
--color-accent: var(--accent);
--background: var(--white);
--foreground: var(--night);
--muted: var(--night);
--border: var(--stone-50);
--accent: var(--grape);
--accent-hover: var(--amethyst);
--card: var(--stone-50);
--card-hover: var(--stone-75);
--color-accent: var(--accent);
--background: var(--white);
--foreground: var(--night);
--muted: var(--night);
--border: var(--stone-50);
--accent: var(--grape);
--accent-hover: var(--amethyst);
--card: var(--stone-50);
--card-hover: var(--stone-75);
--color-accent: var(--accent);
--background: var(--white);
```

## Typography

### Font Stack

- **messinaSans** — Heading 1, Heading 2
- **everett** — Body, Caption
- **SFMono-Regular** — Code

### Font Sources

```css
@font-face {
  font-family: "everett";
  src: url("fonts/everett-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "messinaSans";
  src: url("fonts/messinaSans-Regular.woff2") format("woff2");
  font-weight: 400;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | messinaSans | 40px | 700 |
| Heading 2 | messinaSans | 32px | 700 |
| Body | everett | clamp(min(var(--mobile-font-size),var(--desktop-font-size)),calc((var(--vi-multiplier)*100vi) + (var(--base-offset)/16*1rem)),max(var(--mobile-font-size),var(--desktop-font-size))) | 400 |
| Caption | everett | .875rem | 400 |
| Code | SFMono-Regular | 14px | 400 |

### Typography Rules

- Body/UI: **messinaSans**, Headings: **everett** — these are the only display fonts
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 4px

Every dimension (margin, padding, gap, width, height) must be a multiple of **4px**.

### Spacing Scale

`2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24` px

### Spacing as Meaning

| Spacing | Use |
|---------|-----|
| 4-8px | Tight: related items (icon + label, avatar + name) |
| 12-16px | Medium: between groups within a section |
| 24-32px | Wide: between distinct sections |
| 48px+ | Vast: major page section breaks |

### Border Radius

Scale: `.25rem, .375rem, .75rem, 1px, 2px, 4px, 6px, 10px`
Default: `2px`

### Container

Max-width: `1120px`, centered with auto margins.

### Breakpoints

| Name | Value |
|------|-------|
| sm | 39.9375rem |
| sm | 40rem |
| md | 48rem |
| lg | 64rem |
| xl | 80rem |
| 2xl | 96rem |
| 2xl | 160rem |
| md | 768px |
| lg | 1024px |

Mobile-first: design for small screens, layer on responsive overrides.

## Component Patterns

### Card

```css
.card {
  background: #e5f8ff;
  border: 1px solid #252622;
  border-radius: 2px;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px;
}
```

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Button

```css
/* Primary */
.btn-primary {
  background: #007aff;
  color: #1b1c17;
  border-radius: 2px;
  padding: 8px 16px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #252622;
  color: #1b1c17;
  border-radius: 2px;
  padding: 8px 16px;
}
```

```html
<button class="btn-primary">Get Started</button>
<button class="btn-ghost">Learn More</button>
```

### Input

```css
.input {
  background: #fafafa;
  border: 1px solid #252622;
  border-radius: 2px;
  padding: 8px 12px;
  color: #1b1c17;
  font-size: 14px;
}
.input:focus { border-color: #007aff; outline: none; }
```

```html
<input class="input" type="text" placeholder="Search..." />
```

### Badge / Chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #e5f8ff;
  color: #4a4b44;
}
```

```html
<span class="badge">New</span>
<span class="badge">Beta</span>
```

### Modal / Dialog

```css
.modal-backdrop { background: rgba(0, 0, 0, 0.6); }
.modal {
  background: #e5f8ff;
  border: 1px solid #252622;
  border-radius: 10px;
  padding: 24px;
  max-width: 480px;
  width: 90vw;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px;
}
```

```html
<div class="modal-backdrop">
  <div class="modal">
    <h2>Dialog Title</h2>
    <p>Dialog content.</p>
    <button class="btn-primary">Confirm</button>
    <button class="btn-ghost">Cancel</button>
  </div>
</div>
```

### Table

```css
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 12px;
  color: #4a4b44;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #252622;
}
.table td {
  padding: 12px;
  border-bottom: 1px solid #252622;
}
```

```html
<table class="table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>
    <tr><td>Item One</td><td>Active</td><td>Jan 1</td></tr>
    <tr><td>Item Two</td><td>Pending</td><td>Jan 2</td></tr>
  </tbody>
</table>
```

### Navigation

```css
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #252622;
}
.nav-link {
  color: #4a4b44;
  padding: 8px 12px;
  border-radius: 2px;
  transition: color 150ms;
}
.nav-link:hover { color: #1b1c17; }
.nav-link.active { color: #007aff; }
```

```html
<nav class="nav">
  <a href="/" class="nav-link active">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/pricing" class="nav-link">Pricing</a>
  <button class="btn-primary" style="margin-left: auto">Get Started</button>
</nav>
```

### Extracted Components

These components were found in the codebase:

**Button** (`html`)
- Variants: `16`

**Input** (`html`)

**Card** (`html`)
- Variants: `body-20`, `hover`, `body-18`

**Navigation** (`html`)

## Page Structure

The following page sections were detected:

- **Navigation** — Top navigation bar (5 items)
- **Hero** — Hero/banner section with headline and CTAs
- **Faq** — FAQ/accordion section
- **Footer** — Page footer with links and info (32 items)
- **Testimonials** — Testimonials/reviews section
- **Cards** — Grid of 10 card elements (10 items)

When building pages, follow this section order and structure.

## Animation & Motion

This project uses **expressive motion**. Animations are part of the design language.

### CSS Animations

- `corner-pulse`
- `corner-blink`
- `marquee`
- `ticker-ring`
- `corner-open`

### Motion Tokens

- **Duration scale:** `.01ms`, `.15s`, `.2s`, `.3s`, `.5s`, `.6s`, `.65s`, `.9s`, `150ms`, `200ms`, `300ms`
- **Easing functions:** `cubic-bezier(.16,1,.3,1)`, `ease`, `ease-out`, `ease-in-out`
- **Animated properties:** `transform`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (.01ms) for micro-interactions, long (300ms) for page transitions
- **Easing:** Use `cubic-bezier(.16,1,.3,1)` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Subtle: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px`

### Z-Index Scale

`0, 1, 2, 10, 20, 30, 40, 50, 100`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No blur effects** — no backdrop-blur, no filter: blur()
- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 4px
- **No extra fonts** — only messinaSans and everett and SFMono-Regular are allowed
- **No arbitrary border-radius** — use the scale: .25rem, .375rem, .75rem, 1px, 2px, 4px, 6px, 10px
- **No opacity for disabled states** — use muted colors instead

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — messinaSans, everett, SFMono-Regular only, using the type scale
4. **Build layout** on the 4px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `/favicon.ico`
- **Site URL:** `https://www.skan.ai/`
- **Brand color:** `#007aff`
- **Brand typeface:** messinaSans

## Quick Reference

```
Background:     #fafafa
Surface:        #e5f8ff
Text:           #1b1c17 / #4a4b44
Accent:         #007aff
Border:         #252622
Font:           messinaSans
Spacing:        4px grid
Radius:         2px
Components:     10 detected
```

## When to Trigger

Activate this skill when:
- Creating new components, pages, or visual elements for skan-ai
- Writing CSS, Tailwind classes, styled-components, or inline styles
- Building page layouts, templates, or responsive designs
- Reviewing UI code for design consistency
- The user mentions "skan-ai" design, style, UI, or theme
- Generating mockups, wireframes, or visual prototypes

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

# skan-ai DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 17 · Fonts: 3 · Components: 10
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![skan-ai Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a cool, approachable feel. The light background emphasizes content clarity. Typography pairs **everett** for display/headings with **messinaSans** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. The palette is predominantly monochromatic with **#007aff** as the single accent color — used sparingly for interactive elements and emphasis. Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| theme-color | `#fafafa` | background | Page background, darkest surface |
| surface | `#e5f8ff` | surface | Card and panel backgrounds |
| text-primary | `#1b1c17` | text-primary | Headings and body text |
| text-muted | `#4a4b44` | text-muted | Captions, placeholders, secondary info |
| border | `#252622` | border | Dividers, card borders, outlines |
| swiper-theme-color | `#007aff` | accent | CTAs, links, focus rings, active states |
| danger | `#ff5a5a` | danger | Error states, destructive actions |
| info | `#9677ff` | info | Informational highlights |
| unknown | `#c3c6bb` | unknown | Palette color |
| color-black | `#000000` | unknown | Palette color |
| unknown | `#6c6c66` | unknown | Palette color |
| unknown | `#81837a` | unknown | Palette color |
| unknown | `#e0e3de` | unknown | Palette color |
| unknown | `#d8dad1` | unknown | Palette color |
| unknown | `#97c8ff` | unknown | Palette color |
| unknown | `#6474cd` | unknown | Palette color |
| unknown | `#383a35` | unknown | Palette color |

### CSS Variable Tokens

```css
--tw-border-style: solid;
--color-accent: var(--accent);
--tw-border-style: dashed;
--background: var(--white);
--foreground: var(--night);
--muted: var(--night);
--border: var(--stone-50);
--accent: var(--grape);
--accent-hover: var(--amethyst);
--card: var(--stone-50);
--card-hover: var(--stone-75);
--tw-border-style: solid;
--color-accent: var(--accent);
--tw-border-style: dashed;
--background: var(--white);
--foreground: var(--night);
--muted: var(--night);
--border: var(--stone-50);
--accent: var(--grape);
--accent-hover: var(--amethyst);
```


---

## 3. Typography Rules

**Font Stack:**
- **messinaSans** — Heading 1, Heading 2
- **everett** — Body, Caption
- **SFMono-Regular** — Code

**Font Sources:**

```css
@font-face {
  font-family: "everett";
  src: url("fonts/everett-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "messinaSans";
  src: url("fonts/messinaSans-Regular.woff2") format("woff2");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | messinaSans | 40px | 700 |
| Heading 2 | messinaSans | 32px | 700 |
| Body | everett | clamp(min(var(--mobile-font-size),var(--desktop-font-size)),calc((var(--vi-multiplier)*100vi) + (var(--base-offset)/16*1rem)),max(var(--mobile-font-size),var(--desktop-font-size))) | 400 |
| Caption | everett | .875rem | 400 |
| Code | SFMono-Regular | 14px | 400 |

**Typographic Rules:**
- Limit to 3 font families max per screen
- Use **messinaSans** for body/UI text, **everett** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Footer** — `html`

### Navigation (1)

**Navigation** — `html`

### Data Display (3)

**Card** — `html`
- Variants: `body-20`, `hover`, `body-18`

**Badge** — `html`

**List** — `html`

### Data Input (2)

**Button** — `html`
- Variants: `16`
- Animation: 

**Input** — `html`
- State: :focus, :placeholder

### Media (3)

**Image** — `html`

**Icon** — `html`

**Map/Canvas** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Border radius:** .25rem, .375rem, .75rem, 1px, 2px, 4px, 6px, 10px
- **Max content width:** 1120px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Flat — subtle depth hints

- `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px`

### Z-Index Scale

`0, 1, 2, 10, 20, 30, 40, 50, 100`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes corner-pulse`
- `@keyframes corner-blink`
- `@keyframes marquee`
- `@keyframes ticker-ring`
- `@keyframes corner-open`
- `@keyframes logo-fade-in`
- `@keyframes job-row-reveal`
- `@keyframes ai-masthead-scan`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#007aff` for interactive elements (buttons, links, focus rings)
- Use `#fafafa` as the primary page background
- Pair **messinaSans** (body) with **everett** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: .25rem, .375rem, .75rem, 1px, 2px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond messinaSans and everett and SFMono-Regular
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| sm | 39.9375rem | css |
| sm | 40rem | css |
| md | 48rem | css |
| lg | 64rem | css |
| xl | 80rem | css |
| 2xl | 96rem | css |
| 2xl | 160rem | css |
| md | 768px | css |
| lg | 1024px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #e5f8ff
Border: 1px solid #252622
Radius: 2px
Padding: 16px
Font: messinaSans
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #007aff, text white
Ghost: bg transparent, border #252622
Padding: 8px 16px
Radius: 2px
Hover: opacity 0.9 or lighter shade
Focus: ring with #007aff
```

### Build a Page Layout

```
Background: #fafafa
Max-width: 1120px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #e5f8ff
Label: #4a4b44 (muted, 12px, uppercase)
Value: #1b1c17 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #fafafa
Input border: 1px solid #252622
Focus: border-color #007aff
Label: #4a4b44 12px
Spacing: 16px between fields
Radius: 2px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: messinaSans, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```

## Visual Guide — Screenshots (VISUAL_GUIDE.md)

# skan-ai — Visual Guide

> Master visual reference. Study every screenshot carefully before implementing any UI.
> Match colors, layout, typography, spacing, and motion states exactly.

## Scroll Journey

The page has cinematic scroll animations. Each screenshot below shows the exact visual state at that scroll depth.
**Replicate these transitions precisely** — the design changes dramatically as you scroll.

### Hero — Above the fold

*Scroll position: 0px of 12420px total*

![Hero — Above the fold](../screens/scroll/scroll-000.png)

### 17% scroll depth

*Scroll position: 1958px of 12420px total*

![17% scroll depth](../screens/scroll/scroll-017.png)

### 33% scroll depth

*Scroll position: 3802px of 12420px total*

![33% scroll depth](../screens/scroll/scroll-033.png)

### 50% scroll depth

*Scroll position: 5756px of 12420px total*

![50% scroll depth](../screens/scroll/scroll-050.png)

### 67% scroll depth

*Scroll position: 7718px of 12420px total*

![67% scroll depth](../screens/scroll/scroll-067.png)

### 83% scroll depth

*Scroll position: 9562px of 12420px total*

![83% scroll depth](../screens/scroll/scroll-083.png)

### Footer — End of page

*Scroll position: 10724px of 12420px total*

![Footer — End of page](../screens/scroll/scroll-100.png)

## Video Backgrounds

These videos play as background elements. Use first-frame as poster image while video loads.

### Video 1 (background)

*Source: `https://cdn.sanity.io/files/3xg3qj5k/production/a6922608b6894fed0f02a1caee65553a...`*

![Video 1 first frame](../screens/scroll/video-1-frame.png)

## Full Page Screenshots

### Context Graph of Work and Agentic AI Platform | Skan AI

*URL: `https://www.skan.ai/`*

![Context Graph of Work and Agentic AI Platform | Skan AI](../screens/pages/home.png)

### Skan AI Raises $63 Million in Series C Funding Round | Skan AI

*URL: `https://www.skan.ai/skan-ai-raises-series-c`*

![Skan AI Raises $63 Million in Series C Funding Round | Skan AI](../screens/pages/skan-ai-raises-series-c.png)

### Context Graph of Work | Skan AI

*URL: `https://www.skan.ai/context-graph-of-work`*

![Context Graph of Work | Skan AI](../screens/pages/context-graph-of-work.png)

### Case Studies | Skan AI

*URL: `https://www.skan.ai/case-studies`*

![Case Studies | Skan AI](../screens/pages/case-studies.png)

### Enterprise AI Security & Trust | Skan AI

*URL: `https://www.skan.ai/security-trust-and-transparency`*

![Enterprise AI Security & Trust | Skan AI](../screens/pages/security-trust-and-transparency.png)

### Resource Center | Skan AI

*URL: `https://www.skan.ai/resource-center`*

![Resource Center | Skan AI](../screens/pages/resource-center.png)

## Section Screenshots

Clipped sections showing individual components in context.

### Section 1 — `section`

*1440×810px*

![Section 1](../screens/sections/home-section-1.png)

### Section 2 — `section`

*1440×284px*

![Section 2](../screens/sections/home-section-2.png)

### Section 1 — `section`

*1440×613px*

![Section 1](../screens/sections/skan-ai-raises-series-c-section-1.png)

### Section 2 — `section`

*1440×310px*

![Section 2](../screens/sections/skan-ai-raises-series-c-section-2.png)

### Section 1 — `section`

*1440×1200px*

![Section 1](../screens/sections/context-graph-of-work-section-1.png)

### Section 1 — `section`

*1440×1196px*

![Section 1](../screens/sections/case-studies-section-1.png)

### Section 3 — `article`

*986×550px*

![Section 3](../screens/sections/case-studies-section-3.png)

### Section 1 — `section`

*1440×589px*

![Section 1](../screens/sections/security-trust-and-transparency-section-1.png)

### Section 2 — `section`

*1440×292px*

![Section 2](../screens/sections/security-trust-and-transparency-section-2.png)

### Section 2 — `article`

*1320×446px*

![Section 2](../screens/sections/resource-center-section-2.png)

### Section 4 — `main > div`

*1416×1200px*

![Section 4](../screens/sections/resource-center-section-4.png)

## Animations & Motion (ANIMATIONS.md)

# Animation Reference

> Cinematic motion design extracted from live DOM. Follow these specs exactly to recreate the experience.

## Motion Technology Stack

Pure CSS animations — no external animation libraries detected.

## Scroll Journey

The page is **12,420px** tall. Each frame below shows what the user sees at that scroll depth.

> **Use these screenshots to understand WHAT animates, WHEN it animates, and HOW it moves.**

### 0% — Top / Hero
Scroll position: 0px

![Scroll 0%](../screens/scroll/scroll-000.png)

### 17% — Opening Section
Scroll position: 1,958px

![Scroll 17%](../screens/scroll/scroll-017.png)

### 33% — First Feature Section
Scroll position: 3,802px

![Scroll 33%](../screens/scroll/scroll-033.png)

### 50% — Mid-Page
Scroll position: 5,756px

![Scroll 50%](../screens/scroll/scroll-050.png)

### 67% — Lower Content
Scroll position: 7,718px

![Scroll 67%](../screens/scroll/scroll-067.png)

### 83% — Near Footer
Scroll position: 9,562px

![Scroll 83%](../screens/scroll/scroll-083.png)

### 100% — Bottom / Footer
Scroll position: 10,724px

![Scroll 100%](../screens/scroll/scroll-100.png)

## Video Elements

| # | Role | Autoplay | Loop | Muted | Size | First Frame |
|---|------|----------|------|-------|------|-------------|
| 1 | background | ✓ | ✓ | ✓ | 1440×810 | [view](../screens/scroll/video-1-frame.png) |
| 2 | content | ✓ | ✓ | ✓ | 759×599 | — |

**Video 1 first frame:**

![Video 1 Frame](../screens/scroll/video-1-frame.png)

- **Source:** `https://cdn.sanity.io/files/3xg3qj5k/production/a6922608b6894fed0f02a1caee65553acc80105d.mp4`

## Scroll Animation Patterns

| Pattern | Library | Element Count | Duration | Delay | Easing |
|---------|---------|---------------|----------|-------|--------|
| parallax / sticky scroll | CSS | 3 | — | — | — |

### CSS Implementation

## CSS Keyframes (16 extracted)

### `@keyframes corner-pulse`

Duration: `0.4s` · Easing: `ease-out` · Delay: `0s` · Iteration: `1` · Fill: `none`

Used by: `.corner-pulse .corner-tl, .corner-pulse .corner-tr, .corner-pulse .corner-bl, .c`

```css
@keyframes corner-pulse {
  50% {
    transform: translate(calc(var(--corner-dir-x,0) * 4px), calc(var(--corner-dir-y,0) * 4px));
  }
}
```

> Transform/motion animation

### `@keyframes corner-blink`

Duration: `0.6s` · Easing: `ease-in-out` · Delay: `0s` · Iteration: `1` · Fill: `none`

Used by: `.corner-blink .corner-tl, .corner-blink .corner-tr, .corner-blink .corner-bl, .c`

```css
@keyframes corner-blink {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes corner-open`

Duration: `0.55s` · Easing: `cubic-bezier(0.22, 1, 0.36, 1)` · Delay: `var(--reveal-delay,0s)` · Iteration: `1` · Fill: `both`

Used by: `.logo-frame .corner-tl, .logo-frame .corner-tr, .logo-frame .corner-bl, .logo-fr`

```css
@keyframes corner-open {
  0% {
    transform: translate(calc(var(--corner-dir-x,0) * .75rem), calc(var(--corner-dir-y,0) * .75rem));
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translate(0px);
  }
}
```

> Fade + motion enter animation

### `@keyframes logo-fade-in`

Duration: `0.7s` · Easing: `cubic-bezier(0.22, 1, 0.36, 1)` · Delay: `calc(var(--reveal-delay,0s) + .16s)` · Iteration: `1` · Fill: `both`

Used by: `.logo-frame-img`

```css
@keyframes logo-fade-in {
  0% {
    opacity: 0;
    filter: blur(6px);
    transform: scale(0.92);
  }
  100% {
    opacity: 1;
    filter: blur();
    transform: scale(1);
  }
}
```

> Fade + motion enter animation · Filter effect (blur/brightness)

### `@keyframes job-row-reveal`

Duration: `0.4s` · Easing: `cubic-bezier(0.22, 1, 0.36, 1)` · Delay: `var(--reveal-delay,0s)` · Iteration: `1` · Fill: `both`

Used by: `.job-row-reveal`

```css
@keyframes job-row-reveal {
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
```

> Fade + motion enter animation

### `@keyframes ai-masthead-scan`

Duration: `3.4s` · Easing: `cubic-bezier(0.45, 0, 0.2, 1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.ai-masthead__grid--sweep::after`

```css
@keyframes ai-masthead-scan {
  0% {
    transform: translate(-130%);
  }
  80%, 100% {
    transform: translate(340%);
  }
}
```

> Transform/motion animation

### `@keyframes button-grid-in`

Duration: `0.55s` · Easing: `ease-out` · Delay: `0s` · Iteration: `1` · Fill: `both`

Used by: `.button-grid-in`

```css
@keyframes button-grid-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes button-grid-out`

Duration: `0.55s` · Easing: `ease-out` · Delay: `0s` · Iteration: `1` · Fill: `both`

Used by: `.button-grid-out`

```css
@keyframes button-grid-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

> Opacity fade

### `@keyframes button-square-pulse`

Easing: `ease-in-out` · Iteration: `infinite` · Fill: `both`

Used by: `.button-square-pulse`

```css
@keyframes button-square-pulse {
  0% {
    opacity: 0;
  }
  23% {
    opacity: 0.45;
  }
  54% {
    opacity: 0.45;
  }
  78%, 100% {
    opacity: 0;
  }
}
```

> Opacity fade

### `@keyframes hubspot-form-skeleton-pulse`

Duration: `1.1s` · Easing: `ease-in-out` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.hubspot-form-skeleton-bar`

```css
@keyframes hubspot-form-skeleton-pulse {
  50% {
    opacity: 0.45;
  }
}
```

> Opacity fade

### `@keyframes swiper-preloader-spin`

Duration: `1s` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `:is(.swiper:not(.swiper-watch-progress), .swiper-watch-progress .swiper-slide-vi`

```css
@keyframes swiper-preloader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

> Transform/motion animation

### `@keyframes marquee`

```css
@keyframes marquee {
  0% {
    transform: translate(0px);
  }
  100% {
    transform: translate(-50%);
  }
}
```

> Transform/motion animation

### `@keyframes ticker-ring`

```css
@keyframes ticker-ring {
  0% {
    stroke-dashoffset: var(--ring-circumference);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
```

> SVG stroke animation

### `@keyframes announcement-gradient-drift`

```css
@keyframes announcement-gradient-drift {
  0% {
    background-position-x: 0px;
    background-position-y: 0px;
  }
  100% {
    background-position-x: 100%;
    background-position-y: 20%;
  }
}
```

> Background color/gradient shift · Background position (shimmer/scroll)

### `@keyframes announcement-gradient-sweep`

```css
@keyframes announcement-gradient-sweep {
  0%, 12% {
    opacity: 0;
    transform: translate(-45%);
  }
  35% {
    opacity: 0.7;
  }
  55% {
    opacity: 0.55;
    transform: translate(45%);
  }
  70%, 100% {
    opacity: 0;
    transform: translate(55%);
  }
}
```

> Fade + motion enter animation

### `@keyframes spin`

```css
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
```

> Transform/motion animation

## Motion Tokens (CSS Variables)

### Easing Tokens

```css
--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
--ease-out: cubic-bezier(0, 0, .2, 1);
```

## Global Transition Declarations

These `transition` values were extracted from CSS rules across the site:

```css
transition: transform var(--corner-transition-duration) var(--corner-transition-ease,ease-out);
transition: transform var(--corner-transition-duration) ease-out, opacity var(--corner-transition-duration) ease-out;
transition: top 0.3s ease-out;
transition: top 0.3s ease-out, max-height 0.3s ease-out;
transition: border-color 0.2s;
transition: background-color 0.15s, border-color 0.15s;
transition: opacity 0.2s;
```

## How to Recreate This Motion Design

### Step 2 — Scroll-Reveal Pattern

Elements that animate into view follow this pattern:

```css
/* Initial hidden state */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s cubic-bezier(.4, 0, .2, 1),
              transform 0.6s cubic-bezier(.4, 0, .2, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Step 3 — Key Motion Principles

- **Video backgrounds** — use `<video autoplay loop muted playsinline>` for background videos. Always include a poster image fallback
- **Duration scale:** `0.3s` · `0.2s` · `0.15s` — use these values, never invent new durations
- **Always add** `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

### Step 4 — Scroll Journey Reference

Match what happens at each scroll position:

- **0%** (`0px`) → `screens/scroll/scroll-000.png`
- **17%** (`1958px`) → `screens/scroll/scroll-017.png`
- **33%** (`3802px`) → `screens/scroll/scroll-033.png`
- **50%** (`5756px`) → `screens/scroll/scroll-050.png`
- **67%** (`7718px`) → `screens/scroll/scroll-067.png`
- **83%** (`9562px`) → `screens/scroll/scroll-083.png`
- **100%** (`10724px`) → `screens/scroll/scroll-100.png`

## Layout & Grid (LAYOUT.md)

# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `div.flex.min-h-screen` | column | — | — | — | 6 |
| `div.flex.flex-col-reverse` | row | space-between | — | 56px | 2 |
| `div.border-t.border-midnight-75` | row | space-between | center | 24px 48px | 2 |
| `div.flex-1.max-w-[63.5rem]` | row | space-between | start | 48px 32px | 5 |
| `div.flex.items-center` | row | space-between | center | normal 48px | 3 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `div.container.flex` | `305.812px 660.359px 305.828px` | normal 24px | 2 |

## Structural Containers

### `<main>` (`main#main-content.flex-1`)

```
display:          block
children:         12
```

### `<footer>` (`footer.bg-night.text-white`)

```
display:          block
children:         2
```

### `<header>` (`header.relative.top-0`)

```
display:          block
children:         3
```

### `<section>` (`section.bg-foreground.text-background`)

```
display:          block
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          40px 0px
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          40px 0px
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          80px 0px 40px
children:         1
```

### `<section>` (`section.bg-stone-25.text-foreground`)

```
display:          block
padding:          144px 0px
children:         1
```

### `<section>` (`section.bg-accent.text-white`)

```
display:          block
padding:          80px 0px
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          144px 0px
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          0px 0px 164px
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          0px 0px 196px
children:         1
```

## Layout Rules

- **Container max-width:** `1416px` — always center with `margin: auto`
- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

## Component Patterns (COMPONENTS.md)

# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **Overflow X Clip** | unknown | 14× | `.overflow-x-clip`, `.relative`, `.z-1` |
| **Button Label** | button | 13× | `.button-label`, `.relative`, `.whitespace-nowrap` |
| **Container** | unknown | 13× | `.container` |
| **Not First:Mt 14** | unknown | 10× | `.not-first:mt-14` |
| **Div** | unknown | 8× |  |
| **[& .Button Caret]:Group Hover:Text White** | button | 7× | `.[&_.button-caret]:group-hover:text-white`, `.cursor-pointer`, `.focus-visible:outline-2` |
| **Flex** | card | 5× | `.flex`, `.gap-x-8`, `.items-start` |
| **[& Span]:Text Stone 100** | unknown | 5× | `.[&_span]:text-stone-100`, `.block`, `.heading-span` |
| **Bg White** | unknown | 3× | `.bg-white`, `.border`, `.border-border` |
| **Border Stone 50** | list-item | 3× | `.border-stone-50`, `.border-y`, `.flex` |
| **[& .Corner Border]:Text Gray** | unknown | 3× | `.[&_.corner-border]:text-gray`, `.corner-border-1_5`, `.flex` |
| **Px 3.5** | unknown | 3× | `.px-3.5` |
| **Div** | unknown | 3× |  |
| **Scan Blur Layer** | unknown | 3× | `.scan-blur-layer`, `.text-black`, `.text-stat-40` |
| **Scan Clear Layer** | unknown | 3× | `.scan-clear-layer`, `.text-black`, `.text-stat-40` |
| **Flex** | unknown | 3× | `.flex`, `.flex-col`, `.gap-y-5` |
| **Text Accent** | unknown | 3× | `.text-accent`, `.text-heading-34` |
| **Text Heading 34** | unknown | 3× | `.text-heading-34`, `.text-night` |
| **Text Body 20** | unknown | 3× | `.text-body-20`, `.text-midnight-25` |
| **H 10** | unknown | 3× | `.h-10`, `.mb-6`, `.shrink-0` |

## Cards

### Flex

**Instances found:** 5

**CSS classes:** `.flex` `.gap-x-8` `.items-start` `.justify-between`

**HTML structure:**

```html
<div class="flex gap-x-8 justify-between items-start"><div class="text-card flex flex-col size-full text-left mr-auto text-card-body-20"><h1 class="text-heading-58 max-xl:[&amp;_br]:hidden text-white [&amp;_.heading-span&gt;span]:text-white/70!"><span class="heading-span [&amp;_span]:text-stone-100 block"><span>Give AI the context to</span> transform high-impact work</span></h1><div class="first:pt-0 pt-3.5 sm:pt-5 lg:pt-7 first:pt-0 text-white/70 text-white!"><p>Skan AI observes how work actually gets …</p></div><div class="flex flex-wrap items-center gap-3 justify-start pt-7 sm:pt-10 lg:pt-1
```

**Base styles (from design tokens):**

```css
.flex {
  background: #e5f8ff;
  border: 1px solid #252622;
  border-radius: 2px;
  padding: 8px;
}```

## List Items

### Border Stone 50

**Instances found:** 3

**CSS classes:** `.border-stone-50` `.border-y` `.flex` `.flex-nowrap` `.flex-row` `.gap-x-6`

**HTML structure:**

```html
<li class="flex min-w-0 flex-row flex-nowrap items-center gap-x-6 justify-between border-y py-8 border-stone-50 lg:justify-start lg:border-0 lg:py-0 lg:gap-x-6"><div class="relative flex flex-col justify-between corner-border-1_5 shrink-0 [&amp;_.corner-border]:text-gray"><div class="corner-border corner-border-t corner-size-md"><div class="corner-tl"></div><div class="corner-tr"></div></div><div class="px-3.5"><div class="" style="position:relative;width:fit-content;max-width:100%"><div aria-hidden="true" style="position:absolute;inset:0;filter:blur(4px);opacity:0.3;pointer-events:none;user-s
```

**Base styles (from design tokens):**

```css
.border-stone-50 {
  padding: 4px 0;
  border-bottom: 1px solid #252622;
}```

## Buttons

### Button Label

**Instances found:** 13

**CSS classes:** `.button-label` `.relative` `.whitespace-nowrap` `.z-10`

**HTML structure:**

```html
<span class="button-label relative z-10 whitespace-nowrap">Learn more</span>
```

**Base styles (from design tokens):**

```css
.button-label {
  background: #007aff;
  color: #1b1c17;
  border-radius: 2px;
  padding: 4px 8px;
  cursor: pointer;
}```

### [& .Button Caret]:Group Hover:Text White

**Instances found:** 7

**CSS classes:** `.[&_.button-caret]:group-hover:text-white` `.cursor-pointer` `.focus-visible:outline-2` `.focus-visible:outline-accent` `.focus-visible:outline-offset-2` `.font-semibold`

**HTML structure:**

```html
<a class="cursor-pointer relative group inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent overflow-hidden text-btn-16 font-semibold gap-x-4 sm:gap-x-5.5 shrink-0 max-md:gap-x-2 [&amp;_.button-caret]:group-hover:text-white" href="/skan-ai-raises-series-c"><span class="button-caret w-1.5 shrink-0 group-hover:text-grape transition-[translate,color] group-hover:translate-x-0.5 will-change-transform"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 6 8" fill="none" aria-hidden="true"><path d="M1
```

**Base styles (from design tokens):**

```css
.[&_.button-caret]:group-hover:text-white {
  background: #007aff;
  color: #1b1c17;
  border-radius: 2px;
  padding: 4px 8px;
  cursor: pointer;
}```

## Other Components

### Overflow X Clip

**Instances found:** 14

**CSS classes:** `.overflow-x-clip` `.relative` `.z-1`

**HTML structure:**

```html
<div class="relative z-1 overflow-x-clip"><div class=""><div class="not-first:mt-14 md:not-first:mt-16 lg:not-first:mt-24"><div class="relative isolate overflow-hidden w-full mx-auto max-w-[138.75rem] flex flex-col-reverse md:flex-col md:min-h-[min(90dvh,55.9375rem)] 3xl:min-h-[min(90dvh,60rem)]"><div class="relative md:absolute md:inset-y-0 md:left-0 right-0 md:right-[-30%] xl:right-0 md:-z-1 max-sm:overflow-hidden"><div class="absolute inset-0 size-full min-h-96 sm:min-h-80 md:min-h-0 max-md:relative! max-sm:w-[150%] max-sm:-translate-x-[28%]"><video src="https://cdn.sanity.io/files/3xg3qj5k
```

**Base styles (from design tokens):**

```css
.overflow-x-clip {
  background: #e5f8ff;
  padding: 4px;
}```

### Container

**Instances found:** 13

**CSS classes:** `.container`

**HTML structure:**

```html
<div class="container"><div class="not-first:mt-14 md:not-first:mt-16 lg:not-first:mt-24"><div class="flex flex-col gap-8 sm:gap-10"><span class="inline-flex items-center gap-x-3.5 sm:gap-x-6 md:gap-x-10.5 not-prose"><span class="size-2 bg-accent" aria-hidden="true"></span><p class="not-prose text-eyebrow-14">Trusted by</p></span><ul class="m-0 grid list-none p-0 max-lg:-space-y-px lg:border-y lg:gap-x-12 lg:py-11 border-stone-50 lg:grid-cols-3"><li class="flex min-w-0 flex-row flex-nowrap items-center gap-x-6 justify-between border-y py-8 border-stone-50 lg:justify-start lg:border-0 lg:py-0 l
```

**Base styles (from design tokens):**

```css
.container {
  background: #e5f8ff;
  padding: 4px;
}```

### Not First:Mt 14

**Instances found:** 10

**CSS classes:** `.not-first:mt-14`

**HTML structure:**

```html
<div class="not-first:mt-14 md:not-first:mt-16 lg:not-first:mt-24"><div class="relative isolate overflow-hidden w-full mx-auto max-w-[138.75rem] flex flex-col-reverse md:flex-col md:min-h-[min(90dvh,55.9375rem)] 3xl:min-h-[min(90dvh,60rem)]"><div class="relative md:absolute md:inset-y-0 md:left-0 right-0 md:right-[-30%] xl:right-0 md:-z-1 max-sm:overflow-hidden"><div class="absolute inset-0 size-full min-h-96 sm:min-h-80 md:min-h-0 max-md:relative! max-sm:w-[150%] max-sm:-translate-x-[28%]"><video src="https://cdn.sanity.io/files/3xg3qj5k/production/a6922608b6894fed0f02a1caee65553acc80105d.mp4
```

**Base styles (from design tokens):**

```css
.not-first:mt-14 {
  background: #e5f8ff;
  padding: 4px;
}```

### Div

**Instances found:** 8

**HTML structure:**

```html
<div class=""><div class="not-first:mt-14 md:not-first:mt-16 lg:not-first:mt-24"><div class="relative isolate overflow-hidden w-full mx-auto max-w-[138.75rem] flex flex-col-reverse md:flex-col md:min-h-[min(90dvh,55.9375rem)] 3xl:min-h-[min(90dvh,60rem)]"><div class="relative md:absolute md:inset-y-0 md:left-0 right-0 md:right-[-30%] xl:right-0 md:-z-1 max-sm:overflow-hidden"><div class="absolute inset-0 size-full min-h-96 sm:min-h-80 md:min-h-0 max-md:relative! max-sm:w-[150%] max-sm:-translate-x-[28%]"><video src="https://cdn.sanity.io/files/3xg3qj5k/production/a6922608b6894fed0f02a1caee6555
```

**Base styles (from design tokens):**

```css
.div {
  background: #e5f8ff;
  padding: 4px;
}```

### [& Span]:Text Stone 100

**Instances found:** 5

**CSS classes:** `.[&_span]:text-stone-100` `.block` `.heading-span`

**HTML structure:**

```html
<span class="heading-span [&amp;_span]:text-stone-100 block">Introducing the Context Graph of Work. Everything your AI needs to execute.</span>
```

**Base styles (from design tokens):**

```css
.[&_span]:text-stone-100 {
  background: #e5f8ff;
  padding: 4px;
}```

### Bg White

**Instances found:** 3

**CSS classes:** `.bg-white` `.border` `.border-border` `.cursor-pointer` `.focus-visible:outline-2` `.focus-visible:outline-accent`

**HTML structure:**

```html
<a class="cursor-pointer relative group inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent overflow-hidden gap-x-2 sm:gap-x-2.5 rounded-md transition-colors border border-border bg-white text-foreground text-btn-18 px-4.5 md:px-5.5 py-[0.5625rem] md:py-3" href="/request-demo"><span class="relative z-10 size-1.5 shrink-0 transition-colors bg-grape" aria-hidden="true"></span><span class="button-label relative z-10 whitespace-nowrap">Request a demo</span></a>
```

**Base styles (from design tokens):**

```css
.bg-white {
  background: #e5f8ff;
  padding: 4px;
}```

### [& .Corner Border]:Text Gray

**Instances found:** 3

**CSS classes:** `.[&_.corner-border]:text-gray` `.corner-border-1_5` `.flex` `.flex-col` `.justify-between` `.relative`

**HTML structure:**

```html
<div class="relative flex flex-col justify-between corner-border-1_5 shrink-0 [&amp;_.corner-border]:text-gray"><div class="corner-border corner-border-t corner-size-md"><div class="corner-tl"></div><div class="corner-tr"></div></div><div class="px-3.5"><div class="" style="position:relative;width:fit-content;max-width:100%"><div aria-hidden="true" style="position:absolute;inset:0;filter:blur(4px);opacity:0.3;pointer-events:none;user-select:none;will-change:clip-path;overflow:visible" class="scan-blur-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span><
```

**Base styles (from design tokens):**

```css
.[&_.corner-border]:text-gray {
  background: #e5f8ff;
  padding: 4px;
}```

### Px 3.5

**Instances found:** 3

**CSS classes:** `.px-3.5`

**HTML structure:**

```html
<div class="px-3.5"><div class="" style="position:relative;width:fit-content;max-width:100%"><div aria-hidden="true" style="position:absolute;inset:0;filter:blur(4px);opacity:0.3;pointer-events:none;user-select:none;will-change:clip-path;overflow:visible" class="scan-blur-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></div><div style="position:relative;z-index:1;clip-path:inset(0 100% 0 0);will-change:clip-path" class="scan-clear-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></
```

**Base styles (from design tokens):**

```css
.px-3.5 {
  background: #e5f8ff;
  padding: 4px;
}```

### Div

**Instances found:** 3

**HTML structure:**

```html
<div class="" style="position:relative;width:fit-content;max-width:100%"><div aria-hidden="true" style="position:absolute;inset:0;filter:blur(4px);opacity:0.3;pointer-events:none;user-select:none;will-change:clip-path;overflow:visible" class="scan-blur-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></div><div style="position:relative;z-index:1;clip-path:inset(0 100% 0 0);will-change:clip-path" class="scan-clear-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></div><div aria-hidden
```

**Base styles (from design tokens):**

```css
.div {
  background: #e5f8ff;
  padding: 4px;
}```

### Scan Blur Layer

**Instances found:** 3

**CSS classes:** `.scan-blur-layer` `.text-black` `.text-stat-40` `.whitespace-nowrap`

**HTML structure:**

```html
<div aria-hidden="true" style="position:absolute;inset:0;filter:blur(4px);opacity:0.3;pointer-events:none;user-select:none;will-change:clip-path;overflow:visible" class="scan-blur-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></div>
```

**Base styles (from design tokens):**

```css
.scan-blur-layer {
  background: #e5f8ff;
  padding: 4px;
}```

### Scan Clear Layer

**Instances found:** 3

**CSS classes:** `.scan-clear-layer` `.text-black` `.text-stat-40` `.whitespace-nowrap`

**HTML structure:**

```html
<div style="position:relative;z-index:1;clip-path:inset(0 100% 0 0);will-change:clip-path" class="scan-clear-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></div>
```

**Base styles (from design tokens):**

```css
.scan-clear-layer {
  background: #e5f8ff;
  padding: 4px;
}```

### Flex

**Instances found:** 3

**CSS classes:** `.flex` `.flex-col` `.gap-y-5` `.py-10`

**HTML structure:**

```html
<div class="flex flex-col gap-y-5 py-10 md:gap-y-9 md:px-12 md:py-14 lg:first:pl-0 lg:last:pr-0"><p class="text-heading-34 text-accent">01</p><h3 class="text-heading-34 text-night">Agents that act on reality</h3><p class="text-body-20 text-midnight-25">Enterprise AI doesn't stall because the …</p></div>
```

**Base styles (from design tokens):**

```css
.flex {
  background: #e5f8ff;
  padding: 4px;
}```

### Text Accent

**Instances found:** 3

**CSS classes:** `.text-accent` `.text-heading-34`

**HTML structure:**

```html
<p class="text-heading-34 text-accent">01</p>
```

**Base styles (from design tokens):**

```css
.text-accent {
  background: #e5f8ff;
  padding: 4px;
}```

### Text Heading 34

**Instances found:** 3

**CSS classes:** `.text-heading-34` `.text-night`

**HTML structure:**

```html
<h3 class="text-heading-34 text-night">Agents that act on reality</h3>
```

**Base styles (from design tokens):**

```css
.text-heading-34 {
  background: #e5f8ff;
  padding: 4px;
}```

### Text Body 20

**Instances found:** 3

**CSS classes:** `.text-body-20` `.text-midnight-25`

**HTML structure:**

```html
<p class="text-body-20 text-midnight-25">Enterprise AI doesn't stall because the models aren't smart enough. It stalls because it doesn't understand how your work actually runs.</p>
```

**Base styles (from design tokens):**

```css
.text-body-20 {
  background: #e5f8ff;
  padding: 4px;
}```

### H 10

**Instances found:** 3

**CSS classes:** `.h-10` `.mb-6` `.shrink-0` `.w-10`

**HTML structure:**

```html
<div class="mb-6 h-10 w-10 shrink-0"><img alt="icon" loading="lazy" width="40" height="40" decoding="async" data-nimg="1" class="h-full w-full object-contain" style="color: transparent;" srcset="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F3xg3qj5k%2Fproduction%2Fd2b36450d307b73af819cb4fb3a5380072a85787-78x78.png%3Fw%3D40%26h%3D40%26q%3D80%26fit%3Dmax%26auto%3Dformat&amp;w=48&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F3xg3qj5k%2Fproduction%2Fd2b36450d307b73af819cb4fb3a5380072a85787-78x78.png%3Fw%3D40%26h%3D40%26q%3D80%26fit%3Dmax%26auto%3Dformat&amp;w=96&am
```

**Base styles (from design tokens):**

```css
.h-10 {
  background: #e5f8ff;
  padding: 4px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure
- Use `#252622` for all dividers within components
- Use `#007aff` for all interactive/active states

## Interactions & States (INTERACTIONS.md)

# Interaction Reference

> Micro-interactions extracted from live DOM. Recreate these exactly for authentic feel.

## Coverage

| Component Type | Count | States Captured |
|----------------|-------|----------------|
| Button | 3 | default, hover, focus |
| Link | 3 | default, hover, focus |

## Transition System

These transition declarations were extracted from interactive elements:

```css
transition: color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.25s cubic-bezier(0.4, 0, 0.2, 1);
transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: all;
transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), translate 0.15s cubic-bezier(0.4, 0, 0.2, 1), scale 0.15s cubic-bezier(0.4, 0, 0.2, 1), rotate 0.15s cubic-bezier(0.4, 0, 0.2, 1);
```

Apply these to all interactive elements. Never invent new durations or easings.

## Button Interactions

### Button 1 — `Dismiss announcement`

**States:**

- Default: `../screens/states/button-1-default.png`
- Hover: `../screens/states/button-1-hover.png`
- Focus: `../screens/states/button-1-focus.png`

**On hover:**

```css
/* color: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) → */ color: rgb(255, 255, 255);
/* border-color: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) → */ border-color: rgb(255, 255, 255);
/* outline: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) none 3px → */ outline: rgb(255, 255, 255) none 3px;
/* outline-color: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) → */ outline-color: rgb(255, 255, 255);
```

**On focus:**

```css
/* outline: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.25s cubic-bezier(0.4, 0, 0.2, 1)`

### Button 2 — `Solutions`

**States:**

- Default: `../screens/states/button-2-default.png`
- Hover: `../screens/states/button-2-hover.png`
- Focus: `../screens/states/button-2-focus.png`

**On hover:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(22, 23, 20);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(22, 23, 20);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(22, 23, 20) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(22, 23, 20);
```

**On focus:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(22, 23, 20);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(22, 23, 20);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### Button 3 — `AI WITHOUT SKAN`

**States:**

- Default: `../screens/states/button-3-default.png`
- Hover: `../screens/states/button-3-hover.png`
- Focus: `../screens/states/button-3-focus.png`

**On focus:**

```css
/* outline: rgb(22, 23, 20) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: rgb(22, 23, 20) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `all`

## Link Interactions

### Link 1 — `Learn more`

**States:**

- Default: `../screens/states/link-1-default.png`
- Hover: `../screens/states/link-1-hover.png`
- Focus: `../screens/states/link-1-focus.png`

**On focus:**

```css
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `all`

### Link 2 — `a`

**States:**

- Default: `../screens/states/link-2-default.png`
- Hover: `../screens/states/link-2-hover.png`
- Focus: `../screens/states/link-2-focus.png`

**On focus:**

```css
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), translate 0.15s cubic-bezier(0.4, 0, 0.2, 1), scale 0.15s cubic-bezier(0.4, 0, 0.2, 1), rotate 0.15s cubic-bezier(0.4, 0, 0.2, 1)`

### Link 3 — `Platform`

**States:**

- Default: `../screens/states/link-3-default.png`
- Hover: `../screens/states/link-3-hover.png`
- Focus: `../screens/states/link-3-focus.png`

**On hover:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(22, 23, 20);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(22, 23, 20);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(22, 23, 20) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(22, 23, 20);
```

**On focus:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(22, 23, 20);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(22, 23, 20);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

## Interaction Rules

- Accent color `#007aff` is used for focus rings, active states, and hover highlights
- Hover effects include **color transitions** — use the extracted values, not approximations
- Focus states use **outline** (not box-shadow) — always match the extracted focus ring
- Transition durations in use: `0.25s`, `0.3s`, `0.15s`
- Always respect `prefers-reduced-motion` — set all transitions to `0s` when enabled

## Design Tokens — JSON Files

### tokens/colors.json
```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "core": {
    "text-primary": {
      "value": "#1b1c17",
      "role": "text-primary"
    },
    "background": {
      "value": "#fafafa",
      "role": "background",
      "name": "theme-color"
    },
    "text-muted": {
      "value": "#4a4b44",
      "role": "text-muted"
    },
    "border": {
      "value": "#252622",
      "role": "border"
    },
    "accent": {
      "value": "#007aff",
      "role": "accent",
      "name": "swiper-theme-color"
    },
    "surface": {
      "value": "#e5f8ff",
      "role": "surface"
    }
  },
  "status": {
    "danger": {
      "value": "#ff5a5a",
      "role": "danger"
    }
  },
  "extended": {
    "color-c3c6bb": {
      "value": "#c3c6bb",
      "role": "unknown"
    },
    "color-9677ff": {
      "value": "#9677ff",
      "role": "info"
    },
    "color-black": {
      "value": "#000000",
      "role": "unknown",
      "name": "color-black"
    },
    "color-6c6c66": {
      "value": "#6c6c66",
      "role": "unknown"
    },
    "color-81837a": {
      "value": "#81837a",
      "role": "unknown"
    },
    "color-e0e3de": {
      "value": "#e0e3de",
      "role": "unknown"
    },
    "color-d8dad1": {
      "value": "#d8dad1",
      "role": "unknown"
    },
    "color-97c8ff": {
      "value": "#97c8ff",
      "role": "unknown"
    },
    "color-6474cd": {
      "value": "#6474cd",
      "role": "unknown"
    },
    "color-383a35": {
      "value": "#383a35",
      "role": "unknown"
    }
  },
  "meta": {
    "theme": "light",
    "extracted": "2026-09-03"
  }
}
```

### tokens/spacing.json
```json
{
  "base": {
    "value": "4px",
    "description": "Grid unit — all spacing must be multiples of this"
  },
  "unit": "px",
  "scale": {
    "xs": {
      "value": "2px",
      "px": 2
    },
    "sm": {
      "value": "4px",
      "px": 4
    },
    "md": {
      "value": "6px",
      "px": 6
    },
    "lg": {
      "value": "8px",
      "px": 8
    },
    "xl": {
      "value": "10px",
      "px": 10
    },
    "2xl": {
      "value": "12px",
      "px": 12
    },
    "3xl": {
      "value": "14px",
      "px": 14
    },
    "4xl": {
      "value": "16px",
      "px": 16
    },
    "5xl": {
      "value": "18px",
      "px": 18
    },
    "6xl": {
      "value": "20px",
      "px": 20
    }
  },
  "multipliers": {
    "1x": {
      "value": "4px",
      "raw": 4
    },
    "2x": {
      "value": "8px",
      "raw": 8
    },
    "3x": {
      "value": "12px",
      "raw": 12
    },
    "4x": {
      "value": "16px",
      "raw": 16
    },
    "5x": {
      "value": "20px",
      "raw": 20
    },
    "6x": {
      "value": "24px",
      "raw": 24
    },
    "7x": {
      "value": "28px",
      "raw": 28
    },
    "8x": {
      "value": "32px",
      "raw": 32
    },
    "9x": {
      "value": "36px",
      "raw": 36
    },
    "10x": {
      "value": "40px",
      "raw": 40
    },
    "11x": {
      "value": "44px",
      "raw": 44
    },
    "12x": {
      "value": "48px",
      "raw": 48
    },
    "13x": {
      "value": "52px",
      "raw": 52
    },
    "14x": {
      "value": "56px",
      "raw": 56
    },
    "15x": {
      "value": "60px",
      "raw": 60
    },
    "16x": {
      "value": "64px",
      "raw": 64
    }
  },
  "meta": {
    "totalValues": 15,
    "min": 2,
    "max": 30
  }
}
```

### tokens/typography.json
```json
{
  "families": [
    "messinaSans",
    "everett",
    "SFMono-Regular"
  ],
  "scale": {
    "heading-1": {
      "fontFamily": "messinaSans",
      "fontSize": "40px",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "heading-2": {
      "fontFamily": "messinaSans",
      "fontSize": "32px",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "body": {
      "fontFamily": "everett",
      "fontSize": "clamp(min(var(--mobile-font-size),var(--desktop-font-size)),calc((var(--vi-multiplier)*100vi) + (var(--base-offset)/16*1rem)),max(var(--mobile-font-size),var(--desktop-font-size)))",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    },
    "caption": {
      "fontFamily": "everett",
      "fontSize": ".875rem",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    },
    "code": {
      "fontFamily": "SFMono-Regular",
      "fontSize": "14px",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    }
  },
  "fontFaces": [
    {
      "family": "everett",
      "src": "https://www.skan.ai/_next/static/media/Everett_Regular-s.p.0iasus9l14t5r.woff2?dpl=dpl_6DCzgHzE9UBo4JrT9VzaPqAMChQm",
      "format": "truetype",
      "weight": "400"
    },
    {
      "family": "messinaSans",
      "src": "https://www.skan.ai/_next/static/media/MessinaSans_Regular-s.p.1cve08dtnsapa.woff2?dpl=dpl_6DCzgHzE9UBo4JrT9VzaPqAMChQm",
      "format": "truetype",
      "weight": "400"
    },
    {
      "family": "messinaSans",
      "src": "https://www.skan.ai/_next/static/media/MessinaSans_SemiBold-s.p.39x4u_ea-o-ou.woff2?dpl=dpl_6DCzgHzE9UBo4JrT9VzaPqAMChQm",
      "format": "truetype",
      "weight": "600"
    }
  ],
  "rules": {
    "maxSizesPerScreen": 4,
    "headingWeightRange": "600-700",
    "bodyWeight": 400,
    "lineHeightBody": 1.5,
    "lineHeightHeading": 1.2
  }
}
```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/everett-Regular.woff2`
- `fonts/messinaSans-600.woff2`
- `fonts/messinaSans-Regular.woff2`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.

## Screenshots Inventory (screens/)

> Study all screenshots carefully before implementing any UI. Match every visual detail exactly.

### Scroll Journey (screens/scroll/)

*Cinematic scroll states — page visual at each scroll depth*

![scroll-000.png](screens/scroll/scroll-000.png)

![scroll-017.png](screens/scroll/scroll-017.png)

![scroll-033.png](screens/scroll/scroll-033.png)

![scroll-050.png](screens/scroll/scroll-050.png)

![scroll-067.png](screens/scroll/scroll-067.png)

![scroll-083.png](screens/scroll/scroll-083.png)

![scroll-100.png](screens/scroll/scroll-100.png)

![video-1-frame.png](screens/scroll/video-1-frame.png)

### Full Page Screenshots (screens/pages/)

*Full-page screenshots of each crawled URL*

![case-studies.png](screens/pages/case-studies.png)

![context-graph-of-work.png](screens/pages/context-graph-of-work.png)

![home.png](screens/pages/home.png)

![resource-center.png](screens/pages/resource-center.png)

![security-trust-and-transparency.png](screens/pages/security-trust-and-transparency.png)

![skan-ai-raises-series-c.png](screens/pages/skan-ai-raises-series-c.png)

### Section Clips (screens/sections/)

*Clipped individual sections and components*

![case-studies-section-1.png](screens/sections/case-studies-section-1.png)

![case-studies-section-3.png](screens/sections/case-studies-section-3.png)

![context-graph-of-work-section-1.png](screens/sections/context-graph-of-work-section-1.png)

![home-section-1.png](screens/sections/home-section-1.png)

![home-section-2.png](screens/sections/home-section-2.png)

![resource-center-section-2.png](screens/sections/resource-center-section-2.png)

![resource-center-section-4.png](screens/sections/resource-center-section-4.png)

![security-trust-and-transparency-section-1.png](screens/sections/security-trust-and-transparency-section-1.png)

![security-trust-and-transparency-section-2.png](screens/sections/security-trust-and-transparency-section-2.png)

![skan-ai-raises-series-c-section-1.png](screens/sections/skan-ai-raises-series-c-section-1.png)

![skan-ai-raises-series-c-section-2.png](screens/sections/skan-ai-raises-series-c-section-2.png)

### Interaction States (screens/states/)

*Hover, focus, and active state captures*

![button-1-default.png](screens/states/button-1-default.png)

![button-1-focus.png](screens/states/button-1-focus.png)

![button-1-hover.png](screens/states/button-1-hover.png)

![button-2-default.png](screens/states/button-2-default.png)

![button-2-focus.png](screens/states/button-2-focus.png)

![button-2-hover.png](screens/states/button-2-hover.png)

![button-3-default.png](screens/states/button-3-default.png)

![button-3-focus.png](screens/states/button-3-focus.png)

![button-3-hover.png](screens/states/button-3-hover.png)

![link-1-default.png](screens/states/link-1-default.png)

![link-1-focus.png](screens/states/link-1-focus.png)

![link-1-hover.png](screens/states/link-1-hover.png)

![link-2-default.png](screens/states/link-2-default.png)

![link-2-focus.png](screens/states/link-2-focus.png)

![link-2-hover.png](screens/states/link-2-hover.png)

![link-3-default.png](screens/states/link-3-default.png)

![link-3-focus.png](screens/states/link-3-focus.png)

![link-3-hover.png](screens/states/link-3-hover.png)

### Screenshot Index (screens/INDEX.md)

# Screenshot Index

## Scroll Journey

> Shows the cinematic state at each point of the page

| Scroll | Y Position | File |
|--------|-----------|------|
| 0% | 0px | `screens/scroll/scroll-000.png` |
| 17% | 1958px | `screens/scroll/scroll-017.png` |
| 33% | 3802px | `screens/scroll/scroll-033.png` |
| 50% | 5756px | `screens/scroll/scroll-050.png` |
| 67% | 7718px | `screens/scroll/scroll-067.png` |
| 83% | 9562px | `screens/scroll/scroll-083.png` |
| 100% | 10724px | `screens/scroll/scroll-100.png` |

## Video First Frames

- Video 1 (background): `screens/scroll/video-1-frame.png`

## Pages

| Page | URL | File |
|------|-----|------|
| Context Graph of Work and Agentic AI Platform | Skan AI | `https://www.skan.ai/` | `screens/pages/home.png` |
| Skan AI Raises $63 Million in Series C Funding Round | Skan AI | `https://www.skan.ai/skan-ai-raises-series-c` | `screens/pages/skan-ai-raises-series-c.png` |
| Context Graph of Work | Skan AI | `https://www.skan.ai/context-graph-of-work` | `screens/pages/context-graph-of-work.png` |
| Case Studies | Skan AI | `https://www.skan.ai/case-studies` | `screens/pages/case-studies.png` |
| Enterprise AI Security & Trust | Skan AI | `https://www.skan.ai/security-trust-and-transparency` | `screens/pages/security-trust-and-transparency.png` |
| Resource Center | Skan AI | `https://www.skan.ai/resource-center` | `screens/pages/resource-center.png` |

## Sections

| Page | Section | File |
|------|---------|------|
| home | #1 (section) | `screens/sections/home-section-1.png` |
| home | #2 (section) | `screens/sections/home-section-2.png` |
| skan-ai-raises-series-c | #1 (section) | `screens/sections/skan-ai-raises-series-c-section-1.png` |
| skan-ai-raises-series-c | #2 (section) | `screens/sections/skan-ai-raises-series-c-section-2.png` |
| context-graph-of-work | #1 (section) | `screens/sections/context-graph-of-work-section-1.png` |
| case-studies | #1 (section) | `screens/sections/case-studies-section-1.png` |
| case-studies | #3 (article) | `screens/sections/case-studies-section-3.png` |
| security-trust-and-transparency | #1 (section) | `screens/sections/security-trust-and-transparency-section-1.png` |
| security-trust-and-transparency | #2 (section) | `screens/sections/security-trust-and-transparency-section-2.png` |
| resource-center | #2 (article) | `screens/sections/resource-center-section-2.png` |
| resource-center | #4 (main > div) | `screens/sections/resource-center-section-4.png` |

## Homepage Screenshots (screenshots/)

![homepage.png](screenshots/homepage.png)

