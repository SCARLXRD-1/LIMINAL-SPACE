import * as THREE from 'three';
import { CORRIDOR } from '../config/constants.js';
import { createSurfaceTextures } from './textures.js';

const TEXTURE_WORLD_SIZE = 3;

function getRepeat(width, height) {
  return [width / TEXTURE_WORLD_SIZE, height / TEXTURE_WORLD_SIZE];
}

function createTexturedMaterial(textures, { normalScale, metalness }) {
  return new THREE.MeshStandardMaterial({
    map: textures.map,
    roughnessMap: textures.roughnessMap,
    normalMap: textures.normalMap,
    normalScale: new THREE.Vector2(normalScale, normalScale),
    roughness: 1,
    metalness,
  });
}

export function createMaterials() {
  const floorTextures = createSurfaceTextures({
    seed: 17,
    repeat: getRepeat(CORRIDOR.width, CORRIDOR.length),
    baseColor: [82, 85, 88],
    stainColor: [42, 44, 46],
    colorContrast: 26,
    stainStrength: 0.4,
    roughnessRange: [0.55, 0.85],
    normalStrength: 9,
  });

  const wallTextures = createSurfaceTextures({
    seed: 41,
    repeat: getRepeat(CORRIDOR.length, CORRIDOR.height),
    baseColor: [106, 108, 108],
    stainColor: [72, 75, 75],
    colorContrast: 20,
    stainStrength: 0.32,
    roughnessRange: [0.68, 0.94],
    normalStrength: 6,
  });

  const endWallTextures = createSurfaceTextures({
    seed: 73,
    repeat: getRepeat(CORRIDOR.width, CORRIDOR.height),
    baseColor: [108, 111, 108],
    stainColor: [76, 80, 76],
    colorContrast: 16,
    stainStrength: 0.24,
    roughnessRange: [0.68, 0.94],
    normalStrength: 6,
  });

  const ceilingTextures = createSurfaceTextures({
    seed: 109,
    repeat: getRepeat(CORRIDOR.width, CORRIDOR.length),
    baseColor: [78, 81, 84],
    stainColor: [57, 60, 63],
    colorContrast: 12,
    stainStrength: 0.18,
    roughnessRange: [0.75, 0.95],
    normalStrength: 4,
  });

  return {
    floor: createTexturedMaterial(floorTextures, { normalScale: 0.8, metalness: 0.04 }),
    wall: createTexturedMaterial(wallTextures, { normalScale: 0.5, metalness: 0.02 }),
    endWall: createTexturedMaterial(endWallTextures, { normalScale: 0.5, metalness: 0.02 }),
    ceiling: createTexturedMaterial(ceilingTextures, { normalScale: 0.35, metalness: 0.0 }),
    trim: new THREE.MeshStandardMaterial({
      color: 0x171a1e,
      roughness: 0.86,
      metalness: 0.12,
    }),
    crown: new THREE.MeshStandardMaterial({
      color: 0x1c2025,
      roughness: 0.82,
      metalness: 0.1,
    }),
    grid: new THREE.MeshStandardMaterial({
      color: 0x15181c,
      roughness: 0.88,
      metalness: 0.1,
    }),
    doorPanel: new THREE.MeshStandardMaterial({
      color: 0x343a42,
      roughness: 0.58,
      metalness: 0.32,
    }),
    doorFrame: new THREE.MeshStandardMaterial({
      color: 0x161b20,
      roughness: 0.72,
      metalness: 0.22,
    }),
    fixtureHousing: new THREE.MeshStandardMaterial({
      color: 0x2f343a,
      roughness: 0.58,
      metalness: 0.42,
    }),
    fixture: new THREE.MeshStandardMaterial({
      color: 0xf7f3e8,
      emissive: 0xfff1cf,
      emissiveIntensity: 0.7,
      roughness: 0.55,
      metalness: 0.0,
    }),
  };
}
