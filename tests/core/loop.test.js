import { afterEach, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { createLoop } from '../../src/core/loop.js';

let originalWindow;
let nextFrame;

beforeEach(() => {
  originalWindow = globalThis.window;
  nextFrame = null;
  globalThis.window = {
    requestAnimationFrame(callback) {
      nextFrame = callback;
      return 1;
    },
    cancelAnimationFrame() {},
  };
});

afterEach(() => {
  if (originalWindow === undefined) {
    delete globalThis.window;
  } else {
    globalThis.window = originalWindow;
  }
});

test('uses the supplied render path instead of rendering the scene twice', () => {
  let rendererCalls = 0;
  let postProcessingCalls = 0;
  const renderer = {
    render() {
      rendererCalls += 1;
    },
  };
  const loop = createLoop(renderer, {}, {}, () => {}, () => {
    postProcessingCalls += 1;
  });

  loop.start();
  nextFrame(16);
  loop.stop();

  assert.equal(postProcessingCalls, 1);
  assert.equal(rendererCalls, 0);
});

test('renders directly when no custom render path is supplied', () => {
  let rendererCalls = 0;
  const renderer = {
    render() {
      rendererCalls += 1;
    },
  };
  const loop = createLoop(renderer, {}, {}, () => {});

  loop.start();
  nextFrame(16);
  loop.stop();

  assert.equal(rendererCalls, 1);
});
