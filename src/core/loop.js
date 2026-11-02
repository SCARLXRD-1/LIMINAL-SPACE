import { LOOP } from '../config/constants.js';

export function createLoop(renderer, scene, camera, update, renderFrame) {
  let animationFrameId = null;
  let lastTime = null;

  const render =
    renderFrame ??
    ((targetRenderer, targetScene, targetCamera) =>
      targetRenderer.render(targetScene, targetCamera));

  const tick = (time) => {
    const delta = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, LOOP.maxDelta);
    lastTime = time;

    if (typeof update === 'function') {
      update(delta, time);
    }

    render(renderer, scene, camera);
    animationFrameId = window.requestAnimationFrame(tick);
  };

  return {
    start() {
      if (animationFrameId === null) {
        lastTime = null;
        animationFrameId = window.requestAnimationFrame(tick);
      }
    },
    stop() {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    },
  };
}