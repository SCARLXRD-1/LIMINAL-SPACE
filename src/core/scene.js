import * as THREE from 'three';
import { CAMERA, SCENE } from '../config/constants.js';
import { createCorridor } from '../world/corridor.js';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(SCENE.background);
  scene.fog = new THREE.Fog(SCENE.background, SCENE.fogNear, SCENE.fogFar);

  const camera = new THREE.PerspectiveCamera(
    CAMERA.fov,
    window.innerWidth / window.innerHeight,
    CAMERA.near,
    CAMERA.far,
  );

  camera.position.set(...CAMERA.position);
  camera.lookAt(0, 1.6, -12);

  const corridor = createCorridor();
  scene.add(corridor);

  return { scene, camera, corridor };
}
