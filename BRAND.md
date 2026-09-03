# Mission Control — Brand & Design Guidelines

Derived from four reference screenshots supplied 2026-09-03:
- **Ref A1/A2 (Modal.com hero + inner pages):** hero composition, 3D graphics language, section layout
- **Ref B1 (Unicorn.studio hero):** live WebGL/WebGPU shader hero, framed canvas, mixed-type display
- **Ref B2 (Unicorn.studio features):** sleek font styling, bordered card grid, metallic showpiece text

These are inspiration, not clones — synthesize, never copy assets, logos, or exact copy.

---

## 1. Brand essence

Dark, engineered, quietly premium. The page itself should feel like a rendered object:
one live GPU-driven graphic carries the visual weight; everything else is restrained
typography on near-black with hairline structure. Confidence through space, not decoration.

## 2. Color system

Dark-first. The site commits to a single dark look (no light theme needed).

| Token | Value | Use |
|---|---|---|
| `--bg-0` | `#000000` | Hero / page ground |
| `--bg-1` | `#141614` | Section panels, cards |
| `--border` | `rgba(255,255,255,0.09)` | Hairlines, card borders, dividers |
| `--text-hi` | `#F4F5F3` | Headlines |
| `--text-mid` | `#C8CCC7` | Card titles, sleek headings |
| `--text-lo` | `#8A9088` | Body / secondary copy |
| `--accent` | `#84EE64` | Electric lime — keyword highlights, icons, primary CTA fill |
| `--accent-ink` | `#0A1406` | Text on lime |
| `--glow-violet` | `#8B5CF6` | Shader hero secondary hue (Ref B1) |
| `--glow-magenta` | `#D948AE` | Shader hero tertiary hue |
| `--ember` | `#F59E0B` | Sparse — dotted frame / edge glow only |

Rules:
- **One accent per view.** Lime owns UI (CTAs, icons, highlighted words). Violet/magenta
  live only *inside* rendered graphics — never as UI chrome.
- Gradient recipe for 3D/graphic surfaces (Ref A1): lime → teal → butter-yellow with
  **heavy film grain/noise** baked in. Grain is mandatory; clean gradients read as generic.
- No pure grays with blue cast — grays lean slightly green/warm to match the palette.

## 3. Typography

Two families, three voices (Ref A1 + B1 + B2):

- **Display grotesque** — modern, slightly characterful (e.g. General Sans, Cabinet
  Grotesk, or Space Grotesk). Hero headlines at `clamp(3.5rem, 8vw, 6.5rem)`,
  weight 500–600, line-height 1.02, letter-spacing −0.02em.
- **Serif italic accent** — one word per display heading may flip to an elegant italic
  serif (e.g. Instrument Serif italic), Ref B1's "Magic" move. Use sparingly: hero + at
  most one section heading.
- **Sleek mode (Ref B2)** for cards/inner headings: `--text-mid`, weight 400–500,
  centered where the grid is symmetric, sizes 1.125–1.5rem, generous surrounding space,
  never bold-shouty. Sub-copy 0.875rem `--text-lo`, line-height 1.6, max ~34ch.

Heading keyword highlight (Ref A2): one meaningful phrase per heading in `--accent`,
rest in `--text-hi`. Applied via `<span>`, not italics.

Showpiece numerals (Ref B2 "38kb"): oversized stat text with metallic/chrome gradient
fill + soft glow, used for at most one hero stat per page.

## 4. Hero treatment

Combine Ref A1's composition with Ref B1's living canvas:

- **Layout:** headline block top-left (or centered for launch pages), small two-line
  descriptor top-right in `--text-lo`, two pill CTAs (lime-filled primary, hairline-
  outlined secondary), graphic dominating the lower two-thirds.
- **Graphic:** a real-time WebGPU scene (use the `webgpu-threejs-tsl` skill) —
  grainy gradient-mapped geometry (cubes/monolith forms per Ref A1) *or* a fluid
  shader field with dither/ASCII overlay (Ref B1). Subtle idle motion; reacts gently
  to pointer. Always provide a static grainy-gradient fallback for no-WebGPU.
- **Frame device (optional, Ref B1):** the canvas may sit inside a thin glowing dotted
  border (`--ember`) that treats it like an exhibit.

## 5. Layout system

- 12-col grid, max-width 1200–1280px, gutters 24px; sections separated by `--border`
  hairlines rather than background changes where possible.
- **Feature rows (Ref A2):** two-column — text stack one side (heading with lime
  keyword, small CTA, then a hairline-divided list of icon + title + short copy),
  visual card the other. Alternate sides per row.
- **Card grid (Ref B2):** shared 1px `--border` lattice (borders touch, cells feel like
  one engraved panel), each cell: centered title in sleek mode, one-line sub-copy,
  graphic below. `--bg-0` or `--bg-1` fill, no shadows, no rounded > 8px.
- **Logo/proof marquee (Ref A1):** single row of bordered cells, monochrome marks at
  ~60% opacity.
- Whitespace is the luxury signal: section padding ≥ 120px desktop / 64px mobile.

## 6. Components

- **Buttons:** pill radius (999px). Primary: lime fill, `--accent-ink` text. Secondary:
  transparent, 1px `--border`, `--text-hi` text. 0.875–0.9375rem, weight 500.
- **Badges (Ref B1):** tiny pill, hairline border, dot indicator, `--text-lo` text.
- **Icons:** 16–20px line icons in `--accent`, stroke ~1.5px.
- **Dividers:** 1px `--border` everywhere structure is needed; never heavier.

## 7. Motion

- Shader/3D hero: continuous slow drift; pointer parallax ≤ 4°; pause offscreen.
- UI: fades + 12–16px rises, 300–450ms ease-out, staggered ~60ms; marquee scrolls
  slowly and pauses on hover. No bouncy easing — everything damped and expensive-feeling.

## 8. Don'ts

- No light backgrounds, no drop-shadow cards, no multi-color UI accents.
- No clean/plastic gradients — grain or don't gradient.
- No more than one serif-italic accent word per heading; no italic body copy.
- Don't reuse Modal/Unicorn logos, copy, or exact assets.
