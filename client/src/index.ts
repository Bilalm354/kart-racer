import '~/styles/index';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Menu } from '~/ui/Menu';
import { world } from '~/World';

// prevent longpress on iphone
// TODO: add the thing below only for mobile users
// TODO: only auto show touchpad on mobile
// document.addEventListener('contextmenu', (event) => event.preventDefault()); this might be nicer than the thing below
window.oncontextmenu = (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

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

console.log('\x1b[36m%s\x1b[0m', 'nerd');
