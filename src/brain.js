/* Mission Control — hero "obsidian brain"
   WebGPU (three/webgpu + TSL), auto-falls back to WebGL2 inside WebGPURenderer.
   Build: one blinking dot → accelerating connections → interactive brain graph. */
import * as THREE from 'three/webgpu';
import {
  color, float, vec3, mix, positionWorld, normalWorld, cameraPosition, hash,
  positionLocal,
} from 'three/tsl';

const NODE_COUNT = 340;
const K_NEIGHBORS = 3;

/* deterministic rng so the brain is the same on every load */
function makeRng(seed = 1337) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
}

/* sample points in a brain-ish volume:
   ellipsoid, hemisphere groove at x=0, flattened base, cerebellum bulge */
function samplePoints(rng) {
  const pts = [];
  while (pts.length < NODE_COUNT) {
    const x = (rng() * 2 - 1), y = (rng() * 2 - 1), z = (rng() * 2 - 1);
    if (x * x + y * y + z * z > 1) continue;
    let px = x * 1.32, py = y * 0.92, pz = z * 1.08;
    if (py < -0.55) continue;                    // flat base
    if (Math.abs(px) < 0.05) continue;           // hemisphere groove
    px += Math.sign(px) * 0.04;
    if (pz < -0.6 && py > 0.1) continue;         // taper the back top
    if (pz < -0.5 && py < 0) { px *= 0.8; }      // cerebellum narrows
    pts.push(new THREE.Vector3(px, py, pz));
  }
  return pts;
}

/* connect each node to its K nearest previous nodes (mirrors the build order) */
function buildEdges(pts) {
  const edges = [];
  for (let i = 1; i < pts.length; i++) {
    const dists = [];
    for (let j = 0; j < i; j++) dists.push([pts[i].distanceToSquared(pts[j]), j]);
    dists.sort((a, b) => a[0] - b[0]);
    const k = Math.min(K_NEIGHBORS, dists.length);
    for (let n = 0; n < k; n++) edges.push([i, dists[n][1]]);
  }
  return edges;
}

