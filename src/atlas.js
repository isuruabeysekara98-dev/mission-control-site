/* Process Atlas — Teams Squared context graph, ported from the client portal demo.
   Graph: force-directed org mesh with department deep-dive + sticky workflow focus.
   Focus window: operational IDE — timestamped common path, live case flow,
   exception paths by zoom level, connected related workflows with influence edges,
   and a per-step inspector (summary · observed frame · data points). */
import { ATLAS } from './atlas-data.js';

const SVGNS = 'http://www.w3.org/2000/svg';
const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + 'K' : String(n));
const personById = (id) => ATLAS.people.find((p) => p.id === id);
const toolById = (id) => ATLAS.tools.find((t) => t.id === id);
const toolName = (id) => toolById(id)?.name || id;
const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('');
const firstName = (id) => (personById(id)?.name || id).split(' ')[0];
const deptOf = (wf) => ATLAS.departments.find((d) => d.workflows.includes(wf));
const ALL_WF = ATLAS.departments.flatMap((d) => d.workflows);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const COL = { accent: '#84ee64', violet: '#8b5cf6', amber: '#f0a44a', mid: '#c8ccc7', lo: '#8a9088', line: 'rgba(255,255,255,0.14)' };

/* ---- time helpers: handoff durations → cumulative timestamps on the common path ---- */
const parseDur = (d) => {
  if (!d) return 0;
  const [n, u] = d.split(' ');
  return u.startsWith('h') ? +n * 60 : +n;
};
const durLabel = (min) => (min >= 60 ? `${Math.round(min / 60)} h` : `${min} m`);
function stampsFor(wf) {
  const [h, m] = (wf.start || '09:00').split(':').map(Number);
  let t = h * 60 + m;
  return wf.steps.map((s, i) => {
    if (i) t += parseDur(s.dur);
    const day = 1 + Math.floor(t / 1440), mm = t % 1440;
    return { day, time: `${String(Math.floor(mm / 60)).padStart(2, '0')}:${String(mm % 60).padStart(2, '0')}`, min: t };
  });
}
const stampText = (s) => `D${s.day} ${s.time}`;

/* workflows related to `wf` through shared people or tools (any department) */
function relatedTo(wf) {
  return ALL_WF.filter((o) => o !== wf).map((o) => {
    const people = o.people.filter((p) => wf.people.includes(p));
    const tools = o.tools.filter((t) => wf.tools.includes(t));
    return { wf: o, people, tools, score: people.length * 3 + tools.length };
  }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score);
}

