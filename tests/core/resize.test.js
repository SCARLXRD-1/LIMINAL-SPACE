import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { attachResize } from '../../src/core/resize.js';

const originalWindow = globalThis.window;
const OriginalResizeObserver = globalThis.ResizeObserver;

afterEach(() => {
  if (originalWindow === undefined) {
    delete globalThis.window;
  } else {
    globalThis.window = originalWindow;
  }

  if (OriginalResizeObserver === undefined) {
    delete globalThis.ResizeObserver;
  } else {
    globalThis.ResizeObserver = OriginalResizeObserver;
  }
});

test('notifies the render pipeline and applies reduced resolution on resize', () => {
  const dimensions = [];
  const pixelRatios = [];
  const container = { clientWidth: 800, clientHeight: 600 };
  const renderer = {
    domElement: { parentElement: container },
    setPixelRatio(value) {
      pixelRatios.push(value);
    },
    setSize() {},
  };
  const camera = { updateProjectionMatrix() {} };

  globalThis.window = {
    devicePixelRatio: 2,
    addEventListener() {},
    removeEventListener() {},
  };
  globalThis.ResizeObserver = class {
    constructor(callback) {
      this.callback = callback;
    }

    observe() {}
    disconnect() {}
  };

  const resize = attachResize(renderer, camera, container, (width, height) => {
    dimensions.push([width, height]);
  });

  resize.setResolutionScale(0.75);
  resize.dispose();

  assert.deepEqual(dimensions, [[800, 600], [800, 600]]);
  assert.deepEqual(pixelRatios, [2, 1.5]);
});
