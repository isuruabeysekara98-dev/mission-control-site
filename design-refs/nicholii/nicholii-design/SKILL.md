---
name: nicholii-design
description: Design system skill for nicholii. Activate when building UI components, pages, or any visual elements. Provides exact color tokens, typography scale, spacing grid, component patterns, and craft rules. Read references/DESIGN.md before writing any CSS or JSX.
---

# nicholii Design System

You are building UI for **nicholii**. Light-themed, warm palette, sans-serif typography (Arial), compact density on a 4px grid, expressive motion.

## Visual Reference

**IMPORTANT**: Study ALL screenshots below before writing any UI. Match colors, typography, spacing, layout, and motion exactly as shown.

### Homepage

![nicholii Homepage](screenshots/homepage.png)

> Read `references/DESIGN.md` for full token details.

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Type pairing** — Arial for body/UI text, webflow-icons for headings/display. Never introduce a third typeface.
- **compact density** — 4px base grid. Every dimension is a multiple of 4.
- **warm palette** — the color temperature runs warm, matching the sans-serif typography.
- **Restrained accent** — `#f9ffaa` is the only pop of color. Used exclusively for CTAs, links, focus rings, and active states.
- **Expressive motion** — animations are an integral part of the experience. Use spring physics and layout animations.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Background | `--background` | `#ffffff` | Page/app background |
| Surface | `--surface` | `#ffdede` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#222222` | Headings, body text |
| Text Muted | `--text-muted` | `#aaadb0` | Captions, placeholders |
| Accent | `--accent` | `#f9ffaa` | CTAs, links, focus rings |
| Border | `--border` | `#333333` | Dividers, card borders |

### Status Colors

| Status | Hex | Use |
|--------|-----|-----|
| Danger | `#ed7472` | Errors, destructive actions |

### Extended Palette

- **color-base-cream:** `#eeeeee` — Light surface or highlight color
- **color-base-lift-light-higher:** `#dddddd`
- `#000000` — Deep background layer or shadow color
- `#161616` — Deep background layer or shadow color
- `#c8c8c8`
- `#3898ec`
- `#999999`
- `#758696`

### CSS Variable Tokens

```css
--color-tokens-background-base: var(--color-base-cream);
--color-tokens-input-default-border: var(--color-base-base-dark-0);
--color-tokens-input-default-background: var(--color-base-depth-light);
--color-tokens-input-active-border: var(--color-base-base-dark-32);
--color-tokens-input-active-background: var(--color-base-depth-light);
--color-base-accent-primary: #f9ffaa;
--color-tokens-button-primary-default-text: var(--color-base-base-dark-100);
--color-tokens-button-secondary-default-text: var(--color-base-base-dark-100);
--color-tokens-button-accent-default-text: var(--color-base-base-dark-100);
--color-tokens-button-primary-hover-text: var(--color-base-base-light-100);
--color-tokens-button-secondary-hover-text: var(--color-base-base-light-100);
--color-tokens-button-accent-hover-text: var(--color-base-base-dark-100);
--color-tokens-button-primary-default-border: var(--color-base-base-light-0);
--color-tokens-button-primary-default-background: var(--color-base-accent-primary);
--color-tokens-button-secondary-default-border: var(--color-base-base-dark-0);
--color-tokens-button-secondary-default-background: var(--color-base-base-dark-8);
--color-tokens-button-accent-default-border: var(--color-base-accent-primary);
--color-tokens-button-accent-default-background: var(--color-base-accent-primary);
--color-tokens-button-primary-hover-border: var(--color-base-base-dark-0);
--color-tokens-button-primary-hover-background: var(--color-base-base-dark-100);
```

## Typography

### Font Stack

- **Arial** — Heading 1, Heading 2, Heading 3
- **webflow-icons** — Body, Caption
- **Fragment Mono** — Code

### Font Sources

