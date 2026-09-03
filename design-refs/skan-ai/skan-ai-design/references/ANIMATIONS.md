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

