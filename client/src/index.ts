import '~/styles/index';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Menu } from './ui/Menu';
import { World } from './World';

export const world = new World();

function animate() {
  ReactDOM.render(createElement(Menu), document.getElementById('react'));
  world.updateSceneAndCamera();
  requestAnimationFrame(animate);
}

function main() {
  window.addEventListener('resize', () => world.onWindowResize());
  world.init();
  console.log('\x1b[36m%s\x1b[0m', 'hi nerd, hope you like my game');
  animate();
  requestAnimationFrame(animate);
}

main();
