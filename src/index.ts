import '~/styles/index.scss';

import * as THREE from 'three';
import { Object3D } from 'three';
import { createElement } from 'react';
import ReactDOM from 'react-dom';

import { ambientLight, directionalLight } from '~/misc/lights';
import { track } from '~/tracks/squareTrack.ts';
import { Menu } from '~/ui/Menu.tsx';
import { Car } from '~/bodies/vehicles/Car';
import { keyboard } from '~/misc/Keyboard';

const car = new Car();
const objects: Object3D[] = [track, car.geometry, ambientLight, directionalLight];
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000,
);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

function handleStart(e: TouchEvent) {
  if (e.touches) {
    keyboard.up = true;
  }
}

function handleEnd(e: TouchEvent) {
  if (e.touches) {
    keyboard.up = false;
  }
}

function handleCancel(e: TouchEvent) {
  if (e.touches) {
    keyboard.up = false;
  }
}

function handleMove(_e:TouchEvent) {
  console.log('handleMove');
}

document.addEventListener('keydown', (event) => keyboard.keyDownHandler(event));
document.addEventListener('keyup', (event) => keyboard.keyUpHandler(event));
document.addEventListener('touchstart', handleStart, false);
document.addEventListener('touchend', handleEnd, false);
document.addEventListener('touchcancel', handleCancel, false);
document.addEventListener('touchmove', handleMove, false);

scene.background = new THREE.Color(0xfad6a5);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

export function init() {
  car.geometry.position.set(0, 0, 3);
  directionalLight.position.set(1, 1, 0.5).normalize();
  scene.add(...objects);
  camera.up.set(0, 0, 1);
}

export function unInit() {
  scene.remove(...objects);
  console.log('paused');
  // TODO: show paused text
}

type CameraView = 'top' | 'behindCar';

let cameraView: CameraView = 'behindCar';

export function setCameraView(view: CameraView) {
  cameraView = view;
}

function setCameraPosition(view: CameraView) {
  if (view === 'top') {
    // TODO: should set position based on track in order to fit whole track in view.
    camera.position.set(0, 0, 300);
    camera.lookAt(0, 0, 0);
    camera.up.set(0, 1, 0);
  } else if (view === 'behindCar') {
    car.updateCamera(camera);
  }
}

function updateSceneAndCamera() {
  car.updateKeyboard(keyboard);
  car.update();
  car.updateGeometry();
  setCameraPosition(cameraView);
  renderer.render(scene, camera);
}

function animate() {
  ReactDOM.render(createElement(Menu), document.getElementById('react'));
  updateSceneAndCamera();
  requestAnimationFrame(animate);
}

function main() {
  init();
  animate();
}

main();

console.log('\x1b[36m%s\x1b[0m', 'hi nerd, hope you like my game');
