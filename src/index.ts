import '~/styles/index.scss';
import * as THREE from 'three';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Object3D } from 'three';
import { ambientLight } from '~/three/ambientLight.ts';
import { track } from '~/tracks/squareTrack.ts';
import { car } from '~/bodies/vehicles/car.ts';
import { keyboardUpdate } from '~/functions/keyboardUpdate.ts';
import { updateCar } from '~/functions/updateCar.ts';
import { updateCar3dObject } from '~/functions/updateCar3dObject.ts';
import { followCarWithCamera } from '~/functions/followCarWithCamera.ts';
import { keyDownHandler } from '~/functions/keyDownHandler.ts';
import { keyUpHandler } from '~/functions/keyUpHandler.ts';
import { keyboard } from '~/data/keyboard.ts';
import { camera } from '~/three/camera.ts';
import { directionalLight } from '~/three/directionalLight.ts';
import { Menu } from '~/ui/Menu.tsx';

function touchHandler(e: TouchEvent) {
  if (e.touches) {
    console.log('touch');
  }
}

document.addEventListener('keydown', (event) => keyDownHandler(event, keyboard));
document.addEventListener('keyup', (event) => keyUpHandler(event, keyboard));

document.addEventListener('touchstart', touchHandler);
document.addEventListener('touchmove', touchHandler);
// document.addEventListener('touchend', handleEnd);
// document.addEventListener('touchcancel', handleCancel);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfad6a5);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

camera.position.set(0, 100, 100);

const objects: Object3D[] = [track, car, ambientLight, directionalLight];

export function init() {
  car.position.set(0, 0, 3);
  directionalLight.position.set(1, 1, 0.5).normalize();
  scene.add(...objects);
  camera.up.set(0, 0, 1);
}
init();

export function unInit() {
  scene.remove(...objects);
  // TODO: show paused text
}

const playerCar = {
  x: 0,
  y: 0,
  z: 0,
  xVelocity: 0,
  yVelocity: 0,
  zVelocity: 0,
  power: 0,
  reverse: 0,
  angle: 0,
  angularVelocity: 0,
  isThrottling: false,
  isReversing: false,
  isTurningLeft: false,
  isTurningRight: false,
  turbo: false,
};

type CameraView = 'top' | 'behindCar';

export const cameraView: CameraView = 'behindCar';

function setCameraPosition(view: CameraView) {
  if (view === 'top') {
    camera.position.set(0, 0, 300);
  } else if (view === 'behindCar') {
    followCarWithCamera(camera, car, playerCar);
  }
}

function updateSceneAndCamera() {
  keyboardUpdate(keyboard, playerCar); // keyboard.update()
  updateCar(playerCar); // car.update()
  updateCar3dObject(car, playerCar); // world.update()
  setCameraPosition(cameraView);
  renderer.render(scene, camera);
}

function animate() {
  ReactDOM.render(createElement(Menu), document.getElementById('react'));
  updateSceneAndCamera();
  requestAnimationFrame(animate);
}

animate();

console.log('\x1b[36m%s\x1b[0m', 'hi nerd, hope you like my game');

// https://www.youtube.com/watch?v=VllseHmQzds this song is perfect.
