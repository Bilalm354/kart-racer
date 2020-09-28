import '/styles/index';
import {
  Color, PerspectiveCamera, Scene, WebGLRenderer,
} from 'three';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Menu } from '/ui/Menu';
import { keyboard } from '/misc/Keyboard';
import { World } from '/engine/World';

const camera = new PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 2000,
);
const scene = new Scene();
const renderer = new WebGLRenderer();
scene.background = new Color(0xfad6a5);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

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

export const world = new World(scene, camera, renderer);

function animate() {
  ReactDOM.render(createElement(Menu), document.getElementById('react'));
  world.updateSceneAndCamera();
  requestAnimationFrame(animate);
}

function main() {
  world.init();
  animate();
}

main();

console.log('\x1b[36m%s\x1b[0m', 'hi nerd, hope you like my game');
