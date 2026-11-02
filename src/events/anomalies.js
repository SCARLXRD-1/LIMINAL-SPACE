const FLICKER_CONFIGS = [
  { key: 'flicker-a', intensity: 0.86, frequency: 6.5, phase: 0.4, min: 0.72, max: 1.0 },
  { key: 'flicker-b', intensity: 0.93, frequency: 9.5, phase: 2.8, min: 0.8, max: 1.0 },
  { key: 'flicker-c', intensity: 0.9, frequency: 8.2, phase: 5.1, min: 0.75, max: 1.0 },
];

export function createAnomalies({ lights = {} } = {}) {
  const flickerStates = new Map(
    FLICKER_CONFIGS.map((config) => [
      config.key,
      { ...config, time: 0 },
    ]),
  );

  const update = (delta) => {
    for (const [key, state] of flickerStates) {
      const light = lights[key];
      if (!light) {
        continue;
      }

      state.time += delta;
      const pulse = 0.5 + 0.5 * Math.sin(state.time * state.frequency + state.phase);
      const flicker = state.min + (state.max - state.min) * pulse;
      light.intensity = flicker * state.intensity;
    }
  };


  return { update };
}
