import './styles/main.css';
import { createRenderer } from './core/renderer.js';
import { createScene } from './core/scene.js';
import { createLighting } from './world/lights.js';
import { ATMOSPHERE } from './config/constants.js';
import { createPlayerControls } from './player/controls.js';
import { resolveCollision } from './player/collision.js';
import { attachResize } from './core/resize.js';
import { createLoop } from './core/loop.js';
import { createPerformanceGuard } from './core/performance.js';
import { createFog } from './atmosphere/fog.js';
import { createAnomalies } from './events/anomalies.js';
import { createAudio } from './audio/audio.js';
import { createTransitions } from './core/transitions.js';
import * as THREE from 'three';

const app = document.querySelector('#app');
const overlay = document.querySelector('#hud-overlay');
const hudAudio = document.querySelector('#hud-audio');
const veil = document.querySelector('#transition-veil');
const transitions = createTransitions(veil);

const reflectAudioState = () => {
  hudAudio.textContent = audio.muted ? 'SOUND OFF' : 'SOUND ON';
  hudAudio.classList.toggle('muted', audio.muted);
};

let renderer;

try {
  renderer = createRenderer(app);
} catch (error) {
  app.textContent = 'WebGL is required to enter this space.';
  throw error;
}

const { scene, camera } = createScene();
const lighting = createLighting(renderer, scene);
const fog = createFog({ scene });
let postProcessing = null;

const anomalyLights = new Map();
let anomalyIndex = 0;
lighting.traverse((object) => {
  if (object instanceof THREE.SpotLight) {
    anomalyLights.set(`flicker-${String.fromCharCode(97 + anomalyIndex)}`, object);
    anomalyIndex += 1;
  }
});
const anomalies = createAnomalies({ lights: anomalyLights });
const audio = createAudio();

const playerControls = createPlayerControls({
  camera,
  renderer,
  onLockStateChange: (locked) => {
    overlay.classList.toggle('hidden', locked);
  },
});
playerControls.attach();
overlay.addEventListener('click', () => {
  audio.start();
  playerControls.requestLock();
});

window.addEventListener('keydown', () => {
  audio.start();
}, { once: true });

window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyM') {
    audio.toggleMute();
    reflectAudioState();
  } else if (event.code === 'BracketRight') {
    audio.changeVolume(0.1);
    reflectAudioState();
  } else if (event.code === 'BracketLeft') {
    audio.changeVolume(-0.1);
    reflectAudioState();
  }
});

const setOverlayVisible = (visible) => {
  overlay.classList.toggle('hidden', visible);
};

setOverlayVisible(!playerControls.isLocked());

app.appendChild(renderer.domElement);
const resize = attachResize(renderer, camera, undefined, (width, height) => {
  postProcessing?.setSize(width, height);
});
let reducedQuality = false;
const performanceGuard = createPerformanceGuard({
  onDegrade: () => {
    reducedQuality = true;
    resize.setResolutionScale(0.75);
    renderer.shadowMap.enabled = false;
    postProcessing?.setQuality('low');
  },
});

const loop = createLoop(
  renderer,
  scene,
  camera,
  (delta, elapsedTime) => {
    performanceGuard.update(delta * 1000);

    const drift = Math.sin(elapsedTime * 0.0011) * 0.15;
    camera.position.x = drift;
    camera.position.y = 1.65 + Math.sin(elapsedTime * 0.0018) * 0.06;

    const move = playerControls.update(delta, camera);
    camera.position.x += move.x;
    camera.position.z += move.z;
    resolveCollision(camera.position);

    fog.update(elapsedTime);
    anomalies.update(delta);
    audio.update();
  },
  () => {
    if (postProcessing) {
      postProcessing.render();
    } else {
      renderer.render(scene, camera);
    }
  },
);

loop.start();

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    transitions.fadeIn(1400);
  });
});

import('./atmosphere/postprocessing.js')
  .then(({ createPostProcessing }) => {
    postProcessing = createPostProcessing({
      renderer,
      scene,
      camera,
      quality: reducedQuality ? 'low' : ATMOSPHERE.quality,
    });
  })
  .catch((error) => {
    console.error('Unable to load post-processing effects.', error);
  });

const syncLoop = () => {
  if (document.hidden || !document.hasFocus()) {
    loop.stop();
    audio.stop();
  } else {
    loop.start();
  }
};

window.addEventListener('blur', syncLoop);
window.addEventListener('focus', syncLoop);
document.addEventListener('visibilitychange', syncLoop);
