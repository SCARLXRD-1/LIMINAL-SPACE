import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const GRAIN_SHADER = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    grainIntensity: { value: 0.035 },
  },
  vertexShader: `
    #include <common>
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  fragmentShader: `
    #include <common>
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float grainIntensity;
    varying vec2 vUv;
    void main() {
      float n = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
      vec3 color = texture2D(tDiffuse, vUv).rgb;
      color += (n - 0.5) * grainIntensity;
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

export function createPostProcessing({ renderer, scene, camera, quality = 'high' }) {
  const config = {
    bloomStrength: 0.05,
    bloomRadius: 0.05,
    bloomThreshold: 0.85,
    vignetteIntensity: 0.12,
    grainIntensity: 0.035,
  };

  let composer = null;
  let bloomPass = null;
  let filmPass = null;
  let grainPass = null;
  let outputPass = null;

  const build = () => {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomResolution = new THREE.Vector2();
    renderer.getDrawingBufferSize(bloomResolution);
    bloomPass = new UnrealBloomPass(
      bloomResolution,
      config.bloomStrength,
      config.bloomRadius,
      config.bloomThreshold,
    );
    composer.addPass(bloomPass);
    filmPass = new FilmPass(config.vignetteIntensity, false);
    composer.addPass(filmPass);
    grainPass = new ShaderPass(GRAIN_SHADER, 'tDiffuse');
    grainPass.uniforms.time.value = 0;
    grainPass.uniforms.grainIntensity.value = config.grainIntensity;
    composer.addPass(grainPass);
    outputPass = new OutputPass();
    composer.addPass(outputPass);
  };

  const dispose = () => {
    if (!composer) {
      return;
    }

    composer.dispose();
    bloomPass.dispose();
    filmPass.dispose();
    grainPass.dispose();
    outputPass.dispose();
    composer = null;
    bloomPass = null;
    filmPass = null;
    grainPass = null;
    outputPass = null;
  };

  if (quality !== 'low') {
    build();
  }

  const render = (targetRenderer = renderer, targetScene = scene, targetCamera = camera) => {
    if (composer) {
      composer.render();
      return;
    }
    targetRenderer.render(targetScene, targetCamera);
  };

  const setQuality = (nextQuality) => {
    quality = nextQuality;
    if (quality === 'low') {
      dispose();
      return;
    }
    if (bloomPass === null) {
      build();
    }
  };

  const setSize = (width, height) => {
    if (composer) {
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.setSize(width, height);
    }
  };

  return {
    get composer() {
      return composer;
    },
    render,
    setSize,
    setQuality,
  };
}