# Engineering Loop — Build → Evaluate → Improve

Quality protocol for every section of the Mission Control site. Nothing ships on
the builder's own judgment: each section iterates through an independent
evaluator until it clears the bar.

## Goal dimensions

Three dimensions, each scored **out of 10** by the evaluator:

1. **Sleekness** — visual craft. Does it look expensive and engineered?
   Judged against [BRAND.md](BRAND.md): palette discipline (one accent per view),
   grain-mandatory gradients, hairline structure, whitespace as luxury, motion
   that is damped and deliberate. Automatic deductions for AI-slop tells:
   clean/plastic gradients, shadowed cards, competing accents, generic template
   layouts, bouncy easing.

2. **Intuitiveness of UI** — does a first-time visitor always know where they
   are, what things do, and what to do next? Judged against
   [UX-PRINCIPLES.md](UX-PRINCIPLES.md) (the 20 laws): one purpose per screen,
   obvious primary action, feedback within 400ms, familiar patterns, progressive
   disclosure, reduced-motion and keyboard paths intact.

3. **Distinctiveness of user experience** — would a visitor remember and
   describe this site to someone else? Signature moments (obsidian brain,
   scanning frames, chromatic lighthouse, drift forecast) must be present,
   coherent as one visual language, and doing narrative work — not decoration.
   A page that could belong to any SaaS template scores ≤ 4 here by definition.

## Roles

- **Builder** — the main session (or a build subagent). Implements, captures
  evidence, applies fixes. **Never scores its own work.**
- **Evaluator** — a fresh subagent spawned per round via the Agent tool with
  `model: "opus"` (per direction, evaluation runs on the Opus 4.8-class model —
  the tool's `opus` selector; do not run the evaluator on the builder's model or
  in the builder's context). Each round gets a **new** evaluator with no memory
  of prior rounds — scores must come from the artifact, not from familiarity.

## Deterministic pre-gate (before spending an evaluation)

Builder verifies, evidence in hand:
- [ ] Page loads with zero console errors (`read_console_messages` clean).
- [ ] Renders correctly at mobile (375), tablet (768), desktop widths
      (`resize_window` presets) — no horizontal body scroll.
- [ ] `prefers-reduced-motion` path works (animations flattened, content intact).
- [ ] WebGPU fallback renders where the scene is unavailable.
- [ ] Interactive elements reachable by keyboard; focus visible.

Fail any item → fix first. The evaluator's time is for judgment, not lint.

## Evidence pack (builder assembles per round)

Written to `eval/round-<n>/`:
- Full-page screenshots at the three widths.
- Scroll-journey screenshots (every ~900px, skan-extraction style) at desktop.
- Screenshots of key interaction states (hover, active stepper stage, dragged
  brain node, paused carousel).
- `notes.md`: what changed since last round, and which prior findings were
  addressed (or deliberately declined, with reason).

## Evaluator protocol (goes in the agent prompt each round)

The evaluator, in a fresh context:
1. Reads `BRAND.md`, `UX-PRINCIPLES.md`, `WIREFRAME.md`, and the round's
   evidence pack. May also run the site itself via the browser tools and read
   source for verification. It judges the rendered experience, not the code
   style.
2. Scores each dimension **n/10** with **cited evidence** — every deduction
   names the screenshot/element that caused it. No vibes-only scoring.
3. For each dimension, writes **"what would make this a 10"** — concrete,
   ranked, implementable items (e.g. "hero headline tracking is -0.01em, brand
   spec is -0.02em — screenshot 2", not "improve typography").
4. Flags any **regression** vs. the previous round's evidence pack (packs stay
   on disk; the evaluator may diff against them even though it never saw the
   round itself).
5. Returns a structured verdict:
   ```
   round: n
   scores: { sleekness: x/10, intuitiveness: y/10, distinctiveness: z/10 }
   verdict: pass | iterate
   findings: [ranked list, each with evidence + fix]
   ```

## Loop control

- **Pass bar:** all three dimensions ≥ 9/10.
- **Iterate:** builder implements the ranked findings top-down, re-runs the
  pre-gate, assembles a new evidence pack, spawns a fresh evaluator.
- **Stall rule:** if two consecutive rounds produce no score improvement on the
  blocking dimension, stop looping and surface the disagreement to the human —
  with both evaluators' findings and the builder's position. Don't grind.
- **Cap:** 5 rounds per section without human check-in.
- **Scope:** run per section as it's built (hero, platform, try-it-out, about),
  plus one final whole-page run before ship — the whole-page run also judges
  coherence *between* sections (shared motifs, consistent motion language,
  narrative flow from hero promise → platform proof → try-it-out payoff).

## Log

Each round appends one line to `eval/LEDGER.md`:
`round n · section · S x/10 · I y/10 · D z/10 · verdict · headline finding`
— so score trajectory across the build is auditable at a glance.
