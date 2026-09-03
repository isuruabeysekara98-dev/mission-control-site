# Mission Control — Site Wireframe

Working spec. Section 1 detailed below; sections 2–4 pending notes.
Visual rules come from [BRAND.md](BRAND.md); interaction rules from
[UX-PRINCIPLES.md](UX-PRINCIPLES.md); motion/motif language from
[design-refs/skan-ai/ARCHITECTURE-AND-MOTION-NOTES.md](design-refs/skan-ai/ARCHITECTURE-AND-MOTION-NOTES.md).

## Page structure

1. **Hero / Landing** — §1
2. **Platform** — §2 (includes Trust + Privacy subsections)
3. **Try it out** — §3
4. **Who we are / About us** — §4

Build quality is governed by the evaluator loop in
[ENGINEERING-LOOP.md](ENGINEERING-LOOP.md) — every section passes through it
before it counts as done.

---

## 1. Hero / Landing

### 1a. Hero section

**Copy:**
> Real time view of legal operations.
> Proactive intelligence on drift.

**Graphic — "the obsidian brain" (WebGPU, via `webgpu-threejs-tsl` skill):**

Build sequence (plays once on load, ~6–8s):
1. One dot appears, blinking (corner-bracket blink cadence from the skan motif —
   `corner-blink` timing).
2. A line draws to a second dot. Then faster to a third. Then another and another —
   connection rate accelerates on an exponential curve (each connection ~0.85× the
   previous interval), edges drawing as animated line segments.
3. Acceleration climaxes into a dense 3D point/edge network shaped like a brain —
   dark glassy "obsidian" material: near-black nodes with grainy iridescent
   rim-light (BRAND.md gradient recipe: lime → teal → butter-yellow, heavy grain),
   thin luminous edges.
4. Settle state: slow idle rotation + gentle node drift (spring physics).

Interactive state (after build completes):
- Pointer drag rotates the brain; grabbing a node drags it and the network responds
  with damped spring forces (force-directed layout live-solving), then relaxes back.
- Hover on a node: lime glow + slight scale, connected edges brighten.
- Respect `prefers-reduced-motion`: skip build animation, show settled brain, static.
- No-WebGPU fallback: pre-rendered video/poster of the build, non-interactive.

Layout: headline block left (display grotesque, one keyword in lime per BRAND.md —
suggest highlighting "drift"), brain filling right two-thirds / background. Two pill
CTAs under the headline (primary lime → "Try it out" anchor; secondary hairline →
"Explore the platform").

### 1b. Villain section — "Legal work is non-linear"

Section heading: **Legal work is non-linear** (lime keyword: "non-linear").
Three bullets, each an icon + short copy + a small looping inline animation
(SVG/canvas, staggered `job-row-reveal`-style entrance on scroll):

1. **The work is messy**
   - Copy: Under heavy cycles, exceptions to the process are the norm.
   - Animation: a clean straight line from A→B (the "official" path), then jagged
     sloped detour lines repeatedly branching off and rejoining — drawn with
     animated stroke-dashoffset, exceptions firing more often as the loop progresses.

2. **SOPs capture 20% of the work**
   - Copy: Real work jumps between Outlook → Clio → Outlook → Teams → calls →
     Word → Outlook again.
   - Animation: sleek monochrome app logos (Outlook, Clio, Teams, phone, Word) laid
     out as nodes; a bright pulse hops between them in that sequence, fast and
     erratic, leaving a fading trail — the jump map nobody documented.
     (Logos rendered ~60% opacity per BRAND.md marquee treatment; confirm logo
     usage is nominative/acceptable before launch.)

3. **By the time you document it, it has already changed** *(proposed third bullet)*
   - Copy: Processes drift the moment they're written down. Static documentation
     ages in silence.
   - Animation: two lines start together moving left→right — a fixed dashed line
     (the SOP) and a live solid line (the real process) that progressively diverges;
     the widening gap between them fills with a hazard-tinted shading, and a small
     ticker counts up ("days since last review: 247…").
   - Rationale: completes the arc (messy → invisible → decaying) and sets up the
     hero promise "proactive intelligence on drift."

### 1c. Category-defining solution

**Left column:**
- Text: **The future of legal operations, built by legal operators.**
- Animation: a lighthouse — but chromatic/futuristic, not maritime-kitsch. Abstract
  monolith form (grainy obsidian, matching the brain material) emitting a slowly
  revolving light beam rendered as a chromatic gradient sweep (spectral edge
  dispersion, like light through a prism) that periodically passes across the
  right-hand cards and momentarily lifts their rim-light as it sweeps. Implement as
  a conic-gradient rotation + the skan `ai-masthead-scan` sweep technique; WebGPU
  version can share the hero's renderer.

