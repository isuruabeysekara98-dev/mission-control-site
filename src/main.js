/* Mission Control — interaction layer */
import { initBrain } from './brain.js';
import { initAtlas } from './atlas.js';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- views: Platform / Try it out open from the nav ---------------- */
const VIEW_IDS = ['platform', 'try', 'about'];
let atlasReady = false;
function route() {
  const id = location.hash.slice(1);
  const isView = VIEW_IDS.includes(id);
  const wasView = Boolean(document.body.dataset.view);
  document.querySelectorAll('.view').forEach((v) => v.classList.toggle('active', v.id === id));
  if (isView) document.body.dataset.view = id; else delete document.body.dataset.view;
  document.querySelectorAll('.nav-links a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  if (isView) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (id === 'try' && !atlasReady) { atlasReady = true; initAtlas(document.getElementById('try')); }
  } else if (id && wasView) {
    // main was hidden when the hash changed, so the browser could not scroll to it
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }));
  }
}
window.addEventListener('hashchange', route);
route();

const C = {
  bg: '#000000',
  bg1: '#141614',
  border: 'rgba(255,255,255,0.09)',
  borderStrong: 'rgba(255,255,255,0.16)',
  hi: '#f4f5f3',
  mid: '#c8ccc7',
  lo: '#8a9088',
  accent: '#84ee64',
  accentDim: 'rgba(132,238,100,0.14)',
  violet: '#8b5cf6',
  amber: '#f0a44a',
};

/* ---------------- scroll reveal ---------------- */
const revealIO = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('visible'); revealIO.unobserve(e.target); }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealIO.observe(el));

/* ---------------- canvas helper ---------------- */
function prepCanvas(canvas) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const ctx = canvas.getContext('2d');
  const fit = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  fit();
  new ResizeObserver(fit).observe(canvas);
  return ctx;
}

/* run a draw loop only while canvas is on screen */
function driveCanvas(canvas, draw) {
  const ctx = prepCanvas(canvas);
  let running = false, raf = 0;
  const t0 = performance.now();
  const loop = (now) => {
    draw(ctx, canvas.clientWidth, canvas.clientHeight, (now - t0) / 1000);
    if (running) raf = requestAnimationFrame(loop);
  };
  if (REDUCED) {
    // draw a single settled frame
    requestAnimationFrame(() => draw(ctx, canvas.clientWidth, canvas.clientHeight, 60));
    return;
  }
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(loop); }
    else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
  }, { threshold: 0.05 }).observe(canvas);
}

