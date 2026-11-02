import * as THREE from 'three';

const TEXTURE_SIZE = 512;
const ANISOTROPY = 4;

function mulberry32(seed) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(min, max, value) {
  const t = Math.min(Math.max((value - min) / (max - min), 0), 1);
  return t * t * (3 - 2 * t);
}

function valueNoise(size, cells, random) {
  const grid = new Float32Array(cells * cells);

  for (let index = 0; index < grid.length; index += 1) {
    grid[index] = random();
  }

  const data = new Float32Array(size * size);
  const step = cells / size;

  for (let y = 0; y < size; y += 1) {
    const fy = y * step;
    const y0 = Math.floor(fy);
    const y1 = (y0 + 1) % cells;
    const ty = fy - y0;
    const sy = ty * ty * (3 - 2 * ty);

    for (let x = 0; x < size; x += 1) {
      const fx = x * step;
      const x0 = Math.floor(fx);
      const x1 = (x0 + 1) % cells;
      const tx = fx - x0;
      const sx = tx * tx * (3 - 2 * tx);

      const top = grid[y0 * cells + x0] + (grid[y0 * cells + x1] - grid[y0 * cells + x0]) * sx;
      const bottom = grid[y1 * cells + x0] + (grid[y1 * cells + x1] - grid[y1 * cells + x0]) * sx;

      data[y * size + x] = top + (bottom - top) * sy;
    }
  }

  return data;
}

function fbm(size, { octaves = 5, baseCells = 4, seed = 1, gain = 0.5 } = {}) {
  const random = mulberry32(seed);
  const data = new Float32Array(size * size);
  let amplitude = 1;
  let total = 0;
  let cells = baseCells;

  for (let octave = 0; octave < octaves; octave += 1) {
    const layer = valueNoise(size, cells, random);

    for (let index = 0; index < data.length; index += 1) {
      data[index] += layer[index] * amplitude;
    }

    total += amplitude;
    amplitude *= gain;
    cells *= 2;
  }

  for (let index = 0; index < data.length; index += 1) {
    data[index] /= total;
  }

  return data;
}

function createTexture(size, data, { colorSpace = THREE.NoColorSpace, repeat }) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  const image = context.createImageData(size, size);
  image.data.set(data);
  context.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.colorSpace = colorSpace;
  texture.anisotropy = ANISOTROPY;
  texture.needsUpdate = true;

  return texture;
}

export function createSurfaceTextures({
  size = TEXTURE_SIZE,
  seed,
  repeat,
  baseColor,
  stainColor,
  colorContrast,
  stainStrength,
  roughnessRange,
  normalStrength,
}) {
  const height = fbm(size, { octaves: 6, baseCells: 4, seed });
  const stains = fbm(size, { octaves: 3, baseCells: 2, seed: seed + 101 });
  const grainRandom = mulberry32(seed + 977);
  const colorData = new Uint8ClampedArray(size * size * 4);
  const roughnessData = new Uint8ClampedArray(size * size * 4);
  const normalData = new Uint8ClampedArray(size * size * 4);
  const [roughMin, roughMax] = roughnessRange;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = y * size + x;
      const offset = index * 4;
      const grain = grainRandom();
      const h = height[index];
      const stain = smoothstep(0.52, 0.86, stains[index]) * stainStrength;
      const variation = (h - 0.5) * colorContrast + (grain - 0.5) * 6;

      colorData[offset] = baseColor[0] + variation + (stainColor[0] - baseColor[0]) * stain;
      colorData[offset + 1] = baseColor[1] + variation + (stainColor[1] - baseColor[1]) * stain;
      colorData[offset + 2] = baseColor[2] + variation + (stainColor[2] - baseColor[2]) * stain;
      colorData[offset + 3] = 255;

      const roughness = Math.round(
        (roughMin + (h * 0.7 + stain * 0.3) * (roughMax - roughMin)) * 255,
      );
      roughnessData[offset] = roughness;
      roughnessData[offset + 1] = roughness;
      roughnessData[offset + 2] = roughness;
      roughnessData[offset + 3] = 255;

      const left = height[y * size + (x === 0 ? size - 1 : x - 1)];
      const right = height[y * size + (x === size - 1 ? 0 : x + 1)];
      const up = height[(y === 0 ? size - 1 : y - 1) * size + x];
      const down = height[(y === size - 1 ? 0 : y + 1) * size + x];
      const dx = (right - left) * normalStrength;
      const dy = (down - up) * normalStrength;
      const length = Math.hypot(dx, dy, 1);

      normalData[offset] = (-dx / length) * 127.5 + 127.5;
      normalData[offset + 1] = (-dy / length) * 127.5 + 127.5;
      normalData[offset + 2] = (1 / length) * 127.5 + 127.5;
      normalData[offset + 3] = 255;
    }
  }

  return {
    map: createTexture(size, colorData, { colorSpace: THREE.SRGBColorSpace, repeat }),
    roughnessMap: createTexture(size, roughnessData, { repeat }),
    normalMap: createTexture(size, normalData, { repeat }),
  };
}