**Right column:** heading **The missing context behind enterprise AI**, then three
stacked cards (hairline-divided list per BRAND.md feature-row pattern):

1. **Continuously updated**
   Built from live operational signals, including tacit human knowledge, turnaround
   times, and decision patterns, not static documentation. The Context Graph of work
   evolves as your business evolves.

2. **Rich operational context**
   Continuously captures real work at scale covering all process variants,
   exceptions, workarounds from direct observation of human work, not just documents
   and event logs. The context AI needs to understand how work gets done.

3. **Grounded in real work**
   Every insight traces back to observed work. Transparent, explainable, auditable,
   and rooted in operational reality.

Card treatment: sleek-mode type (BRAND.md §3), lime micro-icon per card,
corner-bracket frame on the active/hovered card (skan `corner-open` stagger).

### 1d. How it works — "Scan. Map. Analyze."

Auto-advancing three-stage stepper (skan.ai Scan/Distill/Deploy pattern, see
ARCHITECTURE-AND-MOTION-NOTES.md). One shared canvas; the three animations morph
into each other as one continuous scene rather than three separate clips.

**Stepper chrome:**
- Three stage labels across the top — **Scan.** / **Map.** / **Analyze.** — each with
  a corner-bracket icon that fills state as its stage activates (hollow → half →
  solid, per the skan stepper).
- **Timer bar:** a thin progress bar beneath each label fills over the stage's
  duration (~6–7s) while its animation plays, then the next stage takes over —
  auto-advancing, looping. Clicking a label jumps to that stage and restarts its
  bar; hover pauses. Bar in `--accent` lime on `--border` track, 2px.
- Starts when the section scrolls into view. `prefers-reduced-motion`: no
  auto-advance — three static panels stacked, no timer.

**Stage 1 — Scan**
> **See the work as it happens.**
> Lightweight computer vision observes how work actually gets done across your
> systems — no integrations to build, no interviews to sit through, no time taken
> from you or your team. Simple to set up, invisible in operation.

Animation: a dimmed, stylized workspace mockup (email client, matter list, doc).
Corner-bracket viewfinder frames snap onto regions one by one (`corner-open`
stagger) with tiny metric labels — "intake email · 2m", "matter opened",
"draft v3" — while a chromatic scan beam sweeps slowly across the whole mockup
(`ai-masthead-scan` technique). Nothing in the mockup reacts or is interrupted:
the observation is visibly passive.

**Stage 2 — Map**
> **Your firm, as a living graph.**
> Observations become workflows; workflows become the **Context Graph of your law
> firm** — a living, breathing map of how your firm actually operates, updating
> continuously as your practice evolves.

Animation: the bracketed labels from Scan detach from the mockup, drift together,
and snap into nodes; luminous edges draw between them into a small force-directed
graph that keeps gently reorganizing. One node receives a fresh observation and a
ripple propagates through its neighbors — the graph is visibly *alive*. This
mini-graph is deliberately the same visual object as the hero's obsidian brain:
the payoff that the brain the visitor played with at the top **is** the Context
Graph.

**Stage 3 — Analyze**
> **Know the path. See the drift coming.**
> The Context Graph reveals the common path through every matter, surfaces where
> work deviates from it — and predicts where it will deviate next. Proactive
> intelligence, not post-mortems.

Animation: the graph settles; the **common path** ignites as a bright lime route
flowing through the nodes (animated stroke, like a route highlight). Actual
**deviations** flicker on as amber branches off the path. Then the forecast
moment: a **predicted deviation** appears ahead of the flow as a ghosted, dashed,
slowly pulsing branch — flagged with a corner-bracket marker before anything has
gone wrong. Ends on that image; loop returns to Scan.

---

## 2. Platform

A deeper, richer retelling of Scan → Map → Analyze (§1d is the trailer; this is
the film). Full-bleed sub-sections, one per stage, each with a hero-grade
animation. Sticky Scan/Map/Analyze mini-stepper (same bracket icons + timer bars
as §1d) pinned while scrolling through.

### 2a. Scan — the drop that listens

Animation sequence:
1. **One drop** falls into darkness; concentric ripples spread.
2. The ripple rings resolve into an **org chart** — person-nodes connected in a
   firm hierarchy. Each node gains a softly pulsing ring — a "listening"
   indicator, like a REC light (use lime pulse rings, `button-square-pulse`
   cadence; deliberately calm, not alarming — this is consent-forward observation,
   not surveillance).
