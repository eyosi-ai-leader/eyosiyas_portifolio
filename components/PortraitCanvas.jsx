"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

// write a value into the telemetry numbers in the hero (#sn, #pt, #fp)
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Runs once per particle, on the GPU. Moves points away from the mouse,
// adds a gentle wave, and tints the points near the orange scan line.
const VERTEX = `
  uniform float uT, uS, uPx;
  uniform vec3 uM;
  attribute vec3 aC;
  attribute float aR;
  varying vec3 vC;
  void main() {
    vec3 p = position;
    float d = distance(p.xy, uM.xy);
    float f = smoothstep(1.2, 0., d);
    vec2 dir = normalize(p.xy - uM.xy + 1e-4);
    p.xy += dir * f * (.5 + aR) * .9;
    p.z += f * aR * 1.4 + sin(uT * 1.3 + aR * 20.) * .025;
    float s = exp(-pow((p.y - uS) * 3.4, 2.));
    p.z += s * .3;
    vC = mix(aC, vec3(1., .48, .1), clamp(s * .9 + f * .4, 0., 1.));
    vec4 mv = modelViewMatrix * vec4(p, 1.);
    gl_PointSize = uPx * (1. + s * 1.8) / (-mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

// Makes each point a soft round dot
const FRAGMENT = `
  varying vec3 vC;
  void main() {
    float d = length(gl_PointCoord - .5);
    if (d > .5) discard;
    gl_FragColor = vec4(vC, smoothstep(.5, .1, d));
  }
`;

export default function PortraitCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;

    // if WebGL is not available, show the plain portrait instead
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch {
      hero.classList.add("nofx");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 9;
    const group = new THREE.Group();
    scene.add(group);

    // mouse position (starts on the right side, where the portrait is)
    let mx = window.innerWidth * 0.7;
    let my = window.innerHeight / 2;
    const onMouse = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    // fade the portrait out while scrolling down
    const onScroll = () => {
      canvas.style.opacity = clamp(1 - window.scrollY / (window.innerHeight * 0.9), 0, 1);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });

    let cancelled = false;
    let raf = 0;
    let observer;
    let onResize;
    const disposables = [];

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;

      // 1. read the portrait pixels at 104 x 186
      const w = 104;
      const h = 186;
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      const D = ctx.getImageData(0, 0, w, h).data;

      // 2. one particle per pixel (skipping the blue background)
      const P = []; // positions
      const C = []; // colors
      const R = []; // random value per particle
      for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
          const k = (j * w + i) * 4;
          const r = D[k];
          const g = D[k + 1];
          const b = D[k + 2];
          if (b > r + 22 && b > g - 6) continue;
          const l = (0.3 * r + 0.59 * g + 0.11 * b) / 255;
          P.push((i / w - 0.5) * 3.2, -(j / h - 0.5) * 5.7, l * 0.8);
          const m = Math.pow(l, 0.9);
          C.push(0.06 + m * 0.8, 0.35 + m * 0.65, 0.55 + m * 0.45);
          R.push(Math.random());
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
      geo.setAttribute("aC", new THREE.Float32BufferAttribute(C, 3));
      geo.setAttribute("aR", new THREE.Float32BufferAttribute(R, 1));
      setText("pt", (P.length / 3).toLocaleString());

      // 3. the glowing point cloud
      const U = {
        uT: { value: 0 },
        uS: { value: 0 },
        uM: { value: new THREE.Vector3(99, 99, 0) },
        uPx: { value: 1 },
      };
      const mat = new THREE.ShaderMaterial({
        uniforms: U,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
      });
      group.add(new THREE.Points(geo, mat));
      disposables.push(geo, mat);

      // 4. three thin rings around the portrait
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x4de1ff,
        transparent: true,
        opacity: 0.35,
      });
      disposables.push(ringMat);
      const rings = [3.6, 4.1, 4.6].map((radius, i) => {
        const ringGeo = new THREE.TorusGeometry(radius, 0.007, 6, 180);
        disposables.push(ringGeo);
        const mesh = new THREE.Mesh(ringGeo, ringMat);
        mesh.rotation.set(1.2 + i * 0.5, i * 0.7, 0);
        group.add(mesh);
        return mesh;
      });

      // 5. keep the canvas sized to the hero
      onResize = () => {
        const W = canvas.clientWidth;
        const H = canvas.clientHeight;
        renderer.setSize(W, H, false);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        U.uPx.value = (22 * renderer.getPixelRatio() * H) / 900;
        group.position.x = W < 900 ? 0 : 2.6;
        group.scale.setScalar(W < 900 ? 0.8 : 1);
      };
      onResize();
      window.addEventListener("resize", onResize);

      // 6. only animate while the hero is on screen
      let visible = true;
      observer = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
      });
      observer.observe(hero);

      const t0 = performance.now();
      const th = Math.tan((20 * Math.PI) / 180);
      let frames = 0;
      let ft = t0;

      function loop() {
        raf = requestAnimationFrame(loop);
        if (!visible) return;

        const now = performance.now();
        const t = (now - t0) / 1000;
        U.uT.value = t;

        // orange scan line moves up and down
        const sv = Math.sin(t * 0.8);
        U.uS.value = sv * 2.8;
        setText("sn", String(Math.round((sv * 0.5 + 0.5) * 100)).padStart(3, "0"));

        // convert the mouse position into the 3D scene
        const r = canvas.getBoundingClientRect();
        const nx = ((mx - r.left) / r.width) * 2 - 1;
        const ny = -(((my - r.top) / r.height) * 2 - 1);
        const asp = r.width / r.height;
        U.uM.value.set(nx * asp * th * 9 - group.position.x, ny * th * 9, 0);

        // portrait leans toward the mouse, rings keep spinning
        group.rotation.y += (nx * 0.28 - group.rotation.y) * 0.05;
        group.rotation.x += (-ny * 0.12 - group.rotation.x) * 0.05;
        rings.forEach((m, i) => {
          m.rotation.z += 0.002 * (i + 1);
          m.rotation.x += 0.0009 * (i % 2 ? -1 : 1);
        });

        renderer.render(scene, camera);

        // FPS readout twice a second
        frames++;
        if (now - ft > 500) {
          setText("fp", String(Math.round((frames * 1000) / (now - ft))));
          frames = 0;
          ft = now;
        }
      }
      loop();
    };
    img.src = "/portrait.jpg";

    // cleanup when the component is removed
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      if (onResize) window.removeEventListener("resize", onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}