export async function initBrain(canvas, { reduced = false, onInteractive = () => {} } = {}) {
  if (!canvas) throw new Error('no canvas');

  const renderer = new THREE.WebGPURenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  await renderer.init();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 0.1, 4.4);

  const group = new THREE.Group();
  scene.add(group);

  /* ------- data ------- */
  const rng = makeRng();
  const restPos = samplePoints(rng);
  const edges = buildEdges(restPos);
  const pos = restPos.map((p) => p.clone());
  const vel = restPos.map(() => new THREE.Vector3());
  const restLen = edges.map(([a, b]) => restPos[a].distanceTo(restPos[b]));

  /* birth times: accelerating build */
  const birth = new Float32Array(NODE_COUNT);
  {
    let t = 0.9, dt = 0.42;
    for (let i = 0; i < NODE_COUNT; i++) { birth[i] = t; t += dt; dt *= 0.945; }
  }
  const BUILD_END = birth[NODE_COUNT - 1] + 0.4;

  /* ------- node material (obsidian + iridescent rim) ------- */
  const nodeMat = new THREE.MeshStandardNodeMaterial();
  nodeMat.colorNode = color(0x0b0d0a);
  nodeMat.roughnessNode = float(0.32);
  nodeMat.metalnessNode = float(0.75);
  {
    const viewDir = cameraPosition.sub(positionWorld).normalize();
    const fres = float(1).sub(normalWorld.dot(viewDir).saturate()).pow(2.4);
    const grain = hash(positionLocal.mul(180)).mul(0.35).add(0.72);
    const t1 = positionWorld.y.mul(0.5).add(0.5).saturate();
    const t2 = positionWorld.x.mul(0.4).add(0.5).saturate();
    const irid = mix(mix(color(0x84ee64), color(0x40d1be), t1), color(0xf0e196), t2.mul(0.55));
    /* fresnel rim + a small emissive floor so every node reads against black */
    nodeMat.emissiveNode = irid.mul(fres.mul(1.15).add(0.16)).mul(grain);
  }
  const nodeGeo = new THREE.IcosahedronGeometry(0.034, 1);
  const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);
  nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  nodes.frustumCulled = false;
  group.add(nodes);

  /* ------- edges ------- */
  const edgePositions = new Float32Array(edges.length * 6);
  const edgeColors = new Float32Array(edges.length * 6);
  const edgeGeo = new THREE.BufferGeometry();
  edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3).setUsage(THREE.DynamicDrawUsage));
  edgeGeo.setAttribute('color', new THREE.BufferAttribute(edgeColors, 3).setUsage(THREE.DynamicDrawUsage));
  const edgeMat = new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const lines = new THREE.LineSegments(edgeGeo, edgeMat);
  lines.frustumCulled = false;
  group.add(lines);

  const edgeColorA = new THREE.Color(0x84ee64);
  const edgeColorB = new THREE.Color(0x40d1be);

  /* ------- lights ------- */
  scene.add(new THREE.AmbientLight(0x40503f, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(2, 3, 4);
  scene.add(key);
  const rim = new THREE.PointLight(0x84ee64, 6, 12);
  rim.position.set(-3, 1.5, -2);
  scene.add(rim);
  const rim2 = new THREE.PointLight(0x8b5cf6, 4, 12);
  rim2.position.set(3, -2, -1);
  scene.add(rim2);

  /* ------- layout: brain sits right of copy on wide screens ------- */
  function layout() {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    if (w < 2 || h < 2) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const wide = w > 960;
    group.position.x = wide ? Math.min(1.35, w / h * 0.42) : 0;
    group.position.y = wide ? 0 : 0.75;
    const s = wide ? 1 : 0.72;
    group.scale.setScalar(s);
  }
  layout();
  addEventListener('resize', layout);

  /* ------- interaction ------- */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let dragging = -1;
  let rotating = false;
  let lastX = 0, lastY = 0;
  let rotVelY = 0, rotVelX = 0;
  const dragPlane = new THREE.Plane();
  const dragPoint = new THREE.Vector3();
  const worldPos = new THREE.Vector3();
  let interactive = reduced;

  function setPointer(e) {
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  }
  canvas.addEventListener('pointerdown', (e) => {
    if (!interactive) return;
    setPointer(e);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(nodes);
    if (hits.length) {
      dragging = hits[0].instanceId;
      worldPos.copy(pos[dragging]).applyMatrix4(group.matrixWorld);
      dragPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(new THREE.Vector3()), worldPos);
      canvas.style.cursor = 'grabbing';
    } else {
      rotating = true;
      lastX = e.clientX; lastY = e.clientY;
    }
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!interactive) return;
    if (dragging >= 0) {
      setPointer(e);
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
        const inv = group.matrixWorld.clone().invert();
        pos[dragging].copy(dragPoint.applyMatrix4(inv));
        vel[dragging].set(0, 0, 0);
      }
    } else if (rotating) {
      rotVelY = (e.clientX - lastX) * 0.005;
      rotVelX = (e.clientY - lastY) * 0.005;
      group.rotation.y += rotVelY;
      group.rotation.x = THREE.MathUtils.clamp(group.rotation.x + rotVelX, -0.6, 0.6);
      lastX = e.clientX; lastY = e.clientY;
    } else {
      setPointer(e);
      raycaster.setFromCamera(pointer, camera);
      canvas.style.cursor = raycaster.intersectObject(nodes).length ? 'grab' : 'default';
    }
  });
  const release = () => { dragging = -1; rotating = false; canvas.style.cursor = 'default'; };
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);

  /* ------- physics ------- */
  const SPRING = 14, ANCHOR = 5.5, DAMP = 0.9;
  const f = new THREE.Vector3();
  function physics(dt, bornCount) {
    for (const [ei, [a, b]] of edges.entries()) {
      if (a >= bornCount || b >= bornCount) continue;
      f.subVectors(pos[b], pos[a]);
      const d = f.length() || 1e-5;
      const ext = d - restLen[ei];
      f.multiplyScalar((SPRING * ext) / d * dt);
      if (a !== dragging) vel[a].add(f);
      if (b !== dragging) vel[b].sub(f);
    }
    for (let i = 0; i < bornCount; i++) {
      if (i === dragging) continue;
      f.subVectors(restPos[i], pos[i]).multiplyScalar(ANCHOR * dt);
      vel[i].add(f);
      vel[i].multiplyScalar(DAMP);
      pos[i].addScaledVector(vel[i], dt);
    }
  }

  /* ------- frame loop ------- */
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const sv = new THREE.Vector3();
  let lastNow = performance.now();
  const startNow = lastNow;
  /* build timeline runs on wall time so low-fps environments still finish on cue */
  let elapsed = reduced ? BUILD_END + 1 : 0;
  const elapsedOffset = reduced ? BUILD_END + 1 : 0;
  let announced = reduced;

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 }).observe(canvas);

  /* debug hook */
  canvas.__brain = {
    stats() {
      let born = 0;
      while (born < NODE_COUNT && birth[born] <= elapsed) born++;
      const ext = { minX: 1e9, maxX: -1e9, minY: 1e9, maxY: -1e9, nan: 0 };
      for (const p of pos) {
        if (!isFinite(p.x) || !isFinite(p.y) || !isFinite(p.z)) { ext.nan++; continue; }
        ext.minX = Math.min(ext.minX, p.x); ext.maxX = Math.max(ext.maxX, p.x);
        ext.minY = Math.min(ext.minY, p.y); ext.maxY = Math.max(ext.maxY, p.y);
      }
      return { elapsed, born, count: NODE_COUNT, edges: edges.length, ...ext };
    },
  };

  renderer.setAnimationLoop(() => {
    const now = performance.now();
    const dt = Math.min((now - lastNow) / 1000, 0.05);
    lastNow = now;
    if (!visible || canvas.clientWidth < 2) return;
    elapsed = elapsedOffset + (now - startNow) / 1000;

    const built = elapsed >= BUILD_END;
    if (built && !announced) { announced = true; interactive = true; onInteractive(); }

    /* idle rotation */
    if (!rotating && !reduced) group.rotation.y += dt * (built ? 0.07 : 0.15);

    let bornCount = 0;
    while (bornCount < NODE_COUNT && birth[bornCount] <= elapsed) bornCount++;

    if (built) physics(dt, bornCount);

    /* first-dot blink before its connection */
    const blink = elapsed < birth[1] ? (Math.sin(elapsed * 7) * 0.5 + 0.5) * 0.7 + 0.3 : 1;

    /* nodes */
    for (let i = 0; i < NODE_COUNT; i++) {
      const age = elapsed - birth[i];
      let s = age < 0 ? 0 : Math.min(age / 0.35, 1);
      s = 1 - Math.pow(1 - s, 3);
      if (i === 0) s *= blink;
      const bob = built ? Math.sin(elapsed * 0.8 + i * 1.7) * 0.008 : 0;
      sv.setScalar(Math.max(s, 0.0001) * (i === dragging ? 1.6 : 1));
      m.compose(new THREE.Vector3(pos[i].x, pos[i].y + bob, pos[i].z), q, sv);
      nodes.setMatrixAt(i, m);
    }
    nodes.instanceMatrix.needsUpdate = true;

    /* edges */
    for (let ei = 0; ei < edges.length; ei++) {
      const [a, b] = edges[ei];
      const bt = Math.max(birth[a], birth[b]);
      const age = elapsed - bt;
      const o = ei * 6;
      if (age <= 0) {
        edgePositions.fill(0, o, o + 6);
        edgeColors.fill(0, o, o + 6);
        continue;
      }
      const grow = Math.min(age / 0.3, 1);
      const pa = pos[a], pb = pos[b];
      edgePositions[o] = pa.x; edgePositions[o + 1] = pa.y; edgePositions[o + 2] = pa.z;
      edgePositions[o + 3] = pa.x + (pb.x - pa.x) * grow;
      edgePositions[o + 4] = pa.y + (pb.y - pa.y) * grow;
      edgePositions[o + 5] = pa.z + (pb.z - pa.z) * grow;
      const flash = age < 0.5 ? 2.0 - age * 2.0 : 0;
      const base = 0.34 + flash;
      edgeColors[o] = edgeColorA.r * base; edgeColors[o + 1] = edgeColorA.g * base; edgeColors[o + 2] = edgeColorA.b * base;
      edgeColors[o + 3] = edgeColorB.r * base; edgeColors[o + 4] = edgeColorB.g * base; edgeColors[o + 5] = edgeColorB.b * base;
    }
    edgeGeo.attributes.position.needsUpdate = true;
    edgeGeo.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  });

  return { renderer };
}
