import './styles/index';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Menu } from './ui/Menu';
import { keyboard } from './misc/Keyboard';
import { World } from './World';
import {
  handleStart, handleEnd, handleCancel, handleMove,
} from '~misc/touchHandler';

export const world = new World();

document.addEventListener('keydown', (event) => keyboard.keyDownHandler(event.key));
document.addEventListener('keyup', (event) => keyboard.keyUpHandler(event));
document.addEventListener('touchstart', (event) => handleStart(event));
document.addEventListener('touchend', (event) => handleEnd(event));
document.addEventListener('touchcancel', (event) => handleCancel(event));
document.addEventListener('touchmove', (event) => handleMove(event));
window.addEventListener('resize', () => world.onWindowResize());

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

requestAnimationFrame(animate);

console.log('\x1b[36m%s\x1b[0m', 'hi nerd, hope you like my game');
