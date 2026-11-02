import * as THREE from 'three';
import { CORRIDOR } from '../config/constants.js';
import { createMaterials } from './materials.js';
import { createStoryProps } from './story-props.js';
import {
  createBaseboards,
  createCeilingFixtures,
  createCeilingGrid,
  createCrownMolding,
  createDoors,
} from './props.js';

export function createCorridor() {
  const group = new THREE.Group();
  const materials = createMaterials();
  const shellHeight = CORRIDOR.height + CORRIDOR.ceilingThickness;

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(CORRIDOR.width, CORRIDOR.floorThickness, CORRIDOR.length),
    materials.floor,
  );
  floor.position.set(0, -CORRIDOR.floorThickness / 2, 0);
  floor.receiveShadow = true;
  group.add(floor);

  const ceiling = new THREE.Mesh(
    new THREE.BoxGeometry(CORRIDOR.width, CORRIDOR.ceilingThickness, CORRIDOR.length),
    materials.ceiling,
  );
  ceiling.position.set(0, CORRIDOR.height + CORRIDOR.ceilingThickness / 2, 0);
  ceiling.receiveShadow = true;
  group.add(ceiling);

  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(CORRIDOR.wallThickness, shellHeight, CORRIDOR.length),
    materials.wall,
  );
  leftWall.position.set(-CORRIDOR.width / 2 - CORRIDOR.wallThickness / 2, shellHeight / 2, 0);
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  group.add(leftWall);

  const rightWall = leftWall.clone();
  rightWall.position.x = CORRIDOR.width / 2 + CORRIDOR.wallThickness / 2;
  group.add(rightWall);

  const endWall = new THREE.Mesh(
    new THREE.BoxGeometry(
      CORRIDOR.width + CORRIDOR.wallThickness * 2,
      shellHeight,
      CORRIDOR.wallThickness,
    ),
    materials.endWall,
  );
  endWall.position.set(0, shellHeight / 2, -CORRIDOR.length / 2 - CORRIDOR.wallThickness / 2);
  endWall.castShadow = true;
  endWall.receiveShadow = true;
  group.add(endWall);

  const startWall = endWall.clone();
  startWall.position.z = CORRIDOR.length / 2 + CORRIDOR.wallThickness / 2;
  group.add(startWall);

  group.add(
    createCeilingFixtures(materials),
    createCeilingGrid(materials),
    createCrownMolding(materials),
    createBaseboards(materials),
    createDoors(materials),
    createStoryProps(materials),
  );

  return group;
}
