import * as THREE from 'three';
import { CORRIDOR } from '../config/constants.js';

function createChair(materials) {
  const chair = new THREE.Group();
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.03, 0.36),
    materials.doorPanel,
  );
  seat.position.y = 0.44;
  chair.add(seat);

  const back = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.34, 0.02),
    materials.doorPanel,
  );
  back.position.set(0, 0.66, -0.17);
  chair.add(back);

  const legGeometry = new THREE.BoxGeometry(0.022, 0.44, 0.022);

  for (const x of [-0.17, 0.17]) {
    for (const z of [-0.15, 0.15]) {
      const leg = new THREE.Mesh(legGeometry, materials.trim);
      leg.position.set(x, 0.22, z);
      leg.castShadow = true;
      chair.add(leg);
    }
  }

  chair.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  return chair;
}

function createClock(materials) {
  const clock = new THREE.Group();
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.15, 0.012, 8, 28),
    materials.trim,
  );
  clock.add(rim);

  const faceMaterial = new THREE.MeshStandardMaterial({
    color: 0xd9d3c4,
    roughness: 0.92,
    metalness: 0.0,
  });
  const face = new THREE.Mesh(new THREE.CircleGeometry(0.145, 28), faceMaterial);
  face.position.z = 0.004;
  clock.add(face);

  const handMaterial = materials.doorFrame;
  const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.085, 0.006), handMaterial);
  hourHand.position.set(0, 0.038, 0.012);
  hourHand.rotation.z = -0.62;
  clock.add(hourHand);

  const minuteHand = new THREE.Mesh(new THREE.BoxGeometry(0.009, 0.12, 0.006), handMaterial);
  minuteHand.position.set(0, 0.055, 0.013);
  minuteHand.rotation.z = 2.1;
  clock.add(minuteHand);

  clock.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });

  return clock;
}

function createTiltedFrame(materials) {
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(0.012, CORRIDOR.doorHeight + 0.16, CORRIDOR.doorWidth + 0.16),
    materials.doorFrame,
  );
  frame.position.set(CORRIDOR.width / 2 - 0.041, CORRIDOR.doorHeight / 2 + 0.098, -CORRIDOR.doorSpacing);
  frame.rotation.x = 0.035;
  frame.castShadow = true;
  frame.receiveShadow = true;

  return frame;
}

export function createStoryProps(materials) {
  const group = new THREE.Group();

  const chair = createChair(materials);
  chair.position.set(-CORRIDOR.width / 2 + 0.34, 0, -CORRIDOR.doorSpacing - 1.1);
  chair.rotation.y = -Math.PI / 2;
  group.add(chair);

  const clock = createClock(materials);
  clock.position.set(-CORRIDOR.width / 2 + 0.025, 2.18, 0);
  clock.rotation.y = Math.PI / 2;
  group.add(clock);

  group.add(createTiltedFrame(materials));

  return group;
}
