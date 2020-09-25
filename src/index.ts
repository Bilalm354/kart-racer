import '~/styles/index.scss';
import * as THREE from 'three';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Object3D, Vector3 } from 'three';
import { ambientLight, directionalLight } from '~misc/lights.ts';
import { track } from '~/tracks/squareTrack.ts';
import { keyboardUpdate } from '~/functions/keyboardUpdate.ts';
import { updateCar } from '~/functions/updateCar.ts';
import { keyDownHandler } from '~/functions/keyDownHandler.ts';
import { keyUpHandler } from '~/functions/keyUpHandler.ts';
import { keyboard } from '~/data/keyboard.ts';
import { Menu } from '~/ui/Menu.tsx';
import { Car } from '~bodies/vehicles/Car';

function touchHandler(e: TouchEvent) {
  if (e.touches) {
    console.log('touch');
  }
}

document.addEventListener('keydown', (event) => keyDownHandler(event, keyboard));
document.addEventListener('keyup', (event) => keyUpHandler(event, keyboard));

document.addEventListener('touchstart', touchHandler);
document.addEventListener('touchmove', touchHandler);

export const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000,
);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfad6a5);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

camera.position.set(0, 100, 100);

const car = new Car();

const objects: Object3D[] = [track, car.geometry, ambientLight, directionalLight];

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

export function setCameraView(x: CameraView) {
  cameraView = x;
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
  keyboardUpdate(keyboard, car); // keyboard.update()
  updateCar(car); // car.update()
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

// https://www.youtube.com/watch?v=VllseHmQzds this song is perfect.
