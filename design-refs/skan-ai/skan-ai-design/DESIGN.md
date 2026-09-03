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
  src: url("https://www.skan.ai/_next/static/media/Everett_Regular-s.p.0iasus9l14t5r.woff2?dpl=dpl_6DCzgHzE9UBo4JrT9VzaPqAMChQm");
  font-weight: 400;
}
@font-face {
  font-family: "messinaSans";
  src: url("https://www.skan.ai/_next/static/media/MessinaSans_Regular-s.p.1cve08dtnsapa.woff2?dpl=dpl_6DCzgHzE9UBo4JrT9VzaPqAMChQm");
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
