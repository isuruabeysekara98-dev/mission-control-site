# skan.ai — System Architecture Visuals & Motion (curated notes)

Curated from the full `skillui` extraction in `skan-ai-design/` (see that folder's
`SKILL.md` + `references/*.md` for raw tokens). This file pulls out specifically
what was asked for: the **system-architecture visual motif** and **animation system**,
so it's fast to reference without re-reading the full dump.

## The core motif: "corner-bracket scanning frame"

skan.ai's entire visual identity is built around one repeated device — a thin
**corner-bracket frame** (like a camera/ML object-detection viewfinder) that appears
on photos, logos, headings, and section markers. It's the visual metaphor for
"AI observing/measuring real work."

- **Hero (scroll 0%):** a photo of a person working is overlaid with multiple
  corner-bracket boxes, each labeling a metric floating beside it —
  `48% PROCESSING TIME REDUCTION`, `AUTOMATABLE WORK 95%`, `$50M COST SAVINGS`.
  Reads exactly like a live computer-vision detection overlay.
- **Trust section:** headings, testimonial photos, and partner logos (e.g. "DEFINITI")
  are framed the same way — brackets double as a decorative headline/quote treatment.
- **Process stepper ("Scan. → Distill. → Deploy."):** each of the three stage labels
  has its own bracket icon that changes fill state (hollow → half → solid) as the
  active stage progresses on scroll — the bracket literally "closes" to mark progress.

**Implementation (from extracted CSS):**
```css
/* corner element base — 4 corners per frame, positioned via a wrapper */
.corner-tl, .corner-tr, .corner-bl, .corner-br { /* small L-shaped border, ~12px */ }

@keyframes corner-open {
  0%   { opacity: 0; transform: translate(calc(var(--corner-dir-x,0) * .75rem),
                                            calc(var(--corner-dir-y,0) * .75rem)); }
  100% { opacity: 1; transform: translate(0px); }
}
/* 0.55s cubic-bezier(0.22,1,0.36,1), fill: both — each corner flies in from its
   own diagonal direction via --corner-dir-x/-y, staggered via --reveal-delay */

@keyframes corner-pulse {
  50% { transform: translate(calc(var(--corner-dir-x,0) * 4px),
                              calc(var(--corner-dir-y,0) * 4px)); }
}
/* 0.4s ease-out — idle "breathing" nudge outward and back, hover/active state */

@keyframes corner-blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75%      { opacity: 0; }
}
/* 0.6s ease-in-out — used for a "scanning in progress" blink state */
```

Reusable takeaway: build one `<ScanFrame>` component with 4 corner children, each
reading `--corner-dir-x`/`--corner-dir-y` (±1) so a single CSS rule handles all
four corners' fly-in direction. Drive `opening / idle-pulse / blinking` as three
states via a class toggle.

## The "AI scanning" sweep

```css
@keyframes ai-masthead-scan {
  0%       { transform: translate(-130%); }
  80%,100% { transform: translate(340%); }
}
/* 3.4s cubic-bezier(0.45,0,0.2,1), infinite — a light band sweeps left-to-right
   across a dotted/grid masthead graphic, like a scanner beam passing over a
   surface. Applied to a ::after pseudo-element inside `.ai-masthead__grid--sweep`. */
```

Paired with a **dotted grid / halftone globe icon** (small sphere built from dot-matrix
texture, seen next to "How Skan AI gives your AI context from real work, not
guesswork") — dots-as-texture is the secondary graphic language alongside the
corner brackets.

## "Context Graph" diagram (Distill stage)

At the "Distill" stage of the Scan → Distill → Deploy stepper, the page shows:
- A soft violet radial-glow **grid mesh** panel (blurred grid lines on white,
  violet-tinted) — represents raw signal / noise.
- Directly below, a **solid violet panel with a node/branch tree pattern** drawn in
  a slightly darker violet — represents the distilled "Context Graph of Work."
- Copy: *"The context graph shows where time goes, where value is lost, and where
  AI can create impact. Governed agents run end-to-end through Skan AI's Agentic
  Operating Procedures."*

Takeaway for our site: pair a literal before/after — noisy signal → structured graph
— using one accent hue (their violet `#8B5CF6`/`#9677FF`, ours could use lime or
violet per `BRAND.md`) at two saturations rather than two different colors.

## Other extracted motion (see `references/ANIMATIONS.md` for full CSS)

| Keyframe | Duration | Use |
|---|---|---|
| `marquee` | linear, infinite | Logo strip auto-scroll (translate 0 → -50%) |
| `ticker-ring` | — | SVG `stroke-dashoffset` ring — circular progress/loader |
| `announcement-gradient-drift` | — | Top announcement bar background slowly drifts |
| `announcement-gradient-sweep` | — | A soft highlight sweeps across the announcement bar on load |
| `logo-fade-in` | 0.7s | Blur(6px)+scale(0.92) → sharp+scale(1) — logo reveal |
| `job-row-reveal` | 0.4s | translateY(6px)+fade — list row stagger-in |
| `button-square-pulse` | infinite | Opacity 0→0.45→0.45→0 — idle attention pulse on a square icon button |

**Global rules the site follows:** durations only from `{0.15s, 0.2s, 0.3s}` for
micro-interactions (longer, named durations above are the exceptions for hero-level
moments); `ease-out` for enters; ships a `prefers-reduced-motion` kill-switch that
flattens all animation/transition durations to 0.01ms.

## Applying this to Mission Control

- Adopt the **corner-bracket scanning frame** as our own signature motif — it reads
  as "system observing/measuring," which fits an infra/mission-control brand even
  better than it fits skan.ai. Re-skin it in `--accent` lime (see `BRAND.md`) instead
  of their violet.
  - Full-file reference: [`../../BRAND.md`](../../BRAND.md)
- Use the sweep-scan (`ai-masthead-scan`) technique on our WebGPU hero graphic's
  frame border (Ref B1 in `BRAND.md` already calls for a glowing dotted frame — this
  gives it a live scanning beam, not just a static glow).
- Borrow the **stepper-with-state-changing-icons** pattern (Scan/Distill/Deploy) for
  any "how it works" section — bracket icon fills in as each step activates on scroll.
- Borrow the **noisy-grid → structured-graph** diagram pairing for any "before Mission
  Control / after Mission Control" comparison.