/* small drawing utils */
function bracket(ctx, x, y, w, h, size, color, alpha = 1) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 1.5;
  const s = size;
  ctx.beginPath();
  ctx.moveTo(x, y + s); ctx.lineTo(x, y); ctx.lineTo(x + s, y);
  ctx.moveTo(x + w - s, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + s);
  ctx.moveTo(x + w, y + h - s); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w - s, y + h);
  ctx.moveTo(x + s, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + h - s);
  ctx.stroke();
  ctx.restore();
}
function label(ctx, text, x, y, color = C.lo, size = 10, align = 'left') {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${size}px Inter, sans-serif`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
  ctx.restore();
}
const ease = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

/* ================================================================
   VILLAIN — app-hop animation + drift ticker
   ================================================================ */
(function villainHop() {
  const svg = document.querySelector('.v-hop');
  if (!svg) return;
  const toolsG = svg.querySelector('#hop-tools');
  const trailsG = svg.querySelector('#hop-trails');
  const dot = svg.querySelector('#hop-dot');
  const tools = [
    { n: 'Outlook', x: 40, y: 34 }, { n: 'Clio', x: 130, y: 18 }, { n: 'Teams', x: 218, y: 40 },
    { n: 'Calls', x: 46, y: 100 }, { n: 'Word', x: 132, y: 112 }, { n: 'Docs', x: 220, y: 96 },
  ];
  const NS = 'http://www.w3.org/2000/svg';
  for (const t of tools) {
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('class', 'tool');
    r.setAttribute('x', t.x - 26); r.setAttribute('y', t.y - 12);
    r.setAttribute('width', 52); r.setAttribute('height', 24);
    toolsG.appendChild(r);
    const tx = document.createElementNS(NS, 'text');
    tx.setAttribute('class', 'tool-label');
    tx.setAttribute('x', t.x); tx.setAttribute('y', t.y + 3);
    tx.setAttribute('text-anchor', 'middle');
    tx.textContent = t.n;
    toolsG.appendChild(tx);
  }
  const seq = [0, 1, 0, 2, 3, 4, 0, 5, 1, 0]; // outlook-heavy jump map
  if (REDUCED) return;
  let i = 0, from = tools[seq[0]], to = tools[seq[1]], start = performance.now();
  const HOP = 700;
  const trails = [];
  function frame(now) {
    let p = (now - start) / HOP;
    if (p >= 1) {
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('class', 'trail');
      line.setAttribute('x1', from.x); line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x); line.setAttribute('y2', to.y);
      line.setAttribute('stroke-width', '1');
      trailsG.appendChild(line);
      trails.push(line);
      if (trails.length > 4) trails.shift().remove();
      trails.forEach((l, k) => l.setAttribute('opacity', String(0.08 + 0.06 * k)));
      i = (i + 1) % (seq.length - 1);
      from = tools[seq[i]]; to = tools[seq[i + 1]];
      start = now; p = 0;
    }
    const e = ease(p);
    dot.setAttribute('cx', from.x + (to.x - from.x) * e);
    dot.setAttribute('cy', from.y + (to.y - from.y) * e);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

(function driftTicker() {
  const el = document.getElementById('drift-days');
  if (!el) return;
  if (REDUCED) { el.textContent = '247'; return; }
  let d = 0;
  setInterval(() => { d = d >= 247 ? 0 : d + 1; el.textContent = String(d); }, 90);
})();

/* ================================================================
   HOW — stepper + shared canvas scene
   ================================================================ */
(function how() {
  const canvas = document.getElementById('how-canvas');
  if (!canvas) return;
  const tabs = [...document.querySelectorAll('.step-tab')];
  const copies = [...document.querySelectorAll('[data-stage-copy]')];
  const STAGE_DUR = 7000;
  let stage = 0, stageStart = performance.now(), paused = false;

  function setStage(s, resetTimer = true) {
    stage = s;
    if (resetTimer) stageStart = performance.now();
    tabs.forEach((t, i) => {
      t.classList.toggle('active', i === s);
      t.setAttribute('aria-selected', String(i === s));
      if (i < s) t.querySelector('.step-timer i').style.width = '100%';
      if (i > s) t.querySelector('.step-timer i').style.width = '0%';
    });
    copies.forEach((c, i) => { c.hidden = i !== s; });
  }
  tabs.forEach((t) => t.addEventListener('click', () => setStage(+t.dataset.stage)));
  const region = document.querySelector('#how .stage-view');
  region.addEventListener('mouseenter', () => (paused = true));
  region.addEventListener('mouseleave', () => (paused = false));

  /* shared graph layout for map/analyze */
  const GN = [
    [0.12, 0.5], [0.28, 0.32], [0.28, 0.68], [0.45, 0.5], [0.45, 0.18],
    [0.6, 0.34], [0.6, 0.66], [0.62, 0.86], [0.76, 0.5], [0.78, 0.2], [0.9, 0.5],
  ];
  const GE = [[0,1],[0,2],[1,3],[2,3],[1,4],[3,5],[3,6],[6,7],[5,8],[6,8],[5,9],[8,10]];
  const PATH = [0, 1, 3, 5, 8, 10];
  const OFFPATH = [[1,4],[3,6],[6,7],[5,9]];

  const workPanels = [
    { x: 0.04, y: 0.08, w: 0.4, h: 0.84, name: 'intake email · 2m' },
    { x: 0.5, y: 0.08, w: 0.46, h: 0.4, name: 'matter opened' },
    { x: 0.5, y: 0.56, w: 0.46, h: 0.36, name: 'draft v3' },
  ];

  function nodePos(i, W, H, pad = 34) {
    return [pad + GN[i][0] * (W - pad * 2), pad + GN[i][1] * (H - pad * 2)];
  }

  function drawScan(ctx, W, H, p, t) {
    // dimmed workspace panels
    for (const pl of workPanels) {
      const x = pl.x * W, y = pl.y * H, w = pl.w * W, h = pl.h * H;
      ctx.fillStyle = C.bg1;
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = C.border;
      ctx.strokeRect(x, y, w, h);
      // fake content lines
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      for (let li = 0; li < Math.floor(h / 22) - 1; li++) {
        ctx.fillRect(x + 12, y + 14 + li * 22, w * (0.5 + ((li * 37) % 40) / 100), 6);
      }
    }
    // brackets snap on sequentially
    workPanels.forEach((pl, i) => {
      const appear = ease(p * 3.2 - i * 0.9);
      if (appear <= 0) return;
      const x = pl.x * W, y = pl.y * H, w = pl.w * W, h = pl.h * H;
      const inset = (1 - appear) * 12;
      bracket(ctx, x - 6 + inset, y - 6 + inset, w + 12 - inset * 2, h + 12 - inset * 2, 12, C.accent, appear);
      if (appear > 0.9) label(ctx, pl.name, x + 2, y - 12, C.accent, 10);
    });
    // scan beam
    const bx = ((t * 0.14) % 1.3 - 0.15) * W;
    const grad = ctx.createLinearGradient(bx - 50, 0, bx + 50, 0);
    grad.addColorStop(0, 'rgba(132,238,100,0)');
    grad.addColorStop(0.45, 'rgba(132,238,100,0.06)');
    grad.addColorStop(0.55, 'rgba(139,92,246,0.08)');
    grad.addColorStop(1, 'rgba(132,238,100,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(bx - 50, 0, 100, H);
  }

  const NODE_LABELS = { 1: 'intake', 3: 'conflict check', 5: 'drafting', 8: 'review', 10: 'filed' };

  function drawGraph(ctx, W, H, p, t, analyze) {
    const wob = (i, s = 3) => Math.sin(t * 0.8 + i * 2.1) * s;
    // edges
    GE.forEach(([a, b], i) => {
      const ap = ease(p * 4 - i * 0.14);
      if (ap <= 0) return;
      const [ax, ay] = nodePos(a, W, H), [bx, by] = nodePos(b, W, H);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.globalAlpha = ap * 0.9;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ax + wob(a), ay + wob(a + 5));
      ctx.lineTo(ax + (bx - ax) * ap + wob(b), ay + (by - ay) * ap + wob(b + 5));
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
    // analyze overlays
    if (analyze) {
      // common path river
      ctx.strokeStyle = C.accent;
      ctx.lineWidth = 2;
      ctx.setLineDash([7, 6]);
      ctx.lineDashOffset = -t * 26;
      ctx.beginPath();
      PATH.forEach((n, i) => {
        const [x, y] = nodePos(n, W, H);
        i ? ctx.lineTo(x + wob(n), y + wob(n + 5)) : ctx.moveTo(x + wob(n), y + wob(n + 5));
      });
      ctx.stroke();
      ctx.setLineDash([]);
      // deviation branches (amber)
      OFFPATH.forEach(([a, b], i) => {
        const flick = 0.35 + 0.3 * Math.sin(t * 2.2 + i * 1.7);
        const [ax, ay] = nodePos(a, W, H), [bx, by] = nodePos(b, W, H);
        ctx.strokeStyle = C.amber;
        ctx.globalAlpha = Math.max(0.12, flick) * ease(p * 2 - 0.5);
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
        ctx.globalAlpha = 1;
      });
      // fork stats
      const forkAlpha = ease(p * 2 - 0.8);
      if (forkAlpha > 0) {
        ctx.globalAlpha = forkAlpha;
        const [fx, fy] = nodePos(3, W, H);
        label(ctx, '87% follow · 13% deviate', fx + 12, fy - 14, C.mid, 10.5);
        const [f2x, f2y] = nodePos(5, W, H);
        label(ctx, '92% · 8%', f2x + 12, f2y - 12, C.mid, 10.5);
        ctx.globalAlpha = 1;
      }
      // predicted deviation: ghosted dashed branch off node 8
      const gp = ease(p * 2 - 1.1);
      if (gp > 0) {
        const [ax, ay] = nodePos(8, W, H);
        const gx = ax + 46, gy = ay + 52;
        const pulse = 0.35 + 0.25 * Math.sin(t * 3);
        ctx.strokeStyle = C.amber;
        ctx.setLineDash([3, 5]);
        ctx.globalAlpha = gp * pulse;
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(gx, gy); ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = gp;
        bracket(ctx, gx - 12, gy - 12, 24, 24, 6, C.amber, gp * (0.5 + pulse));
        label(ctx, 'predicted', gx + 18, gy + 4, C.amber, 10);
        ctx.globalAlpha = 1;
      }
    }
    // nodes
    GN.forEach((_, i) => {
      const ap = ease(p * 4.2 - i * 0.11);
      if (ap <= 0) return;
      const [x, y] = nodePos(i, W, H);
      const onPath = analyze && PATH.includes(i);
      ctx.fillStyle = onPath ? C.accent : C.mid;
      ctx.globalAlpha = ap;
      ctx.beginPath();
      ctx.arc(x + wob(i), y + wob(i + 5), onPath ? 5.5 : 4, 0, Math.PI * 2);
      ctx.fill();
      // node halo
      ctx.globalAlpha = ap * 0.25;
      ctx.beginPath();
      ctx.arc(x + wob(i), y + wob(i + 5), onPath ? 11 : 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      // workflow labels appear in map stage
      if (!analyze && ap >= 1 && NODE_LABELS[i]) {
        ctx.globalAlpha = Math.min((p - 0.35) * 3, 1);
        if (ctx.globalAlpha > 0) label(ctx, NODE_LABELS[i], x + wob(i) + 10, y + wob(i + 5) - 10, C.lo, 10.5);
        ctx.globalAlpha = 1;
      }
    });
    // live ripple (map stage)
    if (!analyze && p > 0.5) {
      const rp = ((t * 0.55) % 1);
      const [x, y] = nodePos(3, W, H);
      ctx.strokeStyle = C.accent;
      ctx.globalAlpha = (1 - rp) * 0.5;
      ctx.beginPath(); ctx.arc(x, y, 6 + rp * 30, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  const ctx = prepCanvas(canvas);
  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 }).observe(canvas);

  function frame(now) {
    if (visible) {
      const W = canvas.clientWidth, H = canvas.clientHeight;
      const elapsed = now - stageStart;
      let p = Math.min(elapsed / STAGE_DUR, 1);
      if (REDUCED) p = 1;
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);
      if (stage === 0) drawScan(ctx, W, H, p, t);
      else if (stage === 1) drawGraph(ctx, W, H, p, t, false);
      else drawGraph(ctx, W, H, p, t, true);
      // timer bar
      if (!REDUCED) {
        tabs[stage].querySelector('.step-timer i').style.width = `${p * 100}%`;
        if (p >= 1 && !paused) setStage((stage + 1) % 3);
        else if (paused && p >= 1) stageStart = now - STAGE_DUR; // hold at end
      }
    }
    requestAnimationFrame(frame);
  }
  setStage(0);
  if (REDUCED) {
    setStage(2);
    tabs.forEach((t) => (t.querySelector('.step-timer i').style.width = '100%'));
    requestAnimationFrame((n) => frame(n));
  } else {
    requestAnimationFrame(frame);
  }
})();

/* ================================================================
   PLATFORM — scan / map / analyze canvases
   ================================================================ */

/* org chart geometry shared by scan + map */
const ORG = (() => {
  const nodes = [[0.5, 0.16]];
  [[0.24, 0.42], [0.5, 0.42], [0.76, 0.42]].forEach((n) => nodes.push(n));
  [[0.12, 0.72], [0.26, 0.72], [0.42, 0.72], [0.58, 0.72], [0.74, 0.72], [0.88, 0.72]].forEach((n) => nodes.push(n));
  const edges = [[0,1],[0,2],[0,3],[1,4],[1,5],[2,6],[2,7],[3,8],[3,9]];
  return { nodes, edges };
})();
function orgPos(i, W, H, padX = 40, padTop = 30, padBot = 100) {
  return [padX + ORG.nodes[i][0] * (W - padX * 2), padTop + ORG.nodes[i][1] * (H - padTop - padBot)];
}

const scanCanvas = document.getElementById('scan-canvas');
if (scanCanvas) driveCanvas(scanCanvas, (ctx, W, H, t) => {
  ctx.clearRect(0, 0, W, H);
  const cycle = 14, ct = t % cycle;
  // 1. the drop
  if (ct < 1.4) {
    const dp = ct / 1.4;
    const y = ease(dp) * (H * 0.45);
    ctx.fillStyle = C.accent;
    ctx.beginPath(); ctx.arc(W / 2, 12 + y, 4, 0, Math.PI * 2); ctx.fill();
  }
  // 2. ripples
  const rippleT = ct - 1.4;
  if (rippleT > 0 && rippleT < 2.4) {
    for (let r = 0; r < 3; r++) {
      const rp = (rippleT - r * 0.35) / 1.8;
      if (rp <= 0 || rp >= 1) continue;
      ctx.strokeStyle = C.accent;
      ctx.globalAlpha = (1 - rp) * 0.5;
      ctx.beginPath();
      ctx.ellipse(W / 2, H * 0.45 + 12, rp * W * 0.4, rp * W * 0.16, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }
  // 3. org chart materializes
  const orgP = ease((ct - 2.0) / 2.2);
  if (orgP > 0) {
    ORG.edges.forEach(([a, b], i) => {
      const ep = ease(orgP * 2.4 - i * 0.14);
      if (ep <= 0) return;
      const [ax, ay] = orgPos(a, W, H), [bx, by] = orgPos(b, W, H);
      ctx.strokeStyle = C.borderStrong;
      ctx.globalAlpha = ep;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + (bx - ax) * ep, ay + (by - ay) * ep); ctx.stroke();
      ctx.globalAlpha = 1;
    });
    ORG.nodes.forEach((_, i) => {
      const np = ease(orgP * 2.6 - i * 0.1);
      if (np <= 0) return;
      const [x, y] = orgPos(i, W, H);
      ctx.fillStyle = C.mid;
      ctx.globalAlpha = np;
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      // listening pulse ring (REC-light, calm)
      if (np >= 1) {
        const pr = ((t * 0.7 + i * 0.23) % 1);
        ctx.strokeStyle = C.accent;
        ctx.globalAlpha = (1 - pr) * 0.4;
        ctx.beginPath(); ctx.arc(x, y, 5 + pr * 11, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
  }
  // 4. rolling tool marquee + threads
  const tools = ['Outlook', 'Clio', 'Teams', 'Word', 'Calls', 'Calendar', 'DMS', 'Billing'];
  const chipW = 92, gap = 14, span = tools.length * (chipW + gap);
  const off = (t * 34) % span;
  const my = H - 52;
  ctx.strokeStyle = C.border;
  ctx.beginPath(); ctx.moveTo(0, my - 22); ctx.lineTo(W, my - 22); ctx.stroke();
  for (let k = -1; k < Math.ceil(W / span) + 1; k++) {
    tools.forEach((name, i) => {
      const x = k * span + i * (chipW + gap) - off;
      if (x < -chipW || x > W) return;
      ctx.fillStyle = C.bg1;
      ctx.strokeStyle = C.border;
      ctx.fillRect(x, my, chipW, 30);
      ctx.strokeRect(x, my, chipW, 30);
      label(ctx, name, x + chipW / 2, my + 19, C.lo, 11, 'center');
      // observation thread to nearest bottom-row node
      if (orgP >= 1) {
        const cx = x + chipW / 2;
        let best = 4, bd = 1e9;
        for (let n = 4; n < ORG.nodes.length; n++) {
          const [nx] = orgPos(n, W, H);
          const d = Math.abs(nx - cx);
          if (d < bd) { bd = d; best = n; }
        }
        const [nx, ny] = orgPos(best, W, H);
        ctx.strokeStyle = C.accent;
        ctx.globalAlpha = 0.1 + 0.08 * Math.sin(t * 2 + i);
        ctx.beginPath(); ctx.moveTo(cx, my); ctx.lineTo(nx, ny + 6); ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
  }
});

const mapCanvas = document.getElementById('map-canvas');
if (mapCanvas) driveCanvas(mapCanvas, (ctx, W, H, t) => {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  // faint org outline
  ctx.globalAlpha = 0.28;
  ORG.edges.forEach(([a, b]) => {
    const [ax, ay] = orgPos(a, W, H, 40, 24, 40), [bx, by] = orgPos(b, W, H, 40, 24, 40);
    ctx.strokeStyle = C.border;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
  });
  ORG.nodes.forEach((_, i) => {
    const [x, y] = orgPos(i, W, H, 40, 24, 40);
    ctx.fillStyle = C.lo;
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;
  // observation streams: dots flowing from org nodes to center
  ORG.nodes.forEach((_, i) => {
    const [x, y] = orgPos(i, W, H, 40, 24, 40);
    const sp = ((t * 0.4 + i * 0.17) % 1);
    const px = x + (cx - x) * sp, py = y + (cy - y) * sp;
    ctx.fillStyle = C.accent;
    ctx.globalAlpha = 0.7 * Math.sin(sp * Math.PI);
    ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  });
  // central mini context-graph "brain": ring of jittering nodes + chords
  const bn = 26, R = Math.min(W, H) * 0.2;
  const pts = [];
  for (let i = 0; i < bn; i++) {
    const a = (i / bn) * Math.PI * 2;
    const wobble = Math.sin(t * 0.9 + i * 1.7) * 6 + Math.sin(t * 0.35 + i * 3.1) * 4;
    const r = R * (0.55 + 0.45 * Math.abs(Math.sin(i * 2.3))) + wobble;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.82]);
  }
  ctx.strokeStyle = C.accent;
  for (let i = 0; i < bn; i++) {
    for (let j = i + 1; j < bn; j++) {
      const dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1];
      const d2 = dx * dx + dy * dy;
      if (d2 < R * R * 0.42) {
        ctx.globalAlpha = 0.3 * (1 - d2 / (R * R * 0.42));
        ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[j][0], pts[j][1]); ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  pts.forEach(([x, y], i) => {
    ctx.fillStyle = i % 4 === 0 ? C.accent : C.mid;
    ctx.beginPath(); ctx.arc(x, y, i % 4 === 0 ? 2.6 : 1.8, 0, Math.PI * 2); ctx.fill();
  });
  // arrival ripple — soft, born at the graph edge
  const rp = ((t * 0.5) % 1);
  ctx.strokeStyle = C.accent;
  ctx.globalAlpha = Math.sin(rp * Math.PI) * 0.2;
  ctx.beginPath(); ctx.arc(cx, cy, R * (0.9 + rp * 0.5), 0, Math.PI * 2); ctx.stroke();
  ctx.globalAlpha = 1;
  label(ctx, 'THE CONTEXT GRAPH OF YOUR LAW FIRM', cx, H - 18, C.lo, 10, 'center');
});

const analyzeCanvas = document.getElementById('analyze-canvas');
if (analyzeCanvas) driveCanvas(analyzeCanvas, (ctx, W, H, t) => {
  ctx.clearRect(0, 0, W, H);
  const N = [
    [0.06, 0.5], [0.2, 0.3], [0.2, 0.7], [0.36, 0.5], [0.38, 0.14],
    [0.52, 0.32], [0.52, 0.68], [0.55, 0.9], [0.68, 0.5], [0.7, 0.16], [0.84, 0.34], [0.94, 0.52],
  ];
  const E = [[0,1],[0,2],[1,3],[2,3],[1,4],[3,5],[3,6],[6,7],[5,8],[6,8],[5,9],[8,10],[10,11]];
  const PATH = [0, 1, 3, 5, 8, 10, 11];
  const OFF = [[1,4,0.13],[3,6,0.21],[6,7,0.07],[5,9,0.11]];
  const pos = (i) => [24 + N[i][0] * (W - 48), 24 + N[i][1] * (H - 88)];
  E.forEach(([a, b]) => {
    const [ax, ay] = pos(a), [bx, by] = pos(b);
    ctx.strokeStyle = C.border;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
  });
  // amber deviation heat
  OFF.forEach(([a, b, f], i) => {
    const [ax, ay] = pos(a), [bx, by] = pos(b);
    ctx.strokeStyle = C.amber;
    ctx.globalAlpha = 0.15 + f * 2.2 + 0.1 * Math.sin(t * 2 + i * 2);
    ctx.lineWidth = 1 + f * 6;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    ctx.lineWidth = 1;
    ctx.globalAlpha = 1;
    label(ctx, `${Math.round(f * 100)}%`, (ax + bx) / 2 + 8, (ay + by) / 2, C.amber, 10);
  });
  // common path river
  ctx.strokeStyle = C.accent;
  ctx.lineWidth = 2.4;
  ctx.setLineDash([8, 7]);
  ctx.lineDashOffset = -t * 30;
  ctx.beginPath();
  PATH.forEach((n, i) => { const [x, y] = pos(n); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineWidth = 1;
  // nodes
  N.forEach((_, i) => {
    const [x, y] = pos(i);
    const on = PATH.includes(i);
    ctx.fillStyle = on ? C.accent : C.mid;
    ctx.beginPath(); ctx.arc(x, y, on ? 4.5 : 3, 0, Math.PI * 2); ctx.fill();
  });
  // predicted deviation
  const [ax, ay] = pos(10);
  const gx = ax + 30, gy = ay + 56;
  const pulse = 0.4 + 0.3 * Math.sin(t * 2.6);
  ctx.strokeStyle = C.amber;
  ctx.setLineDash([3, 5]);
  ctx.globalAlpha = pulse;
  ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(gx, gy); ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  bracket(ctx, gx - 13, gy - 13, 26, 26, 7, C.amber, 0.4 + pulse * 0.6);
  label(ctx, 'predicted deviation', gx + 20, gy + 4, C.amber, 10);
  // fork stat
  const [fx, fy] = pos(3);
  label(ctx, '87% follow the common path', fx - 4, fy + 24, C.mid, 10.5);
});

/* ================================================================
   MARQUEES — duplicate tracks for seamless -50% loops
   ================================================================ */
for (const id of ['priv-track', 'logo-track']) {
  const track = document.getElementById(id);
  if (track) track.innerHTML += track.innerHTML;
}

/* ================================================================
   HERO BRAIN
   ================================================================ */
initBrain(document.getElementById('brain-canvas'), {
  reduced: REDUCED,
  onInteractive: () => document.getElementById('hero-hint')?.classList.add('on'),
}).catch((err) => {
  console.warn('Brain init failed, using fallback', err);
  fallbackBrain(document.getElementById('brain-canvas'));
});

/* static 2D fallback: settled node cloud */
function fallbackBrain(canvas) {
  if (!canvas) return;
  const ctx = prepCanvas(canvas);
  const W = canvas.clientWidth, H = canvas.clientHeight;
  const cx = W * 0.66, cy = H * 0.5, R = Math.min(W, H) * 0.3;
  const pts = [];
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 240; i++) {
    const a = rnd() * Math.PI * 2, b = Math.acos(rnd() * 2 - 1), r = R * Math.cbrt(rnd());
    const x = Math.sin(b) * Math.cos(a) * r * 1.25, y = Math.cos(b) * r * 0.85, z = Math.sin(b) * Math.sin(a) * r;
    pts.push([cx + x, cy + y, z]);
  }
  ctx.strokeStyle = C.accent;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1];
      if (dx * dx + dy * dy < R * R * 0.06) {
        ctx.globalAlpha = 0.08;
        ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[j][0], pts[j][1]); ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  for (const [x, y, z] of pts) {
    const depth = (z / R + 1) / 2;
    ctx.fillStyle = depth > 0.6 ? C.accent : C.mid;
    ctx.globalAlpha = 0.3 + depth * 0.7;
    ctx.beginPath(); ctx.arc(x, y, 1.2 + depth * 1.8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}