```css
@font-face {
  font-family: "Fragment Mono";
  src: url("fonts/FragmentMono-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Aspekta";
  src: url("fonts/Aspekta-100.ttf") format("truetype");
  font-weight: 100;
}
@font-face {
  font-family: "webflow-icons";
  src: url("data:application/x-font-ttf;charset=utf-8;base64,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") format("truetype");
  font-weight: 400;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | Arial | 11.5rem | 700 |
| Heading 2 | Arial | 6rem | 700 |
| Heading 3 | Arial | 4.6rem | 700 |
| Body | webflow-icons | 14px | 400 |
| Caption | webflow-icons | .75rem | 400 |
| Code | Fragment Mono | 14px | 400 |

### Typography Rules

- Body/UI: **Arial**, Headings: **webflow-icons** — these are the only display fonts
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

Scale: `unset, .25rem, .3rem, .35rem, .4rem, .45rem, .5rem, .55rem, .625rem, .65rem, .75rem, 1px, 1rem, 1.25rem, 1.5rem, 3px, 4px, 8px, 10px, 12px, 14px, 16px, 24px, 100%, 999px`
Default: `1rem`

### Container

Max-width: `991px`, centered with auto margins.

### Breakpoints

| Name | Value |
|------|-------|
| xs | 479px |
| sm | 560px |
| sm | 600px |
| md | 767px |
| md | 768px |
| lg | 991px |
| lg | 992px |

Mobile-first: design for small screens, layer on responsive overrides.

## Component Patterns

### Card

```css
.card {
  background: #ffdede;
  border: 1px solid #333333;
  border-radius: 1rem;
  padding: 16px;
  box-shadow: unset;
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
  background: #f9ffaa;
  color: #222222;
  border-radius: 1rem;
  padding: 8px 16px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #333333;
  color: #222222;
  border-radius: 1rem;
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
  background: #ffffff;
  border: 1px solid #333333;
  border-radius: 1rem;
  padding: 8px 12px;
  color: #222222;
  font-size: 14px;
}
.input:focus { border-color: #f9ffaa; outline: none; }
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
  background: #ffdede;
  color: #aaadb0;
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
  background: #ffdede;
  border: 1px solid #333333;
  border-radius: 999px;
  padding: 24px;
  max-width: 480px;
  width: 90vw;
  box-shadow: 0 4px 12px rgba(0,0,0,.12);
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
  color: #aaadb0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #333333;
}
.table td {
  padding: 12px;
  border-bottom: 1px solid #333333;
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
  border-bottom: 1px solid #333333;
}
.nav-link {
  color: #aaadb0;
  padding: 8px 12px;
  border-radius: 1rem;
  transition: color 150ms;
}
.nav-link:hover { color: #222222; }
.nav-link.active { color: #f9ffaa; }
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

## Page Structure

The following page sections were detected:

- **Navigation** — Top navigation bar (4 items)
- **Hero** — Hero section (detected from heading structure)
- **Cta** — Call-to-action section
- **Testimonials** — Testimonials/reviews section
- **Hero** — Hero/banner section with headline and CTAs
- **Features** — Feature/benefit cards grid
- **Faq** — FAQ/accordion section

When building pages, follow this section order and structure.

## Animation & Motion

This project uses **expressive motion**. Animations are part of the design language.

### CSS Animations

- `spin`
- `nicholiiPulse`
- `nicholii-marquee`
- `nm-loop-in`
- `nm-loop-fade`

### Motion Tokens

- **Duration scale:** `1ms`, `20s`, `100ms`, `200ms`, `250ms`, `300ms`, `350ms`, `500ms`, `600ms`, `700ms`
- **Easing functions:** `ease-out`, `ease`, `ease-in-out`, `cubic-bezier(.2,.7,.3,1)`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (1ms) for micro-interactions, long (700ms) for page transitions
- **Easing:** Use `ease-out` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Subtle: `0px 0px 0px 2px #fff`
- Subtle: `0 1px 2px rgba(0,0,0,0.06)`
- Subtle: `inset 0 0 0 1px rgba(37,37,37,0.08)`
- Subtle: `inset 0 0 0 1px rgba(44,58,47,0.18)`
- Subtle: `inset 0-2px 0 var(--color-base-accent-primary)`
- Raised (cards, buttons): `unset`

### Z-Index Scale

`0, 1, 2, 3, 4, 5, 6, 8, 10, 20, 99, 900, 950, 990, 1000, 2000, 2147483647`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No blur effects** — no backdrop-blur, no filter: blur()
- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 4px
- **No extra fonts** — only Arial and webflow-icons and Fragment Mono are allowed
- **No arbitrary border-radius** — use the scale: .25rem, .3rem, .35rem, .4rem, .45rem, .5rem, .55rem, .625rem, .65rem, .75rem
- **No opacity for disabled states** — use muted colors instead

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — Arial, webflow-icons, Fragment Mono only, using the type scale
4. **Build layout** on the 4px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `images/favicon-nicholii.png`
- **Site URL:** `https://nicholii.ai`
- **Brand color:** `#f9ffaa`
- **Brand typeface:** Arial

## Quick Reference

```
Background:     #ffffff
Surface:        #ffdede
Text:           #222222 / #aaadb0
Accent:         #f9ffaa
Border:         #333333
Font:           Arial
Spacing:        4px grid
Radius:         1rem
Components:     7 detected
```

## When to Trigger

Activate this skill when:
- Creating new components, pages, or visual elements for nicholii
- Writing CSS, Tailwind classes, styled-components, or inline styles
- Building page layouts, templates, or responsive designs
- Reviewing UI code for design consistency
- The user mentions "nicholii" design, style, UI, or theme
- Generating mockups, wireframes, or visual prototypes

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

# nicholii DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 3 · Components: 7
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![nicholii Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a warm, approachable feel. The light background emphasizes content clarity. Typography pairs **webflow-icons** for display/headings with **Arial** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. The accent color **#f9ffaa** anchors interactive elements (buttons, links, focus rings). Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| color-base-background-lift-low-opacity-light-deleted-variable-08c4a639-baca-9b81-148c-77d8228f4877 | `#ffffff` | background | Page background, darkest surface |
| color-base-colors-nslatencypeach | `#ffdede` | surface | Card and panel backgrounds |
| color-base-base-dark-100 | `#222222` | text-primary | Headings and body text |
| color-base-sage | `#aaadb0` | text-muted | Captions, placeholders, secondary info |
| color-base-forest | `#333333` | border | Dividers, card borders, outlines |
| color-base-accent-primary | `#f9ffaa` | accent | CTAs, links, focus rings, active states |
| accent | `#0082f3` | accent | CTAs, links, focus rings, active states |
| color-base-ui-error | `#ed7472` | danger | Error states, destructive actions |
| info | `#3898ec` | info | Informational highlights |
| color-base-cream | `#eeeeee` | unknown | Palette color |
| color-base-lift-light-higher | `#dddddd` | unknown | Palette color |
| unknown | `#000000` | unknown | Palette color |
| unknown | `#161616` | unknown | Palette color |
| unknown | `#c8c8c8` | unknown | Palette color |
| unknown | `#999999` | unknown | Palette color |
| unknown | `#758696` | unknown | Palette color |
| unknown | `#474747` | unknown | Palette color |
| unknown | `#ebebda` | unknown | Palette color |
| unknown | `#ffff00` | unknown | Palette color |
| unknown | `#ea384c` | unknown | Palette color |

### CSS Variable Tokens

```css
--color-tokens-background-base: var(--color-base-cream);
--color-tokens-input-default-border: var(--color-base-base-dark-0);
--color-tokens-input-default-background: var(--color-base-depth-light);
--color-tokens-input-active-border: var(--color-base-base-dark-32);
--color-tokens-input-active-background: var(--color-base-depth-light);
--color-base-accent-primary: #f9ffaa;
--color-tokens-button-primary-default-text: var(--color-base-base-dark-100);
--color-tokens-button-secondary-default-text: var(--color-base-base-dark-100);
--color-tokens-button-accent-default-text: var(--color-base-base-dark-100);
--color-tokens-button-primary-hover-text: var(--color-base-base-light-100);
--color-tokens-button-secondary-hover-text: var(--color-base-base-light-100);
--color-tokens-button-accent-hover-text: var(--color-base-base-dark-100);
--color-tokens-button-primary-default-border: var(--color-base-base-light-0);
--color-tokens-button-primary-default-background: var(--color-base-accent-primary);
--color-tokens-button-secondary-default-border: var(--color-base-base-dark-0);
--color-tokens-button-secondary-default-background: var(--color-base-base-dark-8);
--color-tokens-button-accent-default-border: var(--color-base-accent-primary);
--color-tokens-button-accent-default-background: var(--color-base-accent-primary);
--color-tokens-button-primary-hover-border: var(--color-base-base-dark-0);
--color-tokens-button-primary-hover-background: var(--color-base-base-dark-100);
```


---

## 3. Typography Rules

**Font Stack:**
- **Arial** — Heading 1, Heading 2, Heading 3
- **webflow-icons** — Body, Caption
- **Fragment Mono** — Code

**Font Sources:**

```css
@font-face {
  font-family: "Fragment Mono";
  src: url("fonts/FragmentMono-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Aspekta";
  src: url("fonts/Aspekta-100.ttf") format("truetype");
  font-weight: 100;
}
@font-face {
  font-family: "webflow-icons";
  src: url("data:application/x-font-ttf;charset=utf-8;base64,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") format("truetype");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Arial | 11.5rem | 700 |
| Heading 2 | Arial | 6rem | 700 |
| Heading 3 | Arial | 4.6rem | 700 |
| Body | webflow-icons | 14px | 400 |
| Caption | webflow-icons | .75rem | 400 |
| Code | Fragment Mono | 14px | 400 |

**Typographic Rules:**
- Limit to 3 font families max per screen
- Use **Arial** for body/UI text, **webflow-icons** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Navigation (1)

**Navigation** — `html`

### Data Display (2)

**Badge** — `html`

**List** — `html`

### Data Input (1)

**Button** — `html`
- Animation: 

### Overlay (1)

**Modal** — `html`

### Media (2)

**Image** — `html`

**Icon** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Border radius:** unset, .25rem, .3rem, .35rem, .4rem, .45rem, .5rem, .55rem, .625rem, .65rem, .75rem, 1px, 1rem, 1.25rem, 1.5rem, 3px, 4px, 8px, 10px, 12px, 14px, 16px, 24px, 100%, 999px
- **Max content width:** 991px

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

- `0px 0px 0px 2px #fff`
- `0 1px 2px rgba(0,0,0,0.06)`
- `inset 0 0 0 1px rgba(37,37,37,0.08)`

### Raised — cards, buttons, interactive elements

- `unset`
- `0 0 0 1px rgba(0,0,0,0.1),0px 1px 3px rgba(0,0,0,0.1)`
- `0 0 3px rgba(51,51,51,0.4)`

### Floating — dropdowns, popovers, modals

- `0 4px 12px rgba(0,0,0,.12)`
- `0 8px 20px rgba(0,0,0,0.14)`

### Overlay — full-screen overlays, top-level dialogs

- `0 4px 30px 0 var(--color-tokens-background-shadow)`
- `0 10px 32px rgba(0,0,0,0.16)`
- `0 10px 24px rgba(0,0,0,0.18)`

### Z-Index Scale

`0, 1, 2, 3, 4, 5, 6, 8, 10, 20, 99, 900, 950, 990, 1000, 2000, 2147483647`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes spin`
- `@keyframes nicholiiPulse`
- `@keyframes nicholii-marquee`
- `@keyframes nm-loop-in`
- `@keyframes nm-loop-fade`
- `@keyframes nm-cursor-click`
- `@keyframes nm-pulse`
- `@keyframes nm-sell-doc`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#f9ffaa` for interactive elements (buttons, links, focus rings)
- Use `#ffffff` as the primary page background
- Pair **Arial** (body) with **webflow-icons** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: unset, .25rem, .3rem, .35rem, .4rem
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond Arial and webflow-icons and Fragment Mono
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
| xs | 479px | css |
| sm | 560px | css |
| sm | 600px | css |
| md | 767px | css |
| md | 768px | css |
| lg | 991px | css |
| lg | 992px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #ffdede
Border: 1px solid #333333
Radius: 1rem
Padding: 16px
Font: Arial
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #f9ffaa, text white
Ghost: bg transparent, border #333333
Padding: 8px 16px
Radius: 1rem
Hover: opacity 0.9 or lighter shade
Focus: ring with #f9ffaa
```

### Build a Page Layout

```
Background: #ffffff
Max-width: 991px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #ffdede
Label: #aaadb0 (muted, 12px, uppercase)
Value: #222222 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #ffffff
Input border: 1px solid #333333
Focus: border-color #f9ffaa
Label: #aaadb0 12px
Spacing: 16px between fields
Radius: 1rem
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Arial, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/Aspekta-100.ttf`
- `fonts/FragmentMono-Regular.ttf`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.

## Homepage Screenshots (screenshots/)

![homepage.png](screenshots/homepage.png)

