import '~/styles/index';
import * as THREE from 'three';
import { Object3D } from 'three';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { ambientLight, directionalLight } from '~/misc/lights';
import { smallTrack, bigTrack } from '~/tracks/squareTrack';
import { Menu } from '~/ui/Menu';
import { Car } from '~/bodies/vehicles/Car';
import { keyboard } from '~/misc/Keyboard';

const car = new Car();
const objects: Object3D[] = [bigTrack, car.geometry, ambientLight, directionalLight];
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 2000,
);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

export function setSmallTrack(): void {
  scene.remove(bigTrack);
  scene.add(smallTrack);
  console.log(scene);
}

export function setBigTrack(): void {
  scene.remove(smallTrack);
  scene.add(bigTrack);
}

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

function handleMove(e:TouchEvent) {
  console.log(e);
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
}

type CameraView = 'top' | 'behindCar';

let cameraView: CameraView = 'behindCar';

export function setCameraView(view: CameraView) {
  cameraView = view;
}

function setCameraPosition(view: CameraView) {
  if (view === 'top') {
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
