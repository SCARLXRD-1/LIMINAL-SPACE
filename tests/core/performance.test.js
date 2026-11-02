import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createPerformanceGuard } from '../../src/core/performance.js';

test('degrades once after sustained slow frames and resets on recovery', () => {
  let degradationCount = 0;
  const guard = createPerformanceGuard({
    thresholdMs: 20,
    consecutiveFrames: 2,
    onDegrade: () => {
      degradationCount += 1;
    },
  });

  assert.equal(guard.update(25), false);
  assert.equal(guard.update(16), false);
  assert.equal(guard.update(25), false);
  assert.equal(guard.update(25), true);
  assert.equal(guard.update(25), false);
  assert.equal(degradationCount, 1);
});
