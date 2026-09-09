/* Hero graphic — the real Teams Squared map, masked: departments, workflows and
   tools keep their names; people are shown as roles. Same mesh as the atlas,
   drawn on the light page palette and made to breathe. */
import { ATLAS } from './atlas-data.js';

const NS = 'http://www.w3.org/2000/svg';
const el = (tag, cls) => { const e = document.createElementNS(NS, tag); if (cls) e.setAttribute('class', cls); return e; };

export function initHeroGraph(svg, { reduced = false, onInteractive } = {}) {
  if (!svg) return;
  const nodes = [], links = [], byId = {};
  const add = (n) => { byId[n.id] = n; nodes.push(n); return n; };
  ATLAS.departments.forEach((d) => add({ id: 'd:' + d.id, kind: 'dept', label: d.name, r: 20 }));
  ATLAS.departments.forEach((d) => d.workflows.forEach((w) => {
    add({ id: 'w:' + w.id, kind: 'wf', label: w.name, r: 7, deptId: d.id });
    links.push(['d:' + d.id, 'w:' + w.id, 2.2]);
  }));
  ATLAS.people.forEach((p) => add({ id: 'p:' + p.id, kind: 'person', label: p.role, r: 4.5 }));  // masked: role, not name
  ATLAS.tools.forEach((t) => add({ id: 't:' + t.id, kind: 'tool', label: t.name, r: 4 }));
  ATLAS.departments.forEach((d) => d.workflows.forEach((w) => {
    w.people.forEach((p) => byId['p:' + p] && links.push(['w:' + w.id, 'p:' + p, 1]));
    w.tools.forEach((t) => byId['t:' + t] && links.push(['w:' + w.id, 't:' + t, 0.7]));
  }));
  const linked = new Set(links.flatMap(([a, b]) => [a, b]));
  const live = nodes.filter((n) => n.kind === 'dept' || linked.has(n.id));
  const L = links.map(([a, b, w]) => ({ s: byId[a], t: byId[b], w }));

  let W = 0, H = 0, cx = 0, cy = 0;
  const layout = () => {
    W = svg.clientWidth; H = svg.clientHeight;
    const wide = W > 960;
    cx = wide ? W * 0.68 : W * 0.5; cy = wide ? H * 0.5 : H * 0.62;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  };
  layout();
  if (W < 2 || H < 2) { setTimeout(() => initHeroGraph(svg, { reduced, onInteractive }), 150); return; }

  const spread = Math.min(W, H) * 0.32;
  const depts = live.filter((n) => n.kind === 'dept');
  depts.forEach((d, i) => { const a = (i / depts.length) * Math.PI * 2 - Math.PI / 2; d.x = cx + Math.cos(a) * spread; d.y = cy + Math.sin(a) * spread * 0.9; });
  live.forEach((n) => {
    if (n.kind === 'dept') return;
    const anchor = n.deptId ? byId['d:' + n.deptId] : null;
    n.x = (anchor ? anchor.x : cx) + (Math.random() - 0.5) * 220;
    n.y = (anchor ? anchor.y : cy) + (Math.random() - 0.5) * 220;
  });
  live.forEach((n) => { n.vx = 0; n.vy = 0; n.f1 = 0.12 + Math.random() * 0.25; n.f2 = 0.09 + Math.random() * 0.2; n.p1 = Math.random() * 6.28; n.p2 = Math.random() * 6.28; n.amp = n.kind === 'dept' ? 0.006 : 0.016; });

  svg.innerHTML = '';
  const linkLayer = el('g'), pulseLayer = el('g'), nodeLayer = el('g');
  svg.append(linkLayer, pulseLayer, nodeLayer);
  L.forEach((l) => { l.el = el('line', 'hg-link'); linkLayer.appendChild(l.el); });
  live.forEach((n) => {
    n.neighbors = new Set();
    L.forEach((l) => { if (l.s === n) n.neighbors.add(l.t); if (l.t === n) n.neighbors.add(l.s); });
    const g = el('g', 'hg-node ' + n.kind);
    const hit = el('circle', 'hit'); hit.setAttribute('r', Math.max(n.r + 10, 16));
    const body = el('circle', 'body'); body.setAttribute('r', n.r);
    g.append(hit, body);
    if (n.kind === 'dept') { const core = el('circle', 'core'); core.setAttribute('r', 5); g.appendChild(core); }
    const t = el('text'); t.setAttribute('text-anchor', 'middle'); t.setAttribute('dy', n.r + (n.kind === 'dept' ? 18 : 12)); t.textContent = n.label;
    g.appendChild(t);
    nodeLayer.appendChild(g);
    n.el = g;

    g.addEventListener('mouseenter', () => {
      live.forEach((m) => { m.el.classList.toggle('dim', m !== n && !n.neighbors.has(m)); m.el.classList.toggle('hl', m === n || n.neighbors.has(m)); });
      L.forEach((l) => { const on = l.s === n || l.t === n; l.el.classList.toggle('hl', on); l.el.classList.toggle('dim', !on); });
    });
    g.addEventListener('mouseleave', () => { live.forEach((m) => m.el.classList.remove('dim', 'hl')); L.forEach((l) => l.el.classList.remove('hl', 'dim')); });
    let drag = null, interacted = false;
    g.addEventListener('pointerdown', (e) => { drag = { sx: n.x, sy: n.y, cx: e.clientX, cy: e.clientY }; n.fixed = true; g.setPointerCapture(e.pointerId); heat = 0.15; });
    g.addEventListener('pointermove', (e) => {
      if (!drag) return;
      n.x = drag.sx + (e.clientX - drag.cx); n.y = drag.sy + (e.clientY - drag.cy); heat = 0.5;
      if (!interacted) { interacted = true; onInteractive?.(); }
    });
    g.addEventListener('pointerup', () => { drag = null; n.fixed = false; });
  });

  let heat = 1, t = 0;
  const pulses = [];
  function step(alpha) {
    live.forEach((n) => {
      if (n.fixed) return;
      n.vx += Math.sin(t * n.f1 + n.p1) * n.amp + Math.cos(t * n.f2 + n.p2) * n.amp * 0.6;
      n.vy += Math.cos(t * n.f1 + n.p2) * n.amp + Math.sin(t * n.f2 + n.p1) * n.amp * 0.6;
    });
    L.forEach((l) => {
      const rest = l.s.kind === 'dept' || l.t.kind === 'dept' ? 200 : 118;
      const dx = l.t.x - l.s.x, dy = l.t.y - l.s.y, d = Math.hypot(dx, dy) || 1;
      const f = ((d - rest) / d) * 0.03 * l.w * alpha;
      if (!l.s.fixed) { l.s.vx += dx * f; l.s.vy += dy * f; }
      if (!l.t.fixed) { l.t.vx -= dx * f; l.t.vy -= dy * f; }
    });
    for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) {
      const a = live[i], b = live[j];
      let dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy;
      if (d2 < 1) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; d2 = 1; }
      if (d2 > 160000) continue;
      const k = (a.kind === 'dept' && b.kind === 'dept' ? 30000 : 9800) * alpha / d2;
      const d = Math.sqrt(d2), fx = (dx / d) * k, fy = (dy / d) * k;
      if (!a.fixed) { a.vx -= fx; a.vy -= fy; }
      if (!b.fixed) { b.vx += fx; b.vy += fy; }
    }
    live.forEach((n) => {
      if (n.fixed) { n.vx = 0; n.vy = 0; return; }
      n.vx += (cx - n.x) * 0.004 * alpha; n.vy += (cy - n.y) * 0.007 * alpha;
      n.vx *= 0.85; n.vy *= 0.85;
      const sp = Math.hypot(n.vx, n.vy); if (sp > 6) { n.vx *= 6 / sp; n.vy *= 6 / sp; }
      n.x += n.vx; n.y += n.vy;
      const m = n.r + 16;
      n.x = Math.max(m, Math.min(W - m, n.x)); n.y = Math.max(m + 70, Math.min(H - m - 40, n.y));
    });
  }
  function draw() {
    L.forEach((l) => { l.el.setAttribute('x1', l.s.x); l.el.setAttribute('y1', l.s.y); l.el.setAttribute('x2', l.t.x); l.el.setAttribute('y2', l.t.y); });
    live.forEach((n) => n.el.setAttribute('transform', `translate(${n.x},${n.y})`));
  }

  if (reduced) { for (let i = 0; i < 240; i++) { t += 0.016; step(Math.max(1 - i / 200, 0.02)); } draw(); return; }

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.02 }).observe(svg);
  new ResizeObserver(() => { layout(); heat = Math.max(heat, 0.3); }).observe(svg);

  function frame() {
    if (visible) {
      t += 0.016;
      const alpha = Math.max(heat, 0.02); heat *= 0.97;
      step(alpha); draw();
      if (Math.random() < 0.08 && pulses.length < 16) {
        const link = L[Math.floor(Math.random() * L.length)];
        const c = el('circle', 'hg-pulse'); c.setAttribute('r', 2.4); pulseLayer.appendChild(c);
        pulses.push({ el: c, link, p: 0, sp: 0.006 + Math.random() * 0.008, rev: Math.random() < 0.5 });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pl = pulses[i]; pl.p += pl.sp;
        if (pl.p >= 1) { pl.el.remove(); pulses.splice(i, 1); continue; }
        const k = pl.rev ? 1 - pl.p : pl.p;
        pl.el.setAttribute('cx', pl.link.s.x + (pl.link.t.x - pl.link.s.x) * k);
        pl.el.setAttribute('cy', pl.link.s.y + (pl.link.t.y - pl.link.s.y) * k);
        pl.el.setAttribute('opacity', Math.sin(pl.p * Math.PI));
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  setTimeout(() => onInteractive?.(), 2500);
}
