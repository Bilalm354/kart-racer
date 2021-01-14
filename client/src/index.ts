import '~/styles/index';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Menu } from '~/ui/Menu';
import { world } from '~/World';

document.addEventListener('contextmenu', (event) => event.preventDefault()); // if this doesn't prec\vent longpress on mobile then replace with the one below

// TODO: delete me
// window.oncontextmenu = (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };

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