3. Beneath/behind the org chart, a **rolling marquee of tool logos** streams past
   (Outlook, Clio, Teams, Word, phone, calendar — monochrome, 60% opacity,
   `marquee` keyframe). Observation threads draw from the passing tools up into
   the org chart nodes: the platform hears every system the firm touches.

Copy direction: expand §1d Scan — zero-integration capture, in-environment
processing, days-not-months setup, invisible to the working lawyer.

### 2b. Map — the brain inside the organization

Animation: the org chart from 2a stays as a faint outline; observation streams
flow inward from every person-node and **condense into the obsidian brain**
(hero asset reused, smaller) forming at the organization's center. Edges keep
arriving as new observations land — the brain visibly grows and reorganizes
inside the silhouette of the firm. Label: **The Context Graph of your law firm.**
End state: slow idle rotation, live ripple when a fresh observation lands.

Copy direction: the three §1c cards' themes (continuously updated · rich
operational context · grounded in real work) expanded to full paragraphs here.

### 2c. Analyze — building on the common path

Animation: the §1d Analyze scene, extended into a full analytics tableau:
- The **common path** flows through the graph as a bright lime river (animated
  stroke, constant motion).
- **Branch statistics** fade in at fork points (e.g. "87% follow · 13% deviate"),
  set in sleek-mode type.
- **Deviation heat**: off-path branches glow amber, intensity scaled to frequency.
- **Forecast markers**: ghosted dashed branches with corner-bracket flags where
  deviations are *predicted* — the drift radar, before drift happens.
- Optional: a small time scrubber under the tableau — dragging it replays how the
  common path itself shifted over the past quarters (the graph is alive in time,
  not just in structure).

### 2d. Trust — "Built for law firms and GCs that can't get it wrong"

Direct adaptation of skan.ai's enterprise-trust section (see scroll-067 in
design-refs): 
- Corner-bracket-framed section heading (blur-to-sharp `logo-fade-in` reveal).
- Row of compliance/security badge tiles (`--bg-1` tiles, monochrome badges) —
  actual badge set TBD by what we genuinely hold (do not display certifications
  we don't have).
- Four trust pillars beneath, 4-col grid, sleek-mode type — adapted to our story,
  e.g.: **Zero-integration capture** · **In-environment processing** ·
  **Cloud-native, API-first architecture** · **Security and compliance by design**
  (rewrite in our voice before build).

### 2e. Privacy — the rolling window

A horizontally auto-rolling carousel ("rolling window") of privacy-commitment
cards — swiper-style like skan.ai's, borrowing the same component language:
- Cards: hairline border, corner-bracket frame on the centered/active card
  (`corner-open`), sleek-mode headings.
- Card themes (draft): what we observe vs. what we never store · anonymization &
  aggregation · client-privilege boundaries · data residency & in-perimeter
  processing · audit trail of every agent decision.
- Motion: continuous slow roll (`marquee` at low speed), pauses on hover, drag to
  browse; edge cards fade under a soft mask. Progress dots or a thin
  `ticker-ring` indicator.

## 3. Try it out

A **real-time view of a live company** — the interactive payoff of the whole page.

- Leverage the **Teams Squared real-time view** hosted in the Lex Ops proposal
  section (TODO: locate the hosted URL/asset in `Lex Ops/2. Sales Ops` proposal
  materials and confirm it can be embedded).
- Presentation: embedded live view inside a corner-bracket scanning frame with the
  chromatic scan beam sweeping its border (§1a/§1d motif) — framed as "you're
  looking at a real operation, live."
- Above it: one-line setup ("This is a real firm's operational picture — explore
  it.") + primary lime CTA (**Request a demo** or **Try it on your firm**).
- Fallback if embedding is not viable: high-fidelity looping screen capture with
  hotspot annotations, plus the CTA.

## 4. Who we are / About us

- Repurpose images + content from the existing **Lex Ops website** (TODO: pull
  assets/copy from the current site), **restyled hard** to this design system:
  duotone/desaturated photo treatment on `--bg-0`, corner-bracket frames on
  portraits (skan testimonial treatment), sleek-mode bios, lime keyword
  highlights in the story copy.
- Narrative spine: *built by legal operators* — ties back to the §1c lighthouse
  line. Short founding story, the operating thesis (legal work is non-linear;
  context is the missing layer), then the team grid.
- End of page = end of flow (UX-PRINCIPLES §10 Peak-End): close with a memorable
  final CTA block — suggest the hero brain reappearing small, settled and calm,
  above **"See your firm's real operational picture."** + demo CTA.
