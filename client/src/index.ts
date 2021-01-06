import '~/styles/index';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import Stats from 'stats.js';
import { Menu } from '~/ui/Menu';
import { world } from '~/World';

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
document.addEventListener('orientationchange', (orientation) => console.log(orientation));

window.addEventListener('resize', () => world.onWindowResize());

function animate() {
  stats.begin();
  ReactDOM.render(createElement(Menu), document.getElementById('react'));
  world.updateSceneAndCamera();
  stats.end();
  requestAnimationFrame(animate);
}

function main() {
  world.init();
  animate();
}

main();

requestAnimationFrame(animate);

console.log('\x1b[36m%s\x1b[0m', 'nerd');
