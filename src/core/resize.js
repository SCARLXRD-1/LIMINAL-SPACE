import { RENDERER } from '../config/constants.js';

export function attachResize(
  renderer,
  camera,
  container = renderer.domElement.parentElement,
  onResize = () => {},
) {
  let resolutionScale = 1;

  const handleResize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const devicePixelRatio = window.devicePixelRatio || 1;
    const pixelRatio = Math.min(devicePixelRatio, RENDERER.maxPixelRatio) * resolutionScale;
    renderer.setPixelRatio(Math.max(1, pixelRatio));
    renderer.setSize(width, height, false);
    onResize(width, height);
  };

  const observer = new ResizeObserver(handleResize);
  observer.observe(container);
  window.addEventListener('resize', handleResize);
  handleResize();

  return {
    setResolutionScale(scale) {
      resolutionScale = scale;
      handleResize();
    },
    dispose() {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    },
  };
}
