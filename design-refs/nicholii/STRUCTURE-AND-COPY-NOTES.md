# nicholii.ai — structure and copy study

Companion to the skillui extraction in `nicholii-design/` (tokens, components,
81 detected animations). This file is the part skillui can't see: how the page is
built and how the copy is written. Used to restructure the Mission Control
landing page on 2026-09-10.

## Page structure (18 sections, top to bottom)

1. Hero — one line ("nicholii handles your legal bread & butter.") + one sub + two CTAs (Meet nicholii / Watch our launch film)
2. Launch film poster
3. Three customer testimonials, rotating (name, role, company, one-line outcome)
4. Logo strip, scrolling (10 logos)
5. "A new way to get legal done." — why we built it
6. **Philosophy statement**, full width: "Legal teams shouldn't have to choose between control and self-service…"
7. Repeating brand trinity header ("Governed AI + Automation + Experienced Lawyers") ×9
8. Three-pillar capability cards
9–11. **Use-case highlight blocks with concrete numbers** ("12 clauses checked · 2 issues outside your approved position", "$240,000 contract value · 3 approvals triggered", "6 departures narrowed to 1 issue")
12. Six capabilities — interactive tabbed stepper with in-product UI
13. **Data-governance stat row** ("AU" · "0" public models trained on your data · "100%" governed · "Human")
14. What we believe — team photo + two-column narrative
15. Extended testimonial pull-quote
16. **Audience-stage cards** — "No legal team? / Lean legal team? / Established legal team?" each with one line + Learn more
17. Final CTA band — one question, one button ("Ready to turn legal into your strategic enabler?")
18. Awards row
Footer: Product / Company / Legal / Address, acknowledgement of country, legal-entity notice.

## Copy rules we adopted

- **Rhythm:** heading = a promise in 5–12 words → sub = outcome in 15–25 words → body = how in 30–60 words.
- **Person:** "we" for belief, "your" for benefit, "the system/the map" for neutral description.
- **AI is always qualified** ("Governed AI") and framed as an outcome ("routine work moves on its own"), never as a mechanism.
- **Trust is concrete:** named customers with titles, real numbers in every use-case block, a governance stat row, provenance ("built by lawyers from inside the problem").
- **Contrast pairs** carry the argument: control vs self-service, judgment vs repetition, routine vs exception.
- **No metaphors, no buzzwords without grounding.** Copy stays operational.

## What Mission Control took from it

| nicholii pattern | Mission Control section |
|---|---|
| Hero + immediate proof | Hero with a real-result line under the key; logo strip directly beneath |
| Philosophy statement | `#statement` — "A firm shouldn't need interviews and workshops to know how its own work moves." |
| Use-case blocks with numbers | `#proof` — 184 cases · 40% unofficial path · 21 h wait, with the live-map preview |
| Governance stat row | `#privacy` — 0 documents stored · 100% inside your environment · Roles, not names · Every insight traceable |
| Audience-stage cards | `#stages` — No / Lean / Established operations team |
| Final question + CTA | "Ready to see how your firm really works?" |
| Warm paper background (#eeeeee/#ebebda), not stark white | `--bg-0: #fbfbf8` |
