# Round 3 — builder notes

First full evaluation round (rounds 1–2 were builder self-checks).

Since round 1:
- Hero brain: fixed wall-clock build timeline (was frame-rate dependent), added
  emissive floor so unlit nodes read, +40 nodes, brighter edges, larger spheres.
- Lighthouse: chromatic beam alphas ×2.5, wider sweep cone, lamp glow, monolith
  rim-light gradients.
- Villain drift card: gap fill is now a lime→amber gradient instead of muddy solid.
- How-section graph scenes: faster build-in, node halos, workflow labels
  (intake / conflict check / drafting / review / filed) in Map stage.
- Platform Map canvas: brighter chords, soft edge-born ripple instead of hard circle.

Known open items (builder's own list, unverified against this pack):
- "How" Scan stage may still feel sparse at capture times.
- Try-it-out section is a placeholder pending the Teams Squared embed.
- About section has no imagery yet (pending Lex Ops assets).

Pre-gate: capture script reports zero console errors, zero horizontal overflow
at 1440/768/375. Reduced-motion + keyboard paths implemented but not yet
independently verified.
