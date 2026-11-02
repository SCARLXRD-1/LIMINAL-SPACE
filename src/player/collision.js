import { CORRIDOR } from '../config/constants.js';

export const PLAYER = {
  width: 0.6,
  height: 1.7,
  eyeHeight: 1.65,
};

const HALF_WIDTH = CORRIDOR.width / 2 - CORRIDOR.wallThickness - PLAYER.width / 2;
const HALF_DEPTH = CORRIDOR.length / 2 - CORRIDOR.wallThickness - PLAYER.width / 2;
const MAX_EYE_HEIGHT = CORRIDOR.height - 0.05;

export function resolveCollision(position) {
  position.x = Math.min(Math.max(position.x, -HALF_WIDTH), HALF_WIDTH);
  position.z = Math.min(Math.max(position.z, -HALF_DEPTH), HALF_DEPTH);
  position.y = Math.min(Math.max(position.y, 0), MAX_EYE_HEIGHT);
  return position;
}