export function initAtlas(root) {
  const $ = (s, el = root) => el.querySelector(s);
  const $$ = (s, el = root) => [...el.querySelectorAll(s)];
  const state = { dept: null, wf: null, open: null, zoom: 1, connected: [], live: true };
  const graph = { nodes: [], links: [], particles: [], pulses: [], bridges: [] };

  /* ================================================================
     Crumbs
     ================================================================ */
  function setCrumbs() {
    const parts = [{ label: 'All departments', go: state.dept ? clearFocus : null }];
    if (state.dept) parts.push({ label: state.dept.name, go: state.wf || state.open ? () => { closeFocus(); selectWf(null); } : null });
    if (state.wf && !state.open) parts.push({ label: state.wf.name });
    if (state.open) parts.push({ label: state.open.name });
    const el = $('#crumbs');
    el.innerHTML = '';
    parts.forEach((p, i) => {
      if (i > 0) { const sep = document.createElement('span'); sep.className = 'crumb-sep'; sep.textContent = '›'; el.appendChild(sep); }
      const c = document.createElement(p.go ? 'button' : 'span');
      c.className = 'crumb ' + (p.go ? 'link' : 'here');
      c.textContent = p.label;
      if (p.go) c.addEventListener('click', p.go);
      el.appendChild(c);
    });
  }

  /* ================================================================
     Sidebar — departments with nested workflows
     ================================================================ */
  function renderSidebar() {
    $('#gs-list').innerHTML = ATLAS.departments.map((d) => `
      <div class="gs-group" data-d="${d.id}">
        <button class="gs-item" data-d="${d.id}">${d.name}<span class="gs-count">${d.workflows.length} workflows</span></button>
        <div class="gs-sub" hidden>
          ${d.workflows.map((w) => `
            <button class="gs-wf" data-w="${w.id}">
              <span class="gs-wf-code">${w.code}</span>
              <span class="gs-wf-name">${w.name}</span>
              <span class="gs-open" aria-hidden="true">→</span>
            </button>`).join('')}
        </div>
      </div>`).join('');
    $$('#gs-list .gs-item').forEach((b) => b.addEventListener('click', () => {
      const d = ATLAS.departments.find((x) => x.id === b.dataset.d);
      state.dept === d ? clearFocus() : focusDept(d);
    }));
    // one click on a workflow opens it — focusing it in the graph on the way
    $$('#gs-list .gs-wf').forEach((b) => b.addEventListener('click', () => {
      const wf = ALL_WF.find((w) => w.id === b.dataset.w);
      selectWf(wf); openWorkflow(wf);
    }));
  }
  function syncSidebar() {
    $$('#gs-list .gs-group').forEach((g) => {
      const on = state.dept && g.dataset.d === state.dept.id;
      g.classList.toggle('active', Boolean(on));
      g.querySelector('.gs-sub').hidden = !on;
      g.querySelectorAll('.gs-wf').forEach((b) => b.classList.toggle('active', Boolean(state.wf && b.dataset.w === state.wf.id)));
    });
  }

  /* ================================================================
     Graph data + DOM
     ================================================================ */
  function buildGraphData() {
    const nodes = [], links = [], idx = {};
    const add = (n) => { idx[n.id] = n; nodes.push(n); return n; };
    ATLAS.departments.forEach((d) => add({ id: 'd:' + d.id, kind: 'dept', label: d.name, r: 32, ref: d }));
    ATLAS.departments.forEach((d) => d.workflows.forEach((w) => {
      add({ id: 'w:' + w.id, kind: 'wf', label: w.name, r: 12, ref: w, deptId: d.id });
      links.push({ a: 'd:' + d.id, b: 'w:' + w.id, w: 2.2 });
    }));
    ATLAS.people.forEach((p) => add({ id: 'p:' + p.id, kind: 'person', label: p.name, r: 6, ref: p }));
    ATLAS.tools.forEach((t) => add({ id: 't:' + t.id, kind: 'tool', label: t.name, r: 5, ref: t }));
    ATLAS.departments.forEach((d) => d.workflows.forEach((w) => {
      w.people.forEach((p) => idx['p:' + p] && links.push({ a: 'w:' + w.id, b: 'p:' + p, w: 1 }));
      w.tools.forEach((t) => idx['t:' + t] && links.push({ a: 'w:' + w.id, b: 't:' + t, w: 0.7 }));
    }));
    const linked = new Set(links.flatMap((l) => [l.a, l.b]));
    graph.nodes = nodes.filter((n) => n.kind === 'dept' || linked.has(n.id));
    graph.links = links.map((l) => ({ s: idx[l.a], t: idx[l.b], w: l.w }));
    graph.byId = idx;
  }

  function initGraph() {
    const svg = $('#graph-svg');
    const W = svg.clientWidth, H = svg.clientHeight;
    if (W < 50 || H < 50) { setTimeout(initGraph, 120); return; }
    buildGraphData();
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    graph.W = W; graph.H = H;
    graph.cx = W * 0.56; graph.cy = H * 0.5;
    graph.svg = svg;
    graph.view = { x: 0, y: 0, w: W, h: H }; // camera (viewBox), eased toward the focused cluster
    graph.scale = 1;

    const depts = graph.nodes.filter((n) => n.kind === 'dept');
    depts.forEach((d, i) => {
      const a = (i / depts.length) * Math.PI * 2 - Math.PI / 2;
      d.x = graph.cx + Math.cos(a) * Math.min(W, H) * 0.34;
      d.y = graph.cy + Math.sin(a) * Math.min(W, H) * 0.34;
    });
    graph.nodes.forEach((n) => {
      if (n.kind === 'dept') return;
      const anchor = n.deptId ? graph.byId['d:' + n.deptId] : null;
      const bx = anchor ? anchor.x : graph.cx, by = anchor ? anchor.y : graph.cy;
      n.x = bx + (Math.random() - 0.5) * 260;
      n.y = by + (Math.random() - 0.5) * 260;
    });
    graph.nodes.forEach((n) => {
      n.vx = 0; n.vy = 0;
      n.wf1 = 0.12 + Math.random() * 0.25; n.wf2 = 0.09 + Math.random() * 0.2;
      n.wp1 = Math.random() * Math.PI * 2; n.wp2 = Math.random() * Math.PI * 2;
      n.wamp = n.kind === 'dept' ? 0.006 : 0.016;
    });

    svg.innerHTML = `<defs>
      <marker id="g-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" class="g-arrow"/></marker></defs>`;
    const layer = (cls) => { const g = document.createElementNS(SVGNS, 'g'); g.setAttribute('class', cls); svg.appendChild(g); return g; };
    const particleLayer = layer('l-particles'), linkLayer = layer('l-links'), bridgeLayer = layer('l-bridges'),
      pulseLayer = layer('l-pulses'), nodeLayer = layer('l-nodes');
    graph.pulseLayer = pulseLayer; graph.bridgeLayer = bridgeLayer;

    graph.particles = [];
    for (let i = 0; i < 70; i++) {
      const el = document.createElementNS(SVGNS, 'circle');
      el.setAttribute('r', 0.6 + Math.random() * 1.3);
      el.setAttribute('fill', Math.random() < 0.16 ? 'rgba(240,164,74,0.35)' : 'rgba(200,204,199,0.18)');
      particleLayer.appendChild(el);
      graph.particles.push({ el, x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12, ph: Math.random() * Math.PI * 2, fr: 0.2 + Math.random() * 0.4 });
    }
    graph.links.forEach((l) => {
      const el = document.createElementNS(SVGNS, 'line');
      el.setAttribute('class', 'g-link');
      linkLayer.appendChild(el);
      l.el = el;
    });

    const tooltip = $('#g-tooltip');
    graph.nodes.forEach((n) => {
      const g = document.createElementNS(SVGNS, 'g');
      g.setAttribute('class', 'g-node ' + n.kind);
      const hit = document.createElementNS(SVGNS, 'circle');
      hit.setAttribute('class', 'hitc'); hit.setAttribute('r', Math.max(n.r + 12, 18));
      const c = document.createElementNS(SVGNS, 'circle'); c.setAttribute('r', n.r);
      const t = document.createElementNS(SVGNS, 'text');
      t.setAttribute('text-anchor', 'middle'); t.setAttribute('dy', n.kind === 'dept' ? n.r + 20 : n.r + 13);
      t.textContent = n.kind === 'wf' || n.kind === 'dept' ? n.label : n.label.split(' ')[0];
      g.append(hit, c, t);
      nodeLayer.appendChild(g);
      n.el = g;

      n.neighbors = new Set();
      graph.links.forEach((l) => { if (l.s === n) n.neighbors.add(l.t); if (l.t === n) n.neighbors.add(l.s); });

      g.addEventListener('mouseenter', () => {
        if (!state.wf) {
          graph.nodes.forEach((m) => {
            if (m.el.classList.contains('off')) return;
            m.el.classList.toggle('dim', m !== n && !n.neighbors.has(m));
            m.el.classList.toggle('hl', m === n || n.neighbors.has(m));
          });
          graph.links.forEach((l) => { const on = l.s === n || l.t === n; l.el.classList.toggle('hl', on); l.el.classList.toggle('dim', !on); });
        }
        const kindLabel = { dept: 'Department', wf: 'Workflow', person: n.ref.role || 'Team member', tool: 'Shared tool' }[n.kind];
        tooltip.innerHTML = `<div class="tt-title">${n.label}</div><div class="tt-sub">${kindLabel}</div>` +
          (n.kind === 'dept' ? '<div class="tt-cta">Click to deep-dive this department →</div>' : '') +
          (n.kind === 'wf' ? '<div class="tt-cta">Click to open this workflow →</div>' : '');
        tooltip.style.opacity = 1;
      });
      g.addEventListener('mousemove', (e) => { tooltip.style.left = e.clientX + 16 + 'px'; tooltip.style.top = e.clientY + 8 + 'px'; });
      g.addEventListener('mouseleave', () => {
        if (!state.wf) { graph.nodes.forEach((m) => m.el.classList.remove('dim', 'hl')); graph.links.forEach((l) => l.el.classList.remove('hl', 'dim')); }
        tooltip.style.opacity = 0;
      });
      g.addEventListener('click', (e) => {
        e.stopPropagation();
        if (n.kind === 'dept') { state.dept === n.ref ? null : focusDept(n.ref); }
        if (n.kind === 'wf') { selectWf(n.ref); openWorkflow(n.ref); }
      });
      g.addEventListener('dblclick', (e) => e.stopPropagation());

      let drag = null;
      g.addEventListener('pointerdown', (e) => { drag = { sx: n.x, sy: n.y, cx: e.clientX, cy: e.clientY }; n.fixed = true; g.setPointerCapture(e.pointerId); graph.heat = 0.12; e.stopPropagation(); });
      g.addEventListener('pointermove', (e) => { if (!drag) return; n.x = drag.sx + (e.clientX - drag.cx) * graph.scale; n.y = drag.sy + (e.clientY - drag.cy) * graph.scale; graph.heat = 0.5; });
      g.addEventListener('pointerup', () => { drag = null; n.fixed = false; });
    });

    svg.addEventListener('click', () => { if (state.wf) selectWf(null); else if (state.dept) clearFocus(); });

    graph.heat = 1;
    runSim();
  }

  /* ================================================================
     Department deep-dive + workflow focus
     ================================================================ */
  function sharedBetween(d1, d2) {
    const p1 = new Set(d1.workflows.flatMap((w) => w.people)), t1 = new Set(d1.workflows.flatMap((w) => w.tools));
    const people = [...new Set(d2.workflows.flatMap((w) => w.people))].filter((p) => p1.has(p));
    const tools = [...new Set(d2.workflows.flatMap((w) => w.tools))].filter((t) => t1.has(t));
    return { people, tools };
  }

  function focusDept(dept) {
    state.dept = dept; state.wf = null;
    const wfIds = new Set(dept.workflows.map((w) => 'w:' + w.id));
    const inSet = new Set(['d:' + dept.id, ...wfIds]);
    dept.workflows.forEach((w) => { w.people.forEach((p) => inSet.add('p:' + p)); w.tools.forEach((t) => inSet.add('t:' + t)); });
    graph.inSet = inSet;
    // only the department's own cluster stays on stage; everything else leaves the view
    graph.nodes.forEach((n) => {
      n.el.classList.remove('dim', 'hl');
      const isIn = inSet.has(n.id);
      n.el.classList.toggle('in', isIn); n.el.classList.toggle('off', !isIn);
    });
    graph.links.forEach((l) => {
      l.off = !(inSet.has(l.s.id) && inSet.has(l.t.id));
      l.el.classList.toggle('off', l.off); l.el.classList.remove('hl', 'dim');
    });
    // connections beyond the view: one arrow per linked department, drawn to the edge of the frame
    clearBridges();
    graph.nodes.filter((n) => n.kind === 'dept' && n.ref !== dept).forEach((fn) => {
      const { people, tools } = sharedBetween(dept, fn.ref);
      if (!people.length && !tools.length) return;
      const line = document.createElementNS(SVGNS, 'line');
      line.setAttribute('class', 'g-bridge'); line.setAttribute('marker-end', 'url(#g-arrow)');
      const label = document.createElementNS(SVGNS, 'text');
      label.setAttribute('class', 'g-bridge-label');
      const l1 = document.createElementNS(SVGNS, 'tspan'); l1.textContent = `→ ${fn.ref.name}`;
      const l2 = document.createElementNS(SVGNS, 'tspan'); l2.setAttribute('x', 0); l2.setAttribute('dy', '1.25em'); l2.setAttribute('class', 'sub');
      const parts = [];
      if (people.length) parts.push(`${people.length} ${people.length === 1 ? 'person' : 'people'}`);
      if (tools.length) parts.push(`${tools.length} ${tools.length === 1 ? 'tool' : 'tools'}`);
      l2.textContent = parts.join(' · ') + ' shared beyond this view';
      label.append(l1, l2);
      graph.bridgeLayer.append(line, label);
      graph.bridges.push({ from: graph.byId['d:' + dept.id], to: fn, line, label, people, tools });
    });
    graph.heat = 1;
    $('#graph-focus-head').innerHTML = `
      <div class="gfh-eyebrow">Department deep-dive · led by ${dept.lead}</div>
      <div class="gfh-title">${dept.name}</div>
      <div class="gfh-blurb">${dept.blurb}</div>
      <div class="gfh-meta">${dept.workflows.length} workflows · ${inSet.size - 1 - dept.workflows.length} people &amp; tools · ${graph.bridges.length} linked departments beyond the view
        <button class="gfh-clear" id="gfh-clear">Zoom out ✕</button></div>
      <div class="gfh-wfs">
        <div class="gfh-wfs-label">Workflows in this department</div>
        ${dept.workflows.map((w) => `<button class="gfh-wf" data-w="${w.id}">
          <span class="gs-wf-code">${w.code}</span><span class="gfh-wf-name">${w.name}</span>
          <span class="gfh-wf-meta"># ${fmt(w.cases)} · ${w.steps.length} steps</span><span class="gs-open" aria-hidden="true">→</span></button>`).join('')}
      </div>`;
    $('#graph-focus-head').classList.add('on');
    $('#gfh-clear').addEventListener('click', clearFocus);
    $$('#graph-focus-head .gfh-wf').forEach((b) => b.addEventListener('click', () => {
      const wf = ALL_WF.find((w) => w.id === b.dataset.w);
      selectWf(wf); openWorkflow(wf);
    }));
    $('#view-graph').classList.add('focused');
    // the camera frames the cluster in the space between the side panel and the deep-dive header
    graph.ui = { left: $('.graph-side').offsetWidth + 40, right: $('#graph-focus-head').offsetWidth + 40 };
    $('#graph-wf-chip').classList.remove('on');
    syncSidebar(); setCrumbs();
  }

  function clearBridges() {
    graph.bridges.forEach((b) => { b.line.remove(); b.label.remove(); });
    graph.bridges = [];
  }

  function clearFocus() {
    state.dept = null; state.wf = null; graph.inSet = null; graph.ui = null;
    graph.nodes.forEach((n) => { n.el.classList.remove('in', 'off', 'dim', 'hl'); });
    graph.links.forEach((l) => { l.off = false; l.el.classList.remove('off', 'hl', 'dim'); });
    clearBridges();
    graph.heat = 1;
    $('#graph-focus-head').classList.remove('on');
    $('#graph-wf-chip').classList.remove('on');
    $('#view-graph').classList.remove('focused');
    syncSidebar(); setCrumbs();
  }

  function selectWf(wf) {
    if (wf && state.dept !== deptOf(wf)) focusDept(deptOf(wf));
    state.wf = wf;
    const rel = wf ? new Set(['w:' + wf.id, 'd:' + state.dept.id, ...wf.people.map((p) => 'p:' + p), ...wf.tools.map((t) => 't:' + t)]) : null;
    graph.nodes.forEach((n) => {
      if (n.el.classList.contains('off')) return;
      n.el.classList.toggle('hl', Boolean(rel && rel.has(n.id)));
      n.el.classList.toggle('dim', Boolean(rel && !rel.has(n.id)));
    });
    graph.links.forEach((l) => {
      if (l.off) return;
      const on = rel && rel.has(l.s.id) && rel.has(l.t.id) && (l.s.id === 'w:' + wf.id || l.t.id === 'w:' + wf.id);
      l.el.classList.toggle('hl', Boolean(on)); l.el.classList.toggle('dim', Boolean(rel && !on));
    });
    const chip = $('#graph-wf-chip');
    if (graph.ui) graph.ui.bottom = wf ? 96 : 0; // keep the frame-edge arrows clear of the chip
    if (wf) {
      chip.innerHTML = `<span class="chip-code">${wf.code}</span><span class="chip-name">${wf.name}</span>
        <span class="chip-meta"># ${fmt(wf.cases)} cases · ${wf.steps.length} activities · ${wf.people.length} people · ${wf.tools.length} systems</span>
        <button class="chip-open" id="chip-open">Open workflow →</button>`;
      chip.classList.add('on');
      $('#chip-open').addEventListener('click', () => openWorkflow(wf));
    } else chip.classList.remove('on');
    syncSidebar(); setCrumbs();
  }

  /* ================================================================
     Simulation
     ================================================================ */
  /* workflow labels that would overlap: keep the better-connected node's, hide the other */
  function delabel() {
    const s = graph.scale || 1;
    // department labels (and discs) are reserved space
    const kept = graph.nodes.filter((n) => n.kind === 'dept' && !n.el.classList.contains('off')).map((d) => {
      const w = d.el.querySelector('text').getComputedTextLength() + 12 * s;
      return { x: d.x - w / 2, y: d.y - d.r - 4 * s, w, h: d.r * 2 + 30 * s };
    });
    graph.nodes.filter((n) => n.kind === 'wf' && !n.el.classList.contains('off'))
      .sort((a, b) => b.neighbors.size - a.neighbors.size)
      .forEach((n) => {
        const t = n.el.querySelector('text');
        const w = t.getComputedTextLength() + 8 * s, h = 15 * s;
        const box = { x: n.x - w / 2, y: n.y + n.r + 2, w, h };
        const hit = kept.some((k) => box.x < k.x + k.w && box.x + box.w > k.x && box.y < k.y + k.h && box.y + box.h > k.y);
        n.el.classList.toggle('lbl-off', hit);
        if (!hit) kept.push(box);
      });
  }

  function runSim() {
    const { nodes, links } = graph;
    let t = 0;
    graph.tick = 0;
    function tick() {
      if (!root.classList.contains('active')) { requestAnimationFrame(tick); return; }
      t += 0.016;
      const alpha = Math.max(graph.heat, 0.02);
      graph.heat *= 0.97;
      const live = nodes.filter((n) => !n.el.classList.contains('off'));

      live.forEach((n) => {
        if (n.fixed) return;
        n.vx += Math.sin(t * n.wf1 + n.wp1) * n.wamp + Math.cos(t * n.wf2 + n.wp2) * n.wamp * 0.6;
        n.vy += Math.cos(t * n.wf1 + n.wp2) * n.wamp + Math.sin(t * n.wf2 + n.wp1) * n.wamp * 0.6;
      });
      links.forEach((l) => {
        if (l.off) return;
        const rest = l.s.kind === 'dept' || l.t.kind === 'dept' ? (state.dept ? 200 : 180) : (state.dept ? 124 : 110);
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
        const k = (a.kind === 'dept' && b.kind === 'dept' ? 22000 : 5200) * (state.dept ? 2.6 : 1) * alpha / d2;
        const d = Math.sqrt(d2), fx = (dx / d) * k, fy = (dy / d) * k;
        if (!a.fixed) { a.vx -= fx; a.vy -= fy; }
        if (!b.fixed) { b.vx += fx; b.vy += fy; }
      }
      live.forEach((n) => {
        if (n.fixed) { n.vx = 0; n.vy = 0; return; }
        n.vx += (graph.cx - n.x) * 0.006 * alpha; n.vy += (graph.cy - n.y) * 0.008 * alpha;
        n.vx *= 0.85; n.vy *= 0.85;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 6) { n.vx *= 6 / sp; n.vy *= 6 / sp; }
        n.x += n.vx; n.y += n.vy;
        const m = n.r + 14;
        n.x = Math.max(m, Math.min(graph.W - m, n.x));
        n.y = Math.max(m + 10, Math.min(graph.H - m, n.y));
      });
      links.forEach((l) => { l.el.setAttribute('x1', l.s.x); l.el.setAttribute('y1', l.s.y); l.el.setAttribute('x2', l.t.x); l.el.setAttribute('y2', l.t.y); });
      nodes.forEach((n) => n.el.setAttribute('transform', `translate(${n.x},${n.y})`));
      if (++graph.tick % 20 === 0) delabel();
      /* camera: ease the viewBox onto the focused cluster (or back to the full mesh) */
      const { W, H } = graph;
      let target = { x: 0, y: 0, w: W, h: H };
      if (graph.inSet) {
        const pts = live.filter((n) => graph.inSet.has(n.id));
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        pts.forEach((n) => { minX = Math.min(minX, n.x); maxX = Math.max(maxX, n.x); minY = Math.min(minY, n.y); maxY = Math.max(maxY, n.y); });
        const pad = 96;
        const bw = maxX - minX + pad * 2, bh = maxY - minY + pad * 2;
        const ui = graph.ui || { left: 0, right: 0, bottom: 0 };
        const uw = Math.max(240, W - ui.left - ui.right), uh = H - 48 - (ui.bottom || 0); // usable screen area, px
        const s = Math.max(bw / uw, bh / uh, 1 / 1.9);                                    // user units per screen px; never past 1.9×
        target = { x: (minX + maxX) / 2 - (ui.left + uw / 2) * s, y: (minY + maxY) / 2 - (24 + uh / 2) * s, w: W * s, h: H * s };
      }
      const v = graph.view, k = 0.08;
      v.x += (target.x - v.x) * k; v.y += (target.y - v.y) * k; v.w += (target.w - v.w) * k; v.h += (target.h - v.h) * k;
      graph.svg.setAttribute('viewBox', `${v.x} ${v.y} ${v.w} ${v.h}`);
      graph.scale = v.w / W;
      graph.svg.style.setProperty('--zs', graph.scale);

      /* arrows to departments beyond the frame: from the focused department to the edge of the usable area, labelled */
      const ui = graph.ui || { left: 0, right: 0, bottom: 0 }, m = 56 * graph.scale;
      const rect = { x0: v.x + ui.left * graph.scale + m, y0: v.y + m, x1: v.x + v.w - ui.right * graph.scale - m, y1: v.y + v.h - (ui.bottom || 0) * graph.scale - m };
      graph.bridges.forEach((b) => {
        const ox = b.from.x, oy = b.from.y;
        let dx = b.to.x - ox, dy = b.to.y - oy; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
        const tx = dx > 0 ? (rect.x1 - ox) / dx : dx < 0 ? (rect.x0 - ox) / dx : Infinity;
        const ty = dy > 0 ? (rect.y1 - oy) / dy : dy < 0 ? (rect.y0 - oy) / dy : Infinity;
        const tEdge = Math.max(40, Math.min(tx, ty));
        const ex = ox + dx * tEdge, ey = oy + dy * tEdge;
        b.line.setAttribute('x1', ox + dx * (b.from.r + 12)); b.line.setAttribute('y1', oy + dy * (b.from.r + 12));
        b.line.setAttribute('x2', ex); b.line.setAttribute('y2', ey);
        const hitX = tx < ty; // which edge the arrow reaches
        const anchor = hitX ? (dx > 0 ? 'end' : 'start') : 'middle';
        const lx = hitX ? ex - dx * 14 * graph.scale : ex, ly = hitX ? ey + 4 * graph.scale : ey + (dy > 0 ? -18 : 24) * graph.scale;
        b.label.setAttribute('text-anchor', anchor);
        b.label.setAttribute('transform', `translate(${lx},${ly})`);
      });

      graph.particles.forEach((p) => {
        p.x += p.vx + Math.sin(t * p.fr + p.ph) * 0.06; p.y += p.vy + Math.cos(t * p.fr * 0.8 + p.ph) * 0.06;
        if (p.x < -4) p.x = graph.W + 4; if (p.x > graph.W + 4) p.x = -4;
        if (p.y < -4) p.y = graph.H + 4; if (p.y > graph.H + 4) p.y = -4;
        p.el.setAttribute('cx', p.x); p.el.setAttribute('cy', p.y);
        p.el.setAttribute('opacity', 0.35 + 0.5 * (0.5 + 0.5 * Math.sin(t * p.fr * 1.7 + p.ph)));
      });
      const liveLinks = links.filter((l) => !l.off);
      if (Math.random() < 0.06 && graph.pulses.length < 14 && liveLinks.length) {
        const link = liveLinks[Math.floor(Math.random() * liveLinks.length)];
        const el = document.createElementNS(SVGNS, 'circle');
        el.setAttribute('r', 2.2); el.setAttribute('fill', COL.accent); el.setAttribute('filter', 'drop-shadow(0 0 4px rgba(132,238,100,0.9))');
        graph.pulseLayer.appendChild(el);
        graph.pulses.push({ el, link, p: 0, sp: 0.006 + Math.random() * 0.008, rev: Math.random() < 0.5 });
      }
      graph.pulses = graph.pulses.filter((pl) => {
        pl.p += pl.sp;
        if (pl.p >= 1 || pl.link.off) { pl.el.remove(); return false; }
        const k = pl.rev ? 1 - pl.p : pl.p;
        pl.el.setAttribute('cx', pl.link.s.x + (pl.link.t.x - pl.link.s.x) * k);
        pl.el.setAttribute('cy', pl.link.s.y + (pl.link.t.y - pl.link.s.y) * k);
        pl.el.setAttribute('opacity', Math.sin(pl.p * Math.PI) * 0.9);
        return true;
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ================================================================
     Focus window — operational IDE
     ================================================================ */
  const ZOOM_LABELS = ['Common path', 'Major variants', 'All traversals'];
  let flow = null; // live case-flow animation handle

  function renderZoomSegs() {
    $('#zoom-segs').innerHTML = ZOOM_LABELS.map((l, i) => `<button class="zoom-seg" data-z="${i + 1}"><span class="seg-dot">${i + 1}</span>${l}</button>`).join('');
    $$('#zoom-segs .zoom-seg').forEach((b) => b.addEventListener('click', () => setZoom(+b.dataset.z)));
  }

  function openWorkflow(wf) {
    if (state.open !== wf) state.connected = [];
    state.open = wf; state.zoom = 1;
    renderFocus();
    $('#focus-overlay').classList.add('active');
    setCrumbs();
    startFlow();
  }
  function closeFocus() {
    $('#focus-overlay').classList.remove('active');
    stopFlow();
    state.open = null;
    setCrumbs();
  }

  function renderFocus() {
    const wf = state.open;
    const dept = deptOf(wf);
    $('#focus-eyebrow').textContent = `${dept.name} · ${wf.code} · ${wf.start || '09:00'} typical start`;
    $('#focus-title').textContent = wf.name;
    $('#focus-chips').innerHTML = state.connected.map((id) => {
      const o = ALL_WF.find((w) => w.id === id);
      return `<span class="fchip"><b>${o.code}</b> ${o.name}<button data-un="${o.id}" aria-label="Disconnect">✕</button></span>`;
    }).join('');
    $$('#focus-chips [data-un]').forEach((b) => b.addEventListener('click', () => toggleConnect(b.dataset.un)));

    const variantPct = Math.round(wf.variants.reduce((s, v) => s + v.share, 0) * 100);
    const stamps = stampsFor(wf);
    const span = stamps[stamps.length - 1].min - stamps[0].min;
    const related = relatedTo(wf);
    $('#focus-rail').innerHTML = `
      <div class="rail-metric"><div class="rm-label">Cases</div><div class="rm-value">${fmt(wf.cases)}</div><div class="rm-sub">observed traversals</div></div>
      <div class="rail-metric"><div class="rm-label">Common path</div><div class="rm-value">${wf.steps.length}</div><div class="rm-sub">activities · ${durLabel(span)} end to end</div></div>
      <div class="rail-metric"><div class="rm-label">Exception paths</div><div class="rm-value">${wf.variants.length}</div><div class="rm-sub">${variantPct}% of cases deviate</div></div>
      <div class="rail-divider"></div>
      <div class="dp-section-label">People in the loop</div>
      <div class="rail-people">${wf.people.map((p) => { const person = personById(p); return `<div class="rail-person"><div class="face">${initials(person.name)}</div>${person.name}</div>`; }).join('')}</div>
      <div class="rail-divider"></div>
      <div class="dp-section-label">Systems touched</div>
      <div class="rail-people">${wf.tools.map((t) => `<div class="rail-person">· ${toolName(t)}</div>`).join('')}</div>
      <div class="rail-divider"></div>
      <div class="dp-section-label">Related workflows <span class="rail-hint">connect up to 2 to trace cause</span></div>
      <div class="rail-related">${related.map((r) => {
        const on = state.connected.includes(r.wf.id);
        const full = !on && state.connected.length >= 2;
        const shared = [...r.people.map(firstName), ...r.tools.map(toolName)].slice(0, 3).join(' · ');
        return `<button class="rel-item ${on ? 'on' : ''}" data-rel="${r.wf.id}" ${full ? 'disabled' : ''}>
          <span class="rel-top"><span class="rel-code">${r.wf.code}</span><span class="rel-dept">${deptOf(r.wf).name}</span></span>
          <span class="rel-name">${r.wf.name}</span>
          <span class="rel-shared">shares ${shared}</span>
          <span class="rel-action">${on ? 'Connected ✓' : 'Connect →'}</span></button>`;
      }).join('')}</div>`;
    $$('#focus-rail [data-rel]').forEach((b) => b.addEventListener('click', () => toggleConnect(b.dataset.rel)));

    buildProcessMap(wf);
    applyZoom();
  }

  function toggleConnect(id) {
    const i = state.connected.indexOf(id);
    if (i >= 0) state.connected.splice(i, 1);
    else if (state.connected.length < 2) state.connected.push(id);
    renderFocus();
    startFlow();
  }

  function setZoom(z) { state.zoom = Math.max(1, Math.min(3, z)); applyZoom(); }
  function applyZoom() {
    const z = state.zoom;
    $$('#zoom-segs .zoom-seg').forEach((b) => { const bz = +b.dataset.z; b.classList.toggle('active', bz === z); b.classList.toggle('done', bz < z); });
    $('#zoom-out').disabled = z === 1; $('#zoom-in').disabled = z === 3;
    const stage = $('#process-stage');
    stage.style.transform = `scale(${0.86 + z * 0.07})`;
    $$('.zl', stage).forEach((el) => el.classList.toggle('zoom-hidden', +el.dataset.zl > z));
    closeDetail();
  }

  /* ---- process map ---- */
  const GEO = { ROW: 128, CW: 270, CH: 62, CX: 500, TOP: 96, BOT: 280, LANE_W: 300, LANE_CW: 224, LANE_CH: 46 };
  const yOf = (i) => GEO.TOP + 40 + i * GEO.ROW;

  function buildProcessMap(wf) {
    const { ROW, CW, CH, CX, TOP, BOT } = GEO;
    const n = wf.steps.length;
    const connected = state.connected.map((id) => ALL_WF.find((w) => w.id === id));
    const laneRows = Math.max(n, ...connected.map((c) => Math.ceil(c.steps.length * 0.72)));
    const H = TOP + laneRows * ROW + BOT;
    const W = 960 + connected.length * GEO.LANE_W + (connected.length ? 40 : 0);
    const stamps = stampsFor(wf);
    const stepIdx = {}; wf.steps.forEach((s, i) => (stepIdx[s.id] = i));
    const connectedPeople = new Set(connected.flatMap((c) => c.steps.map((s) => s.owner)));

    const mk = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="${cls}"/></marker>`;
    let out = `<svg id="pmap" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${
      mk('arr-spine', 'p-arrow-spine') + mk('arr-variant', 'p-arrow-variant') + mk('arr-rework', 'p-arrow-rework') + mk('arr-skip', 'p-arrow-skip') + mk('arr-infl', 'p-arrow-infl')}</defs>`;

    const spineShare = 1 - wf.variants.reduce((s, v) => s + v.share, 0);
    const spineCases = Math.round(wf.cases * spineShare);
    const strokeFor = (share) => 1.6 + share * 6;

    out += `<g class="p-terminal"><circle cx="${CX}" cy="${TOP - 26}" r="14"/><text x="${CX}" y="${TOP - 22}" text-anchor="middle">▶</text>
      <text x="${CX + 24}" y="${TOP - 22}" class="p-term-label">Start · # ${fmt(wf.cases)} · ${stampText(stamps[0])}</text></g>`;
    const endY = yOf(n - 1) + CH / 2 + 58;
    out += `<g class="p-terminal"><circle cx="${CX}" cy="${endY}" r="14"/><text x="${CX}" y="${endY + 4}" text-anchor="middle">■</text>
      <text x="${CX + 24}" y="${endY + 4}" class="p-term-label">End · # ${fmt(wf.cases)} · ${stampText(stamps[n - 1])}</text></g>`;
    const bw = 360, bh = 58, bx = CX - bw / 2, by = endY + 32;
    out += `<g class="p-done"><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4"/>
      <circle class="d-check" cx="${bx + 30}" cy="${by + bh / 2}" r="11"/>
      <path d="M ${bx + 25} ${by + bh / 2} l 3.5 3.5 l 7 -7" fill="none" stroke="#0a1406" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <text class="d-title" x="${bx + 52}" y="${by + 24}">All ${fmt(wf.cases)} cases reach completion</text>
      <text class="d-sub" x="${bx + 52}" y="${by + 42}">${durLabel(stamps[n - 1].min - stamps[0].min)} common path · ${wf.variants.length + 1} distinct paths · owned by ${firstName(wf.steps[n - 1].owner)}</text></g>`;
    out += edge(CX, TOP - 12, CX, yOf(0) - CH / 2, 'spine', strokeFor(1), 'arr-spine', spineShare);
    out += edge(CX, yOf(n - 1) + CH / 2, CX, endY - 14, 'spine', strokeFor(1), 'arr-spine', spineShare);

    for (let i = 0; i < n - 1; i++) {
      const y1 = yOf(i) + CH / 2, y2 = yOf(i + 1) - CH / 2;
      out += edge(CX, y1, CX, y2, 'spine', strokeFor(spineShare), 'arr-spine', spineShare);
      const next = wf.steps[i + 1];
      if (next.dur) {
        const hot = parseDur(next.dur) >= 60 && connectedPeople.has(next.owner);
        out += durPill(CX + 22, (y1 + y2) / 2, next.dur, hot);
        if (hot) {
          const carrier = connected.find((c) => c.steps.some((s) => s.owner === next.owner));
          out += `<text class="p-cause" x="${CX + 22}" y="${(y1 + y2) / 2 + 26}">⚠ ${firstName(next.owner)} also carries ${carrier.code} — probable wait driver</text>`;
        }
      }
    }

    let sideL = 0, sideR = 0;
    wf.variants.forEach((v, vi) => {
      const zl = v.share >= 0.08 ? 2 : 3;
      const casesN = Math.round(wf.cases * v.share);
      const sw = strokeFor(v.share);
      if (v.type === 'rework') {
        const y1 = yOf(stepIdx[v.from]), y2 = yOf(stepIdx[v.to]);
        const depth = 150 + (sideL++ % 3) * 46, x0 = CX - CW / 2;
        out += `<g class="zl" data-zl="${zl === 2 && vi < 2 ? 3 : zl}">
          ${pathEdge(`M ${x0} ${y1} C ${x0 - depth} ${y1}, ${x0 - depth} ${y2}, ${x0} ${y2}`, 'rework', Math.max(2, sw * 0.8), 'arr-rework', v.share)}
          <text class="p-variant-tag" x="${x0 - depth + 8}" y="${(y1 + y2) / 2 - 6}">↺ ${v.label}</text>
          <text class="p-variant-tag" x="${x0 - depth + 8}" y="${(y1 + y2) / 2 + 8}"># ${fmt(casesN)} cases</text></g>`;
      }
      if (v.type === 'skip') {
        const y1 = yOf(stepIdx[v.from]), y2 = yOf(stepIdx[v.to]);
        const depth = 165 + (sideR++ % 3) * 46, x0 = CX + CW / 2;
        out += `<g class="zl" data-zl="${zl}">
          ${pathEdge(`M ${x0} ${y1} C ${x0 + depth} ${y1}, ${x0 + depth} ${y2}, ${x0} ${y2}`, 'skip', Math.max(1.6, sw * 0.7), 'arr-skip', v.share)}
          <text class="p-variant-tag" x="${x0 + depth - 8}" y="${(y1 + y2) / 2 - 6}" text-anchor="end">⤳ ${v.label}</text>
          <text class="p-variant-tag" x="${x0 + depth - 8}" y="${(y1 + y2) / 2 + 8}" text-anchor="end"># ${fmt(casesN)} cases</text></g>`;
      }
      if (v.type === 'detour') {
        const ai = stepIdx[v.after], ri = v.rejoin ? stepIdx[v.rejoin] : null;
        const side = vi % 2 === 0 ? 1 : -1, dx = CX + side * 320;
        const yMid = ri != null ? (yOf(ai) + yOf(ri)) / 2 : yOf(ai) + ROW * 0.75;
        const st = v.steps[0];
        out += `<g class="zl" data-zl="${zl}">`;
        out += pathEdge(`M ${CX + side * CW / 2} ${yOf(ai)} C ${dx - side * 40} ${yOf(ai)}, ${dx} ${yMid - 70}, ${dx} ${yMid - CH / 2}`, 'variant', Math.max(2, sw * 0.8), 'arr-variant', v.share);
        if (ri != null) out += pathEdge(`M ${dx} ${yMid + CH / 2} C ${dx} ${yMid + 70}, ${dx - side * 40} ${yOf(ri)}, ${CX + side * CW / 2} ${yOf(ri)}`, 'variant', Math.max(2, sw * 0.8), 'arr-variant', v.share);
        out += nodeCard(dx, yMid, CW - 30, CH - 6, st, casesN, { extra: true, wf: wf.id, step: `x:${vi}`, stamp: '' });
        out += `<text class="p-variant-tag" x="${dx}" y="${yMid - CH / 2 - 10}" text-anchor="middle">${v.label} · # ${fmt(casesN)}</text></g>`;
      }
    });

    /* connected lanes — related workflows alongside, with influence edges into the spine */
    connected.forEach((c, k) => {
      const lx = 960 + 40 + k * GEO.LANE_W + GEO.LANE_CW / 2;
      const cd = deptOf(c);
      out += `<g class="p-lane">
        <line x1="${lx}" y1="${TOP - 30}" x2="${lx}" y2="${TOP + Math.ceil(c.steps.length * 0.72) * ROW}" class="lane-axis"/>
        <text class="lane-eyebrow" x="${lx}" y="${TOP - 44}" text-anchor="middle">${cd.name} · connected</text>
        <text class="lane-title" x="${lx}" y="${TOP - 28}" text-anchor="middle">${c.code} · ${c.name}</text>`;
      const cStamps = stampsFor(c);
      const used = new Set();
      c.steps.forEach((s, j) => {
        const cy = TOP + 40 + j * ROW * 0.72;
        out += nodeCard(lx, cy, GEO.LANE_CW, GEO.LANE_CH, s, Math.round(c.cases * (1 - j * 0.03)), { lane: true, wf: c.id, step: j, stamp: stampText(cStamps[j]) });
        // influence edge: same owner → the main-path step at the closest relative position
        const targets = wf.steps.map((ms, i) => ({ i, ms })).filter(({ ms }) => ms.owner === s.owner);
        if (targets.length) {
          const ratio = j / Math.max(1, c.steps.length - 1);
          const best = targets.reduce((a, b) => Math.abs(b.i / (n - 1) - ratio) < Math.abs(a.i / (n - 1) - ratio) ? b : a);
          if (!used.has(best.i + ':' + s.owner) || targets.length === 1) {
            used.add(best.i + ':' + s.owner);
            const x1 = lx - GEO.LANE_CW / 2, x2 = CX + CW / 2, y2 = yOf(best.i);
            out += pathEdge(`M ${x1} ${cy} C ${x1 - 120} ${cy}, ${x2 + 120} ${y2}, ${x2} ${y2}`, 'influence', 1.4, 'arr-infl', 0.05);
            const tt = 0.3 + (used.size % 3) * 0.18; // stagger labels so converging edges don't stack
            out += `<text class="p-infl-tag" x="${x2 + (x1 - x2) * tt}" y="${y2 + (cy - y2) * tt - 7}" text-anchor="middle">${firstName(s.owner)} · shared capacity</text>`;
          }
        }
      });
      out += '</g>';
    });

    /* spine nodes on top */
    wf.steps.forEach((s, i) => {
      const stepCases = spineCases + Math.round(wf.cases * 0.28 * Math.max(0, 1 - i * 0.06));
      out += nodeCard(CX, yOf(i), CW, CH, s, Math.min(wf.cases, stepCases), { wf: wf.id, step: i, stamp: stampText(stamps[i]) });
    });
    out += '<g id="p-flow"></g></svg>';

    const stage = $('#process-stage');
    stage.innerHTML = out;
    stage.style.width = W + 'px';
    $('#process-scroll').scrollTop = 0;

    $$('#pmap .p-node').forEach((nd) => nd.addEventListener('click', (e) => {
      e.stopPropagation();
      $$('#pmap .p-node').forEach((m) => m.classList.remove('selected'));
      nd.classList.add('selected');
      openDetail(nd.dataset);
    }));
  }

  const edge = (x1, y1, x2, y2, cls, sw, marker, share) =>
    `<line class="p-edge ${cls}" data-share="${share}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${sw}" marker-end="url(#${marker})"/>`;
  const pathEdge = (d, cls, sw, marker, share) =>
    `<path class="p-edge ${cls}" data-share="${share}" d="${d}" stroke-width="${sw}" marker-end="url(#${marker})"/>`;
  function durPill(x, y, dur, hot) {
    const w = 14 + dur.length * 6.4;
    return `<g class="p-durpill ${hot ? 'hot' : ''}"><rect x="${x}" y="${y - 11}" width="${w + 18}" height="22" rx="3"/>
      <circle class="clock" cx="${x + 12}" cy="${y}" r="5"/><path class="clock" d="M ${x + 12} ${y - 3} L ${x + 12} ${y} L ${x + 14.5} ${y + 1}"/>
      <text x="${x + 22}" y="${y + 3.5}">${dur}</text></g>`;
  }
  function nodeCard(cx, cy, w, h, step, cases, o) {
    const x = cx - w / 2, y = cy - h / 2;
    const cls = ['p-node', o.extra ? 'extra' : '', o.lane ? 'lane' : ''].join(' ');
    const small = o.lane;
    return `<g class="${cls}" data-wf="${o.wf}" data-step="${o.step}" data-cases="${cases}">
      <rect class="card" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>
      <circle class="n-dot" cx="${x + 16}" cy="${small ? cy - 5 : cy - 8}" r="${small ? 3.5 : 5}"/>
      <text class="n-label" x="${x + 28}" y="${small ? cy - 1 : cy - 4}">${esc(step.label)}</text>
      ${o.stamp && !small ? `<text class="n-time" x="${x + w - 10}" y="${cy - 4}" text-anchor="end">${o.stamp}</text>` : ''}
      ${small
        ? `<text class="n-owner" x="${x + 28}" y="${cy + 13}">${firstName(step.owner)} · ${esc(toolName(step.tool))}</text>
           ${o.stamp ? `<text class="n-time" x="${x + w - 10}" y="${cy + 13}" text-anchor="end">${o.stamp}</text>` : ''}`
        : `<text class="n-freq" x="${x + 28}" y="${cy + 14}"># ${fmt(cases)}</text>
           <text class="n-owner" x="${x + w - 10}" y="${cy + 14}" text-anchor="end">${firstName(step.owner)} · ${esc(toolName(step.tool))}</text>`}
    </g>`;
  }

  /* ---- live case flow: pulses travel the common path and exception paths, weighted by share ---- */
  function startFlow() {
    stopFlow();
    if (!state.live) return;
    const svg = $('#pmap'); if (!svg) return;
    const layer = svg.querySelector('#p-flow');
    const edges = [...svg.querySelectorAll('.p-edge')].filter((e) => !e.classList.contains('influence')).map((e) => ({
      el: e, len: e.getTotalLength(), share: +e.dataset.share || 0.05,
      cls: [...e.classList].find((c) => ['spine', 'variant', 'rework', 'skip'].includes(c)),
      zl: e.closest('.zl'),
    }));
    const pulses = [];
    const counter = $('#live-count');
    let last = performance.now(), acc = 0;
    function frame(now) {
      if (!$('#focus-overlay').classList.contains('active')) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      acc += dt;
      if (acc > 0.16 && pulses.length < 26) {
        acc = 0;
        const visible = edges.filter((e) => !e.zl || !e.zl.classList.contains('zoom-hidden'));
        const total = visible.reduce((s, e) => s + e.share, 0);
        let r = Math.random() * total;
        const pick = visible.find((e) => (r -= e.share) <= 0) || visible[0];
        if (pick) {
          const c = document.createElementNS(SVGNS, 'circle');
          c.setAttribute('class', 'p-pulse ' + pick.cls); c.setAttribute('r', pick.cls === 'spine' ? 3.2 : 2.6);
          layer.appendChild(c);
          pulses.push({ el: c, e: pick, p: 0, sp: (pick.cls === 'spine' ? 150 : 110) / Math.max(pick.len, 40) });
        }
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pl = pulses[i];
        pl.p += pl.sp * dt;
        const hidden = pl.e.zl && pl.e.zl.classList.contains('zoom-hidden');
        if (pl.p >= 1 || hidden || !pl.e.el.isConnected) { pl.el.remove(); pulses.splice(i, 1); continue; }
        const pt = pl.e.el.getPointAtLength(pl.p * pl.e.len);
        pl.el.setAttribute('cx', pt.x); pl.el.setAttribute('cy', pt.y);
        pl.el.setAttribute('opacity', 0.35 + 0.65 * Math.sin(pl.p * Math.PI));
      }
      if (counter) counter.textContent = pulses.length;
      flow = requestAnimationFrame(frame);
    }
    flow = requestAnimationFrame(frame);
  }
  function stopFlow() {
    if (flow) cancelAnimationFrame(flow);
    flow = null;
    $('#pmap #p-flow')?.replaceChildren();
  }
  function toggleLive() {
    state.live = !state.live;
    $('#live-toggle').classList.toggle('paused', !state.live);
    $('#live-toggle .lt-label').textContent = state.live ? 'Live' : 'Paused';
    state.live ? startFlow() : stopFlow();
  }

  /* ---- inspector: summary · observed frame · data points ---- */
  function openDetail(ds) {
    const wf = ALL_WF.find((w) => w.id === ds.wf);
    const main = state.open;
    let step, stamp = null, idx = null, extra = false;
    if (String(ds.step).startsWith('x:')) { extra = true; step = main.variants[+ds.step.slice(2)].steps[0]; }
    else { idx = +ds.step; step = wf.steps[idx]; stamp = stampsFor(wf)[idx]; }
    const cases = +ds.cases;
    const pct = Math.min(100, Math.round((cases / wf.cases) * 100));
    const person = personById(step.owner);
    const handoffIn = idx ? step.dur : (idx === 0 ? 'trigger' : null);
    const next = idx != null ? wf.steps[idx + 1] : null;
    const dwell = next?.dur ? durLabel(Math.max(1, Math.round(parseDur(next.dur) * 0.45))) : '—';
    const touching = idx != null ? wf.variants.filter((v) => [v.from, v.to, v.after, v.rejoin].includes(step.id)).length : 1;
    const carriers = relatedTo(wf).filter((r) => r.people.includes(step.owner)).slice(0, 3);
    const isLane = wf !== main;

    const r = 13, circ = 2 * Math.PI * r;
    const ring = `<svg class="dp-ring" viewBox="0 0 34 34"><circle cx="17" cy="17" r="${r}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="4"/>
      <circle cx="17" cy="17" r="${r}" fill="none" stroke="${COL.accent}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${(pct / 100) * circ} ${circ}" transform="rotate(-90 17 17)"/></svg>`;
    const frameTime = stamp ? `${stamp.time}:${String(7 + (cases % 50)).padStart(2, '0')}` : '—';
    const panel = $('#detail-panel');
    panel.innerHTML = `
      <div class="dp-head">
        <div class="dp-title"><span class="dp-ico">${extra ? '◇' : '⬡'}</span>${esc(step.label)}</div>
        <button class="dp-close" id="dp-close" aria-label="Close">✕</button>
      </div>
      <div class="dp-meta">${isLane ? `<span class="dp-lane">${wf.code} · connected</span>` : ''}${extra ? '<span class="dp-lane">exception path</span>' : ''}
        ${person?.name || step.owner} · ${esc(toolName(step.tool))}${stamp ? ` · <b>${stampText(stamp)}</b>` : ''}</div>
      <p class="dp-summary">${esc(step.summary || 'Observed activity on the common path.')}</p>

      <div class="dp-section-label">Observed frame <span class="rail-hint">content redacted at capture</span></div>
      <div class="ev-frame">
        <div class="ev-bar"><span class="ev-dots"><i></i><i></i><i></i></span><span class="ev-app">${esc(toolName(step.tool))}</span><span class="ev-time">${frameTime}</span></div>
        <div class="ev-body ${step.tool}">
          <div class="ev-side"><i></i><i></i><i></i><i></i><i></i></div>
          <div class="ev-main"><i class="w80"></i><i class="w55"></i><i class="w70"></i><i class="w40 hl"></i><i class="w60"></i><i class="w30"></i></div>
        </div>
        <div class="ev-tag">frame 1 of ${Math.max(1, Math.round(cases * 1.6))}</div>
      </div>

      <div class="dp-section-label">Data points</div>
      <div class="dp-grid">
        <div class="dp-stat">${ring}<div><div class="big">${pct}% of cases</div><div class="small"># ${fmt(cases)} of ${fmt(wf.cases)}</div></div></div>
        <div class="dp-kv"><span>Handoff in</span><b>${handoffIn === 'trigger' ? 'Trigger' : handoffIn || '—'}</b></div>
        <div class="dp-kv"><span>Typical dwell</span><b>${dwell}</b></div>
        <div class="dp-kv"><span>Time of day</span><b>${stamp ? stamp.time : '—'}</b></div>
        <div class="dp-kv"><span>Exception paths touching</span><b>${touching}</b></div>
        <div class="dp-kv"><span>Sessions observed</span><b>${fmt(cases)}</b></div>
      </div>
      ${carriers.length ? `<div class="dp-section-label">Also carried by ${firstName(step.owner)}</div>
      <div class="dp-carriers">${carriers.map((c) => `<button class="dp-carrier ${state.connected.includes(c.wf.id) ? 'on' : ''}" data-rel="${c.wf.id}">
        <b>${c.wf.code}</b> ${c.wf.name}<span>${deptOf(c.wf).name} · # ${fmt(c.wf.cases)}</span></button>`).join('')}</div>` : ''}
      <div class="dp-section-label">Filter cases</div>
      <div class="dp-filters">
        <button class="dp-filter primary"><span>with this activity</span><span class="cnt"># ${fmt(cases)} (${pct}%)</span></button>
        <button class="dp-filter"><span>without this activity</span><span class="cnt"># ${fmt(wf.cases - cases)} (${100 - pct}%)</span></button>
        <button class="dp-filter"><span>ending at this activity</span><span class="cnt"># ${fmt(Math.round(cases * 0.02))} (${Math.max(0, Math.round(pct * 0.02))}%)</span></button>
      </div>`;
    panel.classList.add('open');
    $('#dp-close').addEventListener('click', closeDetail);
    $$('#detail-panel [data-rel]').forEach((b) => b.addEventListener('click', () => { if (!isLane) toggleConnect(b.dataset.rel); }));
  }
  function closeDetail() {
    $('#detail-panel').classList.remove('open');
    $$('#pmap .p-node').forEach((m) => m.classList.remove('selected'));
  }

  /* ================================================================
     Boot
     ================================================================ */
  $('#view-graph').classList.add('active');
  initGraph();
  renderSidebar();
  renderZoomSegs();
  setCrumbs();
  $('#zoom-in').addEventListener('click', () => setZoom(state.zoom + 1));
  $('#zoom-out').addEventListener('click', () => setZoom(state.zoom - 1));
  $('#focus-close').addEventListener('click', closeFocus);
  $('#live-toggle').addEventListener('click', toggleLive);
  $('#focus-overlay').addEventListener('click', (e) => { if (e.target === $('#focus-overlay')) closeFocus(); });
  $('#process-scroll').addEventListener('click', closeDetail);
  window.addEventListener('keydown', (e) => {
    if (!root.classList.contains('active')) return;
    if (e.key === 'Escape') {
      if (state.open) closeFocus();
      else if (state.wf) selectWf(null);
      else if (state.dept) clearFocus();
    }
    if (state.open && (e.key === '+' || e.key === '=')) setZoom(state.zoom + 1);
    if (state.open && e.key === '-') setZoom(state.zoom - 1);
  });

  return { focusDept, selectWf, openWorkflow, clearFocus };
}
