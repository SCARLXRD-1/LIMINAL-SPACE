import * as THREE from 'three';

const EYE_HEIGHT = 1.65;
const MOVE_SPEED = 2.2;
const SPRINT_SPEED = 4.4;
const PITCH_LIMIT = 1.25;
const LOOK_SENSITIVITY = 0.0025;

const KEY_CODES = new Set(['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ShiftLeft']);

export function createPlayerControls({ camera, renderer, onLockStateChange }) {
  const keys = {
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    ShiftLeft: false,
  };
  const yaw = { value: 0 };
  const pitch = { value: 0 };
  let locked = false;

  const updateLook = () => {
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yaw.value;
    camera.rotation.x = pitch.value;
  };

  const release = () => {
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  };

  const requestLock = () => {
    if (
      document.pointerLockElement !== renderer.domElement &&
      typeof renderer.domElement.requestPointerLock === 'function'
    ) {
      renderer.domElement.requestPointerLock();
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      release();
      return;
    }
    if (KEY_CODES.has(event.code)) {
      keys[event.code] = true;
    }
  };

  const handleKeyUp = (event) => {
    if (KEY_CODES.has(event.code)) {
      keys[event.code] = false;
    }
  };

  const handleMouseMove = (event) => {
    if (!locked) {
      return;
    }
    yaw.value -= event.movementX * LOOK_SENSITIVITY;
    pitch.value -= event.movementY * LOOK_SENSITIVITY;
    pitch.value = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitch.value));
    updateLook();
  };

  const handleClick = () => {
    if (locked) {
      release();
      return;
    }
    requestLock();
  };

  const handlePointerLockChange = () => {
    locked = document.pointerLockElement === renderer.domElement;
    if (typeof onLockStateChange === 'function') {
      onLockStateChange(locked);
    }
  };

  const attach = () => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
  };

  const detach = () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    window.removeEventListener('mousemove', handleMouseMove);
    renderer.domElement.removeEventListener('click', handleClick);
    document.removeEventListener('pointerlockchange', handlePointerLockChange);
  };

  const getMovement = (delta) => {
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    forward.y = 0;
    if (forward.lengthSq() > 0) {
      forward.normalize();
    }
    const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), forward);
    if (right.lengthSq() > 0) {
      right.normalize();
    }

    const speed = keys.ShiftLeft ? SPRINT_SPEED : MOVE_SPEED;
    const move = new THREE.Vector3();

    if (keys.KeyW) {
      move.addScaledVector(forward, speed);
    }
    if (keys.KeyS) {
      move.subScaledVector(forward, speed);
    }
    if (keys.KeyA) {
      move.subScaledVector(right, speed);
    }
    if (keys.KeyD) {
      move.addScaledVector(right, speed);
    }

    move.y = 0;
    return move.multiplyScalar(delta);
  };

  const update = (delta, deltaTime) => {
    void deltaTime;
    updateLook();
    return getMovement(delta);
  };

  const isLocked = () => locked;

  return {
    attach,
    detach,
    update,
    isLocked,
    requestLock,
    release,
  };
}
