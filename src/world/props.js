import * as THREE from 'three';
import { CORRIDOR } from '../config/constants.js';

export function getCeilingFixturePositions() {
  const count = Math.floor(CORRIDOR.length / CORRIDOR.lightSpacing) + 1;
  const positions = [];

  for (let index = 0; index < count; index += 1) {
    positions.push(-CORRIDOR.length / 2 + index * CORRIDOR.lightSpacing);
  }

  return positions;
}

function getDoorPositions() {
  const positions = [];

  for (let z = -CORRIDOR.doorSpacing; z <= CORRIDOR.doorSpacing; z += CORRIDOR.doorSpacing) {
    positions.push(z);
  }

  return positions;
}

export function createCeilingFixtures(materials) {
  const dummy = new THREE.Object3D();
  const group = new THREE.Group();
  const count = getCeilingFixturePositions().length;
  const housingGeometry = new THREE.BoxGeometry(
    CORRIDOR.lightLength,
    CORRIDOR.lightHeight,
    CORRIDOR.lightDepth,
  );
  const diffuserGeometry = new THREE.BoxGeometry(
    CORRIDOR.lightLength - 0.08,
    0.02,
    CORRIDOR.lightDepth - 0.08,
  );
  const housing = new THREE.InstancedMesh(housingGeometry, materials.fixtureHousing, count);
  const diffuser = new THREE.InstancedMesh(diffuserGeometry, materials.fixture, count);
  const y = CORRIDOR.height - CORRIDOR.lightInset - CORRIDOR.lightHeight / 2;
  const diffuserY = CORRIDOR.height - CORRIDOR.lightInset - CORRIDOR.lightHeight - 0.01;

  getCeilingFixturePositions().forEach((z, index) => {
    dummy.position.set(0, y, z);
    dummy.updateMatrix();
    housing.setMatrixAt(index, dummy.matrix);

    dummy.position.set(0, diffuserY, z);
    dummy.updateMatrix();
    diffuser.setMatrixAt(index, dummy.matrix);
  });

  housing.instanceMatrix.needsUpdate = true;
  housing.computeBoundingSphere();
  group.add(housing);

  diffuser.instanceMatrix.needsUpdate = true;
  diffuser.computeBoundingSphere();
  group.add(diffuser);

  return group;
}

export function createCeilingGrid(materials) {
  const dummy = new THREE.Object3D();
  const group = new THREE.Group();
  const beamHeight = CORRIDOR.ceilingBeamHeight;
  const beamY = CORRIDOR.height - beamHeight / 2;

  const longitudinalGeometry = new THREE.BoxGeometry(
    CORRIDOR.ceilingBeamSize,
    beamHeight,
    CORRIDOR.length,
  );
  const longitudinal = new THREE.InstancedMesh(longitudinalGeometry, materials.grid, 2);

  [-1, 1].forEach((side, index) => {
    dummy.position.set(side * (CORRIDOR.width / 4), beamY, 0);
    dummy.updateMatrix();
    longitudinal.setMatrixAt(index, dummy.matrix);
  });

  longitudinal.instanceMatrix.needsUpdate = true;
  longitudinal.computeBoundingSphere();
  group.add(longitudinal);

  const transverseGeometry = new THREE.BoxGeometry(
    CORRIDOR.width - 0.12,
    beamHeight,
    CORRIDOR.ceilingBeamSize,
  );
  const count = Math.floor(CORRIDOR.length / CORRIDOR.ceilingGridSpacing);
  const transverse = new THREE.InstancedMesh(transverseGeometry, materials.grid, count);

  for (let index = 0; index < count; index += 1) {
    const z = -CORRIDOR.length / 2 + (index + 0.5) * CORRIDOR.ceilingGridSpacing;
    dummy.position.set(0, beamY, z);
    dummy.updateMatrix();
    transverse.setMatrixAt(index, dummy.matrix);
  }

  transverse.instanceMatrix.needsUpdate = true;
  transverse.computeBoundingSphere();
  group.add(transverse);

  return group;
}

