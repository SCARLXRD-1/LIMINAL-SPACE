import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CORRIDOR } from '../config/constants.js';
import { getCeilingFixturePositions } from './props.js';

RectAreaLightUniformsLib.init();

export function createLighting(renderer, scene) {
  const group = new THREE.Group();
  const positions = getCeilingFixturePositions();
  const lightY = CORRIDOR.height - CORRIDOR.lightInset - CORRIDOR.lightHeight - 0.02;

  for (const z of positions) {
    const area = new THREE.RectAreaLight(
      0xfff1d6,
      10,
      CORRIDOR.lightLength,
      CORRIDOR.lightDepth,
    );
    area.position.set(0, lightY, z);
    area.rotation.x = -Math.PI / 2;
    group.add(area);
  }

  positions.forEach((z, index) => {
    if (index % 2 === 0) {
      return;
    }

    const spot = new THREE.SpotLight(0xfff4e2, 50, 10, 0.9, 0.9, 2);
    spot.position.set(0, lightY, z);
    spot.target.position.set(0, 0, z);
    spot.castShadow = true;
    spot.shadow.mapSize.set(1024, 1024);
    spot.shadow.camera.near = 0.4;
    spot.shadow.camera.far = 8;
    spot.shadow.bias = -0.0004;
    spot.shadow.normalBias = 0.02;
    group.add(spot, spot.target);
  });

  const ambient = new THREE.HemisphereLight(0x1b1f26, 0xffe9c9, 0.6);
  group.add(ambient);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = new RoomEnvironment();
  scene.environment = pmrem.fromScene(environment, 0.04).texture;
  scene.environmentIntensity = 0.35;
  environment.dispose();
  pmrem.dispose();

  scene.add(group);

  return group;
}
