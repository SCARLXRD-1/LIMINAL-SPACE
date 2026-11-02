import * as THREE from 'three';
import { RENDERER } from '../config/constants.js';

export function createRenderer(container) {
  const renderer = new THREE.WebGLRenderer({
    antialias: RENDERER.antialias,
    alpha: RENDERER.alpha,
    powerPreference: RENDERER.powerPreference,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, RENDERER.maxPixelRatio));
  renderer.setSize(container.clientWidth, container.clientHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  return renderer;
}
