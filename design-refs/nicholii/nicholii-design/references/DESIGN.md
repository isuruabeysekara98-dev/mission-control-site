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
