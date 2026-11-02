import * as THREE from 'three';
import { SCENE } from '../config/constants.js';

export function createFog({ scene, config }) {
  const fogConfig = {
    near: SCENE.fogNear,
    far: SCENE.far,
    color: new THREE.Color(SCENE.background),
    pulseAmplitude: 0.2,
    exponential: false,
  };

  const fog = {
    update: (elapsedTime) => {
      const pulse = 0.5 + Math.sin(elapsedTime * 0.0027) * 0.12;
      fogConfig.near = SCENE.fogNear + pulse * fogConfig.pulseAmplitude;
      fogConfig.far = SCENE.fogFar;
      fogConfig.color.set(SCENE.background);
      scene.fog.near = fogConfig.near;
      scene.fog.far = fogConfig.far;
      scene.fog.color.copy(fogConfig.color);
      if (fogConfig.exponential) {
        scene.fog = new THREE.FogExp2(fogConfig.color, 0.008);
      }
    },
    dispose: () => {
      scene.fog = null;
    },
  };

  return fog;
}