export function createCrownMolding(materials) {
  const dummy = new THREE.Object3D();
  const geometry = new THREE.BoxGeometry(CORRIDOR.crownSize, CORRIDOR.crownSize, CORRIDOR.length);
  const molding = new THREE.InstancedMesh(geometry, materials.crown, 2);

  [-1, 1].forEach((side, index) => {
    dummy.position.set(
      side * (CORRIDOR.width / 2 - CORRIDOR.crownSize / 2),
      CORRIDOR.height - CORRIDOR.crownSize / 2,
      0,
    );
    dummy.updateMatrix();
    molding.setMatrixAt(index, dummy.matrix);
  });

  molding.instanceMatrix.needsUpdate = true;
  molding.computeBoundingSphere();
  molding.receiveShadow = true;

  return molding;
}

export function createBaseboards(materials) {
  const dummy = new THREE.Object3D();
  const geometry = new THREE.BoxGeometry(CORRIDOR.baseboardThickness, CORRIDOR.baseboardHeight, 1);
  const halfSpan = CORRIDOR.doorWidth / 2 + CORRIDOR.doorFrameBorder;
  const edges = [-CORRIDOR.length / 2];

  for (const z of getDoorPositions()) {
    edges.push(z - halfSpan, z + halfSpan);
  }

  edges.push(CORRIDOR.length / 2);

  const transforms = [];

  for (let index = 0; index < edges.length; index += 2) {
    const start = edges[index];
    const end = edges[index + 1];

    if (end - start <= 0) {
      continue;
    }

    for (const side of [-1, 1]) {
      transforms.push({ side, z: (start + end) / 2, length: end - start });
    }
  }

  const baseboards = new THREE.InstancedMesh(geometry, materials.trim, transforms.length);

  transforms.forEach(({ side, z, length }, index) => {
    dummy.position.set(
      side * (CORRIDOR.width / 2 - CORRIDOR.baseboardThickness / 2),
      CORRIDOR.baseboardHeight / 2,
      z,
    );
    dummy.scale.set(1, 1, length);
    dummy.updateMatrix();
    baseboards.setMatrixAt(index, dummy.matrix);
  });

  baseboards.instanceMatrix.needsUpdate = true;
  baseboards.computeBoundingSphere();
  baseboards.castShadow = true;
  baseboards.receiveShadow = true;

  return baseboards;
}

export function createDoors(materials) {
  const dummy = new THREE.Object3D();
  const group = new THREE.Group();
  const doorPositions = getDoorPositions();
  const count = doorPositions.length * 2;

  const panelGeometry = new THREE.BoxGeometry(
    CORRIDOR.doorPanelThickness,
    CORRIDOR.doorHeight,
    CORRIDOR.doorWidth,
  );
  const frameGeometry = new THREE.BoxGeometry(
    CORRIDOR.doorFrameThickness,
    CORRIDOR.doorHeight + CORRIDOR.doorFrameBorder * 2,
    CORRIDOR.doorWidth + CORRIDOR.doorFrameBorder * 2,
  );

  const panels = new THREE.InstancedMesh(panelGeometry, materials.doorPanel, count);
  const frames = new THREE.InstancedMesh(frameGeometry, materials.doorFrame, count);
  const panelX = CORRIDOR.width / 2 - CORRIDOR.doorFrameThickness - CORRIDOR.doorPanelThickness / 2;
  const frameX = CORRIDOR.width / 2 - CORRIDOR.doorFrameThickness / 2;
  let index = 0;

  for (const side of [-1, 1]) {
    for (const z of doorPositions) {
      dummy.position.set(side * panelX, CORRIDOR.doorHeight / 2, z);
      dummy.updateMatrix();
      panels.setMatrixAt(index, dummy.matrix);

      dummy.position.set(side * frameX, CORRIDOR.doorHeight / 2, z);
      dummy.updateMatrix();
      frames.setMatrixAt(index, dummy.matrix);

      index += 1;
    }
  }

  panels.instanceMatrix.needsUpdate = true;
  panels.computeBoundingSphere();
  panels.castShadow = true;
  panels.receiveShadow = true;
  group.add(panels);

  frames.instanceMatrix.needsUpdate = true;
  frames.computeBoundingSphere();
  frames.castShadow = true;
  frames.receiveShadow = true;
  group.add(frames);

  return group;
}
