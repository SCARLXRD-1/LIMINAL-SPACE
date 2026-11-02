export function createPerformanceGuard({
  thresholdMs = 20,
  consecutiveFrames = 45,
  onDegrade,
}) {
  let slowFrames = 0;
  let degraded = false;

  return {
    update(frameTimeMs) {
      if (degraded) {
        return false;
      }

      slowFrames = frameTimeMs > thresholdMs ? slowFrames + 1 : 0;

      if (slowFrames < consecutiveFrames) {
        return false;
      }

      degraded = true;
      onDegrade();
      return true;
    },
  };
}
