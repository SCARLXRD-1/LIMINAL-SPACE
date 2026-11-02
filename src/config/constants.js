export const SCENE = {
  background: 0x0d1015,
  fogNear: 4,
  fogFar: 32,
};

export const CAMERA = {
  fov: 70,
  near: 0.1,
  far: 100,
  position: [0, 1.65, 6],
};

export const CORRIDOR = {
  width: 2.4,
  height: 2.7,
  length: 28,
  wallThickness: 0.18,
  floorThickness: 0.25,
  ceilingThickness: 0.18,
  lightLength: 1.2,
  lightDepth: 0.55,
  lightHeight: 0.12,
  lightSpacing: 4.5,
  lightInset: 0.04,
  doorWidth: 0.9,
  doorHeight: 2.1,
  doorSpacing: 9,
  doorPanelThickness: 0.03,
  doorFrameThickness: 0.02,
  doorFrameBorder: 0.08,
  baseboardHeight: 0.12,
  baseboardThickness: 0.04,
  ceilingGridSpacing: 2.8,
  ceilingBeamSize: 0.05,
  ceilingBeamHeight: 0.04,
  crownSize: 0.06,
};

export const RENDERER = {
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
  maxPixelRatio: 2,
};

export const ATMOSPHERE = {
  quality: 'high',
  bloomStrength: 0.05,
  bloomRadius: 0.05,
  bloomThreshold: 0.85,
  vignetteIntensity: 0.12,
  grainIntensity: 0.035,
};

export const LOOP = {
  maxDelta: 0.05,
};
